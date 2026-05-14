import { type ComponentType, forwardRef } from "react";
import { cn } from "../../lib/cn";
import { ButtonXsmallSolid } from "../button-xsmall-solid";
import { Icon } from "../icon";
import { IconButton } from "../icon-button";
import { Text } from "../text";
import { TitleSectionRightItem } from "../title-section-right-item";
import type { ListSelectedRightItemProps } from "./ListSelectedRightItem.types";
import {
	type ListSelectedRightItemType,
	listSelectedRightItemVariants,
} from "./list-selected-right-item.variants";

const FIGMA_TYPE_BY_TYPE = {
	buttonXsmallSolid: "button-xsmall-solid",
	icon: "icon",
	textButton: "text-button",
} satisfies Record<ListSelectedRightItemType, string>;

type TitleSectionTextButtonProps = {
	type: "textButton";
	text: string;
	disabled?: boolean;
	onClick?: () => void;
	className?: string;
	"data-figma-render"?: "primitive";
};

const TitleSectionTextButton =
	TitleSectionRightItem as ComponentType<TitleSectionTextButtonProps>;

export const ListSelectedRightItem = forwardRef<
	HTMLSpanElement,
	ListSelectedRightItemProps
>(function ListSelectedRightItem(
	{
		ariaLabel,
		className,
		disabled = false,
		iconType = "arrow-right",
		label,
		onClick,
		type = "buttonXsmallSolid",
		"data-figma-render": dataFigmaRender = "component",
		"data-figma-component-id": dataFigmaComponentId = "list-selected-right-item",
		"data-figma-property-type": dataFigmaType,
		...props
	},
	ref,
) {
	const resolvedLabel =
		label ?? (type === "buttonXsmallSolid" ? "받기" : "Text");
	const isInteractiveIcon = type === "icon" && onClick;
	const resolvedIconAriaLabel = ariaLabel ?? resolvedLabel;

	return (
		<span
			ref={ref}
			data-figma-render={dataFigmaRender}
			data-figma-component-id={dataFigmaComponentId}
			data-figma-property-type={dataFigmaType ?? FIGMA_TYPE_BY_TYPE[type]}
			data-type={type}
			data-disabled={disabled ? "" : undefined}
			className={cn(listSelectedRightItemVariants({ type }), className)}
			{...props}
		>
			{type === "buttonXsmallSolid" ? (
				<ButtonXsmallSolid
					disabled={disabled}
					onClick={onClick}
					data-figma-render="primitive"
				>
					{resolvedLabel}
				</ButtonXsmallSolid>
			) : null}
			{type === "icon" && isInteractiveIcon ? (
				<IconButton
					aria-label={resolvedIconAriaLabel}
					className="cx-list-selected-right-item__icon-button"
					disabled={disabled}
					onClick={onClick}
					size="small"
					variant="plain"
					data-figma-render="primitive"
				>
					<Icon
						className="cx-list-selected-right-item__icon"
						type={iconType}
						size={16}
						aria-hidden="true"
					/>
				</IconButton>
			) : null}
			{type === "icon" && !isInteractiveIcon ? (
				<Icon
					className="cx-list-selected-right-item__icon"
					type={iconType}
					size={16}
					aria-hidden="true"
					data-figma-render="primitive"
				/>
			) : null}
			{type === "textButton" ? (
				<TitleSectionTextButton
					className="cx-list-selected-right-item__title-section-text-button"
					data-figma-render="primitive"
					disabled={disabled}
					onClick={disabled ? undefined : onClick}
					text={resolvedLabel}
					type="textButton"
				/>
			) : null}
			{type === "textButton" ? (
				<Text
					as="span"
					className="cx-list-selected-right-item__text-vocabulary"
					data-figma-render="ignore"
					variant="label"
				>
					{resolvedLabel}
				</Text>
			) : null}
		</span>
	);
});
