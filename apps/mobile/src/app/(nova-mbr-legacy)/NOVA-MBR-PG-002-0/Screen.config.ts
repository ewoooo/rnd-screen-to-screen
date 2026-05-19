import type { ScreenRouteConfig } from "@pxds/cx-spec";
import { defineScreenConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "NOVA-MBR-PG-002-0",
	name: "2-개인정보 입력",
	label: "2-개인정보 입력",
	route: "/NOVA-MBR-PG-002-0",
	group: "nova-mbr-legacy",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-11",
	domain: "mbr",
	node: {
		kind: "screen",
	},
	figma: {
		frameName: "NOVA-MBR-PG-002-0",
		width: 375,
		height: 812,
	},
	generation: {
		source: "implementation",
		pattern: "form",
		policyRefs: [
			"POL-MBR-INFO-002-03",
			"POL-MBR-INFO-002-04",
			"POL-MBR-INFO-002-05",
			"POL-MBR-INFO-002-06",
			"POL-MBR-INFO-002-08",
		],
		ognIds: [
			"ogn-mbr-section-header-page",
			"ogn-mbr-text-field-member-info",
			"ogn-mbr-section-message-entry-branch",
		],
		designDocsChecked: [
			"DESIGN_PATTERNS.md",
			"DESIGN_FOUNDATION.md",
			"SCREEN_STRUCTURE_PRINCIPLES.md",
		],
		buildSelections: [
			{
				section: "intro",
				selected: "SectionHeaderPage",
				source: "componentCandidates",
				reason:
					"Preserves the Diagram layoutContract by keeping the task title as a content organism while the progress header remains AppScreen header chrome.",
			},
			{
				section: "memberInfo",
				selected: "TextFieldMemberInfo",
				source: "componentCandidates",
				reason:
					"Preserves member information fields, inline duplicate-check action, helper text, and validation copy inside the policy OGN instead of splitting field behavior into route markup.",
			},
			{
				section: "entryBranch",
				selected: "SectionMessageEntryBranch",
				source: "componentCandidates",
				reason:
					"Preserves the reserved entry-branch state with `visible={false}` so branch copy and spacing do not appear in the current screen state.",
			},
		],
	},
} as const satisfies ScreenRouteConfig);
