import {
	POL_MBR_TERM_002_01,
	POL_MBR_TERM_002_05,
} from "@policy/core/policies";

import { defineOgnSpec } from "../../../ogn-spec";

export const textFieldGuardianRequestSpec = defineOgnSpec({
	id: "ogn-MBR-text-field-guardian-request",
	module: "MBR",
	composedOfRegistryId: "ogn-mbr-text-field-guardian-request",
	states: ["default", "error"],
	triggers: {
		default: "화면 진입 정상 (만 14세 미만 고객)",
		error: "동의 요청 실패 / 유효시간 만료",
	},
	serverControl: ["노출 여부"],
	policyRefs: ["PG-MBR-TERM-002", "POL-MBR-TERM-002-01", "POL-MBR-TERM-002-05"],
	parts: [
		{
			id: "section-message-guardian-info",
			component: "wds-section-message",
			variant: "info",
			policies: [POL_MBR_TERM_002_01],
		},
		{
			id: "text-field-guardian-name",
			component: "form-field",
			event: "onChange",
			action: { kind: "setState", key: "guardianName" },
			label: "법정대리인 이름",
			placeholder: "법정대리인 이름",
			required: true,
		},
		{
			id: "text-field-guardian-phone",
			component: "form-field",
			event: "onChange",
			action: { kind: "setState", key: "guardianPhone" },
			label: "법정대리인 연락처",
			placeholder: "법정대리인 연락처",
			required: true,
		},
		{
			id: "button-guardian-consent-request",
			component: "wds-button",
			variant: "solid",
			event: "onClick",
			action: { kind: "apiCall" },
			policies: [POL_MBR_TERM_002_05],
			label: "동의 요청 보내기",
		},
	],
	snapshots: {
		default: {
			visibleParts: [
				"section-message-guardian-info",
				"text-field-guardian-name",
				"text-field-guardian-phone",
				"button-guardian-consent-request",
			],
		},
		error: {
			visibleParts: [
				"section-message-guardian-info",
				"text-field-guardian-name",
				"text-field-guardian-phone",
				"button-guardian-consent-request",
			],
			emphasize: { "section-message-guardian-info": "error" },
		},
	},
	copyStatus: {
		status: "tentative",
		author: "wooseong",
		updatedAt: "2026-05-11",
	},
});
