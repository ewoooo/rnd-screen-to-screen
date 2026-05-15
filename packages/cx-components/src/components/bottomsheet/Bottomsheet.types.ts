import type { BottomSheet } from "@pxds/pxds-layout/components/overlays";
import type { ComponentProps, ComponentPropsWithoutRef, ReactNode } from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { ActionButtonActions, ActionButtonProps } from "../action-button";
import type { TitleBottomSheetProps } from "../title-bottom-sheet";
import type { BottomsheetActionButton } from "./bottomsheet.variants";

export type BottomsheetActionButtonValue =
	| BottomsheetActionButton
	| boolean;

export type BottomsheetFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-action-button"?: "on" | "off";
	"data-figma-property-show-title-bottom-sheet"?: "true" | "false";
	"data-figma-property-con"?: string;
};

type LayoutBottomSheetProps = ComponentProps<typeof BottomSheet>;

type NativeBottomsheetProps = Omit<
	ComponentPropsWithoutRef<"div">,
	"children" | "title"
>;

export type BottomsheetProps = NativeBottomsheetProps &
	BottomsheetFigmaBridgeProps &
	Pick<
		LayoutBottomSheetProps,
		"open" | "defaultOpen" | "onOpenChange" | "backdrop" | "peekHeight" | "gap"
	> & {
		children?: ReactNode;
		content?: ReactNode;
		showTitleBottomSheet?: boolean;
		title?: ReactNode;
		titleBottomSheet?: ReactNode;
		titleBottomSheetProps?: Omit<
			TitleBottomSheetProps,
			"children" | "className" | "title"
		>;
		actionButton?: BottomsheetActionButtonValue;
		action?: ReactNode;
		actions?: ActionButtonActions;
		actionButtonProps?: Omit<ActionButtonProps, "actions" | "className">;
		handle?: boolean;
		className?: string;
		contentClassName?: string;
		actionClassName?: string;
	};
