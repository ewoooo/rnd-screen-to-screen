import { cva } from "class-variance-authority";

export const handleVariants = cva("cx-handle", {
	variants: {
		state: {
			default: "cx-handle--default",
			off: "cx-handle--off",
		},
	},
	defaultVariants: {
		state: "default",
	},
});

export type HandleState = NonNullable<
	Parameters<typeof handleVariants>[0]
>["state"];
