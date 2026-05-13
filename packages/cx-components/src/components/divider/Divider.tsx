import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import type { DividerProps } from "./Divider.types";
import { dividerVariants } from "./divider.variants";

export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
	{
		className,
		orientation = "horizontal",
		role = "separator",
		type = "contents",
		"data-figma-render": dataFigmaRender = "component",
		"data-figma-component-id": dataFigmaComponentId = "divider",
		"data-figma-property-variant": dataFigmaVariant,
		"data-figma-property-orientation": dataFigmaOrientation,
		...props
	},
	ref,
) {
	const resolvedType = type ?? "contents";
	const resolvedOrientation = orientation ?? "horizontal";

	return (
		<div
			ref={ref}
			role={role}
			data-figma-render={dataFigmaRender}
			data-figma-component-id={dataFigmaComponentId}
			data-figma-property-variant={dataFigmaVariant ?? resolvedType}
			data-figma-property-orientation={
				dataFigmaOrientation ?? resolvedOrientation
			}
			data-type={resolvedType}
			data-orientation={resolvedOrientation}
			className={cn(
				dividerVariants({
					type: resolvedType,
					orientation: resolvedOrientation,
				}),
				className,
			)}
			{...props}
		/>
	);
});
