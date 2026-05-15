import { type CSSProperties, forwardRef } from "react";
import { VStack } from "../VStack";
import type { SlotAlign, SlotProps } from "./Slot.types";

const ALIGN_ITEMS: Record<SlotAlign, CSSProperties["alignItems"]> = {
	start: "flex-start",
	center: "center",
	end: "flex-end",
	stretch: "stretch",
};

export const Slot = forwardRef<HTMLDivElement, SlotProps>(function Slot(
	{
		align = "stretch",
		children,
		className,
		gap,
		name,
		"data-figma-render": dataFigmaRender = "slot",
		"data-figma-property-name": dataFigmaPropertyName,
		"data-figma-layout-kind": dataFigmaLayoutKind = "primitive",
		"data-figma-layout-layer": dataFigmaLayoutLayer = "slot",
		"data-figma-layout-slot": dataFigmaLayoutSlot,
		"data-figma-layout-auto": dataFigmaLayoutAuto = "true",
		"data-figma-layout-direction": dataFigmaLayoutDirection = "vertical",
		"data-figma-layout-align": dataFigmaLayoutAlign,
		"data-figma-layout-gap": dataFigmaLayoutGap,
		...props
	},
	ref,
) {
	return (
		<VStack
			ref={ref}
			className={className}
			gap={gap}
			align={ALIGN_ITEMS[align]}
			width="100%"
			data-slot={name}
			data-figma-render={dataFigmaRender}
			data-figma-property-name={dataFigmaPropertyName ?? name}
			data-figma-layout-kind={dataFigmaLayoutKind}
			data-figma-layout-layer={dataFigmaLayoutLayer}
			data-figma-layout-slot={dataFigmaLayoutSlot ?? name}
			data-figma-layout-auto={dataFigmaLayoutAuto}
			data-figma-layout-direction={dataFigmaLayoutDirection}
			data-figma-layout-align={dataFigmaLayoutAlign ?? align}
			data-figma-layout-gap={dataFigmaLayoutGap ?? stringifyToken(gap)}
			{...props}
		>
			{children}
		</VStack>
	);
});

function stringifyToken(value: number | string | undefined) {
	return value === undefined ? undefined : String(value);
}
