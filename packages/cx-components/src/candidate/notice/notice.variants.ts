import { cva } from "class-variance-authority";

export type NoticeTone = "info" | "negative" | "positive" | "cautionary";

export const noticeVariants = cva("notice", {
	variants: {
		tone: {
			info: "notice--info",
			negative: "notice--negative",
			positive: "notice--positive",
			cautionary: "notice--cautionary",
		},
	},
	defaultVariants: {
		tone: "info",
	},
});
