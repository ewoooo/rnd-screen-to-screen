import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { Checkbox } from "../checkbox";
import {
	ListSelectedRightItem,
	type ListSelectedRightItemProps,
} from "../list-selected-right-item";
import { RadioButton } from "../radio-button";
import { Text } from "../text";
import type { ListSelectedProps } from "./ListSelected.types";
import { listSelectedVariants } from "./list-selected.variants";

const DEFAULT_RIGHT_ITEM: ListSelectedRightItemProps = {
	type: "buttonXsmallSolid",
};

const boolAttr = (value: boolean) => (value ? "true" : "false");

export const ListSelected = forwardRef<HTMLDivElement, ListSelectedProps>(
	function ListSelected(
		{
			checked = true,
			className,
			disabled = false,
			label,
			onChange,
			rightItem,
			showListSelectedRightItem,
			showSubText,
			subText,
			type = "radio",
			"data-figma-render": dataFigmaRender = "component",
			"data-figma-component-id": dataFigmaComponentId = "list-selected",
			"data-figma-property-type": dataFigmaType,
			"data-figma-property-show-list-selected-right-item": dataFigmaShowRightItem,
			"data-figma-property-show-sub-text": dataFigmaShowSubText,
			...props
		},
		ref,
	) {
		const shouldRenderSubText = showSubText ?? Boolean(subText);
		const shouldRenderRightItem =
			showListSelectedRightItem ?? rightItem !== null;
		const resolvedRightItem = rightItem ?? DEFAULT_RIGHT_ITEM;

		return (
			<div
				ref={ref}
				data-figma-render={dataFigmaRender}
				data-figma-component-id={dataFigmaComponentId}
				data-figma-property-type={dataFigmaType ?? type}
				data-figma-property-show-list-selected-right-item={
					dataFigmaShowRightItem ?? boolAttr(shouldRenderRightItem)
				}
				data-figma-property-show-sub-text={
					dataFigmaShowSubText ?? boolAttr(shouldRenderSubText)
				}
				data-type={type}
				data-disabled={disabled ? "" : undefined}
				className={cn(
					listSelectedVariants({
						type,
						rightItem: shouldRenderRightItem,
						subText: shouldRenderSubText,
					}),
					className,
				)}
				{...props}
			>
				<div className="list-selected__content" data-figma-render="layout">
					<div className="list-selected__label-group" data-figma-render="layout">
						{type === "radio" ? (
							<RadioButton
								checked={checked}
								className="list-selected__control"
								disabled={disabled}
								onCheckedChange={onChange}
								data-figma-render="primitive"
							/>
						) : (
							<Checkbox
								checked={checked}
								className="list-selected__control"
								disabled={disabled}
								onCheckedChange={onChange}
								data-figma-render="primitive"
							/>
						)}
						<Text
							as="span"
							className="list-selected__label"
							data-figma-render="primitive"
							variant="label"
						>
							{label}
						</Text>
					</div>
					{shouldRenderSubText ? (
						<Text
							as="span"
							className="list-selected__sub-text"
							data-figma-render="primitive"
							variant="label"
						>
							{subText}
						</Text>
					) : null}
				</div>
				{shouldRenderRightItem ? (
					<ListSelectedRightItem
						{...resolvedRightItem}
						className={cn(
							"list-selected__right-item",
							resolvedRightItem.className,
						)}
						disabled={resolvedRightItem.disabled ?? disabled}
					/>
				) : null}
			</div>
		);
	},
);
