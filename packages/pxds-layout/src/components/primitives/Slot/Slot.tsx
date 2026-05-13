import { type CSSProperties, forwardRef } from "react";
import type { SlotAlign, SlotProps } from "./Slot.types";
import { VStack } from "../VStack";

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
			data-figma-layout-slot="true"
			data-node-kind="layout-slot"
		>
			{children}
		</VStack>
	);
});
