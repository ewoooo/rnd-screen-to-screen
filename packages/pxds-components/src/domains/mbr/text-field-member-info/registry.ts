import { textFieldMemberInfoFigmaSpec } from "./figma";
import { textFieldMemberInfoRender } from "./render";

export const textFieldMemberInfoRegistryEntry = {
	id: "ogn-mbr-text-field-member-info",
	name: "TextFieldMemberInfo",
	layer: "organism",
	owner: "@pxds/pxds-components",
	importPath: "@pxds/pxds-components/mbr",
	group: "mbr",
	status: "active",
	createdAt: "2026-05-11",
	exportMode: "render-tree",
	render: () => textFieldMemberInfoRender,
	figmaSpec: () => textFieldMemberInfoFigmaSpec,
	composedOf: [
		"content-section",
		"form-field",
		"form-controls",
		"wds-button",
		"layout-primitives",
	],
} as const;
