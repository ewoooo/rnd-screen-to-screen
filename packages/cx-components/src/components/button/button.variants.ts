import { cva } from "class-variance-authority";

export const buttonVariants = cva("cx-button", {
	variants: {
		variant: {
			primary: "cx-button--primary",
			secondary: "cx-button--secondary",
			disabled: "cx-button--disabled",
		},
		size: {
			small: "cx-button--small",
			medium: "cx-button--medium",
			large: "cx-button--large",
			xlarge: "cx-button--xlarge",
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
