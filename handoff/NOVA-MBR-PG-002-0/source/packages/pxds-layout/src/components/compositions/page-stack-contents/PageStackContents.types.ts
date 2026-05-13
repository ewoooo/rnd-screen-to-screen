import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { PageStackContentsTitle } from "./page-stack-contents.variants";

export type PageStackContentsFigmaBridgeProps = {
	"data-node-kind"?: string;
	"data-component-id"?: string;
	"data-figma-component"?: string;
	"data-figma-contents-title"?: string;
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
