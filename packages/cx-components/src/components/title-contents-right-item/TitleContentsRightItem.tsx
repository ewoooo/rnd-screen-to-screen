import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { Button } from "../button";
import { Icon } from "../icon";
import { IconButton } from "../icon-button";
import type {
	TitleContentsRightItemFigmaType,
	TitleContentsRightItemIcon,
	TitleContentsRightItemProps,
} from "./TitleContentsRightItem.types";
import { titleContentsRightItemVariants } from "./title-contents-right-item.variants";

const FIGMA_TYPE_BY_TYPE: Record<
	NonNullable<TitleContentsRightItemProps["type"]>,
	TitleContentsRightItemFigmaType
> = {
	icon: "Icon",
	button: "Button",
	type3: "Type3",
};

const ICON_TYPE_BY_ICON: Record<TitleContentsRightItemIcon, "arrow-up"> = {
	arrowUp: "arrow-up",
};

export const TitleContentsRightItem = forwardRef<
	HTMLSpanElement,
	TitleContentsRightItemProps
>(function TitleContentsRightItem(
	{
		className,
		disabled = false,
		icon = "arrowUp",
		label,
		onClick,
		type = "icon",
		"data-figma-render": dataFigmaRender = "component",
		"data-figma-component-id": dataFigmaComponentId = "title-contents-right-item",
		"data-figma-property-type": dataFigmaType,
		...spanProps
	},
	ref,
) {
	const figmaType = dataFigmaType ?? FIGMA_TYPE_BY_TYPE[type];
	const iconType = ICON_TYPE_BY_ICON[icon];
	const iconLabel = label ?? "접기";
	const isInteractiveIcon = type !== "button" && Boolean(onClick);

	return (
		<span
			ref={ref}
			data-figma-render={dataFigmaRender}
			data-figma-component-id={dataFigmaComponentId}
			data-figma-property-type={figmaType}
			data-interactive={isInteractiveIcon ? "" : undefined}
			data-type={type}
			className={cn(titleContentsRightItemVariants({ type }), className)}
			{...spanProps}
		>
			{type === "button" ? (
				<Button
					className="cx-title-contents-right-item__button"
					disabled={disabled}
					onClick={onClick}
					size="small"
					variant="secondary"
					data-figma-render="primitive"
					data-figma-component-id="button"
					data-figma-property-size="Small"
					data-figma-property-variant="Secondary"
				>
					{label ?? "버튼"}
				</Button>
			) : isInteractiveIcon ? (
				<IconButton
					aria-label={iconLabel}
					className="cx-title-contents-right-item__icon-button"
					onClick={onClick}
					size="small"
					variant="plain"
					data-figma-render="primitive"
					data-figma-component-id="icon-button"
				>
					<Icon aria-hidden="true" type={iconType} size={16} />
				</IconButton>
			) : (
				<span
					aria-label={iconLabel}
					className="cx-title-contents-right-item__icon"
					role="img"
				>
					<Icon aria-hidden="true" type={iconType} size={16} />
				</span>
			)}
		</span>
	);
});
