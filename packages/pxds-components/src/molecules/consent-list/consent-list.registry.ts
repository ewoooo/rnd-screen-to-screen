import { consentListFigmaSpec } from "./consent-list.figma";
import { consentListRenderReact } from "./ConsentList";

export const consentListRegistryEntry = {
	id: "consent-list",
	name: "ConsentList",
	layer: "molecule",
	owner: "@pxds/pxds-components",
	importPath: "@pxds/pxds-components/molecules/consent-list",
	group: "selection",
	status: "active",
	createdAt: "2026-04-30",
	figmaSpec: () => consentListFigmaSpec,
	renderReact: consentListRenderReact,
	composedOf: [
		"wds-checkbox",
		"divider",
		"text-block",
		"layout-primitives",
	],
} as const;
