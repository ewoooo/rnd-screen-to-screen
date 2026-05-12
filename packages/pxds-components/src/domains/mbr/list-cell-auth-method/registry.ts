import { listCellAuthMethodFigmaSpec } from "./figma";
import { listCellAuthMethodRender } from "./render";

export const listCellAuthMethodRegistryEntry = {
	id: "ogn-mbr-list-cell-auth-method",
	name: "ListCellAuthMethod",
	layer: "organism",
	owner: "@pxds/pxds-components",
	importPath: "@pxds/pxds-components/mbr",
	group: "mbr",
	status: "active",
	createdAt: "2026-05-11",
	exportMode: "render-tree",
	render: () => listCellAuthMethodRender,
	figmaSpec: () => listCellAuthMethodFigmaSpec,
	composedOf: [
		"content-section",
		"selectable-list",
		"form-field",
		"form-controls",
		"text-block",
		"wds-button",
		"wds-section-message",
		"primary-cta-bar",
	],
} as const;
