import { cva } from "class-variance-authority";

export type RQRCardPadding = "none" | "md" | "lg";

export const rqrCardVariants = cva("rqr-card", {
	variants: {
		padding: {
			none: "rqr-card--padding-none",
			md: "rqr-card--padding-md",
			lg: "rqr-card--padding-lg",
		},
	},
	defaultVariants: {
		padding: "none",
	},
});
