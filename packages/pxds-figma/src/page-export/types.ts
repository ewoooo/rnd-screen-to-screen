export type PageFigmaSlot = "top" | "content" | "bottom" | "background" | "sheet";

export type PageFigmaNodeSpec = {
	id: string;
	type: string;
	componentId: string;
	registered: boolean;
	slot?: PageFigmaSlot;
	section?: Record<string, unknown>;
	props?: Record<string, unknown>;
	children?: readonly PageFigmaNodeSpec[];
};

export type PageFigmaExportSpec = {
	$schema: "page-figma-export-v1";
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
	root: PageFigmaNodeSpec;
};
