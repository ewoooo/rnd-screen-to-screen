"use client";

import { ModalDimmer } from "@wanteddev/wds";
import type { BottomSheetBackdropProps } from "./BottomSheet.types";

export function BottomSheetBackdrop({
	background = "var(--pxds-bottom-sheet-backdrop)",
}: BottomSheetBackdropProps) {
	return (
		<ModalDimmer
			sx={{
				background,
			}}
		/>
	);
}
