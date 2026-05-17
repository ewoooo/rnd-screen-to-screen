import type { ScreenRouteConfig } from "@pxds/cx-spec";
import { defineScreenConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "NOVA-CHG-FP-001-0",
	name: "요금제 변경 진입",
	label: "요금제 변경 진입",
	route: "/NOVA-CHG-FP-001-0",
	group: "chg",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-17",
	domain: "chg",
	node: { kind: "screen" },
	generation: {
		source: "SB-only",
		pattern: "detail-entry",
		policyRefs: [],
		ognIds: [],
		designDocsChecked: [
			"DESIGN_PATTERNS.md",
			"DESIGN_FOUNDATION.md",
			"SCREEN_STRUCTURE_PRINCIPLES.md",
		],
		buildSelections: [
			{
				section: "currentPlanSummary",
				selected: "VStack(gap=spacing-16) + RQRContentsDetail",
				source: "componentCandidates",
				reason:
					"Preserves the SB current-plan summary as a card-key-value section with component-owned surface and stable label/value rows while the parent stack owns spacing to adjacent notices.",
			},
			{
				section: "changeEligibility",
				selected: "VStack(gap=spacing-16) + RQRNotice",
				source: "componentCandidates",
				reason:
					"Preserves change availability and restriction guidance as inline content notices without popup or route-level spacing patches.",
			},
			{
				section: "actions",
				selected: "AppScreen.Bottom + SinglePrimaryAction + ActionButton",
				source: "componentCandidates",
				reason:
					"Keeps the browse-plan CTA in the fixed bottom rail while AppScreen owns safe-area behavior.",
			},
		],
	},
} as const satisfies ScreenRouteConfig);
