import type { ScreenRouteConfig } from "@pxds/cx-spec";
import { defineScreenConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "NOVA-CHG-FP-004-0",
	name: "변경 신청 완료",
	label: "변경 신청 완료",
	route: "/NOVA-CHG-FP-004-0",
	group: "chg",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-17",
	domain: "chg",
	node: {
		kind: "screen",
	},
	figma: {
		frameName: "SB-CHG-UC01_0517 / NOVA-CHG-FP-004-0",
		width: 393,
		height: 852,
	},
	generation: {
		source: "SB-only",
		pattern: "complete",
		policyRefs: [],
		ognIds: [],
		designDocsChecked: [
			"DESIGN_PATTERNS.md",
			"DESIGN_FOUNDATION.md",
			"SCREEN_STRUCTURE_PRINCIPLES.md",
		],
		buildSelections: [
			{
				section: "completionHeader",
				selected:
					"AppBar(title=\"요금제 변경\", showLeftItem, showTitle, leftIcon=Icon(type=\"close\"), leftLabel=\"닫기\")",
				source: "componentCandidates",
				reason:
					"Preserves the completion pattern by providing a close affordance instead of back navigation after the irreversible plan-change request result.",
			},
			{
				section: "completionHero",
				selected: "PageStackContents title slot + TitleMain(type=\"complete\")",
				source: "componentCandidates",
				reason:
					"Preserves the completion result as a top success message in the standard complete pattern.",
			},
			{
				section: "completionSummary",
				selected: "RQRContentsDetail",
				source: "componentCandidates",
				reason:
					"Preserves result, effective date, and changed plan as stable label/value rows in a titled summary card.",
			},
			{
				section: "actions",
				selected: "AppScreen.Bottom(preset=\"primary-cta\") + SinglePrimaryAction + ActionButton(buttonCount=2)",
				source: "componentCandidates",
				reason:
					"Preserves the SB home and change-history follow-up actions in the bottom CTA rail.",
			},
		],
	},
} as const satisfies ScreenRouteConfig);
