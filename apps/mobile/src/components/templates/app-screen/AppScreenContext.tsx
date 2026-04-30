"use client";

import { createContext, useContext } from "react";

export type AppScreenContextValue = {
	frame: HTMLDivElement | null;
};

export const AppScreenContext = createContext<AppScreenContextValue>({
	frame: null,
});

export function useAppScreenContext() {
	return useContext(AppScreenContext);
}

export function useMobileFrame() {
	return useAppScreenContext().frame;
}
