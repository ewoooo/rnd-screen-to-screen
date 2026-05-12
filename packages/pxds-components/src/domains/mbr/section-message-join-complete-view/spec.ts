import {
	POL_MBR_ACCT_001_09,
	POL_MBR_PROF_001_08,
	POL_MBR_SESS_001_03,
	POL_MBR_SESS_001_04,
	POL_MBR_SESS_001_07,
} from "@policy/core/policies";

import { defineOgnSpec } from "../../../ogn-spec";

export const sectionMessageJoinCompleteViewSpec = defineOgnSpec({
	id: "ogn-MBR-section-message-join-complete-view",
	module: "MBR",
	composedOfRegistryId: "ogn-mbr-section-message-join-complete-view",
	states: ["default", "loading", "error"],
	triggers: {
		loading: "세션 생성 중",
		error: "세션 생성 실패 → 로그인 재시도 안내",
	},
	serverControl: ["가입 완료 여부", "후속 액션 목록", "자동 로그인 여부"],
	policyRefs: [
		"PG-MBR-ACCT-001",
		"PG-MBR-SESS-001",
		"PG-MBR-PROF-001",
		"POL-MBR-ACCT-001-09",
		"POL-MBR-SESS-001-03",
		"POL-MBR-SESS-001-04",
		"POL-MBR-SESS-001-07",
		"POL-MBR-PROF-001-08",
	],
	parts: [
		{
			id: "section-message-complete",
			component: "wds-section-message",
			variant: "positive",
			policies: [POL_MBR_ACCT_001_09, POL_MBR_SESS_001_03],
		},
		{
			id: "list-cell-follow-up-actions",
			component: "text-block",
			policies: [POL_MBR_PROF_001_08],
			note: "후속 액션 목록 (서버 제어)",
		},
		{
			id: "button-go-home",
			component: "wds-button",
			variant: "solid",
			event: "onClick",
			action: { kind: "navigate", target: "/" },
			policies: [POL_MBR_SESS_001_07, POL_MBR_SESS_001_04],
			label: "홈으로 이동",
			slot: "bottom",
		},
	],
	snapshots: {
		default: {
			visibleParts: [
				"section-message-complete",
				"list-cell-follow-up-actions",
				"button-go-home",
			],
		},
		loading: { visibleParts: ["section-message-complete"] },
		error: {
			visibleParts: ["section-message-complete", "button-go-home"],
			emphasize: { "section-message-complete": "error" },
		},
	},
	copyStatus: {
		status: "authored",
		author: "wooseong",
		updatedAt: "2026-05-11",
	},
});
