import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { Text } from "../text";
import type { TitleSectionProps } from "./TitleSection.types";
import { titleSectionVariants } from "./title-section.variants";

const onOff = (value: boolean) => (value ? "On" : "Off");

export const TitleSection = forwardRef<HTMLElement, TitleSectionProps>(
	function TitleSection(
		{
			className,
			leftItem,
			rightItem,
			showLeftItem,
			showRightItem,
			subText,
			title,
			titleSubImage,
			titleSubText,
			"data-node-kind": dataNodeKind = "component",
			"data-component-id": dataComponentId = "title-section",
			"data-figma-component": dataFigmaComponent = "TitleSection/Default",
			"data-figma-left-item": dataFigmaLeftItem,
			"data-figma-right-item": dataFigmaRightItem,
			"data-figma-title-sub-text": dataFigmaTitleSubText,
			"data-figma-title-sub-image": dataFigmaTitleSubImage,
			"data-figma-sub-text": dataFigmaSubText,
			...props
		},
		ref,
	) {
		const shouldShowLeftItem = showLeftItem ?? Boolean(leftItem);
		const shouldShowRightItem = showRightItem ?? Boolean(rightItem);
		const shouldShowTitleSubText = Boolean(titleSubText || titleSubImage);
		const shouldShowTitleSubImage = Boolean(titleSubImage);
		const shouldShowSubText = Boolean(subText);

		return (
			<section
				ref={ref}
				data-node-kind={dataNodeKind}
				data-component-id={dataComponentId}
				data-figma-component={dataFigmaComponent}
				data-figma-left-item={dataFigmaLeftItem ?? onOff(shouldShowLeftItem)}
				data-figma-right-item={dataFigmaRightItem ?? onOff(shouldShowRightItem)}
				data-figma-title-sub-text={
					dataFigmaTitleSubText ?? onOff(shouldShowTitleSubText)
				}
				data-figma-title-sub-image={
					dataFigmaTitleSubImage ?? onOff(shouldShowTitleSubImage)
				}
				data-figma-sub-text={dataFigmaSubText ?? onOff(shouldShowSubText)}
				data-left-item={onOff(shouldShowLeftItem)}
				data-right-item={onOff(shouldShowRightItem)}
				data-title-sub-text={onOff(shouldShowTitleSubText)}
				data-title-sub-image={onOff(shouldShowTitleSubImage)}
				data-sub-text={onOff(shouldShowSubText)}
				className={cn(
					titleSectionVariants({
						leftItem: shouldShowLeftItem,
						rightItem: shouldShowRightItem,
						titleSubText: shouldShowTitleSubText,
						titleSubImage: shouldShowTitleSubImage,
						subText: shouldShowSubText,
					}),
					className,
				)}
				{...props}
			>
				{shouldShowLeftItem ? (
					<div className="cx-title-section__left" data-slot="left-item">
						{leftItem}
					</div>
				) : null}
				<div className="cx-title-section__content" data-slot="content">
					<div className="cx-title-section__title-main" data-slot="title-main">
						<div className="cx-title-section__title-text" data-slot="title-text">
							{shouldShowTitleSubText ? (
								<div
									className="cx-title-section__title-sub-text"
									data-slot="title-sub-text"
								>
									{titleSubImage ? (
										<span
											className="cx-title-section__title-sub-image"
											data-slot="title-sub-image"
										>
											{titleSubImage}
										</span>
									) : null}
									{titleSubText ? (
										<Text
											as="span"
											variant="caption"
											className="cx-title-section__title-sub-text-label"
											data-component-id="title-section-title-sub-text"
											data-figma-component="TitleSection/TitleSubText"
										>
											{titleSubText}
										</Text>
									) : null}
								</div>
							) : null}
							<Text
								as="h1"
								variant="displayTitle"
								className="cx-title-section__title"
								data-component-id="title-section-title"
								data-figma-component="TitleSection/Title"
							>
								{title}
							</Text>
						</div>
					</div>
					{shouldShowSubText ? (
						<Text
							as="p"
							variant="bodySubtle"
							className="cx-title-section__sub-text"
							data-component-id="title-section-sub-text"
							data-figma-component="TitleSection/SubText"
						>
							{subText}
						</Text>
					) : null}
				</div>
				{shouldShowRightItem ? (
					<div className="cx-title-section__right" data-slot="right-item">
						{rightItem}
					</div>
				) : null}
			</section>
		);
	},
);
