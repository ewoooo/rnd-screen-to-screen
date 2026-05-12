import { sectionMessageJoinCompleteViewFigmaSpec } from "./figma";
import { sectionMessageJoinCompleteViewRender } from "./render";

export const sectionMessageJoinCompleteViewRegistryEntry = {
	id: "ogn-mbr-section-message-join-complete-view",
	name: "SectionMessageJoinCompleteView",
	layer: "organism",
	owner: "@pxds/pxds-components",
	importPath: "@pxds/pxds-components/mbr",
	group: "mbr",
	status: "active",
	createdAt: "2026-05-11",
	exportMode: "render-tree",
	render: () => sectionMessageJoinCompleteViewRender,
	figmaSpec: () => sectionMessageJoinCompleteViewFigmaSpec,
	composedOf: [
		"content-section",
		"wds-section-message",
		"text-block",
		"wds-button",
	],
} as const;
