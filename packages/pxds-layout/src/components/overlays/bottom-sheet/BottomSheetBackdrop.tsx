"use client";

import { useBottomSheet } from "./BottomSheet.context";
import type { BottomSheetBackdropProps } from "./BottomSheet.types";

export function BottomSheetBackdrop({
	background = "var(--pxds-bottom-sheet-backdrop)",
}: BottomSheetBackdropProps) {
	const { setOpen } = useBottomSheet();

	return (
		<button
			type="button"
			aria-label="Close bottom sheet"
			className="pxds-bottom-sheet__backdrop"
			style={{
				background,
			}}
			onClick={() => setOpen(false)}
		/>
	);
}
