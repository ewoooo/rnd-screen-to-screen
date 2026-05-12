import { dividerFigmaSpec } from "./divider.figma";

export const dividerRegistryEntry = {
	id: "divider",
	name: "Divider",
	layer: "atom",
	owner: "@pxds/pxds-components",
	importPath: "@pxds/pxds-components/atoms/feedback",
	group: "feedback",
	status: "active",
	createdAt: "2026-04-30",
	figmaSpec: () => dividerFigmaSpec,
} as const;
