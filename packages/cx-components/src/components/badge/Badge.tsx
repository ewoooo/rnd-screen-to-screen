import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import type { BadgeProps } from "./Badge.types";
import { type BadgeType, badgeVariants } from "./badge.variants";

const FIGMA_TYPE: Record<BadgeType, string> = {
	gray: "Gray",
	black: "Black",
	blue: "Blue",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
	{
		children,
		className,
		text = "Badge",
		type = "gray",
		"data-node-kind": dataNodeKind = "component",
		"data-component-id": dataComponentId = "badge",
		"data-figma-component": dataFigmaComponent = "Badge",
		"data-figma-type": dataFigmaType,
		...props
	},
	ref,
) {
	const resolvedType = type ?? "gray";

	return (
		<span
			ref={ref}
			data-node-kind={dataNodeKind}
			data-component-id={dataComponentId}
			data-figma-component={dataFigmaComponent}
			data-figma-type={dataFigmaType ?? FIGMA_TYPE[resolvedType]}
			data-type={resolvedType}
			className={cn(badgeVariants({ type: resolvedType }), className)}
			{...props}
		>
			{children ?? text}
		</span>
	);
});
