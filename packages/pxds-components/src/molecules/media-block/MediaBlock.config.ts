import { mediaBlockFigmaSpec } from "./media-block.figma";

export const mediaBlockRegistryEntry = {
	id: "media-block",
	name: "MediaBlock",
	layer: "molecule",
	owner: "@pxds/pxds-components",
	importPath: "@pxds/pxds-components/molecules/media-block",
	group: "media",
	status: "active",
	createdAt: "2026-04-30",
	figmaSpec: () => mediaBlockFigmaSpec,
	composedOf: [
		"thumbnail",
		"card-thumbnail",
		"content-badge",
	],
} as const;
