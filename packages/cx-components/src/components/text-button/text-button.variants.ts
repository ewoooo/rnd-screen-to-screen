import { cva } from "class-variance-authority";

export const textButtonVariants = cva("text-button", {
	variants: {
		variant: {
			default: "text-button--default",
			paired: "text-button--paired",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

export type TextButtonVariant = NonNullable<
	Parameters<typeof textButtonVariants>[0]
>["variant"];
