import { selectFieldFigmaSpec } from "./select-field.figma";

export const selectFieldRegistryEntry = {
	id: "select-field",
	name: "SelectField",
	layer: "molecule",
	owner: "@pxds/pxds-components",
	importPath: "@pxds/pxds-components/molecules/select-field",
	group: "form",
	status: "active",
	createdAt: "2026-04-30",
	figmaSpec: () => selectFieldFigmaSpec,
	composedOf: [
		"wds-select",
		"wds-option",
		"wds-option-content",
	],
} as const;
