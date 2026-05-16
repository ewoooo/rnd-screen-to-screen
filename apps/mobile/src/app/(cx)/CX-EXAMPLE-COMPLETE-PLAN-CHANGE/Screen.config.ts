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
				selected: "RQRContentsDetail",
				source: "componentCandidates",
				reason: "RQRContentsDetail is force-applied per the design decision. Its mandatory `title` prop is satisfied by the authored card title \"변경 정보\" — an intentional structural-proof header, not policy copy. RQRContentsDetail natively owns the card surface, authored header, internal header-to-rows spacing (16px), card padding (24px), border-radius (20px), and stable label/value rows without route-level CSS. Mirrors the LEGACY-MBR-PG-002-0-CX consumer pattern with `{ id, label, value }` rows passed to `rows={...}`.",
				rejected: [
					{
						candidate: "SectionItem(type=\"card\") + ListText(table)",
						reason: "Valid no-header card composition but not selected: this screen authors a card title header that RQRContentsDetail owns natively.",
					},
					{
						candidate: "domain key-value summary organism",
						reason: "Rejected because a new reusable domain organism is unnecessary for structural-only plan-change facts and would add more ownership risk than the selected component.",
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
