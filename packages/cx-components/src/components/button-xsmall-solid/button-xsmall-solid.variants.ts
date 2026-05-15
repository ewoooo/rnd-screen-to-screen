import { cva } from "class-variance-authority";

export const buttonXsmallSolidVariants = cva("button-xsmall-solid", {
	variants: {
		state: {
			active: "button-xsmall-solid--active",
			disabled: "button-xsmall-solid--disabled",
		},
	},
	defaultVariants: {
		state: "active",
	},
});

export type ButtonXsmallSolidState = NonNullable<
	Parameters<typeof buttonXsmallSolidVariants>[0]
>["state"];
