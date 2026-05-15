import { isValidElement, type ReactElement, type ReactNode, type ComponentType } from "react";
import { AppScreen } from "@pxds/pxds-layout/app-screen";

export type FigmaSlot = "top" | "content" | "bottom";

export type NestedInstanceOverride = {
	properties?: Record<string, boolean | string>;
	textOverrides?: Record<string, string>;
};

export type FigmaNode = {
	figmaName: string;
	figmaVariant?: string;
	slot: FigmaSlot;
	props: Record<string, unknown>;
	/** text layer name → 실제 텍스트 값. */
	textOverrides?: Record<string, string>;
	/** 최상위 Figma component properties. instance.setProperties()로 처리. */
	figmaProps?: Record<string, boolean | string>;
	/** 중첩 인스턴스별 property + text override. { 인스턴스이름: { properties, textOverrides } } */
	nestedInstanceProps?: Record<string, NestedInstanceOverride>;
};

export type ScreenFigmaSpec = {
	id: string;
	name: string;
	width: number;
	height: number;
	nodes: FigmaNode[];
};

type FigmaPropsValue = Record<string, boolean | string>;
type FigmaTextNodesValue = Record<string, string>;

export type RegistryEntry = {
	component: ComponentType<Record<string, unknown>>;
	figmaName: string;
	figmaVariant?: string;
	mapProps?: (props: Record<string, unknown>) => Record<string, unknown>;
	/**
	 * { propKey: figmaLayerName } 또는 mappedProps를 받아 동적으로 반환하는 함수.
	 * propKey의 값을 해당 figma TEXT 레이어에 삽입.
	 */
	figmaTextNodes?:
		| FigmaTextNodesValue
		| ((mappedProps: Record<string, unknown>) => FigmaTextNodesValue);
	/**
	 * Figma component properties 값. 정적 객체 또는 mappedProps 기반 동적 함수.
	 */
	figmaProps?:
		| FigmaPropsValue
		| ((mappedProps: Record<string, unknown>) => FigmaPropsValue);
	/**
	 * 중첩 인스턴스별 overrides. { 인스턴스이름: { properties, textOverrides } }
	 */
	figmaNestedProps?:
		| Record<string, NestedInstanceOverride>
		| ((mappedProps: Record<string, unknown>) => Record<string, NestedInstanceOverride> | undefined);
};

export type Registry = readonly RegistryEntry[];

export function traverseScreen(
	Screen: () => ReactElement,
	registry: Registry,
	config: { id: string; name: string; width?: number; height?: number },
): ScreenFigmaSpec {
	const nodes: FigmaNode[] = [];
	const element = Screen();

	if (isValidElement(element) && element.type === AppScreen) {
		const children = normalizeChildren(
			(element.props as { children?: ReactNode }).children,
		);
		for (const child of children) {
			if (!isValidElement(child)) continue;
			if (child.type === AppScreen.Header) {
				collectNodes(
					(child.props as { children?: ReactNode }).children,
					registry,
					"top",
					nodes,
				);
			} else if (child.type === AppScreen.Content) {
				collectNodes(
					(child.props as { children?: ReactNode }).children,
					registry,
					"content",
					nodes,
				);
			} else if (child.type === AppScreen.Bottom) {
				collectNodes(
					(child.props as { children?: ReactNode }).children,
					registry,
					"bottom",
					nodes,
				);
			}
		}
	}

	return {
		id: config.id,
		name: config.name,
		width: config.width ?? 375,
		height: config.height ?? 812,
		nodes,
	};
}

function resolveEntry(
	entry: RegistryEntry,
	rawProps: Record<string, unknown>,
	slot: FigmaSlot,
): FigmaNode {
	const mappedProps = entry.mapProps ? entry.mapProps(rawProps) : rawProps;

	// figmaTextNodes 해석
	// - 함수형: (mappedProps) => { layerName: value }  — 이미 resolved, 그대로 사용
	// - 정적형: { propKey: layerName }                  — mappedProps에서 값 조회
	let textOverrides: Record<string, string> | undefined;
	if (typeof entry.figmaTextNodes === "function") {
		const resolved = entry.figmaTextNodes(mappedProps);
		const pairs = Object.entries(resolved).filter(
			([, v]) => typeof v === "string" && (v as string).length > 0,
		);
		if (pairs.length > 0) textOverrides = Object.fromEntries(pairs);
	} else if (entry.figmaTextNodes) {
		const acc: Record<string, string> = {};
		for (const [propKey, layerName] of Object.entries(entry.figmaTextNodes)) {
			const val = mappedProps[propKey];
			if (typeof val === "string" && val.length > 0) acc[layerName] = val;
		}
		if (Object.keys(acc).length > 0) textOverrides = acc;
	}

	// figmaProps 해석: 정적 객체 or 함수
	const resolvedFigmaProps =
		typeof entry.figmaProps === "function"
			? entry.figmaProps(mappedProps)
			: entry.figmaProps;

	const resolvedNestedProps =
		typeof entry.figmaNestedProps === "function"
			? entry.figmaNestedProps(mappedProps)
			: entry.figmaNestedProps;

	return {
		figmaName: entry.figmaName,
		...(entry.figmaVariant ? { figmaVariant: entry.figmaVariant } : {}),
		slot,
		props: mappedProps,
		...(textOverrides ? { textOverrides } : {}),
		...(resolvedFigmaProps ? { figmaProps: resolvedFigmaProps } : {}),
		...(resolvedNestedProps ? { nestedInstanceProps: resolvedNestedProps } : {}),
	};
}

function collectNodes(
	children: ReactNode,
	registry: Registry,
	slot: FigmaSlot,
	out: FigmaNode[],
): void {
	for (const child of normalizeChildren(children)) {
		if (!isValidElement(child)) continue;

		const entry = registry.find(
			(e) => e.component === (child.type as ComponentType<Record<string, unknown>>),
		);

		if (entry) {
			out.push(resolveEntry(entry, child.props as Record<string, unknown>, slot));
		} else {
			// children prop이 있으면 바로 재귀 (layout wrapper)
			const inner = (child.props as { children?: ReactNode }).children;
			if (inner) {
				collectNodes(inner, registry, slot, out);
			} else if (typeof child.type === "function") {
				// children prop 없는 컴포넌트 → 직접 호출해서 내부 트리 재귀
				// hooks 없는 순수 컴포넌트만 안전. 실패 시 무시.
				try {
					const rendered = (child.type as (p: unknown) => ReactElement)(child.props);
					if (rendered) collectNodes(normalizeChildren(rendered), registry, slot, out);
				} catch {
					// hooks 등으로 실패하면 skip
				}
			}
		}
	}
}

function normalizeChildren(children: ReactNode): ReactNode[] {
	if (children === null || children === undefined) return [];
	if (Array.isArray(children)) return children.flat(Infinity) as ReactNode[];
	return [children];
}
