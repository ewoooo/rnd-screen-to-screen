import { actionButtonLeftItemAssets } from "@pxds/cx-icons/action-button";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import type { ActionButtonLeftItemProps } from "./ActionButtonLeftItem.types";
import { actionButtonLeftItemVariants } from "./action-button-left-item.variants";

export const ActionButtonLeftItem = forwardRef<
	HTMLSpanElement,
	ActionButtonLeftItemProps
>(function ActionButtonLeftItem(
	{
		className,
		type = "ai-gift",
		"aria-hidden": ariaHidden = true,
		"data-figma-render": dataFigmaRender = "component",
		"data-figma-component-id": dataFigmaComponentId = "action-button-left-item",
		"data-figma-property-type": dataFigmaType,
		...props
	},
	ref,
) {
	const showGift = type === "ai-gift";

	return (
		<span
			ref={ref}
			aria-hidden={ariaHidden}
			data-figma-render={dataFigmaRender}
			data-figma-component-id={dataFigmaComponentId}
			data-figma-property-type={dataFigmaType ?? type}
			data-type={type}
			className={cn(actionButtonLeftItemVariants({ type }), className)}
			{...props}
		>
			<img
				className="action-button-left-item__icon"
				src={actionButtonLeftItemAssets.ai}
				alt=""
				width="22"
				height="22"
				draggable={false}
			/>
			<img
				className="action-button-left-item__divider"
				src={actionButtonLeftItemAssets.div}
				alt=""
				width="1"
				height="8"
				draggable={false}
			/>
			{showGift ? (
				<img
					className="action-button-left-item__icon"
					src={actionButtonLeftItemAssets.gift}
					alt=""
					width="22"
					height="22"
					draggable={false}
				/>
			) : null}
		</span>
	);
});
