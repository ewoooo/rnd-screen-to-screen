import { cva } from "class-variance-authority";

export type RQRNoticeTone = "info" | "negative" | "positive" | "cautionary";

export const rqrNoticeVariants = cva("rqr-notice", {
	variants: {
		tone: {
			info: "rqr-notice--info",
			negative: "rqr-notice--negative",
			positive: "rqr-notice--positive",
			cautionary: "rqr-notice--cautionary",
		},
	},
	defaultVariants: {
		tone: "info",
	},
});
