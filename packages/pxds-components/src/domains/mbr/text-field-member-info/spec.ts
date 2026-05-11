import {
	POL_MBR_INFO_002_03,
	POL_MBR_INFO_002_04,
	POL_MBR_INFO_002_05,
	POL_MBR_INFO_002_06,
	POL_MBR_INFO_002_08,
} from "@policy/core/policies";

import { defineOgnSpec } from "../../../ogn-spec";

export const textFieldMemberInfoSpec = defineOgnSpec({
	id: "ogn-MBR-text-field-member-info",
	module: "MBR",
	composedOfRegistryId: "ogn-mbr-text-field-member-info",
	states: ["default", "error", "blocked"],
	triggers: {
		error: "형식 불일치 / 중복 확인 실패",
		blocked: "필수값 누락",
	},
	serverControl: ["텍스트 내용", "노출 여부"],
	policyRefs: [
		"PG-MBR-INFO-001",
		"PG-MBR-INFO-002",
		"POL-MBR-INFO-002-03",
		"POL-MBR-INFO-002-04",
		"POL-MBR-INFO-002-05",
		"POL-MBR-INFO-002-06",
		"POL-MBR-INFO-002-08",
	],
	parts: [
		{
			id: "text-field-user-id",
			component: "form-field",
			event: "onChange",
			action: { kind: "setState", key: "userId" },
			policies: [POL_MBR_INFO_002_03, POL_MBR_INFO_002_04],
			label: "아이디",
			placeholder: "영문, 숫자 6~20자",
			required: true,
		},
		{
			id: "button-id-duplicate-check",
			component: "wds-button",
			variant: "outlined",
			event: "onClick",
			action: { kind: "apiCall", endpoint: "id-duplicate-check" },
			label: "중복확인",
		},
		{
			id: "text-field-password",
			component: "form-field",
			event: "onChange",
			action: { kind: "setState", key: "password" },
			policies: [POL_MBR_INFO_002_05, POL_MBR_INFO_002_06],
			label: "비밀번호",
			placeholder: "영문/숫자/특수문자 조합 10~20자",
			required: true,
		},
		{
			id: "text-field-password-confirm",
			component: "form-field",
			event: "onChange",
			action: { kind: "setState", key: "passwordConfirm" },
			label: "비밀번호 확인",
			placeholder: "비밀번호 재입력",
			required: true,
		},
		{
			id: "text-field-email",
			component: "form-field",
			event: "onChange",
			action: { kind: "setState", key: "email" },
			label: "이메일",
			placeholder: "example@domain.com",
			required: true,
		},
		{
			id: "text-field-phone",
			component: "form-field",
			event: "onChange",
			action: { kind: "setState", key: "phone" },
			policies: [POL_MBR_INFO_002_08],
			label: "휴대폰번호",
			placeholder: "숫자만 입력",
			required: true,
		},
	],
	snapshots: {
		default: {
			visibleParts: [
				"text-field-user-id",
				"button-id-duplicate-check",
				"text-field-password",
				"text-field-password-confirm",
				"text-field-email",
				"text-field-phone",
			],
		},
		error: {
			visibleParts: [
				"text-field-user-id",
				"button-id-duplicate-check",
				"text-field-password",
				"text-field-password-confirm",
				"text-field-email",
				"text-field-phone",
			],
			emphasize: {
				"text-field-password": "error",
			},
		},
		blocked: {
			visibleParts: [
				"text-field-user-id",
				"button-id-duplicate-check",
				"text-field-password",
				"text-field-password-confirm",
				"text-field-email",
				"text-field-phone",
			],
		},
	},
	copyStatus: {
		status: "authored",
		author: "wooseong",
		updatedAt: "2026-05-11",
	},
});
