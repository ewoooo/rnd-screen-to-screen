import { cva } from "class-variance-authority";

export const checkboxVariants = cva("checkbox", {
	variants: {
		checked: {
			true: "checkbox--checked",
			false: "checkbox--unchecked",
		},
		disabled: {
			true: "checkbox--disabled",
			false: "checkbox--enabled",
		},
		text: {
			true: "checkbox--with-text",
			false: "checkbox--icon-only",
		},
	},
	defaultVariants: {
		checked: false,
		disabled: false,
		text: false,
	},
});

export type CheckboxChecked = NonNullable<
	Parameters<typeof checkboxVariants>[0]
>["checked"];
export type CheckboxDisabled = NonNullable<
	Parameters<typeof checkboxVariants>[0]
>["disabled"];
export type CheckboxText = NonNullable<
	Parameters<typeof checkboxVariants>[0]
>["text"];
