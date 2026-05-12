import { sectionMessageEntryBranchFigmaSpec } from "./figma";
import { sectionMessageEntryBranchRender } from "./render";

export const sectionMessageEntryBranchRegistryEntry = {
	id: "ogn-mbr-section-message-entry-branch",
	name: "SectionMessageEntryBranch",
	layer: "organism",
	owner: "@pxds/pxds-components",
	importPath: "@pxds/pxds-components/mbr",
	group: "mbr",
	status: "experimental",
	createdAt: "2026-05-11",
	exportMode: "render-tree",
	render: () => sectionMessageEntryBranchRender,
	figmaSpec: () => sectionMessageEntryBranchFigmaSpec,
	composedOf: ["content-section", "wds-section-message", "wds-button"],
} as const;
