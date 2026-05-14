import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { TitleContentsRightItemPreset } from "../title-contents-right-item";
import type { titleContentsVariants } from "./title-contents.variants";

export type TitleContentsFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-show-button"?: "true" | "false";
};

type NativeTitleContentsProps = Omit<
	ComponentPropsWithoutRef<"div">,
	"children" | "title"
>;

export type TitleContentsProps = NativeTitleContentsProps &
	Omit<VariantProps<typeof titleContentsVariants>, "showButton"> &
	TitleContentsFigmaBridgeProps & {
		title?: ReactNode;
		children?: ReactNode;
		showButton?: boolean;
		rightItem?: TitleContentsRightItemPreset;
		className?: string;
	};
