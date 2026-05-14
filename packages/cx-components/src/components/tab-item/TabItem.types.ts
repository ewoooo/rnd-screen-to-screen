import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { tabItemVariants } from "./tab-item.variants";

export type TabItemFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-state"?: "default" | "selected";
};

type NativeTabItemProps = ComponentPropsWithoutRef<"div">;

export type TabItemProps = Omit<
	NativeTabItemProps,
	"children" | "color"
> &
	VariantProps<typeof tabItemVariants> &
	TabItemFigmaBridgeProps & {
		children?: ReactNode;
		selected?: boolean;
		text?: string;
	};
