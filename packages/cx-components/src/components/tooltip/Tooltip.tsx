import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { TooltipBubble } from "../tooltip-bubble";
import type { TooltipProps } from "./Tooltip.types";
import { tooltipVariants } from "./tooltip.variants";

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
	{
		children,
		className,
		defaultOpen = false,
		direction = "left",
		open,
		trigger,
		"data-figma-render": dataFigmaRender = "component",
		"data-figma-component-id": dataFigmaComponentId = "tooltip",
		"data-figma-property-direction": dataFigmaDirection,
		...props
	},
	ref,
) {
	const hasTrigger = trigger !== undefined && trigger !== null;
	const isControlled = open !== undefined;
	const resolvedOpen = hasTrigger
		? (isControlled ? open : defaultOpen)
		: true;
	const resolvedDirection = direction ?? "left";
	const shouldRenderBubble = !hasTrigger || !isControlled || resolvedOpen;

	return (
		<div
			ref={ref}
			data-figma-render={dataFigmaRender}
			data-figma-component-id={dataFigmaComponentId}
			data-figma-property-direction={dataFigmaDirection ?? resolvedDirection}
			data-direction={resolvedDirection}
			data-controlled={isControlled ? "" : undefined}
			data-has-trigger={hasTrigger ? "" : undefined}
			data-state={resolvedOpen ? "open" : "closed"}
			className={cn(
				tooltipVariants({ direction: resolvedDirection }),
				className,
			)}
			{...props}
		>
			{hasTrigger ? (
				<span
					className="tooltip__trigger"
					data-figma-render="slot"
					data-figma-property-name="trigger"
				>
					{trigger}
				</span>
			) : null}
			{shouldRenderBubble ? (
				<TooltipBubble
					className="tooltip__bubble"
					direction={resolvedDirection}
				>
					{children}
				</TooltipBubble>
			) : null}
		</div>
	);
});
