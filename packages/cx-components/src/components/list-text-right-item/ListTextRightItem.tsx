import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { Badge } from "../badge";
import { Icon } from "../icon";
import { IconButton } from "../icon-button";
import { Text } from "../text";
import type {
	ListTextRightItemLevel,
	ListTextRightItemPreset,
	ListTextRightItemProps,
} from "./ListTextRightItem.types";
import {
	type ListTextRightItemFigmaType,
	type ListTextRightItemType,
	listTextRightItemVariants,
} from "./list-text-right-item.variants";

const DEFAULT_LEVELS = ["v", "g", "s"] as const;

const FIGMA_TYPE_BY_TYPE = {
	text: "Text",
	badge: "Badge",
	badgeLevel: "BadgeLevel",
	textButton: "TextButton",
	icon: "Icon",
} satisfies Record<ListTextRightItemType, ListTextRightItemFigmaType>;

const LEVEL_BADGE_TYPE = {
	v: "black",
	g: "blue",
	s: "gray",
} as const satisfies Record<ListTextRightItemLevel, "black" | "blue" | "gray">;

const LEVEL_LABEL = {
	v: "V",
	g: "G",
	s: "S",
} as const satisfies Record<ListTextRightItemLevel, string>;

export const ListTextRightItem = forwardRef<
	HTMLSpanElement,
	ListTextRightItemProps
>(function ListTextRightItem(props, ref) {
	const {
		className,
		type = "text",
		"data-figma-render": dataFigmaRender = "component",
		"data-figma-component-id": dataFigmaComponentId = "list-text-right-item",
		"data-figma-property-type": dataFigmaType,
	} = props;
	const resolvedType = type ?? "text";
	const item = { ...props, type: resolvedType } as ListTextRightItemPreset & {
		type: ListTextRightItemType;
	};

	return (
		<span
			ref={ref}
			data-figma-render={dataFigmaRender}
			data-figma-component-id={dataFigmaComponentId}
			data-figma-property-type={
				dataFigmaType ?? FIGMA_TYPE_BY_TYPE[resolvedType]
			}
			data-type={resolvedType}
			className={cn(listTextRightItemVariants({ type: resolvedType }), className)}
			{...getRootProps(props)}
		>
			{renderRightItem(item)}
		</span>
	);
});

function getRootProps(props: ListTextRightItemProps) {
	const {
		"data-figma-component-id": _dataFigmaComponentId,
		"data-figma-property-type": _dataFigmaType,
		"data-figma-render": _dataFigmaRender,
		ariaLabel: _ariaLabel,
		children: _children,
		className: _className,
		icon: _icon,
		levels: _levels,
		onClick: _onClick,
		text: _text,
		type: _type,
		...rootProps
	} = props as ListTextRightItemProps & {
		ariaLabel?: string;
		icon?: "arrow-right";
		badgeType?: "gray" | "black" | "blue";
		levels?: ListTextRightItemLevel[];
		onClick?: () => void;
		text?: string;
	};

	return rootProps;
}

function renderRightItem(
	props: ListTextRightItemPreset & { type: ListTextRightItemType },
) {
	if (props.type === "badgeLevel") {
		const levels: readonly ListTextRightItemLevel[] =
			props.levels ?? DEFAULT_LEVELS;

		return levels.map((level) => (
			<Badge
				key={level}
				className="list-text-right-item__level-badge"
				data-figma-render="primitive"
				data-figma-property-level={level}
				text={LEVEL_LABEL[level]}
				type={LEVEL_BADGE_TYPE[level]}
			/>
		));
	}

	if (props.type === "badge") {
		return (
			<Badge
				className="list-text-right-item__badge"
				data-figma-render="primitive"
				text={props.text}
				type={props.badgeType ?? "gray"}
			/>
		);
	}

	if (props.type === "textButton") {
		const content = (
			<>
				<Text
					as="span"
					className="list-text-right-item__text"
					data-figma-render="primitive"
					variant="bodySubtle"
				>
					{props.text}
				</Text>
				<Icon
					aria-hidden
					className="list-text-right-item__icon"
					color="tertiary"
					size={16}
					type="arrow-right"
				/>
			</>
		);

		if (props.onClick) {
			return (
				<button
					aria-label={props.ariaLabel}
					className="list-text-right-item__text-button"
					data-figma-render="primitive"
					onClick={props.onClick}
					type="button"
				>
					{content}
				</button>
			);
		}

		return (
			<span
				className="list-text-right-item__text-button"
				data-figma-render="primitive"
			>
				{content}
			</span>
		);
	}

	if (props.type === "icon") {
		const icon = (
			<Icon
				aria-hidden
				className="list-text-right-item__icon"
				color="tertiary"
				size={16}
				type={props.icon ?? "arrow-right"}
			/>
		);

		if (props.onClick) {
			return (
				<IconButton
					aria-label={props.ariaLabel}
					className="list-text-right-item__icon-button"
					data-figma-render="primitive"
					onClick={props.onClick}
					size="small"
					variant="plain"
				>
					{icon}
				</IconButton>
			);
		}

		return icon;
	}

	return (
		<Text
			as="span"
			className="list-text-right-item__text"
			data-figma-render="primitive"
			variant="bodySubtle"
		>
			{props.text}
		</Text>
	);
}
