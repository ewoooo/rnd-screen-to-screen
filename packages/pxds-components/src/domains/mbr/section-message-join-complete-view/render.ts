import { defineComponentRender } from "../../../schema";

export const sectionMessageJoinCompleteViewRender = defineComponentRender({
	$schema: "pxds-render-contract-v1",
	componentId: "ogn-mbr-section-message-join-complete-view",
	layer: "organism",
	mode: "render-tree",
	layout: {
		slot: "content",
		section: { inset: "default", rail: "inset" },
		stack: { direction: "vertical", gap: "{spacing.16}" },
		sizing: { width: "fill", height: "hug" },
	},
	props: {
		slot: {
			type: "enum",
			values: ["content", "bottom"],
			defaultValue: "content",
		},
	},
	children: [
		{
			id: "section-message-complete",
			component: "wds-section-message",
			variant: "positive",
		},
		{
			id: "list-cell-follow-up-actions",
			component: "text-block",
		},
		{
			id: "button-go-home",
			component: "wds-button",
			slot: "bottom",
			variant: "solid",
			props: { label: "홈으로 이동" },
		},
	],
} as const);
