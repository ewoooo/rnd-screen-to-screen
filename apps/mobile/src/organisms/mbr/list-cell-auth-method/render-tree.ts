import { defineComponentRenderTree } from "@pxds/pxds-components/schema";

export const RENDER_TREE = defineComponentRenderTree({
	$schema: "pxds-render-tree-v1",
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
			props: {
				name: "auth-method",
				value: "phone",
				density: "compact",
				items: [
					{ id: "phone", title: "휴대폰 인증" },
					{ id: "pass", title: "PASS 인증" },
					{ id: "cert", title: "공동인증서" },
				],
			},
			layout: { sizing: { width: "fill", height: "hug" } },
		},
		{
			id: "text-field-auth-code",
			component: "form-field",
			props: {
				label: "인증번호",
				placeholder: "6자리 숫자",
				helperText: "유효시간 3분",
			},
			layout: { sizing: { width: "fill", height: "hug" } },
		},
		{
			id: "text-timer",
			component: "text-block",
			variant: "caption",
			props: { text: "남은 시간 02:48" },
			layout: { sizing: { width: "fill", height: "hug" } },
		},
		{
			id: "button-auth-request",
			component: "wds-button",
			variant: "solid",
			props: { label: "인증번호 요청" },
		},
		{
			id: "button-auth-resend",
			component: "wds-button",
			variant: "outlined",
			props: { label: "재요청" },
		},
		{
			id: "section-message-auth-error",
			component: "wds-section-message",
			variant: "negative",
			props: {
				title: "인증 실패 한도 초과",
				description: "10분 후 다시 시도해 주세요",
			},
		}
	],
} as const);
