export type ScreenExportBounds = {
	x: number;
	y: number;
	width: number;
	height: number;
};

export type ScreenExportStyle = {
	display?: string;
	flexDirection?: string;
	gap?: string;
	backgroundColor?: string;
	color?: string;
	borderRadius?: string;
};

export type ScreenExportNode = {
	id: string;
	type: string;
	slot?: string;
	props?: Record<string, unknown>;
	bounds?: ScreenExportBounds;
	localBounds?: ScreenExportBounds;
	style?: ScreenExportStyle;
	text?: string;
	children: ScreenExportNode[];
};

export type ScreenExportTree = {
	$schema: "pxds-screen-export-tree-v1";
	route: string;
	capturedAt: string;
	viewport: {
		width: number;
		height: number;
	};
	root: ScreenExportNode | null;
};
