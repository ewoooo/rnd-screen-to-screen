import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { titleContentsRightItemVariants } from "./title-contents-right-item.variants";

export type TitleContentsRightItemFigmaType = "Icon" | "Button" | "Type3";
export type TitleContentsRightItemIcon = "arrowUp";

export type TitleContentsRightItemFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-type"?: TitleContentsRightItemFigmaType;
};

type NativeTitleContentsRightItemProps = Omit<
	ComponentPropsWithoutRef<"span">,
	"children" | "onClick" | "type"
>;

export type TitleContentsRightItemIconPreset = {
	type: "icon" | "type3";
	icon?: TitleContentsRightItemIcon;
	label: string;
	onClick?: () => void;
};

export type TitleContentsRightItemButtonPreset = {
	type: "button";
	label?: string;
	onClick?: () => void;
	disabled?: boolean;
};

export type TitleContentsRightItemPreset =
	| TitleContentsRightItemIconPreset
	| TitleContentsRightItemButtonPreset;

export type TitleContentsRightItemProps = NativeTitleContentsRightItemProps &
	Omit<VariantProps<typeof titleContentsRightItemVariants>, "type"> &
	TitleContentsRightItemFigmaBridgeProps & {
		type?: NonNullable<
			VariantProps<typeof titleContentsRightItemVariants>["type"]
		>;
		icon?: TitleContentsRightItemIcon;
		label?: string;
		onClick?: () => void;
		disabled?: boolean;
		children?: never;
	};
