import { cva } from "class-variance-authority";

export const tabItemVariants = cva("cx-tab-item", {
	variants: {
		state: {
			default: "cx-tab-item--default",
			selected: "cx-tab-item--selected",
		},
	},
	defaultVariants: {
		state: "default",
	},
});

export type TabItemState = NonNullable<
	Parameters<typeof tabItemVariants>[0]
>["state"];
