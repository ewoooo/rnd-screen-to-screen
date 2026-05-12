import { queryBarFigmaSpec } from "./query-bar.figma";

export const queryBarRegistryEntry = {
	id: "query-bar",
	name: "QueryBar",
	layer: "molecule",
	owner: "@pxds/pxds-components",
	importPath: "@pxds/pxds-components/molecules/query-bar",
	group: "form",
	status: "active",
	createdAt: "2026-04-30",
	figmaSpec: () => queryBarFigmaSpec,
	composedOf: ["wds-search-field"],
} as const;
