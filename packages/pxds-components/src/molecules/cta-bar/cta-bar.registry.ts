import { primaryCtaBarFigmaSpec } from "./cta-bar.figma";
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
	figmaSpec: () => primaryCtaBarFigmaSpec,
	renderReact: primaryCtaBarRenderReact,
	composedOf: [
		"wds-button",
		"layout-primitives",
	],
} as const;

export const stickyActionBarRegistryEntry = {
	id: "sticky-action-bar",
	name: "StickyActionBar",
	layer: "molecule",
	owner: "@pxds/pxds-components",
	importPath: "@pxds/pxds-components/molecules/cta-bar",
	group: "navigation",
	status: "active",
	createdAt: "2026-04-30",
	composedOf: [
		"wds-button",
		"wds-icon-button",
		"text-block",
		"layout-primitives",
	],
} as const;
