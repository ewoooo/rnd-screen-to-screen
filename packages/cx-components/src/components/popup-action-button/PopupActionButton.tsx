import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { Button } from "../button";
import type { PopupActionButtonProps } from "./PopupActionButton.types";
import { popupActionButtonVariants } from "./popup-action-button.variants";

export const PopupActionButton = forwardRef<
	HTMLDivElement,
	PopupActionButtonProps
>(function PopupActionButton(
	{
		className,
		options = "2Buttons",
		primaryAction,
		secondaryAction,
		"data-figma-render": dataFigmaRender = "component",
		"data-figma-component-id": dataFigmaComponentId = "popup-action-button",
		"data-figma-property-options": dataFigmaOptions,
		...props
	},
	ref,
) {
	const shouldRenderPrimaryAction = options === "2Buttons" && primaryAction;

	return (
		<div
			ref={ref}
			data-figma-render={dataFigmaRender}
			data-figma-component-id={dataFigmaComponentId}
			data-figma-property-options={dataFigmaOptions ?? options}
			data-options={options}
			className={cn(popupActionButtonVariants({ options }), className)}
			{...props}
		>
			<Button
				variant="secondary"
				size="large"
				fullWidth
				disabled={secondaryAction.disabled}
				onClick={secondaryAction.onClick}
				className="cx-popup-action-button__button cx-popup-action-button__button--secondary"
			>
				{secondaryAction.label}
			</Button>
			{shouldRenderPrimaryAction ? (
				<Button
					variant="primary"
					size="large"
					disabled={primaryAction.disabled}
					onClick={primaryAction.onClick}
					className="cx-popup-action-button__button cx-popup-action-button__button--primary"
				>
					{primaryAction.label}
				</Button>
			) : null}
		</div>
	);
});
