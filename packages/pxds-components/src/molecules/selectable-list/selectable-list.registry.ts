import { selectableListFigmaSpec } from "./selectable-list.figma";

export const selectableListRegistryEntry = {
	id: "selectable-list",
	name: "SelectableList",
	layer: "molecule",
	owner: "@pxds/pxds-components",
	importPath: "@pxds/pxds-components/molecules/selectable-list",
	group: "selection",
	status: "active",
	createdAt: "2026-04-30",
	figmaSpec: () => selectableListFigmaSpec,
	composedOf: [
		"wds-list",
		"wds-list-cell",
		"wds-radio-group",
		"wds-checkbox",
		"wds-chip",
		"layout-primitives",
	],
} as const;
