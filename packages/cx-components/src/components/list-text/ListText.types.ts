import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { ListTextRightItemPreset } from "../list-text-right-item";
import type { listTextVariants } from "./list-text.variants";

export type ListTextFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-table"?: "off" | "on";
	"data-figma-property-right-item"?: "true" | "false";
};

type NativeListTextProps = ComponentPropsWithoutRef<"div">;

export type ListTextProps = Omit<
	NativeListTextProps,
	"children" | "color"
> &
	Omit<VariantProps<typeof listTextVariants>, "table" | "rightItem"> &
	ListTextFigmaBridgeProps & {
		children?: ReactNode;
		text?: ReactNode;
		table?: boolean;
		tableText?: ReactNode;
		rightItem?: ListTextRightItemPreset | false;
		showRightItem?: boolean;
		showDivider?: boolean;
	};
