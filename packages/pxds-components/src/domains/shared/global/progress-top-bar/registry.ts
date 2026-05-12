import { progressTopBarRenderReact } from ".";
import { progressTopBarFigmaSpec } from "./figma";

export const progressTopBarRegistryEntry = {
	id: "progress-top-bar",
	name: "ProgressTopBar",
	layer: "organism",
	owner: "@pxds/pxds-components",
	importPath: "@pxds/pxds-components/shared/global",
	group: "global",
	status: "active",
	createdAt: "2026-05-07",
	figmaSpec: () => progressTopBarFigmaSpec,
	renderReact: progressTopBarRenderReact,
	composedOf: [
		"wds-top-navigation",
		"wds-top-navigation-button",
		"wds-progress-indicator",
		"text-block",
		"layout-primitives",
	],
} as const;
