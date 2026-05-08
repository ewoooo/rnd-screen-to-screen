"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { ScreenRoute } from "@screen/registry";

import { usePageGroups } from "@/hooks/use-page-groups";
import type { PageGroups } from "@/utils/page-groups";

type PageRegistryContextValue = {
	pages: readonly ScreenRoute[];
	defaultPage: ScreenRoute;
	selectedRoute: ScreenRoute;
	selectedRoutePath: ScreenRoute["route"];
	selectRoute: (route: ScreenRoute["route"]) => void;
	groups: ReturnType<typeof usePageGroups>["groups"];
	groupedPages: PageGroups;
	getPageByRoute: (route: ScreenRoute["route"]) => ScreenRoute | undefined;
};

const PageRegistryContext = createContext<PageRegistryContextValue | null>(null);

export function PageRegistryProvider({ children }: { children: ReactNode }) {
	const { pages, defaultPage, groups, groupedPages, getPageByRoute } =
		usePageGroups();
	const [selectedRoutePath, setSelectedRoutePath] = useState<
		ScreenRoute["route"]
	>(defaultPage.route);
	const selectedRoute = getPageByRoute(selectedRoutePath) ?? defaultPage;

	return (
		<PageRegistryContext.Provider
			value={{
				pages,
				defaultPage,
				selectedRoute,
				selectedRoutePath,
				selectRoute: setSelectedRoutePath,
				groups,
				groupedPages,
				getPageByRoute,
			}}
		>
			{children}
		</PageRegistryContext.Provider>
	);
}

export function usePageRegistry() {
	const context = useContext(PageRegistryContext);

	if (!context) {
		throw new Error("usePageRegistry must be used within PageRegistryProvider.");
	}

	return context;
}
