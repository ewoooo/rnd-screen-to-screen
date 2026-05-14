import { cva } from "class-variance-authority";

export const tabItemVariants = cva("tab-item", {
	variants: {
		state: {
			default: "tab-item--default",
			selected: "tab-item--selected",
		},
	},
	defaultVariants: {
		state: "default",
	},
});

export type TabItemState = NonNullable<
	Parameters<typeof tabItemVariants>[0]
>["state"];
