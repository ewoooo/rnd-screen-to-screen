import { cva } from "class-variance-authority";

export const titleSectionRightItemVariants = cva("title-section-right-item", {
	variants: {
		type: {
			icon: "title-section-right-item--icon",
			textButton: "title-section-right-item--text-button",
			textItemButton: "title-section-right-item--text-item-button",
			buttonListOrder: "title-section-right-item--button-list-order",
		},
	},
	defaultVariants: {
		type: "icon",
	},
});

export type TitleSectionRightItemType = NonNullable<
	Parameters<typeof titleSectionRightItemVariants>[0]
>["type"];
