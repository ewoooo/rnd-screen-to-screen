import { isValidElement, type ReactElement, type ReactNode, type ComponentType } from "react";
import { AppScreen } from "@pxds/pxds-layout/app-screen";

export type FigmaSlot = "top" | "content" | "bottom";

export type FigmaNode = {
	figmaName: string;
	figmaVariant?: string;
	slot: FigmaSlot;
	props: Record<string, unknown>;
	/** text layer name → 실제 텍스트 값. codegen에서 인스턴스 내부 TEXT 노드 오버라이드에 사용. */
	textOverrides?: Record<string, string>;
	/** Figma component properties에 직접 전달할 값. instance.setProperties()로 처리. */
	figmaProps?: Record<string, boolean | string>;
};

export type ScreenFigmaSpec = {
	id: string;
	name: string;
	width: number;
	height: number;
	nodes: FigmaNode[];
};

export type RegistryEntry = {
	component: ComponentType<Record<string, unknown>>;
	figmaName: string;
	figmaVariant?: string;
	mapProps?: (props: Record<string, unknown>) => Record<string, unknown>;
	/**
	 * mapProps 결과의 어떤 키 → Figma 컴포넌트 내부 TEXT 레이어 이름
	 * e.g. { titleText: "Title" }  →  props.titleText 값을 "Title" 레이어에 삽입
	 */
	figmaTextNodes?: Record<string, string>;
	/**
	 * Figma component properties에 직접 전달할 정적 값
	 * e.g. { "SubTitle#10095:12": false }  →  instance.setProperties(...)
	 */
	figmaProps?: Record<string, boolean | string>;
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
			const rawProps = child.props as Record<string, unknown>;
			const mappedProps = entry.mapProps ? entry.mapProps(rawProps) : rawProps;

			// figmaTextNodes: { propKey: layerName } + mappedProps → { layerName: value }
			let textOverrides: Record<string, string> | undefined;
			if (entry.figmaTextNodes) {
				textOverrides = {};
				for (const [propKey, layerName] of Object.entries(entry.figmaTextNodes)) {
					const val = mappedProps[propKey];
					if (typeof val === "string" && val.length > 0) {
						textOverrides[layerName] = val;
					}
				}
				if (Object.keys(textOverrides).length === 0) textOverrides = undefined;
			}

			out.push({
				figmaName: entry.figmaName,
				...(entry.figmaVariant ? { figmaVariant: entry.figmaVariant } : {}),
				slot,
				props: mappedProps,
				...(textOverrides ? { textOverrides } : {}),
				...(entry.figmaProps ? { figmaProps: entry.figmaProps } : {}),
			});
		} else {
			// layout wrapper or unknown — recurse
			const inner = (child.props as { children?: ReactNode }).children;
			if (inner) collectNodes(inner, registry, slot, out);
		}
	}
}

function normalizeChildren(children: ReactNode): ReactNode[] {
	if (children === null || children === undefined) return [];
	if (Array.isArray(children)) return children.flat(Infinity) as ReactNode[];
	return [children];
}
