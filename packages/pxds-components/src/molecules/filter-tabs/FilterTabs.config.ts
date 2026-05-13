import { filterTabsFigmaSpec } from "./filter-tabs.figma";

export const filterTabsRegistryEntry = {
	id: "filter-tabs",
	name: "FilterTabs",
	layer: "molecule",
	owner: "@pxds/pxds-components",
	importPath: "@pxds/pxds-components/molecules/filter-tabs",
	group: "selection",
	status: "active",
	createdAt: "2026-04-30",
	figmaSpec: () => filterTabsFigmaSpec,
	composedOf: [
		"tab",
		"tab-list",
		"tab-list-item",
	],
} as const;
