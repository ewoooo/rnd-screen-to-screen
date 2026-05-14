import type { VariantProps } from "class-variance-authority";
import type { ReactElement } from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { IconType } from "../icon";
import type { titleSectionRightItemVariants } from "./title-section-right-item.variants";

export type TitleSectionRightItemFigmaType =
	| "icon"
	| "text-button"
	| "text-item-button"
	| "button-list-order";

export type TitleSectionRightItemFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-right-item-type"?: TitleSectionRightItemFigmaType;
};

export type TitleSectionRightItemIcon = IconType | ReactElement;

type TitleSectionRightItemBaseProps = Omit<
	VariantProps<typeof titleSectionRightItemVariants>,
	"type"
> &
	TitleSectionRightItemFigmaBridgeProps & {
		className?: string;
		disabled?: boolean;
		onClick?: () => void;
	};

export type TitleSectionRightItemIconProps = TitleSectionRightItemBaseProps & {
	type: "icon";
	icon: TitleSectionRightItemIcon;
	label?: string;
};

export type TitleSectionRightItemTextButtonProps =
	TitleSectionRightItemBaseProps & {
		type: "textButton";
		text: string;
	};

export type TitleSectionRightItemTextItemButtonProps =
	TitleSectionRightItemBaseProps & {
		type: "textItemButton";
		label: string;
		value: string;
		icon?: TitleSectionRightItemIcon;
	};

export type TitleSectionRightItemButtonListOrderProps =
	TitleSectionRightItemBaseProps & {
		type: "buttonListOrder";
		label: string;
		icon?: IconType;
	};

export type TitleSectionRightItemProps =
	| TitleSectionRightItemIconProps
	| TitleSectionRightItemTextButtonProps
	| TitleSectionRightItemTextItemButtonProps
	| TitleSectionRightItemButtonListOrderProps;
