import { defineComponentRenderTree } from "@pxds/pxds-components/schema";

export const RENDER_TREE = defineComponentRenderTree({
	$schema: "pxds-render-tree-v1",
	componentId: "ogn-membership-form-section",
	layer: "organism",
	mode: "render-tree",
	layout: {
		slot: "content",
		section: { inset: "default", rail: "inset" },
		sizing: { width: "fill", height: "hug" },
	},
	props: {
		fields: { type: "array", required: true },
	},
	children: [
		{
			id: "membership-form-fields",
			component: "text-field-list",
			props: {
				fields: "$props.fields",
			},
			layout: {
				section: { inset: "default", rail: "inset" },
				sizing: { width: "fill", height: "hug" },
			},
		},
	],
} as const);
