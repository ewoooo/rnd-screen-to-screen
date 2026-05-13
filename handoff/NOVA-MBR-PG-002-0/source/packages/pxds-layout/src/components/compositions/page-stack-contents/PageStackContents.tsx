import { forwardRef } from "react";
import { Slot } from "../../../primitives";
import type { PageStackContentsProps } from "./PageStackContents.types";
import { pageStackContentsVariants } from "./page-stack-contents.variants";

const onOff = (value: boolean) => (value ? "On" : "Off");

const cn = (...values: Array<string | false | null | undefined>) =>
	values.filter(Boolean).join(" ");

export const PageStackContents = forwardRef<
	HTMLElement,
	PageStackContentsProps
>(function PageStackContents(
	{
		children,
		className,
		showTitle,
		title,
		"data-node-kind": dataNodeKind = "composition",
		"data-component-id": dataComponentId = "page-stack-contents",
		"data-figma-component": dataFigmaComponent = "PageStackContents",
		"data-figma-contents-title": dataFigmaContentsTitle,
		...props
	},
	ref,
) {
	const shouldShowTitle = showTitle ?? Boolean(title);

	return (
		<section
			ref={ref}
			data-node-kind={dataNodeKind}
			data-component-id={dataComponentId}
			data-figma-component={dataFigmaComponent}
			data-figma-contents-title={
				dataFigmaContentsTitle ?? onOff(shouldShowTitle)
			}
			data-contents-title={onOff(shouldShowTitle)}
			className={cn(
				pageStackContentsVariants({ title: shouldShowTitle }),
				className,
			)}
			{...props}
		>
			{shouldShowTitle ? (
				<Slot name="title" className="cx-page-stack-contents__title">
					{title}
				</Slot>
			) : null}
			<Slot name="content" className="cx-page-stack-contents__body">
				{children}
			</Slot>
		</section>
	);
});
