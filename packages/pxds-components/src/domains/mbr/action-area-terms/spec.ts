import { POL_MBR_TERM_001_06 } from "@policy/core/policies";

import { defineOgnSpec } from "../../../ogn-spec";

export const actionAreaTermsSpec = defineOgnSpec({
	id: "ogn-MBR-action-area-terms",
	module: "MBR",
	composedOfRegistryId: "ogn-mbr-action-area-terms",
	states: ["default", "blocked"],
	triggers: {
		blocked: "필수 약관 미동의",
	},
	serverControl: [],
	policyRefs: ["PG-MBR-TERM-001", "POL-MBR-TERM-001-06"],
	parts: [
		{
			id: "action-area-next",
			component: "primary-cta-bar",
			variant: "strong",
			event: "onClick",
			action: { kind: "navigate", target: "NOVA-MBR-PG-002-0" },
			policies: [POL_MBR_TERM_001_06],
			label: "다음",
		},
	],
	snapshots: {
		default: { visibleParts: ["action-area-next"] },
		blocked: {
			visibleParts: ["action-area-next"],
			emphasize: { "action-area-next": "error" },
		},
	},
	copyStatus: {
		status: "authored",
		author: "wooseong",
		updatedAt: "2026-05-11",
	},
});
