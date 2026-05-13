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
	{ align = "stretch", children, className, gap, name },
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
			data-layout-slot="true"
			data-figma-render="slot"
			data-figma-property-name={name}
		>
			{children}
		</VStack>
	);
});
