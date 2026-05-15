export type FigmaBridgeRenderMode =
	| "component"
	| "layout"
	| "slot"
	| "primitive";

export type FigmaBridgeBounds = {
	x: number;
	y: number;
	width: number;
	height: number;
};

export type FigmaBridgeNodeStyle = {
	display?: string;
	flexDirection?: string;
	gap?: string;
	paddingTop?: string;
	paddingRight?: string;
	paddingBottom?: string;
	paddingLeft?: string;
	backgroundColor?: string;
	color?: string;
	borderRadius?: string;
	fontSize?: string;
	fontWeight?: string;
	lineHeight?: string;
};

export type FigmaBridgeNode = {
	id: string;
	render: FigmaBridgeRenderMode;
	componentId?: string;
	slot?: string;
	properties?: Record<string, string | number | boolean | null>;
	text?: string;
	bounds: FigmaBridgeBounds;
	localBounds: FigmaBridgeBounds;
	style?: FigmaBridgeNodeStyle;
	children?: FigmaBridgeNode[];
};

export type FigmaBridgeRenderTree = {
	$schema: "pxds-figma-bridge-render-tree-v1";
	source: {
		url: string;
		route?: string;
		capturedAt: string;
		viewport: {
			width: number;
			height: number;
		};
	};
	screen: {
		id: string;
		name: string;
		route: string;
	};
	root: FigmaBridgeNode;
	stats: {
		nodeCount: number;
		componentCount: number;
		layoutCount: number;
		slotCount: number;
		primitiveCount: number;
	};
};

export type CollectFigmaBridgeRenderTreeOptions = {
	screenId: string;
	screenName: string;
	route: string;
	rootId?: string;
};
