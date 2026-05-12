"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { ScreenRoute } from "@screen/mobile/screens";

import { useScreenGroups } from "@/hooks/use-screen-groups";
import type { ScreenGroups } from "@/utils/screen-groups";

type ScreenRegistryContextValue = {
	screens: readonly ScreenRoute[];
	defaultScreen: ScreenRoute;
	selectedRoute: ScreenRoute;
	selectedRoutePath: ScreenRoute["route"];
	selectRoute: (route: ScreenRoute["route"]) => void;
	groups: ReturnType<typeof useScreenGroups>["groups"];
	groupedScreens: ScreenGroups;
	getScreenByRoute: (route: ScreenRoute["route"]) => ScreenRoute | undefined;
};

const ScreenRegistryContext = createContext<ScreenRegistryContextValue | null>(null);

export function ScreenRegistryProvider({ children }: { children: ReactNode }) {
	const { screens, defaultScreen, groups, groupedScreens, getScreenByRoute } =
		useScreenGroups();
	const [selectedRoutePath, setSelectedRoutePath] = useState<
		ScreenRoute["route"]
	>(() => getInitialSelectedRoutePath(defaultScreen.route, getScreenByRoute));
	const selectedRoute = getScreenByRoute(selectedRoutePath) ?? defaultScreen;

	return (
		<ScreenRegistryContext.Provider
			value={{
				screens,
				defaultScreen,
				selectedRoute,
				selectedRoutePath,
				selectRoute: setSelectedRoutePath,
				groups,
				groupedScreens,
				getScreenByRoute,
			}}
		>
			{children}
		</ScreenRegistryContext.Provider>
	);
}

function getInitialSelectedRoutePath(
	defaultRoute: ScreenRoute["route"],
	getScreenByRoute: (route: ScreenRoute["route"]) => ScreenRoute | undefined,
) {
	if (typeof window === "undefined") return defaultRoute;

	const route = new URLSearchParams(window.location.search).get("route");
	if (!route?.startsWith("/")) return defaultRoute;

	return getScreenByRoute(route as ScreenRoute["route"])?.route ?? defaultRoute;
}

export function useScreenRegistry() {
	const context = useContext(ScreenRegistryContext);

	if (!context) {
		throw new Error("useScreenRegistry must be used within ScreenRegistryProvider.");
	}

	return context;
}
