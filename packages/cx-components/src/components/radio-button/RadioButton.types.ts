import type { FigmaBridgeProps } from "../../types";

export type RadioButtonFigmaBridgeProps = Omit<
	FigmaBridgeProps,
	"data-component-id" | "data-figma-variant"
> & {
	"data-component-id"?: string;
	"data-figma-checked"?: string;
	"data-figma-text"?: string;
	"data-figma-disabled"?: string;
};

export type RadioButtonProps = RadioButtonFigmaBridgeProps & {
	checked?: boolean;
	disabled?: boolean;
	label?: string;
	value?: string;
	name?: string;
	onCheckedChange?: (checked: boolean) => void;
	className?: string;
};
