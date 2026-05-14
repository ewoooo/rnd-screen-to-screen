import { cva } from "class-variance-authority";

export const titleSectionRightItemVariants = cva("cx-title-section-right-item", {
	variants: {
		type: {
			icon: "cx-title-section-right-item--icon",
			textButton: "cx-title-section-right-item--text-button",
			textItemButton: "cx-title-section-right-item--text-item-button",
			buttonListOrder: "cx-title-section-right-item--button-list-order",
		},
	},
	defaultVariants: {
		type: "icon",
	},
});

export type TitleSectionRightItemType = NonNullable<
	Parameters<typeof titleSectionRightItemVariants>[0]
>["type"];
