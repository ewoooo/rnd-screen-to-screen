import { defineOgnSpec } from "../../../ogn-spec";

export const sectionMessageEntryBranchSpec = defineOgnSpec({
	id: "ogn-MBR-section-message-entry-branch",
	module: "MBR",
	composedOfRegistryId: "ogn-mbr-section-message-entry-branch",
	states: ["default", "error"],
	triggers: {
		default: "진입 제한 사유 존재 시",
		error: "진입 제한 조건 해당",
	},
	serverControl: ["노출 여부", "텍스트 내용"],
	policyRefs: [
		"PG-MBR-INFO-003",
		"POL-MBR-ROUTE-001-02",
		"POL-MBR-ROUTE-001-03",
	],
	parts: [
		{
			id: "section-message-entry-guide",
			component: "wds-section-message",
			variant: "cautionary",
			note: "정책 PG-MBR-INFO-003 — 가입 진입 조건 기준 적용",
		},
		{
			id: "button-entry-action",
			component: "wds-button",
			variant: "outlined",
			event: "onClick",
			action: { kind: "navigate", target: "conditional" },
			note: "이미 가입: 로그인 / 휴면: 휴면해제 / 재가입 제한: 안내",
		},
	],
	snapshots: {
		default: {
			visibleParts: ["section-message-entry-guide", "button-entry-action"],
		},
		error: {
			visibleParts: ["section-message-entry-guide", "button-entry-action"],
			emphasize: {
				"section-message-entry-guide": "error",
			},
		},
	},
	copyStatus: {
		status: "tentative",
		author: "wooseong",
		updatedAt: "2026-05-11",
	},
});
