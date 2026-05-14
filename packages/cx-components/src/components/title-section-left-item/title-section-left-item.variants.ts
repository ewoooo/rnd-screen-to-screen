import { cva } from "class-variance-authority";

export type TitleSectionLeftItemType = "text" | "icon" | "badge";

export const titleSectionLeftItemVariants = cva("cx-title-section-left-item", {
	variants: {
		type: {
			text: "cx-title-section-left-item--text",
			icon: "cx-title-section-left-item--icon",
			badge: "cx-title-section-left-item--badge",
		},
	},
	defaultVariants: {
		type: "text",
	},
});
