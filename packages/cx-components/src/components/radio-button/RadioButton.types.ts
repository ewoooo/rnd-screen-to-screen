import type { RadioButtonFigmaBridgeProps } from "../../types";

export type { RadioButtonFigmaBridgeProps } from "../../types";

export type RadioButtonProps = RadioButtonFigmaBridgeProps & {
	checked?: boolean;
	disabled?: boolean;
	label?: string;
	value?: string;
	name?: string;
	onCheckedChange?: (checked: boolean) => void;
	className?: string;
};
