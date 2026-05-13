export type FigmaRenderType =
	| "component"
	| "layout"
	| "slot"
	| "primitive"
	| "ignore";

export type FigmaStackDirection = "vertical" | "horizontal";

export type FigmaBridgeAttributes = {
	"data-figma-render"?: FigmaRenderType;
	"data-figma-component-id"?: string;
	[key: `data-figma-property-${string}`]: string | undefined;
};

export type AppBarFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-left-item"?: "true" | "false";
	"data-figma-property-right-item"?: "true" | "false";
	"data-figma-property-title"?: "true" | "false";
	"data-figma-property-logo"?: "true" | "false";
};

export type BadgeFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-type"?: string;
};

export type ButtonFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-variant"?: string;
	"data-figma-property-size"?: string;
};

export type CheckboxFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-checked"?: "true" | "false";
	"data-figma-property-text"?: "true" | "false";
	"data-figma-property-disabled"?: "true" | "false";
};

export type DividerFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-variant"?: string;
	"data-figma-property-orientation"?: string;
};

export type IconButtonFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-size"?: string;
	"data-figma-property-variant"?: string;
	"data-figma-property-disabled"?: "true" | "false";
};

export type RadioButtonFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-checked"?: "true" | "false";
	"data-figma-property-text"?: "true" | "false";
	"data-figma-property-disabled"?: "true" | "false";
};

export type TextFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-variant"?: string;
};

export type TextFieldFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-state"?: string;
	"data-figma-property-error"?: "true" | "false";
	"data-figma-property-label"?: "true" | "false";
	"data-figma-property-help-text"?: "true" | "false";
	"data-figma-property-button"?: "true" | "false";
};

export type TitleSectionFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-sub-title"?: "true" | "false";
	"data-figma-property-left-item"?: "true" | "false";
	"data-figma-property-right-item"?: "true" | "false";
};

export type TooltipBubbleFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-direction"?: string;
};
