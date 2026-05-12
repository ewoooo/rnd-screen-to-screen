import { textFieldGuardianRequestFigmaSpec } from "./figma";
import { textFieldGuardianRequestRender } from "./render";

export const textFieldGuardianRequestRegistryEntry = {
	id: "ogn-mbr-text-field-guardian-request",
	name: "TextFieldGuardianRequest",
	layer: "organism",
	owner: "@pxds/pxds-components",
	importPath: "@pxds/pxds-components/mbr",
	group: "mbr",
	status: "active",
	createdAt: "2026-05-11",
	exportMode: "render-tree",
	render: () => textFieldGuardianRequestRender,
	figmaSpec: () => textFieldGuardianRequestFigmaSpec,
	composedOf: [
		"content-section",
		"wds-section-message",
		"form-field",
		"form-controls",
		"wds-button",
	],
} as const;
