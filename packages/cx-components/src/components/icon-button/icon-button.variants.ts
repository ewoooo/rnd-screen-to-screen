import { cva } from "class-variance-authority";

export const iconButtonVariants = cva("cx-icon-button", {
	variants: {
		size: {
			small: "cx-icon-button--small",
			medium: "cx-icon-button--medium",
		},
		variant: {
			plain: "cx-icon-button--plain",
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "plain",
	},
});

export type IconButtonSize = NonNullable<
	Parameters<typeof iconButtonVariants>[0]
>["size"];
export type IconButtonVariant = NonNullable<
	Parameters<typeof iconButtonVariants>[0]
>["variant"];
