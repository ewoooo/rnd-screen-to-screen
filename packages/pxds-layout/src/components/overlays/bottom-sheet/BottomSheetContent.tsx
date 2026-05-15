"use client";

import { ModalContainer, ModalContent } from "@wanteddev/wds";
import type { BottomSheetContentProps } from "./BottomSheet.types";
import { BottomSheetBackdrop } from "./BottomSheetBackdrop";
import { bottomSheetVariants } from "./bottom-sheet.variants";

export function BottomSheetContent({
	handle = true,
	peekHeight,
	gap = "var(--spacing-20)",
	backdrop = <BottomSheetBackdrop />,
	children,
}: BottomSheetContentProps) {
	return (
		<ModalContainer
			variant="bottom"
			handle={handle}
			peekHeight={peekHeight}
				dimmer={backdrop}
				wrapperProps={{
					className: bottomSheetVariants(),
					sx: {
						width: "100%",
						height: "100%",
				},
			}}
		>
			<ModalContent
				gap={gap}
				sx={{
					padding:
						"var(--spacing-16) var(--spacing-24) var(--spacing-24)",
				}}
			>
				{children}
			</ModalContent>
		</ModalContainer>
	);
}
