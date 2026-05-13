import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import type { FigmaBridgeProps } from "../../types";
import type { TextFieldState, textFieldVariants } from "./text-field.variants";

type NativeInputProps = Pick<
	ComponentPropsWithoutRef<"input">,
	| "value"
	| "defaultValue"
	| "placeholder"
	| "disabled"
	| "readOnly"
	| "name"
	| "id"
	| "type"
	| "inputMode"
	| "maxLength"
	| "onChange"
	| "onFocus"
	| "onBlur"
	| "className"
>;

export type TextFieldFigmaBridgeProps = FigmaBridgeProps & {
	"data-figma-state"?: string;
	"data-figma-error"?: string;
	"data-figma-label"?: string;
	"data-figma-help-text"?: string;
	"data-figma-button"?: string;
};

export type TextFieldActionButton = {
	label: string;
	onClick?: () => void;
	disabled?: boolean;
};

export type TextFieldProps = NativeInputProps &
	Omit<VariantProps<typeof textFieldVariants>, "button" | "error" | "state"> &
	TextFieldFigmaBridgeProps & {
		state?: TextFieldState;
		error?: boolean;
		label?: string;
		helperText?: string;
		actionButton?: TextFieldActionButton;
	};
