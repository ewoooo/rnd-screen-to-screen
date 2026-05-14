import { cva } from "class-variance-authority";

export type TooltipBubbleDirection = "left" | "center" | "right";

export const tooltipBubbleVariants = cva("tooltip-bubble", {
	variants: {
		direction: {
			left: "tooltip-bubble--left",
			center: "tooltip-bubble--center",
			right: "tooltip-bubble--right",
		},
	},
	defaultVariants: {
		direction: "left",
	},
});
