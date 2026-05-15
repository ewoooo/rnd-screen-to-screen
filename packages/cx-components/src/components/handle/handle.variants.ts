import { cva } from "class-variance-authority";

export const handleVariants = cva("handle", {
	variants: {
		state: {
			default: "handle--default",
			off: "handle--off",
		},
	},
	defaultVariants: {
		state: "default",
	},
});

export type HandleState = NonNullable<
	Parameters<typeof handleVariants>[0]
>["state"];
