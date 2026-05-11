import type { PageFigmaExportSpec, PageFigmaNodeSpec, PageFigmaSlot } from "./types";

type SDUINodeLike = {
	type: string;
	id: string;
	props?: Record<string, unknown>;
	children?: readonly SDUINodeLike[];
};

type RenderableScreenSpecLike = {
	metadata?: {
		id?: string;
		name?: string;
		route?: string;
		type?: "page" | "bottom-sheet";
	};
	data?: Record<string, unknown>;
	children?: readonly SDUINodeLike[];
};

type CreatePageFigmaExportSpecOptions = {
	registeredComponentIds?: readonly string[];
};

export function createPageFigmaExportSpec(
	renderableSpec: RenderableScreenSpecLike,
	options: CreatePageFigmaExportSpecOptions = {},
): PageFigmaExportSpec {
	const rootNode = renderableSpec.children?.[0] ?? {
		type: "UnknownPage",
		id: "screen.unknown",
		children: [],
	};
	const registeredComponentIds = new Set(options.registeredComponentIds ?? []);

	return {
		$schema: "page-figma-export-v1",
		id: renderableSpec.metadata?.id ?? rootNode.id,
		name: renderableSpec.metadata?.name ?? rootNode.type,
		route: renderableSpec.metadata?.route ?? "/",
		type: renderableSpec.metadata?.type ?? "page",
		data: renderableSpec.data ?? {},
		frame: {
			width: 375,
			height: 812,
			background: "{color.semantic.surface.page.normal}",
			inset: "{spacing.12}",
			gap: "{spacing.4}",
		},
		root: mapNode(rootNode, registeredComponentIds),
	};
}

function mapNode(
	node: SDUINodeLike,
	registeredComponentIds: ReadonlySet<string>,
	slot?: PageFigmaSlot,
): PageFigmaNodeSpec {
	const componentId = toComponentId(node.type);
	const props = normalizeProps(node.props);
	const slotChildren = extractSlotChildren(props, registeredComponentIds);
	const contentChildren =
		node.children?.map((child) => mapNode(child, registeredComponentIds, "content")) ??
		[];

	return {
		id: node.id,
		type: node.type,
		componentId,
		registered: registeredComponentIds.has(componentId),
		slot,
		props: props ? stripNodeProps(props) : undefined,
		children: [...slotChildren, ...contentChildren],
	};
}

function extractSlotChildren(
	props: Record<string, unknown> | undefined,
	registeredComponentIds: ReadonlySet<string>,
): PageFigmaNodeSpec[] {
	if (!props) return [];
	const slots: PageFigmaNodeSpec[] = [];
	for (const slot of ["top", "bottom", "background", "sheet"] as const) {
		const value = props[slot];
		if (isNodeLike(value)) {
			slots.push(mapNode(value, registeredComponentIds, slot));
		}
	}
	return slots;
}

function stripNodeProps(props: Record<string, unknown>) {
	const stripped: Record<string, unknown> = {};
	for (const [key, value] of Object.entries(props)) {
		if (isNodeLike(value)) continue;
		stripped[key] = value;
	}
	return Object.keys(stripped).length ? stripped : undefined;
}

function normalizeProps(props: unknown) {
	return props && typeof props === "object" && !Array.isArray(props)
		? (props as Record<string, unknown>)
		: undefined;
}

function isNodeLike(value: unknown): value is SDUINodeLike {
	return (
		Boolean(value) &&
		typeof value === "object" &&
		!Array.isArray(value) &&
		typeof (value as { type?: unknown }).type === "string" &&
		typeof (value as { id?: unknown }).id === "string"
	);
}

function toComponentId(type: string) {
	return type
		.replace(/([a-z0-9])([A-Z])/g, "$1-$2")
		.replace(/_/g, "-")
		.toLowerCase();
}
