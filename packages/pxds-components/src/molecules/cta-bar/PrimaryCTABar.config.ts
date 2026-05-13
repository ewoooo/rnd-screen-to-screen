import { primaryCtaBarRenderReact } from "./PrimaryCTABar";

export const primaryCtaBarRegistryEntry = {
	id: "primary-cta-bar",
	name: "PrimaryCTABar",
	layer: "molecule",
	owner: "@pxds/pxds-components",
	importPath: "@pxds/pxds-components/molecules/cta-bar",
	group: "navigation",
	status: "active",
	createdAt: "2026-04-30",
	renderReact: primaryCtaBarRenderReact,
	composedOf: [
		"button",
		"layout-primitives",
	],
} as const;
