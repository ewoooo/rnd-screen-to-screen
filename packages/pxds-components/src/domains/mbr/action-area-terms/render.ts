import { defineComponentRender } from "../../../schema";

export const actionAreaTermsRender = defineComponentRender({
	$schema: "pxds-render-contract-v1",
	componentId: "ogn-mbr-action-area-terms",
	layer: "organism",
	mode: "render-tree",
	layout: {
		slot: "bottom",
		stack: { direction: "vertical" },
		sizing: { width: "fill", height: "hug" },
	},
	props: {
		disabled: { type: "boolean", defaultValue: true },
	},
	children: [
		{
			id: "action-area-next",
			component: "primary-cta-bar",
			slot: "bottom",
			variant: "strong",
			props: { primaryLabel: "다음", disabled: "$props.disabled" },
			layout: { sizing: { width: "fill", height: "hug" } },
		},
	],
} as const);
