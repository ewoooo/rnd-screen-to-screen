import type { ComponentPropsWithoutRef } from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { IconType } from "../icon";
import type { ListSelectedRightItemType } from "./list-selected-right-item.variants";

export type ListSelectedRightItemFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-type"?:
		| "button-xsmall-solid"
		| "icon"
		| "text-button";
};

type NativeListSelectedRightItemProps = Omit<
	ComponentPropsWithoutRef<"span">,
	"children" | "onClick"
>;

export type ListSelectedRightItemProps = NativeListSelectedRightItemProps &
	ListSelectedRightItemFigmaBridgeProps & {
		type?: ListSelectedRightItemType;
		label?: string;
		iconType?: IconType;
		disabled?: boolean;
		onClick?: () => void;
		ariaLabel?: string;
		children?: never;
	};
