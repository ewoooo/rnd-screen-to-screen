import { defineComponentRenderTree } from "@pxds/pxds-components/schema";

export const RENDER_TREE = defineComponentRenderTree({
	$schema: "pxds-render-tree-v1",
	componentId: "ogn-membership-notice-section",
	layer: "organism",
	mode: "render-tree",
	layout: {
		slot: "content",
		sizing: { width: "fill", height: "hug" },
	},
	props: {
		badge: { type: "string", required: true },
		text: { type: "string", required: true },
		action: { type: "string" },
		tone: { type: "string" },
	},
	children: [
		{
			id: "membership-notice",
			component: "flow-notice",
			props: {
				badge: "$props.badge",
				text: "$props.text",
				action: "$props.action",
				tone: "$props.tone",
			},
		},
	],
} as const);
