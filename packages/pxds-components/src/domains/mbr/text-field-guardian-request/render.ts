import { defineComponentRender } from "../../../schema";

export const textFieldGuardianRequestRender = defineComponentRender({
	$schema: "pxds-render-contract-v1",
	componentId: "ogn-mbr-text-field-guardian-request",
	layer: "organism",
	mode: "render-tree",
	layout: {
		slot: "content",
		section: { inset: "default", rail: "inset" },
		stack: { direction: "vertical", gap: "{spacing.16}" },
		sizing: { width: "fill", height: "hug" },
	},
	props: {
		visible: { type: "boolean", defaultValue: false },
	},
	children: [
		{
			id: "section-message-guardian-info",
			component: "wds-section-message",
			variant: "info",
		},
		{
			id: "text-field-guardian-name",
			component: "form-field",
			props: {
				label: "법정대리인 이름",
				placeholder: "법정대리인 이름",
			},
		},
		{
			id: "text-field-guardian-phone",
			component: "form-field",
			props: {
				label: "법정대리인 연락처",
				placeholder: "법정대리인 연락처",
			},
		},
		{
			id: "button-guardian-consent-request",
			component: "wds-button",
			variant: "solid",
			props: { label: "동의 요청 보내기" },
		},
	],
} as const);
