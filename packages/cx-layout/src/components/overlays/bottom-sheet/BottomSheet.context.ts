"use client";

import { createContext, useContext } from "react";

type BottomSheetContextValue = {
	open: boolean;
	setOpen: (open: boolean) => void;
};

export const BottomSheetContext =
	createContext<BottomSheetContextValue | null>(null);

export function useBottomSheet() {
	const context = useContext(BottomSheetContext);

	if (!context) {
		throw new Error("BottomSheet components must be rendered inside BottomSheetRoot.");
	}

	return context;
}
