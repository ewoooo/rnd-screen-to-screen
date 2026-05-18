import { forwardRef } from "react";
import { Text } from "../../components/text";
import { cn } from "../../lib/cn";
import type { RQRNoticeProps } from "./RQRNotice.types";
import { rqrNoticeVariants } from "./rqr-notice.variants";

export const RQRNotice = forwardRef<HTMLDivElement, RQRNoticeProps>(
	function RQRNotice(
		{
			children,
			className,
			title,
			tone = "info",
			"data-figma-render": dataFigmaRender = "component",
			"data-figma-component-id": dataFigmaComponentId = "rqr-notice",
			"data-figma-property-title": dataFigmaTitle,
			"data-figma-property-tone": dataFigmaTone,
			...props
		},
		ref,
	) {
		const hasTitle = title !== undefined && title !== null && title !== false;

		return (
			<div
				ref={ref}
				data-figma-render={dataFigmaRender}
				data-figma-component-id={dataFigmaComponentId}
				data-figma-property-title={
					dataFigmaTitle ?? (hasTitle ? "true" : "false")
				}
				data-figma-property-tone={dataFigmaTone ?? tone ?? "info"}
				className={cn(rqrNoticeVariants({ tone }), className)}
				{...props}
			>
				<div
					className="rqr-notice__content"
					data-figma-render="slot"
					data-figma-property-name="content"
				>
					{hasTitle ? (
						<Text
							as="strong"
							className="rqr-notice__title"
							data-figma-render="slot"
							data-figma-property-name="title"
							variant="label"
						>
							{title}
						</Text>
					) : null}
					<Text
						as="p"
						className="rqr-notice__body"
						data-figma-render="slot"
						data-figma-property-name="description"
						variant="bodySubtle"
					>
						{children}
					</Text>
				</div>
			</div>
		);
	},
);
