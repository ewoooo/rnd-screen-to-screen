import { forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Button } from "../button";
import { ButtonListOrder } from "../button-list-order";
import { Icon, type IconType } from "../icon";
import { IconButton } from "../icon-button";
import { Text } from "../text";
import type {
	TitleSectionRightItemFigmaType,
	TitleSectionRightItemIcon,
	TitleSectionRightItemProps,
} from "./TitleSectionRightItem.types";
import { titleSectionRightItemVariants } from "./title-section-right-item.variants";

const FIGMA_TYPE_BY_TYPE = {
	icon: "icon",
	textButton: "text-button",
	textItemButton: "text-item-button",
	buttonListOrder: "button-list-order",
} as const satisfies Record<
	TitleSectionRightItemProps["type"],
	TitleSectionRightItemFigmaType
>;

function isIconType(icon: TitleSectionRightItemIcon): icon is IconType {
	return typeof icon === "string";
}

function renderIcon(icon: TitleSectionRightItemIcon | undefined): ReactNode {
	if (!icon) {
		return null;
	}

	if (isIconType(icon)) {
		return <Icon type={icon} size={16} aria-hidden="true" />;
	}

	return icon;
}

export const TitleSectionRightItem = forwardRef<
	HTMLSpanElement,
	TitleSectionRightItemProps
>(function TitleSectionRightItem(
	props,
	ref,
) {
	const {
		className,
		disabled = false,
		type,
		"data-figma-render": dataFigmaRender = "primitive",
		"data-figma-component-id": dataFigmaComponentId,
		"data-figma-property-right-item-type": dataFigmaRightItemType,
	} = props;
	const figmaType = dataFigmaRightItemType ?? FIGMA_TYPE_BY_TYPE[type];

	return (
		<span
			ref={ref}
			data-figma-render={dataFigmaRender}
			data-figma-component-id={dataFigmaComponentId}
			data-figma-property-right-item-type={figmaType}
			data-type={type}
			data-disabled={disabled ? "" : undefined}
			className={cn(titleSectionRightItemVariants({ type }), className)}
		>
			{type === "icon" ? (
				<IconButton
					aria-label={props.label ?? "타이틀 섹션 액션"}
					className="cx-title-section-right-item__icon-button"
					data-figma-render="ignore"
					disabled={disabled}
					onClick={props.onClick}
					size="small"
					variant="plain"
				>
					{renderIcon(props.icon)}
				</IconButton>
			) : null}
			{type === "textButton" ? (
				<Button
					className="cx-title-section-right-item__text-button"
					data-figma-render="ignore"
					disabled={disabled}
					onClick={props.onClick}
					size="small"
					variant="secondary"
				>
					<Text
						as="span"
						className="cx-title-section-right-item__text-button-label"
						data-figma-render="ignore"
						variant="label"
					>
						{props.text}
					</Text>
				</Button>
			) : null}
			{type === "textItemButton" ? (
				<Button
					className="cx-title-section-right-item__text-item-button"
					data-figma-render="ignore"
					disabled={disabled}
					onClick={props.onClick}
					size="small"
					variant="secondary"
				>
					<Text
						as="span"
						className="cx-title-section-right-item__text-item-label"
						data-figma-render="ignore"
						variant="caption"
					>
						{props.label}
					</Text>
					<Text
						as="span"
						className="cx-title-section-right-item__text-item-value"
						data-figma-render="ignore"
						variant="label"
					>
						{props.value}
					</Text>
					{props.icon ? (
						<span className="cx-title-section-right-item__text-item-icon">
							{renderIcon(props.icon)}
						</span>
					) : null}
				</Button>
			) : null}
			{type === "buttonListOrder" ? (
				<ButtonListOrder
					className="cx-title-section-right-item__list-order-button"
					data-figma-render="ignore"
					disabled={disabled}
					icon={props.icon}
					label={props.label}
					onClick={props.onClick}
				/>
			) : null}
		</span>
	);
});
