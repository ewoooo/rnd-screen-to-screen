import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { Badge } from "../badge";
import { Icon, isRecolorableIconType } from "../icon";
import { Text } from "../text";
import type { TitleSectionLeftItemProps } from "./TitleSectionLeftItem.types";
import { titleSectionLeftItemVariants } from "./title-section-left-item.variants";

export const TitleSectionLeftItem = forwardRef<
	HTMLSpanElement,
	TitleSectionLeftItemProps
>(function TitleSectionLeftItem(props, ref) {
	if (props.type === "icon") {
		const {
			className,
			iconType,
			iconSize = 20,
			iconColor,
			label,
			type,
			"data-figma-render": dataFigmaRender = "primitive",
			"data-figma-component-id": dataFigmaComponentId,
			"data-figma-property-left-item-type": dataFigmaLeftItemType,
			...spanProps
		} = props;

		return (
			<span
				ref={ref}
				className={cn(titleSectionLeftItemVariants({ type }), className)}
				data-figma-render={dataFigmaRender}
				data-figma-component-id={dataFigmaComponentId}
				data-figma-property-left-item-type={dataFigmaLeftItemType ?? type}
				data-type={type}
				{...(label ? { "aria-label": label, role: "img" } : {})}
				{...spanProps}
			>
				{iconColor && isRecolorableIconType(iconType) ? (
					<Icon type={iconType} size={iconSize} color={iconColor} />
				) : (
					<Icon type={iconType} size={iconSize} />
				)}
			</span>
		);
	}

	if (props.type === "badge") {
		const {
			className,
			text,
			badgeType,
			type,
			"data-figma-render": dataFigmaRender = "primitive",
			"data-figma-component-id": dataFigmaComponentId,
			"data-figma-property-left-item-type": dataFigmaLeftItemType,
			...spanProps
		} = props;

		return (
			<span
				ref={ref}
				className={cn(titleSectionLeftItemVariants({ type }), className)}
				data-figma-render={dataFigmaRender}
				data-figma-component-id={dataFigmaComponentId}
				data-figma-property-left-item-type={dataFigmaLeftItemType ?? type}
				data-type={type}
				{...spanProps}
			>
				<Badge
					className="cx-title-section-left-item__badge"
					data-figma-render="primitive"
					text={text}
					type={badgeType}
				/>
			</span>
		);
	}

	const {
		className,
		text,
		type = "text",
		"data-figma-render": dataFigmaRender = "primitive",
		"data-figma-component-id": dataFigmaComponentId,
		"data-figma-property-left-item-type": dataFigmaLeftItemType,
		...spanProps
	} = props;

	return (
		<span
			ref={ref}
			className={cn(titleSectionLeftItemVariants({ type }), className)}
			data-figma-render={dataFigmaRender}
			data-figma-component-id={dataFigmaComponentId}
			data-figma-property-left-item-type={dataFigmaLeftItemType ?? type}
			data-type={type}
			{...spanProps}
		>
			<Text
				as="span"
				className="cx-title-section-left-item__text"
				data-figma-render="primitive"
				variant="listTitle"
			>
				{text}
			</Text>
		</span>
	);
});
