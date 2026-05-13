import { cva } from "class-variance-authority";

export const checkboxVariants = cva("cx-checkbox", {
	variants: {
		checked: {
			true: "cx-checkbox--checked",
			false: "cx-checkbox--unchecked",
		},
		disabled: {
			true: "cx-checkbox--disabled",
			false: "cx-checkbox--enabled",
		},
		text: {
			true: "cx-checkbox--with-text",
			false: "cx-checkbox--icon-only",
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
