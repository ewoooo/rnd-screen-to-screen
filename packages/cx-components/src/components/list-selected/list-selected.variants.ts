import { cva } from "class-variance-authority";

export const listSelectedVariants = cva("list-selected", {
	variants: {
		type: {
			radio: "list-selected--radio",
			checkbox: "list-selected--checkbox",
		},
		rightItem: {
			false: "list-selected--right-item-off",
			true: "list-selected--right-item-on",
		},
		subText: {
			false: "list-selected--sub-text-off",
			true: "list-selected--sub-text-on",
		},
	},
	defaultVariants: {
		type: "radio",
		rightItem: true,
		subText: false,
	},
});

export type ListSelectedType = NonNullable<
	Parameters<typeof listSelectedVariants>[0]
>["type"];

export type ListSelectedRightItemPresence = NonNullable<
	Parameters<typeof listSelectedVariants>[0]
>["rightItem"];

export type ListSelectedSubTextPresence = NonNullable<
	Parameters<typeof listSelectedVariants>[0]
>["subText"];
