import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { BadgeType } from "../../components/badge";
import type { FigmaBridgeAttributes } from "../../types";
import type { rqrListOptionVariants } from "./rqr-list-option.variants";

export type RQRListOptionFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-type"?: "radio" | "checkbox";
	"data-figma-property-checked"?: "true" | "false";
	"data-figma-property-disabled"?: "true" | "false";
	"data-figma-property-description"?: "true" | "false";
	"data-figma-property-trailing"?: "true" | "false";
};

type NativeRQRListOptionProps = Omit<
	ComponentPropsWithoutRef<"label">,
	"children" | "title" | "onChange" | "color"
>;

export type RQRListOptionProps = NativeRQRListOptionProps &
	Omit<VariantProps<typeof rqrListOptionVariants>, "description" | "trailing"> &
	RQRListOptionFigmaBridgeProps & {
		title: ReactNode;
		description?: ReactNode;
		checked?: boolean;
		disabled?: boolean;
		name?: string;
		value?: string;
		badgeText?: ReactNode;
		badgeType?: BadgeType;
		trailing?: ReactNode;
		onCheckedChange?: (checked: boolean) => void;
	};
