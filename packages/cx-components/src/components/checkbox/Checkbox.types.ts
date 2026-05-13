import type { CheckboxFigmaBridgeProps } from "../../types";

export type { CheckboxFigmaBridgeProps } from "../../types";

export type CheckboxProps = CheckboxFigmaBridgeProps & {
	checked?: boolean;
	disabled?: boolean;
	label?: string;
	value?: string;
	name?: string;
	onCheckedChange?: (checked: boolean) => void;
	className?: string;
};
