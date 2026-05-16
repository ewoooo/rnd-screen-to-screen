export type FigmaRenderType = "layout" | "slot" | "primitive" | "ignore";

export type FigmaLayoutKind =
	| "chrome"
	| "content"
	| "composition"
	| "overlay"
	| "pattern"
	| "primitive";

export type FigmaLayoutLayer =
	| "screen"
	| "system-header"
	| "app-header"
	| "content"
	| "bottom"
	| "section"
	| "field-stack"
	| "action-area"
	| "overlay"
	| "divider"
	| "slot"
	| "primitive";

export type FigmaLayoutDirection = "vertical" | "horizontal" | "grid";
export type FigmaLayoutAlign = "start" | "center" | "end" | "stretch";
export type FigmaLayoutJustify =
	| "start"
	| "center"
	| "end"
	| "space-between";
export type FigmaLayoutSizing = "fill" | "hug" | "fixed";

export type FigmaLayoutBridgeAttributes = {
	"data-figma-render"?: FigmaRenderType;
	"data-figma-component-id"?: string;
	"data-figma-layout-kind"?: FigmaLayoutKind;
	"data-figma-layout-layer"?: FigmaLayoutLayer;
	"data-figma-layout-slot"?: string;
	"data-figma-layout-auto"?: "true" | "false";
	"data-figma-layout-direction"?: FigmaLayoutDirection;
	"data-figma-layout-align"?: FigmaLayoutAlign;
	"data-figma-layout-justify"?: FigmaLayoutJustify;
	"data-figma-layout-gap"?: string;
	"data-figma-layout-padding"?: string;
	"data-figma-layout-sizing"?: FigmaLayoutSizing;
	[key: `data-figma-property-${string}`]: string | undefined;
};
