import { cva } from "class-variance-authority";

export type TooltipDirection = "left" | "center" | "right";

export const tooltipVariants = cva("tooltip", {
	variants: {
		direction: {
			left: "tooltip--left",
			center: "tooltip--center",
			right: "tooltip--right",
		},
	},
	defaultVariants: {
		direction: "left",
	},
});
