export type ScreenFigmaSlot = "top" | "content" | "bottom" | "background" | "sheet";

export type ScreenFigmaNodeSpec = {
	id: string;
	type: string;
	componentId: string;
	registered: boolean;
	slot?: ScreenFigmaSlot;
	section?: Record<string, unknown>;
	props?: Record<string, unknown>;
	children?: readonly ScreenFigmaNodeSpec[];
};

export type ScreenFigmaExportSpec = {
	$schema: "screen-figma-export-v1";
	id: string;
	name: string;
	route: string;
	type: "page" | "bottom-sheet";
	data: Record<string, unknown>;
	frame: {
		width: number;
		height: number;
		background: string;
		inset: string;
		gap: string;
	};
	root: ScreenFigmaNodeSpec;
};
