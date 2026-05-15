import { cva } from "class-variance-authority";

export const buttonVariants = cva("button", {
	variants: {
		variant: {
			primary: "button--primary",
			secondary: "button--secondary",
			disabled: "button--disabled",
		},
		size: {
			small: "button--small",
			medium: "button--medium",
			large: "button--large",
			xlarge: "button--xlarge",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "medium",
	},
});

export type ButtonVariant = NonNullable<
	Parameters<typeof buttonVariants>[0]
>["variant"];
export type ButtonSize = NonNullable<Parameters<typeof buttonVariants>[0]>["size"];
