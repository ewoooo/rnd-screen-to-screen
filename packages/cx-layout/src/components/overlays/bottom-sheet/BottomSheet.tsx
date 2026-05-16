"use client";

import type { BottomSheetProps } from "./BottomSheet.types";
import { BottomSheetContent } from "./BottomSheetContent";
import { BottomSheetRoot } from "./BottomSheetRoot";

export function BottomSheet({
	children,
	handle,
	peekHeight,
	gap,
	backdrop,
	...rootProps
}: BottomSheetProps) {
	return (
		<BottomSheetRoot {...rootProps}>
			<BottomSheetContent
				handle={handle}
				peekHeight={peekHeight}
				gap={gap}
				backdrop={backdrop}
			>
				{children}
			</BottomSheetContent>
		</BottomSheetRoot>
	);
}
