import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { pageStackListVariants } from "./page-stack-list.variants";

export type PageStackListFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-contents-slot"?: "slot";
	"data-figma-property-contents-title"?: "true" | "false";
};

type NativePageStackListProps = Omit<
	ComponentPropsWithoutRef<"section">,
	"children" | "title"
>;

export type PageStackListProps = NativePageStackListProps &
	Omit<VariantProps<typeof pageStackListVariants>, "title"> &
	PageStackListFigmaBridgeProps & {
		title?: ReactNode;
		children?: ReactNode;
		showTitle?: boolean;
	};
