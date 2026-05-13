import { cva } from "class-variance-authority";

export type BadgeType = "gray" | "black" | "blue";

export const badgeVariants = cva("cx-badge", {
	variants: {
		type: {
			gray: "cx-badge--gray",
			black: "cx-badge--black",
			blue: "cx-badge--blue",
		},
	},
	defaultVariants: {
		type: "gray",
	},
});
