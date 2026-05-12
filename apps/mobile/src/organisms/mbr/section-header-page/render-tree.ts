import { defineComponentRenderTree } from "@pxds/pxds-components/schema";

export const RENDER_TREE = defineComponentRenderTree({
	$schema: "pxds-render-tree-v1",
	componentId: "ogn-mbr-section-header-page",
	layer: "organism",
	mode: "render-tree",
	layout: {
		slot: "content",
		section: { inset: "default", rail: "inset" },
		stack: { direction: "vertical", gap: "{spacing.12}" },
		sizing: { width: "fill", height: "hug" },
	},
	props: {
		title: { type: "string", required: true },
	},
	children: [
		{
			id: "section-header-title",
			component: "text-block",
			variant: "displayTitle",
			props: { text: "$props.title" },
			layout: { sizing: { width: "fill", height: "hug" } },
		},
	],
} as const);
