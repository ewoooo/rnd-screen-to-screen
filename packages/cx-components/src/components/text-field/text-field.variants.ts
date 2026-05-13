import { cva } from "class-variance-authority";

export type TextFieldState =
	| "default"
	| "focused"
	| "typing"
	| "typed"
	| "disabled";

export const textFieldVariants = cva("cx-text-field", {
	variants: {
		state: {
			default: "cx-text-field--default",
			focused: "cx-text-field--focused",
			typing: "cx-text-field--typing",
			typed: "cx-text-field--typed",
			disabled: "cx-text-field--disabled",
		},
		error: {
			true: "cx-text-field--error",
			false: null,
		},
		button: {
			on: "cx-text-field--button-on",
			off: "cx-text-field--button-off",
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
