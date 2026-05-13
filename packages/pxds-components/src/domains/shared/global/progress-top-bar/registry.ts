import { progressTopBarRenderReact } from ".";

export const progressTopBarRegistryEntry = {
	id: "progress-top-bar",
	name: "ProgressTopBar",
	layer: "organism",
	owner: "@pxds/pxds-components",
	importPath: "@pxds/pxds-components/shared/global",
	group: "global",
	status: "active",
	createdAt: "2026-05-07",
	renderReact: progressTopBarRenderReact,
	composedOf: [
		"top-navigation",
		"top-navigation-button",
		"progress-indicator",
		"text-block",
		"layout-primitives",
	],
} as const;
