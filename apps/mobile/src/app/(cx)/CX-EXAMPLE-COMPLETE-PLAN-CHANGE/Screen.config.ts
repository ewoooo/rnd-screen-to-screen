import type { ScreenRouteConfig } from "@pxds/cx-spec";
import { defineScreenConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "CX-EXAMPLE-COMPLETE-PLAN-CHANGE",
	name: "Complete plan change",
	label: "Complete plan change",
	route: "/CX-EXAMPLE-COMPLETE-PLAN-CHANGE",
	group: "cx",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-15",
	domain: "mbr",
	node: {
		kind: "screen",
	},
	figma: {
		frameName: "SKT GenUI Test 0512 / Text Section / 완료_요금제 변경",
		width: 393,
		height: 852,
	},
	generation: {
		source: "Figma",
		pattern: "complete",
		policyRefs: [],
		ognIds: [],
		designDocsChecked: [
			"DESIGN_PATTERNS.md",
			"DESIGN_FOUNDATION.md",
			"SPACING_PATTERNS.md",
			"SCREEN_STRUCTURE_PRINCIPLES.md",
		],
		buildSelections: [
			{
				section: "completionHero",
				selected:
					"`PageStackContents` title slot + `TitleMain(type=\"complete\")`",
				source: "componentCandidates",
				reason: "Satisfies the layoutContract by keeping the success title and supporting sentence in the same leading content rail above the summary card; PageStackContents owns content padding for the hero/content flow, so no route-level spacing patch is needed.",
			},
			{
				section: "completionSummary",
				selected: "`SectionItem(type=\"card\")` + `ListText(table)`",
				source: "componentCandidates",
				reason: "Satisfies the layoutContract for one compact card with exactly three label-value proof rows; the current summary proof values are short enough for SectionItem(type=\"card\") + ListText(table), while rejected candidates are unnecessary or riskier for this structural-only proof screen.",
				rejected: [
					{
						candidate: "RQRContentsDetail",
						reason: "Rejected because its stronger dedicated detail contract is unnecessary while the current proof values fit the compact card/table layout, and it risks over-specifying a screen with no card title or detail header.",
					},
					{
						candidate: "domain key-value summary organism",
						reason: "Rejected because a new reusable domain organism is unnecessary for structural-only plan-change facts and would add more ownership risk than the selected existing component pair.",
					},
				],
			},
			{
				section: "actions",
				selected:
					"`AppScreen.Bottom(preset=\"primary-cta\")` + `SinglePrimaryAction` + `ActionButton(type=\"default\", buttonCount=1)`",
				source: "componentCandidates",
				reason: "Satisfies the layoutContract by keeping the single full-width confirmation CTA fixed in Bottom with safe-area behavior instead of moving the completion action into scroll content.",
			},
		],
	},
} as const satisfies ScreenRouteConfig);
