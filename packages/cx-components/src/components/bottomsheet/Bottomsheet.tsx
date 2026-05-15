"use client";

import { BottomSheet as LayoutBottomSheet } from "@pxds/pxds-layout/bottom-sheet";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { ActionButton } from "../action-button";
import { Handle } from "../handle";
import { TitleBottomSheet } from "../title-bottom-sheet";
import type {
	BottomsheetActionButtonValue,
	BottomsheetProps,
} from "./Bottomsheet.types";
import { bottomsheetVariants } from "./bottomsheet.variants";

const boolAttr = (value: boolean) => (value ? "true" : "false");

function resolveActionButton(
	actionButton: BottomsheetActionButtonValue | undefined,
) {
	if (actionButton === false || actionButton === "off") {
		return "off";
	}

	return "on";
}

export const Bottomsheet = forwardRef<HTMLDivElement, BottomsheetProps>(
	function Bottomsheet(
		{
			action,
			actionButton = "on",
			actionButtonProps,
			actionClassName,
			actions,
			backdrop,
			children,
			className,
			content,
			contentClassName,
			defaultOpen,
			gap,
			handle = true,
			onOpenChange,
			open,
			peekHeight,
			showTitleBottomSheet = true,
			title,
			titleBottomSheet,
			titleBottomSheetProps,
			"data-figma-render": dataFigmaRender = "component",
			"data-figma-component-id": dataFigmaComponentId = "bottomsheet",
			"data-figma-property-action-button": dataFigmaActionButton,
			"data-figma-property-show-title-bottom-sheet":
				dataFigmaShowTitleBottomSheet,
			"data-figma-property-con": dataFigmaCon,
			...props
		},
		ref,
	) {
		const resolvedActionButton = resolveActionButton(actionButton);
		const shouldShowTitleBottomSheet = showTitleBottomSheet;
		const shouldShowActionButton = resolvedActionButton === "on";
		const con = content ?? children;
			const renderedAction =
				action ??
				(actions ? (
					<ActionButton
						{...actionButtonProps}
						actions={actions}
						className="bottomsheet__action-button"
					/>
				) : null);

		return (
			<LayoutBottomSheet
				open={open}
				defaultOpen={defaultOpen}
				onOpenChange={onOpenChange}
				handle={false}
				peekHeight={peekHeight}
				gap={gap}
				backdrop={backdrop}
			>
				<div
					ref={ref}
					data-figma-render={dataFigmaRender}
					data-figma-component-id={dataFigmaComponentId}
					data-figma-property-action-button={
						dataFigmaActionButton ?? resolvedActionButton
					}
					data-figma-property-show-title-bottom-sheet={
						dataFigmaShowTitleBottomSheet ??
						boolAttr(shouldShowTitleBottomSheet)
					}
					data-action-button={resolvedActionButton}
					data-show-title-bottom-sheet={boolAttr(
						shouldShowTitleBottomSheet,
					)}
					data-handle={boolAttr(handle)}
					className={cn(
						bottomsheetVariants({
							actionButton: resolvedActionButton,
							showTitleBottomSheet: shouldShowTitleBottomSheet,
							handle,
						}),
						className,
					)}
					{...props}
				>
					{handle ? <Handle className="bottomsheet__handle" /> : null}
					{shouldShowTitleBottomSheet ? (
						<div
							className="bottomsheet__title"
							data-figma-render="layout"
							data-figma-property-name="title"
						>
							{titleBottomSheet ?? (
								<TitleBottomSheet
									{...titleBottomSheetProps}
									title={title}
								/>
							)}
						</div>
					) : null}
					<div
							className={cn("bottomsheet__con", contentClassName)}
							data-figma-render="slot"
							data-figma-property-con={dataFigmaCon ?? "slot"}
							data-figma-property-name="con"
						>
						{con}
					</div>
					{shouldShowActionButton ? (
						<div
							className={cn("bottomsheet__action", actionClassName)}
							data-figma-render="slot"
							data-figma-property-name="action-button"
						>
							{renderedAction}
						</div>
					) : null}
				</div>
			</LayoutBottomSheet>
		);
	},
);
