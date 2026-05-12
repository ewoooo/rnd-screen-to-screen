import { defineComponentRenderTree } from "@pxds/pxds-components/schema";

export const RENDER_TREE = defineComponentRenderTree({
	$schema: "pxds-render-tree-v1",
	componentId: "ogn-membership-selectable-section",
	layer: "organism",
	mode: "render-tree",
	layout: {
		slot: "content",
		section: { inset: "bleed", rail: "inset" },
		sizing: { width: "fill", height: "hug" },
	},
	props: {
		name: { type: "string", required: true },
		items: { type: "array", required: true },
		value: { type: "string" },
		selectionMode: { type: "string" },
		selectedIds: { type: "array" },
	},
	children: [
		{
			id: "membership-selectable-list",
			component: "selectable-list",
			props: {
				name: "$props.name",
				items: "$props.items",
				value: "$props.value",
				selectionMode: "$props.selectionMode",
				selectedIds: "$props.selectedIds",
			},
			layout: {
				section: { inset: "bleed", rail: "inset" },
				sizing: { width: "fill", height: "hug" },
			},
		},
	],
} as const);
