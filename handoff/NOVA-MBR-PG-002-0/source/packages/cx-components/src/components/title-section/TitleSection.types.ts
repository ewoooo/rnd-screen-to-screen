import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { TitleSectionFigmaBridgeProps } from "../../types";
import type { titleSectionVariants } from "./title-section.variants";

export type { TitleSectionFigmaBridgeProps } from "../../types";

type NativeTitleSectionProps = Omit<ComponentPropsWithoutRef<"section">, "title">;

export type TitleSectionProps = NativeTitleSectionProps &
	Omit<
		VariantProps<typeof titleSectionVariants>,
		"leftItem" | "rightItem" | "titleSubText" | "titleSubImage" | "subText"
	> &
	TitleSectionFigmaBridgeProps & {
		title: ReactNode;
		titleSubText?: string;
		titleSubImage?: ReactNode;
		subText?: string;
		leftItem?: ReactNode;
		rightItem?: ReactNode;
		showLeftItem?: boolean;
		showRightItem?: boolean;
		className?: string;
	};
