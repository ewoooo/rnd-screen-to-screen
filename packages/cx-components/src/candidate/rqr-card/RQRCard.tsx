import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import type { RQRCardProps } from "./RQRCard.types";
import { rqrCardVariants } from "./rqr-card.variants";

export const RQRCard = forwardRef<HTMLDivElement, RQRCardProps>(
	function RQRCard(
		{
			children,
			className,
			padding = "none",
			"data-figma-render": dataFigmaRender = "component",
			"data-figma-component-id": dataFigmaComponentId = "rqr-card",
			"data-figma-property-padding": dataFigmaPadding,
			...props
		},
		ref,
	) {
		return (
			<div
				ref={ref}
				data-figma-render={dataFigmaRender}
				data-figma-component-id={dataFigmaComponentId}
				data-figma-property-padding={dataFigmaPadding ?? padding ?? "none"}
				className={cn(rqrCardVariants({ padding }), className)}
				{...props}
			>
				{children}
			</div>
		);
	},
);
