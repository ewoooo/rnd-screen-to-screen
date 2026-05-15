import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { PageStackListTitlePresence } from "./page-stack-list.variants";

export type PageStackListFigmaBridgeProps = {
	"data-figma-render"?: "layout";
	"data-figma-component-id"?: string;
	"data-figma-property-contents-slot"?: "slot";
	"data-figma-property-contents-title"?: "true" | "false";
};

type NativePageStackListProps = Omit<
	ComponentPropsWithoutRef<"section">,
	"children" | "title"
>;

export type PageStackListProps = NativePageStackListProps &
	PageStackListFigmaBridgeProps & {
		title?: ReactNode;
		children?: ReactNode;
		showTitle?: PageStackListTitlePresence;
		className?: string;
	};
