import type { ScreenRouteConfig } from "@pxds/cx-spec";
import { defineScreenConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "NOVA-CHG-FP-002-0",
	name: "요금제 선택",
	label: "요금제 선택",
	route: "/NOVA-CHG-FP-002-0",
	group: "chg",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-17",
	domain: "chg",
	node: { kind: "screen" },
	generation: {
		source: "SB-only",
		pattern: "filterable-product-card-list",
		policyRefs: [],
		ognIds: [],
		designDocsChecked: [
			"DESIGN_PATTERNS.md",
			"DESIGN_FOUNDATION.md",
			"SCREEN_STRUCTURE_PRINCIPLES.md",
			"Figma SKT GenUI Test 0512 node 14243:28727",
		],
		buildSelections: [
			{
				section: "planFilter",
				selected: "ContentSection(inset=\"bleed\") + Chips + FilterSorting(divider=true)",
				source: "componentCandidates",
				reason:
					"Matches the Figma page-list-card SOT: full-width Chips followed by FilterSorting with a contents divider.",
			},
			{
				section: "planList",
				selected: "ContentSection(inset=\"bleed\") + PageStackList + TitleSection + SectionItem + RQRListOption(type=\"radio\")",
				source: "componentCandidates",
				reason:
					"Uses the Figma SOT list-card rails while recording ListProductHorizontal as the stronger future component gap.",
			},
			{
				section: "actions",
				selected: "AppScreen.Bottom + SinglePrimaryAction + ActionButton",
				source: "componentCandidates",
				reason:
					"Keeps the next CTA fixed and ready for selected-state enablement without route-level fixed positioning.",
			},
		],
	},
} as const satisfies ScreenRouteConfig);
