import { defineComponentRender } from "../../../schema";

export const sectionMessageEntryBranchRender = defineComponentRender({
	$schema: "pxds-render-contract-v1",
	componentId: "ogn-mbr-section-message-entry-branch",
	layer: "organism",
	mode: "render-tree",
	layout: {
		slot: "content",
		section: { inset: "default", rail: "inset" },
		stack: { direction: "vertical", gap: "{spacing.12}" },
		sizing: { width: "fill", height: "hug" },
	},
	props: {
		visible: { type: "boolean", defaultValue: true },
		kind: {
			type: "enum",
			values: ["existing-member", "dormant", "rejoin-blocked"],
			defaultValue: "existing-member",
		},
	},
	children: [
		{
			id: "section-message-entry-guide",
			component: "wds-section-message",
			variant: "cautionary",
		},
		{
			id: "button-entry-action",
			component: "wds-button",
			variant: "outlined",
		},
	],
} as const);
