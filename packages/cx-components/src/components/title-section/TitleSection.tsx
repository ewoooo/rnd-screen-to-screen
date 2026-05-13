import { forwardRef, isValidElement, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Badge } from "../badge";
import type {
	TitleSectionLeftItem,
	TitleSectionProps,
	TitleSectionRightItem,
} from "./TitleSection.types";
import { titleSectionVariants } from "./title-section.variants";

const boolAttr = (value: boolean) => (value ? "true" : "false");

type LeftItemPreset = Extract<TitleSectionLeftItem, { type: string }>;
type RightItemPreset = Extract<TitleSectionRightItem, { type: string }>;

const LEFT_ITEM_TYPES = ["text", "icon", "badge"] as const;
const RIGHT_ITEM_TYPES = [
	"icon",
	"textButton",
	"textItemButton",
	"buttonListOrder",
] as const;

function hasPresetType(
	item: TitleSectionLeftItem | TitleSectionRightItem,
	types: readonly string[],
): item is LeftItemPreset | RightItemPreset {
	return (
		typeof item === "object" &&
		item !== null &&
		!isValidElement(item) &&
		"type" in item &&
		typeof item.type === "string" &&
		types.includes(item.type)
	);
}

function isLeftItemPreset(item: TitleSectionLeftItem): item is LeftItemPreset {
	return hasPresetType(item, LEFT_ITEM_TYPES);
}

function isRightItemPreset(
	item: TitleSectionRightItem,
): item is RightItemPreset {
	return hasPresetType(item, RIGHT_ITEM_TYPES);
}

function renderLeftItem(item: TitleSectionLeftItem): ReactNode {
	if (!isLeftItemPreset(item)) {
		return item;
	}

	if (item.type === "text") {
		return (
			<span
				className="cx-title-section__left-text"
				data-figma-render="primitive"
				data-figma-property-left-item-type="text"
			>
				{item.text}
			</span>
		);
	}

	if (item.type === "icon") {
		if (item.label) {
			return (
				<span
					aria-label={item.label}
					className="cx-title-section__left-icon"
					data-figma-render="primitive"
					data-figma-property-left-item-type="icon"
					role="img"
				>
					{item.icon}
				</span>
			);
		}

		return (
			<span
				className="cx-title-section__left-icon"
				data-figma-render="primitive"
				data-figma-property-left-item-type="icon"
			>
				{item.icon}
			</span>
		);
	}

	return (
		<Badge
			className="cx-title-section__left-badge"
			data-figma-render="primitive"
			data-figma-property-left-item-type="badge"
			text={item.text}
		/>
	);
}

function renderRightItem(item: TitleSectionRightItem): ReactNode {
	if (!isRightItemPreset(item)) {
		return item;
	}

	if (item.type === "icon") {
		return (
			<button
				aria-label={item.label}
				className="cx-icon-button cx-icon-button--small cx-icon-button--plain cx-title-section__right-icon-button"
				data-figma-render="primitive"
				data-figma-property-right-item-type="icon"
				onClick={item.onClick}
				type="button"
			>
				{item.icon}
			</button>
		);
	}

	if (item.type === "textButton") {
		return (
			<button
				className="cx-title-section__right-text-button"
				data-figma-render="primitive"
				data-figma-property-right-item-type="text-button"
				onClick={item.onClick}
				type="button"
			>
				{item.text}
			</button>
		);
	}

	if (item.type === "textItemButton") {
		return (
			<button
				className="cx-title-section__right-text-item-button"
				data-figma-render="primitive"
				data-figma-property-right-item-type="text-item-button"
				onClick={item.onClick}
				type="button"
			>
				<span className="cx-title-section__right-text-item-label">
					{item.label}
				</span>
				<span className="cx-title-section__right-text-item-value">
					{item.value}
				</span>
				{item.icon ? (
					<span className="cx-title-section__right-text-item-icon">
						{item.icon}
					</span>
				) : null}
			</button>
		);
	}

	return (
		<button
			className="cx-title-section__right-list-order-button"
			data-figma-render="primitive"
			data-figma-property-right-item-type="button-list-order"
			onClick={item.onClick}
			type="button"
		>
			<span>{item.label}</span>
			{item.icon ? (
				<span className="cx-title-section__right-list-order-icon">
					{item.icon}
				</span>
			) : null}
		</button>
	);
}

export const TitleSection = forwardRef<HTMLElement, TitleSectionProps>(
	function TitleSection(
		{
			className,
			leftItem,
			rightItem,
			subTitle,
			title,
			"data-figma-render": dataFigmaRender = "component",
			"data-figma-component-id": dataFigmaComponentId = "title-section",
			"data-figma-property-sub-title": dataFigmaSubTitle,
			"data-figma-property-left-item": dataFigmaLeftItem,
			"data-figma-property-right-item": dataFigmaRightItem,
			...props
		},
		ref,
	) {
		const shouldShowSubTitle = Boolean(subTitle);
		const shouldShowLeftItem = Boolean(leftItem);
		const shouldShowRightItem = Boolean(rightItem);

		return (
			<section
				ref={ref}
				data-figma-render={dataFigmaRender}
				data-figma-component-id={dataFigmaComponentId}
				data-figma-property-sub-title={
					dataFigmaSubTitle ?? boolAttr(shouldShowSubTitle)
				}
				data-figma-property-left-item={
					dataFigmaLeftItem ?? boolAttr(shouldShowLeftItem)
				}
				data-figma-property-right-item={
					dataFigmaRightItem ?? boolAttr(shouldShowRightItem)
				}
				data-sub-title={boolAttr(shouldShowSubTitle)}
				data-left-item={boolAttr(shouldShowLeftItem)}
				data-right-item={boolAttr(shouldShowRightItem)}
				className={cn(
					titleSectionVariants({
						subTitle: shouldShowSubTitle,
						leftItem: shouldShowLeftItem,
						rightItem: shouldShowRightItem,
					}),
					className,
				)}
				{...props}
			>
				<div className="cx-title-section__title-row" data-figma-render="ignore">
					<div className="cx-title-section__title-area" data-figma-render="ignore">
						{shouldShowLeftItem ? (
							<div
								className="cx-title-section__left"
								data-figma-render="slot"
								data-figma-property-name="left-item"
							>
								{renderLeftItem(leftItem)}
							</div>
						) : null}
						<div
							className="cx-title-section__title"
							data-figma-render="slot"
							data-figma-property-name="title"
						>
							{title}
						</div>
					</div>
					{shouldShowRightItem ? (
						<div
							className="cx-title-section__right"
							data-figma-render="slot"
							data-figma-property-name="right-item"
						>
							{renderRightItem(rightItem)}
						</div>
					) : null}
				</div>
				{shouldShowSubTitle ? (
					<div
						className="cx-title-section__sub-title"
						data-figma-render="slot"
						data-figma-property-name="sub-title"
					>
						{subTitle}
					</div>
				) : null}
			</section>
		);
	},
);
