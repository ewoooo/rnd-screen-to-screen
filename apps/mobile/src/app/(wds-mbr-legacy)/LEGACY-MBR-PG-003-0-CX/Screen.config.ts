import type { ScreenRouteConfig } from "@pxds/cx-spec";
import { defineScreenConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "LEGACY-MBR-PG-003-0-CX",
	name: "3-회원 탈퇴 완료",
	label: "3-회원 탈퇴 완료",
	route: "/LEGACY-MBR-PG-003-0-CX",
	group: "wds-mbr-legacy",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-15",
	domain: "membership",
	node: {
		kind: "screen",
	},
	generation: {
		source: "legacy-converted-screen-tsx-backfill",
		pattern: "complete",
		policyRefs: [],
		ognIds: [
			"ogn-mbr-withdraw-complete-app-bar",
			"ogn-mbr-withdraw-complete-hero",
			"ogn-mbr-withdraw-complete-summary",
			"ogn-mbr-withdraw-revoke-notice",
			"ogn-mbr-withdraw-complete-actions",
		],
		designDocsChecked: [
			"DESIGN_PATTERNS.md",
			"DESIGN_FOUNDATION.md",
			"SCREEN_STRUCTURE_PRINCIPLES.md",
		],
		buildSelections: [
			{
				section: "appBar",
				selected: "`AppBar` + `Icon(type=\"close\")`",
				source: "componentCandidates",
				reason:
					"Satisfies the completion header layoutContract by keeping a leading close affordance and one-line title in the header rail without route-level spacing.",
			},
			{
				section: "completionHero",
				selected:
					"`PageStackContents` title slot + `TitleMain(type=\"complete\")`",
				source: "componentCandidates",
				reason:
					"Satisfies the completion hero layoutContract by keeping the step caption, two-line completion title, and supporting grace-period copy in one leading content stack.",
			},
			{
				section: "completionSummary",
				selected: "`PageStackContents` + `TitleSection` + `RQRContentsDetail`",
				source: "componentCandidates",
				reason:
					"Satisfies the titled key-value summary layoutContract because the detail component owns the card-like surface and keeps long date/grace values readable without a fixed narrow value column.",
				rejected: [
					{
						candidate: "`SectionItem(type=\"card\")` + `ListText(table)`",
						reason:
							"Rejected because the current long processing timestamp and grace-period values are a known fixed-column squeeze risk.",
					},
				],
			},
			{
				section: "revokeNotice",
				selected: "`PageStackContents` + `SectionItem` + `Callout`",
				source: "componentCandidates",
				reason:
					"Satisfies the revoke notice layoutContract by keeping a titled informational callout in scroll content above the fixed bottom actions.",
			},
			{
				section: "actions",
				selected:
					"`Bottom(preset=\"primary-cta\")` + `SinglePrimaryAction` + `ActionButton(actions=[secondary, primary])`",
				source: "componentCandidates",
				reason:
					"Satisfies the fixed dual completion action layoutContract by preserving secondary revoke and primary home actions in the bottom action area with component-owned spacing.",
			},
		],
	},
} as const satisfies ScreenRouteConfig);
