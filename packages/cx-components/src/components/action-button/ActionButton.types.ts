import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { ActionButtonLeftItemType } from "../action-button-left-item";
import type { ButtonVariant } from "../button";
import type { TooltipDirection } from "../tooltip";
import type {
	ActionButtonButtonCount,
	ActionButtonType,
} from "./action-button.variants";

export type ActionButtonActionLeftItem = ActionButtonLeftItemType | false;

export type ActionButtonAction = {
	label: ReactNode;
	variant?: ButtonVariant;
	disabled?: boolean;
	onClick?: () => void;
	leftItem?: ActionButtonActionLeftItem;
};

export type ActionButtonActions =
	| readonly [ActionButtonAction]
	| readonly [ActionButtonAction, ActionButtonAction];

export type ActionButtonFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-type"?: ActionButtonType;
	"data-figma-property-button"?: "1" | "2";
	"data-figma-property-show-text"?: "true" | "false";
	"data-figma-property-show-tooltip"?: "true" | "false";
};

type NativeActionButtonProps = Omit<
	ComponentPropsWithoutRef<"div">,
	"children"
>;

export type ActionButtonProps = NativeActionButtonProps &
	ActionButtonFigmaBridgeProps & {
		type?: ActionButtonType;
		actions: ActionButtonActions;
		buttonCount?: ActionButtonButtonCount;
		text?: ReactNode;
		showText?: boolean;
		tooltip?: ReactNode;
		showTooltip?: boolean;
		tooltipDirection?: TooltipDirection;
		className?: string;
	};
