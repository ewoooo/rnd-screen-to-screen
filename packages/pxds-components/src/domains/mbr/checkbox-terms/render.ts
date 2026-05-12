import { defineComponentRender } from "../../../schema";

export const checkboxTermsRender = defineComponentRender({
	$schema: "pxds-render-contract-v1",
	componentId: "ogn-mbr-checkbox-terms",
	layer: "organism",
	mode: "render-tree",
	layout: {
		slot: "content",
		section: { inset: "default", rail: "inset" },
		stack: { direction: "vertical" },
		sizing: { width: "fill", height: "hug" },
	},
	children: [
		{
			id: "terms-consent-list",
			component: "consent-list",
			layout: { sizing: { width: "fill", height: "hug" } },
		},
	],
} as const);
