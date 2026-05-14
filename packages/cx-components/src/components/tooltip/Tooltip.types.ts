import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { TooltipDirection, tooltipVariants } from "./tooltip.variants";

export type TooltipFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-direction"?: TooltipDirection;
};

type NativeTooltipProps = Omit<ComponentPropsWithoutRef<"div">, "children">;

export type TooltipProps = NativeTooltipProps &
	Omit<VariantProps<typeof tooltipVariants>, "direction"> &
	TooltipFigmaBridgeProps & {
		children: ReactNode;
		direction?: TooltipDirection;
		trigger?: ReactNode;
		open?: boolean;
		defaultOpen?: boolean;
		className?: string;
	};
