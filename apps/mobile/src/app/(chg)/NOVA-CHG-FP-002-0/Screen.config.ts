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
		ognIds: ["ogn-chg-plan-filter", "ogn-chg-plan-list"],
		designDocsChecked: [
			"DESIGN_PATTERNS.md",
			"DESIGN_FOUNDATION.md",
			"SCREEN_STRUCTURE_PRINCIPLES.md",
			"Figma SKT GenUI Test 0512 node 14243:28727",
		],
		buildSelections: [
			{
				section: "planFilter",
				selected: "PlanFilter organism + ContentSection(inset=\"bleed\") + Chips + FilterSorting",
				source: "componentCandidates",
				reason:
					"Matches the Figma page-list-card SOT: full-width Chips followed by FilterSorting with a contents divider.",
			},
			{
				section: "planList",
				selected: "PlanList organism + ContentSection(inset=\"bleed\") + PageStackList + TitleSection + ProductPlanCard(list-product-horizontal)",
				source: "componentCandidates",
				reason:
					"Matches the Card List contract: ProductListGroup rail with separate product cards, leading selection control, product title/specs, trailing price, and card-owned spacing instead of one divided radio-list card.",
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
