import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import type { BadgeProps } from "./Badge.types";
import { badgeVariants } from "./badge.variants";

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
	{
		children,
		className,
		text = "Badge",
		type = "gray",
		"data-figma-render": dataFigmaRender = "component",
		"data-figma-component-id": dataFigmaComponentId,
		"data-figma-property-type": dataFigmaType,
		...props
	},
	ref,
) {
	const resolvedType = type ?? "gray";
	const resolvedComponentId =
		dataFigmaComponentId ?? (dataFigmaRender === "component" ? "badge" : undefined);

	return (
		<span
			ref={ref}
			data-figma-render={dataFigmaRender}
			data-figma-component-id={resolvedComponentId}
			data-figma-property-type={dataFigmaType ?? resolvedType}
			data-type={resolvedType}
			className={cn(badgeVariants({ type: resolvedType }), className)}
			{...props}
		>
			{children ?? text}
		</span>
	);
});
