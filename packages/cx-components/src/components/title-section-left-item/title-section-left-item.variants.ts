import { cva } from "class-variance-authority";

export type TitleSectionLeftItemType = "text" | "icon" | "badge";

export const titleSectionLeftItemVariants = cva("title-section-left-item", {
	variants: {
		type: {
			text: "title-section-left-item--text",
			icon: "title-section-left-item--icon",
			badge: "title-section-left-item--badge",
		},
	},
	defaultVariants: {
		type: "text",
	},
});
