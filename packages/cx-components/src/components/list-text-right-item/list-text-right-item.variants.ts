import { cva } from "class-variance-authority";

export const listTextRightItemVariants = cva("cx-list-text-right-item", {
	variants: {
		type: {
			text: "cx-list-text-right-item--text",
			badgeLevel: "cx-list-text-right-item--badge-level",
			textButton: "cx-list-text-right-item--text-button",
			icon: "cx-list-text-right-item--icon",
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
