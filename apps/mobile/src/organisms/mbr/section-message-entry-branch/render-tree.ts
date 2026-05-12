import { defineComponentRenderTree } from "@pxds/pxds-components/schema";

export const RENDER_TREE = defineComponentRenderTree({
	$schema: "pxds-render-tree-v1",
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
			props: {
				title: "이미 가입된 회원",
				description: "로그인 화면으로 이동해 주세요.",
			},
		},
		{
			id: "button-entry-action",
			component: "wds-button",
			variant: "outlined",
			props: { label: "로그인하기" },
		},
	],
} as const);
