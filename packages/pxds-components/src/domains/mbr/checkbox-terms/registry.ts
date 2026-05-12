import { checkboxTermsFigmaSpec } from "./figma";
import { checkboxTermsRender } from "./render";

export const checkboxTermsRegistryEntry = {
	id: "ogn-mbr-checkbox-terms",
	name: "CheckboxTerms",
	layer: "organism",
	owner: "@pxds/pxds-components",
	importPath: "@pxds/pxds-components/mbr",
	group: "mbr",
	status: "active",
	createdAt: "2026-05-11",
	exportMode: "render-tree",
	render: () => checkboxTermsRender,
	figmaSpec: () => checkboxTermsFigmaSpec,
	composedOf: ["content-section", "consent-list"],
} as const;
