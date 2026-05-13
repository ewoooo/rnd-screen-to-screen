import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import type { DividerFigmaBridgeProps } from "../../types";
import type { dividerVariants } from "./divider.variants";

export type { DividerFigmaBridgeProps } from "../../types";

type NativeDividerProps = ComponentPropsWithoutRef<"div">;

export type DividerProps = Omit<NativeDividerProps, "children"> &
	VariantProps<typeof dividerVariants> &
	DividerFigmaBridgeProps & {
		children?: never;
	};
