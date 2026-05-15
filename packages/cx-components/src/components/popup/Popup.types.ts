import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type {
	PopupActionButtonAction,
	PopupActionButtonOptions,
} from "../popup-action-button";

export type PopupAction = PopupActionButtonAction;
export type PopupActionOptions = PopupActionButtonOptions;

export type PopupFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-contents"?: string;
	"data-figma-property-show-contents"?: "true" | "false";
	"data-figma-property-show-sub-text"?: "true" | "false";
};

type NativePopupProps = Omit<
	ComponentPropsWithoutRef<"div">,
	"children" | "title"
>;

type PopupBaseProps = NativePopupProps &
	PopupFigmaBridgeProps & {
		title: ReactNode;
		subText?: ReactNode;
		showSubText?: boolean;
		children?: ReactNode;
		showContents?: boolean;
		className?: string;
	};

type PopupTwoButtonProps = {
	actionOptions?: "2Buttons";
	primaryAction: PopupAction;
	secondaryAction: PopupAction;
};

type PopupOneButtonProps = {
	actionOptions: "1Button";
	primaryAction?: never;
	secondaryAction: PopupAction;
};

export type PopupProps = PopupBaseProps &
	(PopupTwoButtonProps | PopupOneButtonProps);
