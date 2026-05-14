import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { titleBottomSheetVariants } from "./title-bottom-sheet.variants";

export type TitleBottomSheetFigmaBridgeProps = {
	"data-figma-render"?:
		| "component"
		| "layout"
		| "slot"
		| "primitive"
		| "ignore";
	"data-figma-component-id"?: string;
	"data-figma-property-show-title-text"?: "true" | "false";
	"data-figma-property-show-title-button"?: "true" | "false";
	"data-figma-property-show-sub-text"?: "true" | "false";
	"data-figma-property-show-sub-text-2"?: "true" | "false";
	"data-figma-property-show-title"?: "true" | "false";
};

type NativeTitleBottomSheetProps = Omit<
	ComponentPropsWithoutRef<"header">,
	"title"
>;

export type TitleBottomSheetProps = NativeTitleBottomSheetProps &
	Omit<
		VariantProps<typeof titleBottomSheetVariants>,
		| "showTitle"
		| "showTitleText"
		| "showTitleButton"
		| "showSubText"
		| "showSubText2"
	> &
	TitleBottomSheetFigmaBridgeProps & {
		title?: ReactNode;
		subText?: ReactNode;
		subText2?: ReactNode;
		showTitle?: boolean;
		showTitleText?: boolean;
		showTitleButton?: boolean;
		showSubText?: boolean;
		showSubText2?: boolean;
		onClose?: () => void;
		closeLabel?: string;
		className?: string;
	};
