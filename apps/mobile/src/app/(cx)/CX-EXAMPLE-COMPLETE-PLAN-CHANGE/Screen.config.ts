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
				reason: "Selected as the medium-fit composition that satisfies the completionSummary layoutContract: SectionItem(type=\"card\") owns the card surface, background, radius, and padding, and ListText(table) renders the three peer label-value rows at the compact proof density. Acceptance is on layoutContract capability, not proof value length; the ListText(table) fixed-column squeeze under longer values is a documented secondary risk Build must verify, escalating to a stronger no-header key-value candidate or back to Diagram if it occurs.",
				rejected: [
					{
						candidate: "RQRContentsDetail",
						reason: "RQRContentsDetail requires a title prop (card header title; required, not optional) plus 16px header-to-rows spacing, 24px padding, border-radius 20px, and bg semantic-color-bg-dim. The proof summary wire has no card title or header row — only three bare label-value rows. Applying RQRContentsDetail would force a card header not present in the wire, changing the reference's core layout and failing the requiredCapability 'No section heading/header slot needed' check. Rejected unconditionally for this no-title structural-only proof screen.",
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
