import { sectionHeaderPageFigmaSpec } from "./figma";
import { sectionHeaderPageRender } from "./render";

export const sectionHeaderPageRegistryEntry = {
	id: "ogn-mbr-section-header-page",
	name: "SectionHeaderPage",
	layer: "organism",
	owner: "@pxds/pxds-components",
	importPath: "@pxds/pxds-components/mbr",
	group: "mbr",
	status: "active",
	createdAt: "2026-05-11",
	exportMode: "render-tree",
	render: () => sectionHeaderPageRender,
	figmaSpec: () => sectionHeaderPageFigmaSpec,
	composedOf: ["content-section", "text-block", "layout-primitives"],
} as const;
