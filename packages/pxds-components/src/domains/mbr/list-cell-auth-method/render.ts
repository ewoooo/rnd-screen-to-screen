import { defineComponentRender } from "../../../schema";

export const listCellAuthMethodRender = defineComponentRender({
	$schema: "pxds-render-contract-v1",
	componentId: "ogn-mbr-list-cell-auth-method",
	layer: "organism",
	mode: "render-tree",
	layout: {
		slot: "content",
		section: { inset: "default", rail: "inset" },
		stack: { direction: "vertical", gap: "{spacing.16}" },
		sizing: { width: "fill", height: "hug" },
	},
	props: {
		state: {
			type: "enum",
			values: ["default", "loading", "error", "blocked"],
			defaultValue: "default",
		},
		slot: {
			type: "enum",
			values: ["content", "bottom"],
			defaultValue: "content",
		},
	},
	children: [
		{
			id: "list-cell-auth-method",
			component: "selectable-list",
			layout: { sizing: { width: "fill", height: "hug" } },
		},
		{
			id: "text-field-auth-code",
			component: "form-field",
			layout: { sizing: { width: "fill", height: "hug" } },
		},
		{
			id: "text-timer",
			component: "text-block",
			layout: { sizing: { width: "fill", height: "hug" } },
		},
		{
			id: "button-auth-request",
			component: "wds-button",
			variant: "solid",
		},
		{
			id: "button-auth-resend",
			component: "wds-button",
			variant: "outlined",
		},
		{
			id: "section-message-auth-error",
			component: "wds-section-message",
			variant: "negative",
		},
		{
			id: "action-area-auth-complete",
			component: "primary-cta-bar",
			slot: "bottom",
			variant: "strong",
			props: { primaryLabel: "인증 완료" },
			layout: { slot: "bottom", sizing: { width: "fill", height: "hug" } },
		},
	],
} as const);
