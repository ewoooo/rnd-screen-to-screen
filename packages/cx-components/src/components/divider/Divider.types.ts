import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import type { FigmaBridgeProps } from "../../types";
import type { dividerVariants } from "./divider.variants";

type NativeDividerProps = ComponentPropsWithoutRef<"div">;

export type DividerFigmaBridgeProps = FigmaBridgeProps;

export type DividerProps = Omit<NativeDividerProps, "children"> &
	VariantProps<typeof dividerVariants> &
	DividerFigmaBridgeProps & {
		children?: never;
	};
