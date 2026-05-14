import { cva } from "class-variance-authority";

export const chipItemVariants = cva("cx-chip-item", {
	variants: {
		selected: {
			true: "cx-chip-item--selected",
			false: "cx-chip-item--unselected",
		},
	},
	defaultVariants: {
		selected: false,
	},
});

export type ChipItemSelected = NonNullable<
	Parameters<typeof chipItemVariants>[0]
>["selected"];
