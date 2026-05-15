import { cva } from "class-variance-authority";

export const radioButtonVariants = cva("radio-button", {
	variants: {
		checked: {
			true: "radio-button--checked",
			false: "radio-button--unchecked",
		},
		disabled: {
			true: "radio-button--disabled",
			false: "radio-button--enabled",
		},
		text: {
			true: "radio-button--with-text",
			false: "radio-button--icon-only",
		},
	},
	defaultVariants: {
		checked: false,
		disabled: false,
		text: false,
	},
});

export type RadioButtonChecked = NonNullable<
	Parameters<typeof radioButtonVariants>[0]
>["checked"];
export type RadioButtonDisabled = NonNullable<
	Parameters<typeof radioButtonVariants>[0]
>["disabled"];
export type RadioButtonText = NonNullable<
	Parameters<typeof radioButtonVariants>[0]
>["text"];
