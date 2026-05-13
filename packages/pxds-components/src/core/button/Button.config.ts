import type { ComponentConfig } from "../../component-config";

export const buttonConfig = {
	id: "wds-button",
	name: "Button",
	layer: "atom",
	owner: "@pxds/pxds-components",
	importPath: "@pxds/pxds-components/core",
	group: "navigation",
	status: "active",
	createdAt: "2026-05-11",
	source: {
		package: "@wanteddev/wds",
		component: "Button",
	},
} as const satisfies ComponentConfig;
