import type { SchemaValue } from "./render.schema";

export type FigmaComponentCategory =
	| "atom"
	| "molecule"
	| "organism"
	| "template"
	| "mol"
	| "ogn"
	| "page";

export type FigmaValue = `{${string}}` | string | number | null;

export type FigmaLayout = {
	mode?: "HORIZONTAL" | "VERTICAL" | "NONE";
	primaryAxisSizingMode?: "AUTO" | "FIXED" | "HUG" | "FILL";
	counterAxisSizingMode?: "AUTO" | "FIXED" | "HUG" | "FILL";
	primaryAxisAlignItems?: "MIN" | "CENTER" | "MAX" | "SPACE_BETWEEN";
	counterAxisAlignItems?: "MIN" | "CENTER" | "MAX" | "SPACE_BETWEEN";
	paddingTop?: FigmaValue;
	paddingBottom?: FigmaValue;
	paddingLeft?: FigmaValue;
	paddingRight?: FigmaValue;
	itemSpacing?: FigmaValue;
	width?: FigmaValue;
	height?: FigmaValue;
	minHeight?: FigmaValue;
};

export type FigmaVisual = {
	cornerRadius?: FigmaValue;
	fill?: FigmaValue;
	stroke?: {
		color?: FigmaValue;
		weight?: FigmaValue;
	};
	shadow?: FigmaValue;
	opacity?: number;
};

export type FigmaTextChild = FigmaChildBase & {
	kind: "text";
	content: string;
	textStyle?: FigmaValue;
	color?: FigmaValue;
	autoResize?: string;
	textDecoration?: string;
	textAlignHorizontal?: string;
};

export type FigmaRefChild = FigmaChildBase & {
	kind: "ref";
	component: string;
	variant?: Record<string, string>;
	props?: Record<string, string | boolean | null>;
};

export type FigmaGroupChild = FigmaChildBase & {
	kind: "group";
	layout?: FigmaLayout;
	visual?: FigmaVisual;
	children?: FigmaChild[];
};

export type FigmaChild =
	| FigmaTextChild
	| FigmaRefChild
	| FigmaGroupChild;

export type FigmaComponentSpec = {
	$schema: "figma-component-v1";
	name: string;
	category: FigmaComponentCategory;
	description?: string;
	widthFallback?: FigmaValue;
	base: {
		layout?: FigmaLayout;
		visual?: FigmaVisual;
		children?: FigmaChild[];
	};
	variants?: {
		axes: readonly {
			name: string;
			values: readonly string[];
		}[];
		overrides?: Record<
			string,
			{
				layout?: FigmaLayout;
				visual?: FigmaVisual;
				children?: FigmaChild[];
				[key: string]: unknown;
			}
		>;
	};
};

export type FigmaInstanceContract = {
	$schema: "figma-instance-v1";
	componentId: string;
	target: "figma";
	instanceName: string;
	props?: Readonly<Record<string, SchemaValue>>;
	tokens?: readonly string[];
};

type FigmaChildBase = {
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

export function defineFigmaComponent<T extends FigmaComponentSpec>(
	spec: T,
): T {
	return spec;
}

export function defineFigmaInstance<T extends FigmaInstanceContract>(
	contract: T,
): T {
	return contract;
}
