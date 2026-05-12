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
	const rootNode = normalizeScreenRoot(root, registeredComponentIds);

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
		root: rootNode,
	};
}

function normalizeScreenRoot(
	root: ScreenExportNodeLike,
	registeredComponentIds: ReadonlySet<string>,
): PageFigmaNodeSpec {
	return {
		id: root.id,
		type: "AppScreen",
		componentId: "app-screen",
		registered: registeredComponentIds.has("app-screen"),
		props: {
			exportSource: "screen-tree",
			bounds: root.bounds,
			localBounds: root.localBounds,
		},
		children: collectScreenTreeChildren(root, registeredComponentIds),
	};
}

function collectScreenTreeChildren(
	node: ScreenExportNodeLike,
	registeredComponentIds: ReadonlySet<string>,
	inheritedSlot?: PageFigmaNodeSpec["slot"],
): PageFigmaNodeSpec[] {
	const slot = normalizeSlot(node.slot) ?? inheritedSlot;

	if (isLayoutOnlyNode(node)) {
		return (
			node.children?.flatMap((child) =>
				collectScreenTreeChildren(child, registeredComponentIds, slot),
			) ?? []
		);
	}

	return [mapScreenTreeNode(node, registeredComponentIds, slot)];
}

function mapScreenTreeNode(
	node: ScreenExportNodeLike,
	registeredComponentIds: ReadonlySet<string>,
	slot?: PageFigmaNodeSpec["slot"],
): PageFigmaNodeSpec {
	const componentId =
		typeof node.props?.componentId === "string"
			? node.props.componentId
			: toComponentId(node.type);
	const props = {
		...stripInternalProps(node.props),
		exportSource: "screen-tree",
		bounds: node.bounds,
		localBounds: node.localBounds,
		style: node.style,
		text: node.text,
	};
	const isRegisteredComponent = registeredComponentIds.has(componentId);
	const isLayoutPrimitive = isLayoutPrimitiveNode(node);

	return {
		id: node.id,
		type: node.type,
		componentId,
		registered: isRegisteredComponent,
		slot: slot ?? normalizeSlot(node.slot),
		props,
		children: isRegisteredComponent && !isLayoutPrimitive
			? []
			: (node.children?.flatMap((child) =>
					collectScreenTreeChildren(child, registeredComponentIds),
				) ?? []),
	};
}

function normalizeSlot(slot: string | undefined) {
	if (slot === "header") return "top";
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

function isLayoutOnlyNode(node: ScreenExportNodeLike) {
	return (
		node.type === "AppScreenRoot" ||
		node.type === "AppScreenContent" ||
		node.type === "AppScreenChromeSlot" ||
		node.type === "ContentOutlet" ||
		node.type === "ContentList" ||
		node.type === "ContentSection" ||
		node.type === "ContentRail"
	);
}

function isLayoutPrimitiveNode(node: ScreenExportNodeLike) {
	return node.type === "Flex" || node.type === "HStack" || node.type === "VStack";
}

function stripInternalProps(props: Record<string, unknown> | undefined) {
	if (!props) return {};
	const { componentId: _componentId, ...rest } = props;
	return rest;
}

function toComponentId(type: string) {
	return type
		.replace(/([a-z0-9])([A-Z])/g, "$1-$2")
		.replace(/_/g, "-")
		.toLowerCase();
}
