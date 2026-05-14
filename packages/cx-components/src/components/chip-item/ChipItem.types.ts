import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { chipItemVariants } from "./chip-item.variants";

export type ChipItemFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-selected"?: "off" | "on";
};

type NativeChipItemProps = Omit<
	ComponentPropsWithoutRef<"span">,
	"children" | "color" | "onClick"
>;

export type ChipItemProps = NativeChipItemProps &
	VariantProps<typeof chipItemVariants> &
	ChipItemFigmaBridgeProps & {
		children: ReactNode;
		onClick?: () => void;
	};
