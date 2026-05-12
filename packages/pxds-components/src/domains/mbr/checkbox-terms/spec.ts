import { defineOgnSpec } from "../../../ogn-spec";

export const checkboxTermsSpec = defineOgnSpec({
	id: "ogn-MBR-checkbox-terms",
	module: "MBR",
	composedOfRegistryId: "ogn-mbr-checkbox-terms",
	states: ["default", "loading", "error", "blocked"],
	triggers: {
		loading: "약관 목록 조회 중",
		error: "약관 버전 불일치 / 동의 저장 실패",
		blocked: "필수 약관 미동의 상태",
	},
	serverControl: ["노출 여부", "텍스트 내용"],
	policyRefs: [
		"PG-MBR-TERM-001",
		"PG-MBR-TERM-002",
		"PG-MBR-TERM-003",
		"POL-MBR-TERM-001-01",
		"POL-MBR-TERM-001-02",
		"POL-MBR-TERM-001-06",
		"POL-MBR-TERM-001-08",
	],
	parts: [],
	snapshots: {
		default: { visibleParts: [] },
		loading: { visibleParts: [] },
		error: { visibleParts: [] },
		blocked: { visibleParts: [] },
	},
	copyStatus: {
		status: "tentative",
		author: "wooseong",
		updatedAt: "2026-05-11",
	},
});
