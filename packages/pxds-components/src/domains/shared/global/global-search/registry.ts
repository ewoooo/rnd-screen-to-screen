export const globalSearchRegistryEntry = {
	id: "global-search",
	name: "GlobalSearch",
	layer: "organism",
	owner: "@pxds/pxds-components",
	importPath: "@pxds/pxds-components/shared/global",
	group: "search",
	status: "active",
	createdAt: "2026-04-30",
	composedOf: [
		"app-screen",
		"global-navigation-bar",
		"query-bar",
		"search-result-tabs",
		"wds-top-navigation",
		"wds-top-navigation-button",
	],
} as const;
