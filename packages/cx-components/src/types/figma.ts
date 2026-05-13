export type FigmaBridgeProps = {
	"data-node-kind"?: string;
	"data-component-id"?: string;
	"data-figma-component"?: string;
	"data-figma-variant"?: string;
};

export type FigmaBridgeSizeProps = FigmaBridgeProps & {
	"data-figma-size"?: string;
};
