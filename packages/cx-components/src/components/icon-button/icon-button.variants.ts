import { cva } from "class-variance-authority";

export const iconButtonVariants = cva("icon-button", {
	variants: {
		size: {
			small: "icon-button--small",
			medium: "icon-button--medium",
		},
		variant: {
			plain: "icon-button--plain",
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
