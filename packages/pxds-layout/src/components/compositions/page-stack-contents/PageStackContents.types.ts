import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { PageStackContentsTitle } from "./page-stack-contents.variants";

export type PageStackContentsFigmaBridgeProps = {
	"data-figma-render"?: "layout";
	"data-figma-component-id"?: string;
	"data-figma-property-contents-title"?: "true" | "false";
};

type NativePageStackContentsProps = Omit<
	ComponentPropsWithoutRef<"section">,
	"children" | "title"
>;

export type PageStackContentsProps = NativePageStackContentsProps &
	PageStackContentsFigmaBridgeProps & {
		title?: ReactNode;
		children?: ReactNode;
		showTitle?: PageStackContentsTitle;
		className?: string;
	};
