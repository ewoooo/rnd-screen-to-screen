import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { handleVariants } from "./handle.variants";

export type HandleFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-show-handle"?: "true" | "false";
	"data-figma-property-state"?: "Default" | "off";
};

type NativeHandleProps = ComponentPropsWithoutRef<"div">;

export type HandleProps = Omit<NativeHandleProps, "children"> &
	VariantProps<typeof handleVariants> &
	HandleFigmaBridgeProps & {
		showHandle?: boolean;
		children?: never;
	};
