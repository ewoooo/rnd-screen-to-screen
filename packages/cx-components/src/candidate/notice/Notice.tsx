import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { Text } from "../../components/text";
import type { NoticeProps } from "./Notice.types";
import { noticeVariants } from "./notice.variants";

export const Notice = forwardRef<HTMLDivElement, NoticeProps>(function Notice(
	{
		children,
		className,
		title,
		tone = "info",
		"data-figma-render": dataFigmaRender = "component",
		"data-figma-component-id": dataFigmaComponentId = "notice",
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
			data-figma-property-title={dataFigmaTitle ?? (hasTitle ? "true" : "false")}
			data-figma-property-tone={dataFigmaTone ?? tone ?? "info"}
			className={cn(noticeVariants({ tone }), className)}
			{...props}
		>
			<div
				className="notice__content"
				data-figma-render="slot"
				data-figma-property-name="content"
			>
				{hasTitle ? (
					<Text
						as="strong"
						className="notice__title"
						data-figma-render="slot"
						data-figma-property-name="title"
						variant="label"
					>
						{title}
					</Text>
				) : null}
				<Text
					as="p"
					className="notice__body"
					data-figma-render="slot"
					data-figma-property-name="description"
					variant="bodySubtle"
				>
					{children}
				</Text>
			</div>
		</div>
	);
});
