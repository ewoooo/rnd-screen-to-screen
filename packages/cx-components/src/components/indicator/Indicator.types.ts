import type { ComponentPropsWithoutRef } from "react";
import type { FigmaBridgeAttributes } from "../../types";

export type IndicatorFigmaBridgeProps = FigmaBridgeAttributes;

type NativeIndicatorProps = Omit<
	ComponentPropsWithoutRef<"div">,
	"aria-label" | "children" | "role"
>;

export type IndicatorProps = NativeIndicatorProps &
	IndicatorFigmaBridgeProps & {
		count?: number;
		activeIndex?: number;
		ariaLabel?: string;
		className?: string;
	};
