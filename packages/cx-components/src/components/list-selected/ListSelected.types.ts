import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { ListSelectedRightItemProps } from "../list-selected-right-item";
import type { listSelectedVariants } from "./list-selected.variants";

export type ListSelectedFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-type"?: "radio" | "checkbox";
	"data-figma-property-show-list-selected-right-item"?: "true" | "false";
	"data-figma-property-show-sub-text"?: "true" | "false";
};

type NativeListSelectedProps = Omit<
	ComponentPropsWithoutRef<"div">,
	"children" | "color" | "onChange"
>;

export type ListSelectedProps = NativeListSelectedProps &
	Omit<VariantProps<typeof listSelectedVariants>, "rightItem" | "subText"> &
	ListSelectedFigmaBridgeProps & {
		label: ReactNode;
		subText?: ReactNode;
		showSubText?: boolean;
		checked?: boolean;
		disabled?: boolean;
		rightItem?: ListSelectedRightItemProps | null;
		showListSelectedRightItem?: boolean;
		onChange?: (checked: boolean) => void;
	};
