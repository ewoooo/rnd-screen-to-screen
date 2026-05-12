import { defineComponentRenderTree } from "@pxds/pxds-components/schema";

export const RENDER_TREE = defineComponentRenderTree({
	$schema: "pxds-render-tree-v1",
	componentId: "ogn-membership-summary-section",
	layer: "organism",
	mode: "render-tree",
	layout: {
		slot: "content",
		sizing: { width: "fill", height: "hug" },
	},
	props: {
		label: { type: "string", required: true },
		title: { type: "string", required: true },
		items: { type: "array", required: true },
	},
	children: [
		{
			id: "membership-summary",
			component: "flow-summary-card",
			props: {
				label: "$props.label",
				title: "$props.title",
				items: "$props.items",
			},
		},
	],
} as const);
