import { cva } from "class-variance-authority";

export type TooltipBubbleDirection = "left" | "center" | "right";

export const tooltipBubbleVariants = cva("cx-tooltip-bubble", {
	variants: {
		direction: {
			left: "cx-tooltip-bubble--left",
			center: "cx-tooltip-bubble--center",
			right: "cx-tooltip-bubble--right",
		},
	},
	defaultVariants: {
		direction: "left",
	},
});
