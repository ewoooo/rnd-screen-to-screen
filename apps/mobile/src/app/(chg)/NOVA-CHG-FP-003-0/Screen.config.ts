import type { ScreenRouteConfig } from "@pxds/cx-spec";
import { defineScreenConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "NOVA-CHG-FP-003-0",
	name: "변경 내용 확인",
	label: "변경 내용 확인",
	route: "/NOVA-CHG-FP-003-0",
	group: "chg",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-17",
	domain: "chg",
	node: {
		kind: "screen",
	},
	figma: {
		frameName: "SB-CHG-UC01_0517 / NOVA-CHG-FP-003-0",
		width: 393,
		height: 852,
	},
	generation: {
		source: "SB-only",
		pattern: "detail-confirmation",
		policyRefs: [],
		ognIds: [
			"ogn-chg-plan-comparison",
			"ogn-chg-plan-notice-agree",
		],
		designDocsChecked: [
			"DESIGN_PATTERNS.md",
			"DESIGN_FOUNDATION.md",
			"SCREEN_STRUCTURE_PRINCIPLES.md",
		],
		buildSelections: [
			{
				section: "planComparison",
				selected: "PlanComparison organism + PageStackContents + TitleMain + VStack(gap=spacing-16) + RQRContentsDetail",
				source: "componentCandidates",
				reason:
					"Preserves the SB comparison task as two stable label/value summary cards while cx-layout owns the content rail and spacing.",
			},
			{
				section: "expectedChange",
				selected: "PlanComparison organism + PageStackContents + TitleSection + SectionItem + VStack(gap=spacing-12) + ListText(table) + Callout",
				source: "componentCandidates",
				reason:
					"Preserves the expected monthly amount, effective date, and pro-rated billing notice without route-level spacing or bespoke table UI.",
			},
			{
				section: "noticeAgreement",
				selected: "PlanNoticeAgree organism + PageStackContents + TitleSection + SectionItem + VStack(gap=spacing-12) + ListText + Checkbox",
				source: "componentCandidates",
				reason:
					"Preserves required notices and gates the fixed primary CTA until the confirmation checkbox is selected.",
			},
			{
				section: "actions",
				selected: "AppScreen.Bottom(preset=\"primary-cta\") + SinglePrimaryAction + ActionButton",
				source: "componentCandidates",
				reason:
					"Keeps the submit action in the mobile bottom action rail and reflects SB case NOVA-CHG-FP-003-E1 with a disabled CTA before required confirmation.",
			},
		],
	},
} as const satisfies ScreenRouteConfig);
