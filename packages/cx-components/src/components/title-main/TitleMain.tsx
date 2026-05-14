import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { Indicator } from "../indicator";
import { Text } from "../text";
import { TitleSection } from "../title-section";
import type { TitleMainIndicatorProps, TitleMainProps } from "./TitleMain.types";
import { titleMainVariants } from "./title-main.variants";

const boolAttr = (value: boolean) => (value ? "true" : "false");

function resolveIndicatorProps(
	indicator: TitleMainProps["indicator"],
): TitleMainIndicatorProps | null {
	if (!indicator) {
		return null;
	}

	if (indicator === true) {
		return {};
	}

	return indicator;
}

export const TitleMain = forwardRef<HTMLElement, TitleMainProps>(
	function TitleMain(
		{
			className,
			indicator = false,
			media,
			subTitle,
			title,
			titleSubText,
			type = "complete",
			"data-figma-render": dataFigmaRender = "component",
			"data-figma-component-id": dataFigmaComponentId = "title-main",
			"data-figma-property-type": dataFigmaType,
			"data-figma-property-show-title-sub-text": dataFigmaShowTitleSubText,
			"data-figma-property-show-title-sub-text-image":
				dataFigmaShowTitleSubTextImage,
			"data-figma-property-indicator": dataFigmaIndicator,
			...props
		},
		ref,
	) {
		const shouldShowTitleSubText = Boolean(titleSubText || subTitle);
		const shouldShowTopRow = Boolean(titleSubText || media);
		const shouldShowMedia = Boolean(media);
		const indicatorProps = resolveIndicatorProps(indicator);
		const shouldShowIndicator = Boolean(indicatorProps);

		return (
			<section
				ref={ref}
				data-figma-render={dataFigmaRender}
				data-figma-component-id={dataFigmaComponentId}
				data-figma-property-type={dataFigmaType ?? type}
				data-figma-property-show-title-sub-text={
					dataFigmaShowTitleSubText ?? boolAttr(shouldShowTitleSubText)
				}
				data-figma-property-show-title-sub-text-image={
					dataFigmaShowTitleSubTextImage ?? boolAttr(shouldShowMedia)
				}
				data-figma-property-indicator={
					dataFigmaIndicator ?? boolAttr(shouldShowIndicator)
				}
				data-type={type}
				data-title-sub-text={boolAttr(shouldShowTitleSubText)}
				data-media={boolAttr(shouldShowMedia)}
				data-indicator={boolAttr(shouldShowIndicator)}
				className={cn(
					titleMainVariants({
						type,
						titleSubText: shouldShowTitleSubText,
						media: shouldShowMedia,
						indicator: shouldShowIndicator,
					}),
					className,
				)}
				{...props}
			>
				{shouldShowTopRow ? (
					<div className="title-main__top-row" data-figma-render="layout">
						{shouldShowMedia ? (
							<div
								className="title-main__media"
								data-figma-render="slot"
								data-figma-property-name="media"
							>
								{media}
							</div>
						) : null}
						{titleSubText ? (
							<Text
								as="span"
								className="title-main__title-sub-text"
								data-figma-render="slot"
								data-figma-property-name="title-sub-text"
								variant="bodySubtle"
							>
								{titleSubText}
							</Text>
						) : null}
					</div>
				) : null}
				<TitleSection
					className="title-main__title-section"
					subTitle={subTitle}
					title={title}
				/>
				{shouldShowIndicator ? (
					<Indicator
						{...indicatorProps}
						className={cn("title-main__indicator", indicatorProps?.className)}
					/>
				) : null}
			</section>
		);
	},
);
