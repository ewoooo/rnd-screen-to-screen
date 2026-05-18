import { isValidElement, type ReactElement, type ReactNode, type ComponentType } from "react";
import { AppScreen } from "@pxds/cx-layout/components/chrome";

export type FigmaSlot = "system-header" | "header" | "content" | "bottom";

export type NestedInstanceOverride = {
	properties?: Record<string, boolean | string>;
	textOverrides?: Record<string, string>;
};

/** Figma 컴포넌트 인스턴스 노드 */
export type FigmaComponentNode = {
	type: "component";
	figmaName: string;
	figmaVariant?: string;
	slot: FigmaSlot;
	props: Record<string, unknown>;
	textOverrides?: Record<string, string>;
	figmaProps?: Record<string, boolean | string>;
	nestedInstanceProps?: Record<string, NestedInstanceOverride>;
};

/** Figma Auto Layout frame 노드 (wrapper 계층) */
export type FigmaFrameNode = {
	type: "frame";
	name: string;
	slot: FigmaSlot;
	direction: "VERTICAL" | "HORIZONTAL";
	gap: number;
	paddingTop: number;
	paddingBottom: number;
	paddingLeft: number;
	paddingRight: number;
	children: FigmaTreeNode[];
};

export type FigmaTreeNode = FigmaComponentNode | FigmaFrameNode;

/** 하위 호환 alias */
export type FigmaNode = FigmaComponentNode;

export type ScreenSlots = {
	systemHeader: FigmaTreeNode[];
	header: FigmaTreeNode[];
	content: FigmaTreeNode[];
	bottom: FigmaTreeNode[];
};

export type ScreenFigmaSpec = {
	id: string;
	name: string;
	width: number;
	height: number;
	slots: ScreenSlots;
};

type FigmaPropsValue = Record<string, boolean | string>;
type FigmaTextNodesValue = Record<string, string>;

export type RegistryEntry = {
	component: ComponentType<Record<string, unknown>>;
	figmaName: string;
	/** 정적 variant 문자열, 또는 mappedProps 기반 동적 함수 */
	figmaVariant?: string | ((mappedProps: Record<string, unknown>) => string | undefined);
	mapProps?: (props: Record<string, unknown>) => Record<string, unknown>;
	figmaTextNodes?:
		| FigmaTextNodesValue
		| ((mappedProps: Record<string, unknown>) => FigmaTextNodesValue);
	figmaProps?:
		| FigmaPropsValue
		| ((mappedProps: Record<string, unknown>) => FigmaPropsValue);
	figmaNestedProps?:
		| Record<string, NestedInstanceOverride>
		| ((mappedProps: Record<string, unknown>) => Record<string, NestedInstanceOverride> | undefined);
};

export type Registry = readonly RegistryEntry[];

export type LayoutEntry = {
	component: ComponentType<Record<string, unknown>>;
	name: string;
	direction?: "VERTICAL" | "HORIZONTAL";
	mapLayout?: (props: Record<string, unknown>) => {
		gap?: number;
		paddingTop?: number;
		paddingBottom?: number;
		paddingLeft?: number;
		paddingRight?: number;
	};
	/** children 외에 추가로 재귀 탐색할 JSX prop 이름 목록 */
	propsToTraverse?: string[];
};

export type LayoutRegistry = readonly LayoutEntry[];

export function traverseScreen(
	Screen: () => ReactElement,
	registry: Registry,
	layoutRegistry: LayoutRegistry,
	config: { id: string; name: string; width?: number; height?: number },
): ScreenFigmaSpec {
	const slots: ScreenSlots = {
		systemHeader: [],
		header: [],
		content: [],
		bottom: [],
	};
	const element = Screen();

	if (isValidElement(element) && element.type === AppScreen) {
		const children = normalizeChildren(
			(element.props as { children?: ReactNode }).children,
		);
		for (const child of children) {
			if (!isValidElement(child)) continue;
			if (child.type === AppScreen.SystemHeader) {
				collectNodes(
					(child.props as { children?: ReactNode }).children,
					registry,
					layoutRegistry,
					"system-header",
					slots.systemHeader,
				);
			} else if (child.type === AppScreen.Header) {
				collectNodes(
					(child.props as { children?: ReactNode }).children,
					registry,
					layoutRegistry,
					"header",
					slots.header,
				);
			} else if (child.type === AppScreen.Content) {
				collectNodes(
					(child.props as { children?: ReactNode }).children,
					registry,
					layoutRegistry,
					"content",
					slots.content,
				);
			} else if (
				child.type === AppScreen.Bottom ||
				child.type === AppScreen.ActionBar
			) {
				collectNodes(
					(child.props as { children?: ReactNode }).children,
					registry,
					layoutRegistry,
					"bottom",
					slots.bottom,
				);
			}
		}
	}

	return {
		id: config.id,
		name: config.name,
		width: config.width ?? 375,
		height: config.height ?? 812,
		slots,
	};
}

