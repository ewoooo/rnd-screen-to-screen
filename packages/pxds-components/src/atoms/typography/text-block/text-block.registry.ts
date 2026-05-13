import { textBlockRenderReact } from "./text-block";

export const textBlockRegistryEntry = {
	id: "text-block",
	name: "TextBlock",
	layer: "atom",
	owner: "@pxds/pxds-components",
	importPath: "@pxds/pxds-components/atoms/typography",
	group: "typography",
	status: "active",
	createdAt: "2026-04-30",
	renderReact: textBlockRenderReact,
} as const;
