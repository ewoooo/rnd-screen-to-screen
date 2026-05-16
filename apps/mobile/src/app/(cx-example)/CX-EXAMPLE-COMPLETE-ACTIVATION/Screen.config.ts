import type { ScreenRouteConfig } from "@pxds/cx-spec";
import { defineScreenConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "CX-EXAMPLE-COMPLETE-ACTIVATION",
	name: "Complete activation",
	label: "Complete activation",
	route: "/CX-EXAMPLE-COMPLETE-ACTIVATION",
	group: "cx-example",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-15",
	domain: "mbr",
	node: {
		kind: "screen",
	},
	figma: {
		frameName: "SKT GenUI Test 0512 / Text Section / 완료_개통",
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
				reason: "RQRContentsDetail force-applied per the design decision with an authored card title (`개통 정보`) satisfying its mandatory `title` prop; owns the card surface (section element), background, 20px radius, 24px padding, header 16px spacing, 8px row gap, and stable label/value rows natively without route CSS. The authored card title is structural-proof copy, not policy.",
				rejected: [
					{
						candidate: "SectionItem(type=\"card\") + ListText(table)",
						reason: "Valid no-header card composition but not selected: this screen authors a card title header that RQRContentsDetail owns natively.",
					},
					{
						candidate: "domain key-value summary organism",
						reason: "Rejected because a new reusable domain organism is unnecessary for structural-only activation facts and would add more ownership risk than the selected existing component.",
					},
				],
			},
			{
				section: "actions",
				selected:
					"`AppScreen.Bottom(preset=\"guided-action\")` + `SinglePrimaryAction` + `ActionButton(type=\"ai\", buttonCount=2)`",
				source: "componentCandidates",
				reason: "Satisfies the layoutContract by keeping the guided prompt, left secondary CTA, and right primary AI CTA fixed in Bottom with safe-area behavior instead of moving actions into scroll content.",
			},
		],
	},
} as const satisfies ScreenRouteConfig);
