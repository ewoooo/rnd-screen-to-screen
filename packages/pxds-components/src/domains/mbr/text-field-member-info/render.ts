import { defineComponentRender } from "../../../schema";

export const textFieldMemberInfoRender = defineComponentRender({
	$schema: "pxds-render-contract-v1",
	componentId: "ogn-mbr-text-field-member-info",
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
			values: ["default", "error", "blocked"],
			defaultValue: "default",
		},
	},
	children: [
		{
			id: "text-field-user-id",
			component: "form-field",
			props: {
				label: "아이디",
				placeholder: "영문, 숫자 6~20자",
				helperText: "영문 소문자 또는 숫자 6~20자",
			},
		},
		{
			id: "button-id-duplicate-check",
			component: "wds-button",
			variant: "outlined",
			props: { label: "중복확인" },
		},
		{
			id: "text-field-password",
			component: "form-field",
			props: {
				label: "비밀번호",
				placeholder: "영문/숫자/특수문자 조합 10~20자",
				helperText: "영문/숫자/특수문자를 조합해 주세요.",
			},
		},
		{
			id: "text-field-password-confirm",
			component: "form-field",
			props: { label: "비밀번호 확인", placeholder: "비밀번호 재입력" },
		},
		{
			id: "text-field-email",
			component: "form-field",
			props: { label: "이메일", placeholder: "example@domain.com" },
		},
		{
			id: "text-field-phone",
			component: "form-field",
			props: { label: "휴대폰번호", placeholder: "숫자만 입력" },
		},
	],
} as const);
