import { defineComponentRenderTree } from "@pxds/pxds-components/schema";

export const RENDER_TREE = defineComponentRenderTree({
	$schema: "pxds-render-tree-v1",
	componentId: "ogn-membership-hero-section",
	layer: "organism",
	mode: "render-tree",
	layout: {
		slot: "content",
		sizing: { width: "fill", height: "hug" },
	},
	props: {
		titleLines: { type: "array", required: true },
		description: { type: "string", required: true },
	},
	children: [
		{
			id: "membership-hero",
			component: "flow-hero",
			props: {
				titleLines: "$props.titleLines",
				description: "$props.description",
			},
		},
	],
} as const);
