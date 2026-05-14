import { cva } from "class-variance-authority";

export const listTextVariants = cva("list-text", {
	variants: {
		table: {
			off: "list-text--table-off",
			on: "list-text--table-on",
		},
		rightItem: {
			false: "list-text--right-item-off",
			true: "list-text--right-item-on",
		},
	},
	defaultVariants: {
		table: "off",
		rightItem: true,
	},
});

export type ListTextTable = NonNullable<
	NonNullable<Parameters<typeof listTextVariants>[0]>["table"]
>;

export type ListTextRightItemPresence = NonNullable<
	NonNullable<Parameters<typeof listTextVariants>[0]>["rightItem"]
>;
