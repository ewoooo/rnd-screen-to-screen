import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { TooltipBubbleFigmaBridgeProps } from "../../types";
import type {
	TooltipBubbleDirection,
	tooltipBubbleVariants,
} from "./tooltip-bubble.variants";

export type { TooltipBubbleFigmaBridgeProps } from "../../types";

type NativeTooltipBubbleProps = Omit<ComponentPropsWithoutRef<"div">, "children">;

export type TooltipBubbleProps = NativeTooltipBubbleProps &
	Omit<VariantProps<typeof tooltipBubbleVariants>, "direction"> &
	TooltipBubbleFigmaBridgeProps & {
		children: ReactNode;
		direction?: TooltipBubbleDirection;
		className?: string;
	};
