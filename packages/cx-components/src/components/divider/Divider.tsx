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
		"data-node-kind": dataNodeKind = "component",
		"data-component-id": dataComponentId = "cx-divider",
		"data-figma-component": dataFigmaComponent = "Divider",
		"data-figma-variant": dataFigmaVariant,
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
			data-node-kind={dataNodeKind}
			data-component-id={dataComponentId}
			data-figma-component={dataFigmaComponent}
			data-figma-variant={dataFigmaVariant ?? resolvedType}
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
