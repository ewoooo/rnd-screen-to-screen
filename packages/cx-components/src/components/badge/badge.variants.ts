import { cva } from "class-variance-authority";

export type BadgeType = "gray" | "black" | "blue";

export const badgeVariants = cva("badge", {
	variants: {
		type: {
			gray: "badge--gray",
			black: "badge--black",
			blue: "badge--blue",
		},
	},
	defaultVariants: {
		type: "gray",
	},
});
