import type { ScreenRouteConfig } from "@pxds/cx-spec";
import { defineScreenConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "NOVA-MBR-PG-005-0",
	name: "5-가입 완료",
	label: "5-가입 완료",
	route: "/NOVA-MBR-PG-005-0",
	group: "nova-mbr-legacy",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-11",
	domain: "mbr",
	node: {
		kind: "screen",
	},
	figma: {
		frameName: "NOVA-MBR-PG-005-0",
		width: 375,
		height: 812,
	},
	generation: {
		source: "policy+design-pattern",
		pattern: "complete",
		policyRefs: [
			"POL-MBR-ACCT-001-09",
			"POL-MBR-SESS-001-03",
			"POL-MBR-SESS-001-07",
			"POL-MBR-PROF-001-08",
		],
		ognIds: [
			"ogn-mbr-join-complete-result",
		],
		designDocsChecked: [
			"DESIGN_PATTERNS.md",
			"DESIGN_FOUNDATION.md",
			"SCREEN_STRUCTURE_PRINCIPLES.md",
		],
		buildSelections: [
			{
				section: "completeHero",
				selected: "JoinCompleteResult",
				source: "existing-composition",
				reason:
					"Uses PageStackContents with TitleMain(type=\"complete\") so the completion title and subtitle follow DESIGN_PATTERNS.md Completion without route-level spacing patches.",
				rejected: [
					{
						candidate: "SectionHeaderPage",
						reason:
							"Generic page header does not enforce completion type/copy and would split the hero from the summary card.",
					},
				],
			},
			{
				section: "completionSummary",
				selected: "RQRContentsDetail",
				source: "componentCandidates",
				reason:
					"Satisfies the simple-completion summary-card contract with a component-owned card surface, title slot, native key-value rows, padding/radius, and wrapping behavior without custom green success styling.",
				rejected: [
					{
						candidate: "Notice(tone=\"positive\") + custom guide list",
						reason:
							"Notice/bullet structure is not the Completion summary-card pattern and encourages unapproved success color treatment.",
					},
				],
			},
			{
				section: "actions",
				selected: "MbrPrimaryCTABar",
				source: "existing-composition",
				reason:
					"Keeps the only explicit follow-up action in AppScreen.Bottom with the existing single-primary action-bar capability.",
			},
		],
	},
} as const satisfies ScreenRouteConfig);
