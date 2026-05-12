export type ComponentSpecCategory =
	| "atom"
	| "molecule"
	| "organism"
	| "template"
	| "mol"
	| "ogn"
	| "screen";
export type ComponentSpecLayoutMode = "HORIZONTAL" | "VERTICAL" | "NONE";
export type ComponentSpecSizingMode = "AUTO" | "FIXED" | "HUG" | "FILL";
export type ComponentSpecAlignItems = "MIN" | "CENTER" | "MAX" | "SPACE_BETWEEN";

type ComponentSpecToken = `{${string}}`;
export type ComponentSpecValue = ComponentSpecToken | string | number | null;

export type ComponentSpecLayout = {
	mode?: ComponentSpecLayoutMode;
	primaryAxisSizingMode?: ComponentSpecSizingMode;
	counterAxisSizingMode?: ComponentSpecSizingMode;
	primaryAxisAlignItems?: ComponentSpecAlignItems;
	counterAxisAlignItems?: ComponentSpecAlignItems;
	paddingTop?: ComponentSpecValue;
	paddingBottom?: ComponentSpecValue;
	paddingLeft?: ComponentSpecValue;
	paddingRight?: ComponentSpecValue;
	itemSpacing?: ComponentSpecValue;
	width?: ComponentSpecValue;
	height?: ComponentSpecValue;
	minHeight?: ComponentSpecValue;
};

export type ComponentSpecVisual = {
	cornerRadius?: ComponentSpecValue;
	fill?: ComponentSpecValue;
	stroke?: {
		color?: ComponentSpecValue;
		weight?: ComponentSpecValue;
	};
	shadow?: ComponentSpecValue;
	opacity?: number;
};

type ComponentSpecChildBase = {
	id: string;
	layoutAlign?: string;
	exposeAs?: string;
	visible?: boolean;
	layoutGrow?: number;
	scrollBehavior?: string;
	layoutPositioning?: "ABSOLUTE" | "AUTO";
	x?: number;
	y?: number;
	constraints?: {
		horizontal?: string;
		vertical?: string;
	};
};

export type ComponentSpecTextChild = ComponentSpecChildBase & {
	kind: "text";
	content: string;
	textStyle?: ComponentSpecValue;
	color?: ComponentSpecValue;
	autoResize?: string;
	textDecoration?: string;
	textAlignHorizontal?: string;
};

export type ComponentSpecRefChild = ComponentSpecChildBase & {
	kind: "ref";
	component: string;
	variant?: Record<string, string>;
	props?: Record<string, string | boolean | null>;
};

export type ComponentSpecGroupChild = ComponentSpecChildBase & {
	kind: "group";
	layout?: ComponentSpecLayout;
	visual?: ComponentSpecVisual;
	children?: ComponentSpecChild[];
};

export type ComponentSpecChild =
	| ComponentSpecTextChild
	| ComponentSpecRefChild
	| ComponentSpecGroupChild;

export type ComponentSpecVariantAxis = {
	name: string;
	values: string[];
};

export type ComponentSpecVariantOverride = {
	layout?: ComponentSpecLayout;
	visual?: ComponentSpecVisual;
	children?: ComponentSpecChild[];
	[key: string]: unknown;
};

export type ComponentSpecDraft = {
	$schema: "component-spec-v1";
	name: string;
	category: ComponentSpecCategory;
	description?: string;
	widthFallback?: ComponentSpecValue;
	base: {
		layout?: ComponentSpecLayout;
		visual?: ComponentSpecVisual;
		children?: ComponentSpecChild[];
	};
	variants?: {
		axes: ComponentSpecVariantAxis[];
		overrides?: Record<string, ComponentSpecVariantOverride>;
	};
};

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
