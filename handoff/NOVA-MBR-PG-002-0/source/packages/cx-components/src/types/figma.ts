export type FigmaBridgeProps = {
	"data-node-kind"?: string;
	"data-component-id"?: string;
	"data-figma-component"?: string;
	"data-figma-variant"?: string;
};

export type FigmaBridgeSizeProps = FigmaBridgeProps & {
	"data-figma-size"?: string;
};

export type AppBarFigmaBridgeProps = Omit<
	FigmaBridgeProps,
	"data-component-id" | "data-figma-variant"
> & {
	"data-component-id"?: string;
	"data-figma-property-left-item"?: "true" | "false";
	"data-figma-property-right-item"?: "true" | "false";
	"data-figma-property-title"?: "true" | "false";
	"data-figma-property-logo"?: "true" | "false";
};

export type BadgeFigmaBridgeProps = FigmaBridgeProps & {
	"data-figma-type"?: string;
};

export type ButtonFigmaBridgeProps = FigmaBridgeSizeProps;

export type CheckboxFigmaBridgeProps = Omit<
	FigmaBridgeProps,
	"data-component-id" | "data-figma-variant"
> & {
	"data-component-id"?: string;
	"data-figma-checked"?: string;
	"data-figma-text"?: string;
	"data-figma-disabled"?: string;
};

export type DividerFigmaBridgeProps = FigmaBridgeProps;

export type IconButtonFigmaBridgeProps = Omit<
	FigmaBridgeProps,
	"data-component-id" | "data-figma-component" | "data-figma-variant"
> & {
	"data-component-id"?: string;
};

export type RadioButtonFigmaBridgeProps = Omit<
	FigmaBridgeProps,
	"data-component-id" | "data-figma-variant"
> & {
	"data-component-id"?: string;
	"data-figma-checked"?: string;
	"data-figma-text"?: string;
	"data-figma-disabled"?: string;
};

export type TextFigmaBridgeProps = FigmaBridgeProps;

export type TextFieldFigmaBridgeProps = FigmaBridgeProps & {
	"data-figma-state"?: string;
	"data-figma-error"?: string;
	"data-figma-label"?: string;
	"data-figma-help-text"?: string;
	"data-figma-button"?: string;
};

export type TitleSectionFigmaBridgeProps = Omit<
	FigmaBridgeProps,
	"data-component-id" | "data-figma-component" | "data-figma-variant"
> & {
	"data-component-id"?: string;
	"data-figma-component"?: string;
	"data-figma-left-item"?: string;
	"data-figma-right-item"?: string;
	"data-figma-title-sub-text"?: string;
	"data-figma-title-sub-image"?: string;
	"data-figma-sub-text"?: string;
};
