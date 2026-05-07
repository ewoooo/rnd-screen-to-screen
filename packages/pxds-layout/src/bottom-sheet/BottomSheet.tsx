"use client";

import type { ComponentProps } from "react";

import { BottomSheetContent } from "./BottomSheetContent";
import { BottomSheetRoot } from "./BottomSheetRoot";

type Props = ComponentProps<typeof BottomSheetRoot> &
	Omit<ComponentProps<typeof BottomSheetContent>, "children">;

export function BottomSheet({
	children,
	handle,
	peekHeight,
	gap,
	backdrop,
	...rootProps
}: Props) {
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
