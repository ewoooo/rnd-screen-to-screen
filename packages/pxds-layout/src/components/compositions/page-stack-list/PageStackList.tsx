import { forwardRef } from "react";
import { Box, Slot } from "../../primitives";
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
			<Box
				as="section"
				ref={ref}
				data-figma-render={dataFigmaRender}
				data-figma-component-id={dataFigmaComponentId}
				data-figma-layout-kind="composition"
				data-figma-layout-layer="section"
				data-figma-property-contents-title={
					dataFigmaContentsTitle ?? boolAttr(hasTitle)
				}
				data-title={boolAttr(hasTitle)}
				className={cn(pageStackListVariants({ title: hasTitle }), className)}
				{...props}
			>
				{hasTitle ? (
					<Slot
						className="page-stack-list__title"
						data-figma-render="slot"
						data-figma-layout-kind="composition"
						data-figma-layout-layer="slot"
						data-figma-layout-slot="title"
						data-figma-layout-gap="spacing-0"
						gap="var(--spacing-0)"
						name="title"
					>
						{title}
					</Slot>
				) : null}
				<Slot
					className="page-stack-list__content"
					data-figma-render="slot"
					data-figma-layout-kind="composition"
					data-figma-layout-layer="slot"
					data-figma-layout-slot="content"
					data-figma-layout-gap="spacing-0"
					data-figma-property-contents-slot={dataFigmaContentsSlot ?? "slot"}
					gap="var(--spacing-0)"
					name="content"
				>
					{children}
				</Slot>
			</Box>
		);
	},
);
