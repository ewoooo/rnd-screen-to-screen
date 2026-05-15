import { forwardRef } from "react";
import type { PageStackListProps } from "./PageStackList.types";
import { pageStackListVariants } from "./page-stack-list.variants";

const boolAttr = (value: boolean) => (value ? "true" : "false");

const cn = (...values: Array<string | false | null | undefined>) =>
	values.filter(Boolean).join(" ");

export const PageStackList = forwardRef<HTMLElement, PageStackListProps>(
	function PageStackList(
		{
			children,
			className,
			showTitle,
			title,
			"data-figma-render": dataFigmaRender = "layout",
			"data-figma-component-id": dataFigmaComponentId = "page-stack-list",
			"data-figma-property-contents-slot": dataFigmaContentsSlot,
			"data-figma-property-contents-title": dataFigmaContentsTitle,
			...props
		},
		ref,
	) {
		const hasTitle = showTitle ?? Boolean(title);

		return (
			<section
				ref={ref}
				data-figma-render={dataFigmaRender}
				data-figma-component-id={dataFigmaComponentId}
				data-figma-property-contents-title={
					dataFigmaContentsTitle ?? boolAttr(hasTitle)
				}
				data-title={boolAttr(hasTitle)}
				className={cn(pageStackListVariants({ title: hasTitle }), className)}
				{...props}
			>
				{hasTitle ? (
					<div
						className="page-stack-list__title"
						data-layout-slot="true"
						data-slot="title"
						data-figma-render="slot"
						data-figma-property-name="title"
					>
						{title}
					</div>
				) : null}
				<div
					className="page-stack-list__content"
					data-layout-slot="true"
					data-slot="content"
					data-figma-render="slot"
					data-figma-property-name="content"
					data-figma-property-contents-slot={dataFigmaContentsSlot ?? "slot"}
				>
					{children}
				</div>
			</section>
		);
	},
);
