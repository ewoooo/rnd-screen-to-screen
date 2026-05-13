import type { ComponentConfig } from "../../component-config";

export const sectionMessageConfig = {
	id: "wds-section-message",
	name: "SectionMessage",
	layer: "molecule",
	owner: "@pxds/pxds-components",
	importPath: "@pxds/pxds-components/core",
	group: "feedback",
	status: "active",
	createdAt: "2026-05-11",
	source: {
		package: "@wanteddev/wds",
		component: "SectionMessage",
	},
} as const satisfies ComponentConfig;
