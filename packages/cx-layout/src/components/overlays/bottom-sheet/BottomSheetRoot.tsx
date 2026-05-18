"use client";

import { useEffect, useState } from "react";
import { BottomSheetContext } from "./BottomSheet.context";
import type { BottomSheetRootProps } from "./BottomSheet.types";

export function BottomSheetRoot({
	open,
	defaultOpen,
	onOpenChange,
	children,
}: BottomSheetRootProps) {
	const [mounted, setMounted] = useState(false);
	const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen ?? false);
	const isControlled = open !== undefined;
	const currentOpen = isControlled ? open : uncontrolledOpen;
	const context = {
		open: currentOpen,
		setOpen(nextOpen: boolean) {
			if (!isControlled) {
				setUncontrolledOpen(nextOpen);
			}
			onOpenChange?.(nextOpen);
		},
	};

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!currentOpen) {
			return;
		}

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = previousOverflow;
		};
	}, [currentOpen]);

	if (!mounted) {
		return null;
	}

	return (
		<BottomSheetContext.Provider value={context}>
			{children}
		</BottomSheetContext.Provider>
	);
}
