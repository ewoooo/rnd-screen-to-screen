import { cva } from "class-variance-authority";

export const radioButtonVariants = cva("cx-radio-button", {
	variants: {
		checked: {
			true: "cx-radio-button--checked",
			false: "cx-radio-button--unchecked",
		},
		disabled: {
			true: "cx-radio-button--disabled",
			false: "cx-radio-button--enabled",
		},
		text: {
			true: "cx-radio-button--with-text",
			false: "cx-radio-button--icon-only",
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
