import { isValidElement, type ReactElement, type ReactNode, type ComponentType } from "react";
import { AppScreen } from "@pxds/pxds-layout/app-screen";

export type FigmaSlot = "top" | "content" | "bottom";

export type FigmaNode = {
	figmaName: string;
	slot: FigmaSlot;
	props: Record<string, unknown>;
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
	mapProps?: (props: Record<string, unknown>) => Record<string, unknown>;
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
			out.push({ figmaName: entry.figmaName, slot, props: mappedProps });
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