function resolveEntry(
	entry: RegistryEntry,
	rawProps: Record<string, unknown>,
	slot: FigmaSlot,
): FigmaComponentNode {
	const mappedProps = entry.mapProps ? entry.mapProps(rawProps) : rawProps;

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

	const resolvedFigmaProps =
		typeof entry.figmaProps === "function"
			? entry.figmaProps(mappedProps)
			: entry.figmaProps;

	const resolvedNestedProps =
		typeof entry.figmaNestedProps === "function"
			? entry.figmaNestedProps(mappedProps)
			: entry.figmaNestedProps;

	const resolvedVariant =
		typeof entry.figmaVariant === "function"
			? entry.figmaVariant(mappedProps)
			: entry.figmaVariant;

	return {
		type: "component",
		figmaName: entry.figmaName,
		...(resolvedVariant ? { figmaVariant: resolvedVariant } : {}),
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
	layoutRegistry: LayoutRegistry,
	slot: FigmaSlot,
	out: FigmaTreeNode[],
): void {
	for (const child of normalizeChildren(children)) {
		if (!isValidElement(child)) continue;

		// 1. 컴포넌트 registry 매칭 → 인스턴스 노드
		const entry = registry.find(
			(e) => e.component === (child.type as ComponentType<Record<string, unknown>>),
		);
		if (entry) {
			out.push(resolveEntry(entry, child.props as Record<string, unknown>, slot));
			continue;
		}

		// 2. 레이아웃 registry 매칭 → frame 노드 + 재귀 children
		const layoutEntry = layoutRegistry.find(
			(e) => e.component === (child.type as ComponentType<Record<string, unknown>>),
		);
		if (layoutEntry) {
			const props = child.props as Record<string, unknown>;
			const layout = layoutEntry.mapLayout ? layoutEntry.mapLayout(props) : {};
			const frameNode: FigmaFrameNode = {
				type: "frame",
				name: layoutEntry.name,
				slot,
				direction: layoutEntry.direction ?? "VERTICAL",
				gap: layout.gap ?? 0,
				paddingTop: layout.paddingTop ?? 0,
				paddingBottom: layout.paddingBottom ?? 0,
				paddingLeft: layout.paddingLeft ?? 0,
				paddingRight: layout.paddingRight ?? 0,
				children: [],
			};
			// propsToTraverse: children보다 먼저 탐색 (렌더 순서 보존 — title이 content 위에 위치)
			if (layoutEntry.propsToTraverse) {
				for (const propKey of layoutEntry.propsToTraverse) {
					const val = props[propKey];
					if (val !== undefined && val !== null) {
						collectNodes(val as ReactNode, registry, layoutRegistry, slot, frameNode.children);
					}
				}
			}
			const inner = (props as { children?: ReactNode }).children;
			if (inner) {
				collectNodes(inner, registry, layoutRegistry, slot, frameNode.children);
			}
			out.push(frameNode);
			continue;
		}

		// 3. 매칭 없음 — HTML 요소이면 transparent 재귀, React 컴포넌트이면 named frame으로 보존
		if (typeof child.type === "string") {
			// HTML 요소 (div, section 등) — 레이어 없이 children만 재귀
			const inner = (child.props as { children?: ReactNode }).children;
			if (inner) collectNodes(inner, registry, layoutRegistry, slot, out);
		} else {
			// React 컴포넌트 (함수형 / forwardRef) — 컴포넌트 이름으로 named frame 생성
			const name = getComponentName(child.type);
			const frameNode: FigmaFrameNode = {
				type: "frame",
				name,
				slot,
				direction: "VERTICAL",
				gap: 0,
				paddingTop: 0,
				paddingBottom: 0,
				paddingLeft: 0,
				paddingRight: 0,
				children: [],
			};

			if (typeof child.type === "function") {
				try {
					const rendered = (child.type as (p: unknown) => ReactElement)(child.props);
					if (rendered) collectNodes(normalizeChildren(rendered), registry, layoutRegistry, slot, frameNode.children);
				} catch {
					// hooks 등 실패 → children 폴백
					const inner = (child.props as { children?: ReactNode }).children;
					if (inner) collectNodes(inner, registry, layoutRegistry, slot, frameNode.children);
				}
			} else {
				// forwardRef 등 — children + JSX prop 재귀
				const props = child.props as Record<string, unknown>;
				for (const [key, val] of Object.entries(props)) {
					if (key === "children") {
						if (val !== undefined && val !== null) {
							collectNodes(val as ReactNode, registry, layoutRegistry, slot, frameNode.children);
						}
					} else if (isValidElement(val)) {
						collectNodes([val], registry, layoutRegistry, slot, frameNode.children);
					}
				}
			}

			if (frameNode.children.length > 0) out.push(frameNode);
		}
	}
}

function normalizeChildren(children: ReactNode): ReactNode[] {
	if (children === null || children === undefined) return [];
	if (Array.isArray(children)) return children.flat(Infinity) as ReactNode[];
	return [children];
}

function getComponentName(type: unknown): string {
	if (typeof type === "function") {
		return (type as { displayName?: string; name?: string }).displayName
			?? (type as { name?: string }).name
			?? "Unknown";
	}
	// forwardRef — { $$typeof, render, displayName? }
	if (type && typeof type === "object") {
		const t = type as { displayName?: string; render?: { name?: string } };
		return t.displayName ?? t.render?.name ?? "Unknown";
	}
	return "Unknown";
}
