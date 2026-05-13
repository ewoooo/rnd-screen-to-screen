import { selectableListRenderReact } from "./SelectableList";

export const selectableListRegistryEntry = {
	id: "selectable-list",
	name: "SelectableList",
	layer: "molecule",
	owner: "@pxds/pxds-components",
	importPath: "@pxds/pxds-components/molecules/selectable-list",
	group: "selection",
	status: "active",
	createdAt: "2026-04-30",
	renderReact: selectableListRenderReact,
	composedOf: [
		"list",
		"list-cell",
		"radio-group",
		"checkbox",
		"chip",
		"layout-primitives",
	],
} as const;
