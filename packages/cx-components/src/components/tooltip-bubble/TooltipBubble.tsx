import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import type { TooltipBubbleProps } from "./TooltipBubble.types";
import { tooltipBubbleVariants } from "./tooltip-bubble.variants";

export const TooltipBubble = forwardRef<HTMLDivElement, TooltipBubbleProps>(
	function TooltipBubble(
		{
			children,
			className,
			direction = "left",
			"data-figma-render": dataFigmaRender = "component",
			"data-figma-component-id": dataFigmaComponentId = "tooltip-bubble",
			"data-figma-property-direction": dataFigmaDirection,
			...props
		},
		ref,
	) {
		const resolvedDirection = direction ?? "left";

		return (
			<div
				ref={ref}
				data-figma-render={dataFigmaRender}
				data-figma-component-id={dataFigmaComponentId}
				data-figma-property-direction={dataFigmaDirection ?? resolvedDirection}
				data-direction={resolvedDirection}
				className={cn(
					tooltipBubbleVariants({ direction: resolvedDirection }),
					className,
				)}
				{...props}
			>
				<div
					className="tooltip-bubble__bubble"
					data-figma-render="slot"
					data-figma-property-name="bubble"
				>
					{children}
				</div>
				<div
					className="tooltip-bubble__tail-wrap"
					data-figma-render="slot"
					data-figma-property-name="tail"
				>
					<span aria-hidden="true" className="tooltip-bubble__tail" />
				</div>
			</div>
		);
	},
);
