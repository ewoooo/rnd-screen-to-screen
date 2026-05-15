import { cva } from "class-variance-authority";

export const listTextRightItemVariants = cva("list-text-right-item", {
	variants: {
		type: {
			text: "list-text-right-item--text",
			badgeLevel: "list-text-right-item--badge-level",
			textButton: "list-text-right-item--text-button",
			icon: "list-text-right-item--icon",
		},
	},
	defaultVariants: {
		type: "text",
	},
});

export type ListTextRightItemType = NonNullable<
	NonNullable<Parameters<typeof listTextRightItemVariants>[0]>["type"]
>;

export type ListTextRightItemFigmaType =
	| "Text"
	| "BadgeLevel"
	| "TextButton"
	| "Icon";
