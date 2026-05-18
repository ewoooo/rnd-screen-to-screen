import { forwardRef } from "react";
import { ListText } from "../../components/list-text";
import { cn } from "../../lib/cn";
import type { RQRContentsDetailProps } from "./RQRContentsDetail.types";

const boolAttr = (value: boolean) => (value ? "true" : "false");

export const RQRContentsDetail = forwardRef<
	HTMLElement,
	RQRContentsDetailProps
>(function RQRContentsDetail(
	{
		className,
		rows,
		subTitle,
		title,
		"data-figma-render": dataFigmaRender = "component",
		"data-figma-component-id": dataFigmaComponentId = "rqr-contents-detail",
		"data-figma-property-row-count": dataFigmaRowCount,
		"data-figma-property-sub-title": dataFigmaSubTitle,
		...props
	},
	ref,
) {
	const hasSubTitle = Boolean(subTitle);

	return (
		<section
			ref={ref}
			data-figma-render={dataFigmaRender}
			data-figma-component-id={dataFigmaComponentId}
			data-figma-property-row-count={dataFigmaRowCount ?? String(rows.length)}
			data-figma-property-sub-title={
				dataFigmaSubTitle ?? boolAttr(hasSubTitle)
			}
			className={cn("rqr-contents-detail", className)}
			{...props}
		>
			<header
				className="rqr-contents-detail__header"
				data-figma-render="layout"
				data-figma-layout-kind="component"
				data-figma-layout-layer="header"
				data-figma-layout-auto="true"
				data-figma-layout-direction="vertical"
			>
				{hasSubTitle ? (
					<p
						className="rqr-contents-detail__subtitle text-14-med"
						data-figma-render="slot"
						data-figma-property-name="sub-title"
					>
						{subTitle}
					</p>
				) : null}
				<h2
					className="rqr-contents-detail__title text-16-semi"
					data-figma-render="slot"
					data-figma-property-name="title"
				>
					{title}
				</h2>
			</header>
			<div
				className="rqr-contents-detail__list"
				data-figma-render="slot"
				data-figma-property-name="list"
			>
				{rows.map((row) => (
					<ListText
						key={row.id}
						rightItem={{ type: "text", text: row.value }}
						text={row.label}
					/>
				))}
			</div>
		</section>
	);
});
