import type { ScreenRouteConfig } from "@pxds/cx-spec";
import { defineScreenConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "LEGACY-MBR-PG-004-0-CX",
	name: "회원 탈퇴 영향 확인 (CX 전환)",
	label: "회원 탈퇴 영향 확인 (CX)",
	route: "/LEGACY-MBR-PG-004-0-CX",
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
		pattern: "form-entry",
		policyRefs: [],
		ognIds: [
			"ogn-mbr-withdraw-impact-app-bar",
			"ogn-mbr-withdraw-impact-intro",
			"ogn-mbr-withdraw-impact-list",
			"ogn-mbr-withdraw-unpaid-callout",
			"ogn-mbr-withdraw-impact-action",
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
				selected: "`AppBar(title=\"회원 탈퇴\", showLeftItem, showTitle)`",
				source: "componentCandidates",
				reason:
					"Satisfies the form-entry header layoutContract by keeping the step-navigation title in the header rail without progress chrome.",
			},
			{
				section: "impactIntro",
				selected: "`PageStackContents` title slot + `TitleMain`",
				source: "componentCandidates",
				reason:
					"Satisfies the step intro layoutContract by keeping the step caption, two-line impact title, and 30-day restriction copy in one leading content stack.",
			},
			{
				section: "impactList",
				selected:
					"`PageStackContents` + `TitleSection` + `SectionItem` + `ListText(rightItem=badge)`",
				source: "componentCandidates",
				reason:
					"Satisfies the status-list layoutContract by keeping display-only impact rows with left labels and short right badges inside the titled content section.",
				rejected: [
					{
						candidate: "`ChipItem` status controls",
						reason:
							"Rejected because the right statuses are display-only impact results, not selectable filters or editable state.",
					},
				],
			},
			{
				section: "unpaidCallout",
				selected: "`Callout(title=\"미납 확인\")` inside the impact `SectionItem`",
				source: "componentCandidates",
				reason:
					"Satisfies the blocking callout layoutContract by keeping unpaid guidance grouped with the impact rows and visibly tied to the disabled CTA state.",
			},
			{
				section: "actions",
				selected:
					"`Bottom(preset=\"primary-cta\")` + `SinglePrimaryAction` + `Button(disabled, fullWidth, size=\"xlarge\", variant=\"primary\")`",
				source: "componentCandidates",
				reason:
					"Satisfies the blocked primary action layoutContract by preserving the disabled full-width continuation CTA in the fixed bottom action area.",
			},
		],
	},
} as const satisfies ScreenRouteConfig);
