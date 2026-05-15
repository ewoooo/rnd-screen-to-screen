import { forwardRef } from "react";
import { Slot } from "../primitives";
import type { PageStackContentsProps } from "./PageStackContents.types";
import { pageStackContentsVariants } from "./page-stack-contents.variants";

const boolAttr = (value: boolean) => (value ? "true" : "false");

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
		"data-figma-render": dataFigmaRender = "layout",
		"data-figma-component-id": dataFigmaComponentId = "page-stack-contents",
		"data-figma-property-contents-title": dataFigmaContentsTitle,
		...props
	},
	ref,
) {
	const shouldShowTitle = showTitle ?? Boolean(title);

	return (
		<section
			ref={ref}
			data-figma-render={dataFigmaRender}
			data-figma-component-id={dataFigmaComponentId}
			data-figma-property-contents-title={
				dataFigmaContentsTitle ?? boolAttr(shouldShowTitle)
			}
			data-contents-title={boolAttr(shouldShowTitle)}
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
