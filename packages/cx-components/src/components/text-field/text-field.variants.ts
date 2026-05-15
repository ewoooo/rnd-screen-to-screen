import { cva } from "class-variance-authority";

export type TextFieldState =
	| "default"
	| "focused"
	| "typing"
	| "typed"
	| "disabled";

export const textFieldVariants = cva("text-field", {
	variants: {
		state: {
			default: "text-field--default",
			focused: "text-field--focused",
			typing: "text-field--typing",
			typed: "text-field--typed",
			disabled: "text-field--disabled",
		},
		error: {
			true: "text-field--error",
			false: null,
		},
		button: {
			on: "text-field--button-on",
			off: "text-field--button-off",
		},
	},
	defaultVariants: {
		state: "default",
		error: false,
		button: "off",
	},
});

export type TextFieldButtonVariant = NonNullable<
	Parameters<typeof textFieldVariants>[0]
>["button"];
