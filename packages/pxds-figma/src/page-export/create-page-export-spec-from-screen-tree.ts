import type { PageFigmaExportSpec, PageFigmaNodeSpec } from "./types";

type ScreenExportTreeLike = {
	$schema?: string;
	route?: string;
	root?: ScreenExportNodeLike | null;
};

type ScreenExportNodeLike = {
	id: string;
	type: string;
	slot?: string;
	props?: Record<string, unknown>;
	bounds?: {
		x: number;
		y: number;
		width: number;
		height: number;
	};
	localBounds?: {
		x: number;
		y: number;
		width: number;
		height: number;
	};
	style?: Record<string, unknown>;
	text?: string;
	children?: readonly ScreenExportNodeLike[];
};

type CreatePageFigmaExportSpecFromScreenTreeOptions = {
	id: string;
	name: string;
	route: string;
	registeredComponentIds?: readonly string[];
};

export function createPageFigmaExportSpecFromScreenTree(
	tree: ScreenExportTreeLike,
	options: CreatePageFigmaExportSpecFromScreenTreeOptions,
): PageFigmaExportSpec {
	const registeredComponentIds = new Set(options.registeredComponentIds ?? []);
	const root = tree.root ?? {
		id: "screen-tree.empty",
		type: "EmptyScreenTree",
		children: [],
	};

	return {
		$schema: "page-figma-export-v1",
		id: options.id,
		name: options.name,
		route: options.route,
		type: "page",
		data: {
			source: "screen-tree",
			route: tree.route ?? options.route,
		},
		frame: {
			width: 375,
			height: 812,
			background: "{color.semantic.surface.page.normal}",
			inset: "{spacing.12}",
			gap: "{spacing.4}",
		},
		root: mapScreenTreeNode(root, registeredComponentIds),
	};
}

function mapScreenTreeNode(
	node: ScreenExportNodeLike,
	registeredComponentIds: ReadonlySet<string>,
): PageFigmaNodeSpec {
	const componentId = toComponentId(node.type);
	const props = {
		...(node.props ?? {}),
		exportSource: "screen-tree",
		bounds: node.bounds,
		localBounds: node.localBounds,
		style: node.style,
		text: node.text,
	};

	return {
		id: node.id,
		type: node.type,
		componentId,
		registered: registeredComponentIds.has(componentId),
		slot: normalizeSlot(node.slot),
		props,
		children:
			node.children?.map((child) =>
				mapScreenTreeNode(child, registeredComponentIds),
			) ?? [],
	};
}

function normalizeSlot(slot: string | undefined) {
	if (
		slot === "top" ||
		slot === "content" ||
		slot === "bottom" ||
		slot === "background" ||
		slot === "sheet"
	) {
		return slot;
	}
	return undefined;
}

function toComponentId(type: string) {
	return type
		.replace(/([a-z0-9])([A-Z])/g, "$1-$2")
		.replace(/_/g, "-")
		.toLowerCase();
}
