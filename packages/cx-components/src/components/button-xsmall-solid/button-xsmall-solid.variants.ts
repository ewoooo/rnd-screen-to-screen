import { cva } from "class-variance-authority";

export const buttonXsmallSolidVariants = cva("cx-button-xsmall-solid", {
	variants: {
		state: {
			active: "cx-button-xsmall-solid--active",
			disabled: "cx-button-xsmall-solid--disabled",
		},
	},
	defaultVariants: {
		state: "active",
	},
});

export type ButtonXsmallSolidState = NonNullable<
	Parameters<typeof buttonXsmallSolidVariants>[0]
>["state"];
