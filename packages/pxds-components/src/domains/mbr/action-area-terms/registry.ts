import { actionAreaTermsFigmaSpec } from "./figma";
import { actionAreaTermsRender } from "./render";

export const actionAreaTermsRegistryEntry = {
	id: "ogn-mbr-action-area-terms",
	name: "ActionAreaTerms",
	layer: "organism",
	owner: "@pxds/pxds-components",
	importPath: "@pxds/pxds-components/mbr",
	group: "mbr",
	status: "active",
	createdAt: "2026-05-11",
	exportMode: "render-tree",
	render: () => actionAreaTermsRender,
	figmaSpec: () => actionAreaTermsFigmaSpec,
	composedOf: ["primary-cta-bar"],
} as const;
