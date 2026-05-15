import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { IndicatorProps } from "../indicator";
import type { titleMainVariants } from "./title-main.variants";

export type TitleMainFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-type"?: TitleMainType;
	"data-figma-property-show-title-sub-text"?: "true" | "false";
	"data-figma-property-show-title-sub-text-image"?: "true" | "false";
	"data-figma-property-indicator"?: "true" | "false";
};

export type TitleMainIndicatorProps = Omit<IndicatorProps, "className"> & {
	className?: string;
};

type NativeTitleMainProps = Omit<ComponentPropsWithoutRef<"section">, "title">;

export type TitleMainProps = NativeTitleMainProps &
	Omit<
		VariantProps<typeof titleMainVariants>,
		"type" | "titleSubText" | "media" | "indicator"
	> &
	TitleMainFigmaBridgeProps & {
		type?: TitleMainType;
		title: ReactNode;
		subTitle?: ReactNode;
		titleSubText?: ReactNode;
		media?: ReactNode;
		indicator?: boolean | TitleMainIndicatorProps;
		className?: string;
	};

export type TitleMainType = "complete" | "search";
