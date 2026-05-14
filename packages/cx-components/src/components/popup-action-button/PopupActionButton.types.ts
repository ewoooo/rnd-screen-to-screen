import type { ComponentPropsWithoutRef } from "react";
import type { FigmaBridgeAttributes } from "../../types";

export type PopupActionButtonOptions = "2Buttons" | "1Button";

export type PopupActionButtonAction = {
	label: string;
	onClick?: () => void;
	disabled?: boolean;
};

export type PopupActionButtonFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-options"?: PopupActionButtonOptions;
};

type NativePopupActionButtonProps = Omit<
	ComponentPropsWithoutRef<"div">,
	"children"
>;

type PopupActionButtonTwoButtonProps = {
	options?: "2Buttons";
	primaryAction: PopupActionButtonAction;
	secondaryAction: PopupActionButtonAction;
};

type PopupActionButtonOneButtonProps = {
	options: "1Button";
	primaryAction?: never;
	secondaryAction: PopupActionButtonAction;
};

export type PopupActionButtonProps = NativePopupActionButtonProps &
	PopupActionButtonFigmaBridgeProps &
	(PopupActionButtonTwoButtonProps | PopupActionButtonOneButtonProps);
