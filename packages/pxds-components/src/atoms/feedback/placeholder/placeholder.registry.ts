import { placeholderFigmaSpec } from "./placeholder.figma";

export const placeholderRegistryEntry = {
	id: "placeholder",
	name: "Placeholder",
	layer: "atom",
	owner: "@pxds/pxds-components",
	importPath: "@pxds/pxds-components/atoms/feedback",
	group: "media",
	status: "active",
	createdAt: "2026-04-30",
	figmaSpec: () => placeholderFigmaSpec,
} as const;
