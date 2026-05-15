import { forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Divider } from "../divider";
import { ListTextRightItem } from "../list-text-right-item";
import { Text } from "../text";
import type { ListTextProps } from "./ListText.types";
import { listTextVariants } from "./list-text.variants";

const DEFAULT_TEXT = "본문";
const DEFAULT_RIGHT_ITEM = { type: "icon" } as const;

const boolAttr = (value: boolean) => (value ? "true" : "false");

export const ListText = forwardRef<HTMLDivElement, ListTextProps>(
	function ListText(
		{
			children,
			className,
			rightItem,
			showDivider = false,
			showRightItem,
			table = false,
			tableText,
			text = DEFAULT_TEXT,
			"data-figma-render": dataFigmaRender = "component",
			"data-figma-component-id": dataFigmaComponentId = "list-text",
			"data-figma-property-table": dataFigmaTable,
			"data-figma-property-right-item": dataFigmaRightItem,
			...props
		},
		ref,
	) {
		const resolvedTable = table ? "on" : "off";
		const shouldRenderRightItem =
			!table && showRightItem !== false && rightItem !== false;
		const resolvedRightItem =
			rightItem === undefined || rightItem === false ? DEFAULT_RIGHT_ITEM : rightItem;

		return (
			<div
				ref={ref}
				data-figma-render={dataFigmaRender}
				data-figma-component-id={dataFigmaComponentId}
				data-figma-property-table={dataFigmaTable ?? resolvedTable}
				data-figma-property-right-item={
					dataFigmaRightItem ?? boolAttr(shouldRenderRightItem)
				}
				data-table={resolvedTable}
				data-right-item={boolAttr(shouldRenderRightItem)}
				className={cn(
					listTextVariants({
						table: resolvedTable,
						rightItem: shouldRenderRightItem,
					}),
					className,
				)}
				{...props}
			>
				<div className="list-text__row" data-figma-render="layout">
					<ListTextLabel className="list-text__primary">
						{children ?? text}
					</ListTextLabel>
					{table ? (
						<ListTextLabel className="list-text__table-text">
							{tableText}
						</ListTextLabel>
					) : null}
					{shouldRenderRightItem ? (
						<ListTextRightItem
							{...resolvedRightItem}
							className="list-text__right-item"
						/>
					) : null}
				</div>
				{showDivider ? (
					<Divider
						className="list-text__divider"
						data-figma-render="primitive"
						type="contents"
					/>
				) : null}
			</div>
		);
	},
);

function ListTextLabel({
	children,
	className,
}: {
	children: ReactNode;
	className: string;
}) {
	return (
		<Text
			as="span"
			className={cn("list-text__text", className)}
			data-figma-render="primitive"
			variant="bodySubtle"
		>
			{children}
		</Text>
	);
}
