import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { checkboxVariants } from "../checkbox/checkbox.variants";
import {
	ListSelectedRightItem,
	type ListSelectedRightItemProps,
} from "../list-selected-right-item";
import { radioButtonVariants } from "../radio-button/radio-button.variants";
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
		const resolvedType = type ?? "radio";

		return (
			<div
				ref={ref}
				data-figma-render={dataFigmaRender}
				data-figma-component-id={dataFigmaComponentId}
				data-figma-property-type={dataFigmaType ?? resolvedType}
				data-figma-property-show-list-selected-right-item={
					dataFigmaShowRightItem ?? boolAttr(shouldRenderRightItem)
				}
				data-figma-property-show-sub-text={
					dataFigmaShowSubText ?? boolAttr(shouldRenderSubText)
				}
				data-type={resolvedType}
				data-disabled={disabled ? "" : undefined}
				className={cn(
					listSelectedVariants({
						type: resolvedType,
						rightItem: shouldRenderRightItem,
						subText: shouldRenderSubText,
					}),
					className,
				)}
				{...props}
			>
				<div className="list-selected__content" data-figma-render="layout">
					<label className="list-selected__label-group" data-figma-render="layout">
						<input
							type={resolvedType}
							checked={checked}
							className={
								resolvedType === "radio"
									? "radio-button__input"
									: "checkbox__input"
							}
							disabled={disabled}
							onChange={(event) => onChange?.(event.currentTarget.checked)}
							readOnly={onChange ? undefined : true}
						/>
						<span
							className={cn(
								"list-selected__control",
								resolvedType === "radio"
									? radioButtonVariants({ checked, disabled, text: false })
									: checkboxVariants({ checked, disabled, text: false }),
							)}
							data-figma-render="primitive"
							data-figma-component-id={
								resolvedType === "radio" ? "radio-button" : "checkbox"
							}
							data-figma-property-checked={boolAttr(checked)}
							data-figma-property-text="false"
							data-figma-property-disabled={boolAttr(disabled)}
							data-checked={boolAttr(checked)}
							data-text="false"
							data-disabled={boolAttr(disabled)}
						>
							<span
								className={
									resolvedType === "radio"
										? "radio-button__control"
										: "checkbox__control"
								}
								aria-hidden="true"
							/>
						</span>
						<Text
							as="span"
							className="list-selected__label"
							data-figma-render="primitive"
							variant="label"
						>
							{label}
						</Text>
					</label>
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
