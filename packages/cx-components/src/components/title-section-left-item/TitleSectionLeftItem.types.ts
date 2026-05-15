import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { BadgeType } from "../badge";
import type { IconColor, IconSize, IconType } from "../icon";
import type { titleSectionLeftItemVariants } from "./title-section-left-item.variants";

export type TitleSectionLeftItemFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-left-item-type"?: "text" | "icon" | "badge";
};

type NativeTitleSectionLeftItemProps = Omit<
	ComponentPropsWithoutRef<"span">,
	"children" | "color"
>;

type TitleSectionLeftItemBaseProps = NativeTitleSectionLeftItemProps &
	Omit<VariantProps<typeof titleSectionLeftItemVariants>, "type"> &
	TitleSectionLeftItemFigmaBridgeProps & {
		className?: string;
	};

export type TitleSectionLeftItemTextProps = TitleSectionLeftItemBaseProps & {
	type?: "text";
	text: string;
};

export type TitleSectionLeftItemIconProps = TitleSectionLeftItemBaseProps & {
	type: "icon";
	iconType: IconType;
	iconSize?: IconSize;
	iconColor?: IconColor;
	label?: string;
};

export type TitleSectionLeftItemBadgeProps = TitleSectionLeftItemBaseProps & {
	type: "badge";
	text: string;
	badgeType?: BadgeType;
};

export type TitleSectionLeftItemProps =
	| TitleSectionLeftItemTextProps
	| TitleSectionLeftItemIconProps
	| TitleSectionLeftItemBadgeProps;
