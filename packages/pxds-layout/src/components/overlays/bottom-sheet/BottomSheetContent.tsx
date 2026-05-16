"use client";

import { type CSSProperties, useEffect, useRef } from "react";
import { useBottomSheet } from "./BottomSheet.context";
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
	const { open, setOpen } = useBottomSheet();
	const dialogRef = useRef<HTMLDivElement>(null);
	const contentStyle = {
		"--pxds-bottom-sheet-gap": gap,
		"--pxds-bottom-sheet-peek-height":
			peekHeight !== undefined ? `${peekHeight}px` : undefined,
	} as CSSProperties;

	useEffect(() => {
		if (!open) {
			return;
		}

		dialogRef.current?.focus();
	}, [open]);

	useEffect(() => {
		if (!open) {
			return;
		}

		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setOpen(false);
			}
		}

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [open, setOpen]);

	if (!open) {
		return null;
	}

	return (
		<div
			className={bottomSheetVariants()}
			role="dialog"
			aria-modal="true"
			tabIndex={-1}
			ref={dialogRef}
		>
			{backdrop}
			<div className="pxds-bottom-sheet__surface" style={contentStyle}>
				{handle ? <div className="pxds-bottom-sheet__handle" /> : null}
				{children}
			</div>
		</div>
	);
}
