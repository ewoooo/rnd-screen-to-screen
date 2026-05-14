import { cva } from "class-variance-authority";

export const chipItemVariants = cva("chip-item", {
	variants: {
		selected: {
			true: "chip-item--selected",
			false: "chip-item--unselected",
		},
	},
	defaultVariants: {
		selected: false,
	},
});

export type ChipItemSelected = NonNullable<
	Parameters<typeof chipItemVariants>[0]
>["selected"];
