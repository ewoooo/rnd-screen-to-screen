import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { actionButtonLeftItemVariants } from "./action-button-left-item.variants";

export type ActionButtonLeftItemFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-type"?: "ai-gift" | "ai";
};

type NativeActionButtonLeftItemProps = ComponentPropsWithoutRef<"span">;

export type ActionButtonLeftItemProps = Omit<
	NativeActionButtonLeftItemProps,
	"children"
> &
	VariantProps<typeof actionButtonLeftItemVariants> &
	ActionButtonLeftItemFigmaBridgeProps & {
		children?: never;
	};
