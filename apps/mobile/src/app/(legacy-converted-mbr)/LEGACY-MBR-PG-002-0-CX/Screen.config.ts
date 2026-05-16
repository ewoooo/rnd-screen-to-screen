import type { ScreenRouteConfig } from "@pxds/cx-spec";
import { defineScreenConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "LEGACY-MBR-PG-002-0-CX",
	name: "회원 가입 완료 (CX 전환)",
	label: "회원 가입 완료 (CX)",
	route: "/LEGACY-MBR-PG-002-0-CX",
	group: "legacy-converted-mbr",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-15",
	domain: "membership",
	node: {
		kind: "screen",
	},
	generation: {
		source: "legacy-conversion-structural-backfill",
		pattern: "complete",
		policyRefs: [],
		ognIds: [
			"ogn-mbr-complete-app-bar",
			"ogn-mbr-complete-hero",
			"ogn-mbr-signup-complete-summary",
			"ogn-mbr-signup-benefit-notice",
			"ogn-mbr-complete-actions",
		],
		designDocsChecked: [
			"DESIGN_PATTERNS.md",
			"DESIGN_FOUNDATION.md",
			"SPACING_PATTERNS.md",
			"SCREEN_STRUCTURE_PRINCIPLES.md",
		],
		buildSelections: [
			{
				section: "appBar",
				selected:
					"AppBar(title=\"가입 완료\", showLeftItem, showTitle, leftIcon=Icon(type=\"close\"), leftLabel=\"닫기\")",
				source: "componentCandidates",
				reason: "Preserves the implemented completion-exit header with close affordance, accessible close label, and visible title.",
			},
			{
				section: "completionHero",
				selected: "PageStackContents(title=TitleMain(type=\"complete\"))",
				source: "componentCandidates",
				reason: "Preserves the complete hero hierarchy and leading content rail for the step caption, completion title, and supporting copy.",
			},
			{
				section: "completionSummary",
				selected: "PageStackContents(title=TitleSection) + RQRContentsDetail(title, rows)",
				source: "componentCandidates",
				reason: "Satisfies the layoutContract by keeping the outer section title, component-owned detail card, card title, and stable label-value rows.",
				rejected: [
					{
						candidate: "SectionItem(type=\"card\") + ListText(table)",
						reason: "Rejected because it does not match the current Screen truth's explicit detail card title and may squeeze long Korean date/session values through fixed table columns.",
					},
				],
			},
			{
				section: "benefitNotice",
				selected: "PageStackContents + SectionItem + Callout(title=\"혜택\")",
				source: "componentCandidates",
				reason: "Preserves the implemented benefit notice as one callout block in scroll content without adding an outer title or nested card.",
			},
			{
				section: "actions",
				selected:
					"Bottom(preset=\"primary-cta\") + SinglePrimaryAction + ActionButton(type=\"gift\", actions=[secondary, primary])",
				source: "componentCandidates",
				reason: "Preserves fixed bottom placement, gift-style two-action treatment, and the current secondary-left/primary-right action hierarchy.",
				rejected: [
					{
						candidate: "SinglePrimaryAction + two Button children",
						reason: "Rejected because loose buttons would require manual spacing and hierarchy management instead of the implemented action component contract.",
					},
				],
			},
		],
	},
} as const satisfies ScreenRouteConfig);
