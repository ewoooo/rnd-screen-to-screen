import type { ScreenRouteConfig } from "@pxds/cx-spec";
import { defineScreenConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "LEGACY-MBR-PG-001-0-CX",
	name: "1-회원 가입 본인인증",
	label: "1-회원 가입 본인인증",
	route: "/LEGACY-MBR-PG-001-0-CX",
	group: "wds-mbr-legacy",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-15",
	domain: "membership",
	node: {
		kind: "screen",
	},
	generation: {
		source: "legacy-conversion-map-backfill",
		pattern: "form-entry",
		policyRefs: [
			"POL-MBR-AUTH-001-01",
			"POL-MBR-AUTH-002-01",
			"POL-MBR-AUTH-002-05",
			"POL-MBR-AUTH-002-09",
			"POL-MBR-AUTH-005-01",
			"POL-MBR-AUTH-005-03",
		],
		ognIds: [
			"ogn-mbr-auth-app-bar",
			"ogn-mbr-auth-intro",
			"ogn-mbr-auth-select",
			"ogn-mbr-auth-policy-callout",
			"ogn-mbr-auth-primary-action",
		],
		designDocsChecked: [
			"DESIGN_PATTERNS.md",
			"DESIGN_FOUNDATION.md",
			"SCREEN_STRUCTURE_PRINCIPLES.md",
		],
		buildSelections: [
			{
				section: "appBar",
				selected: "AppBar(title=\"본인인증\", showLeftItem, showTitle)",
				source: "componentCandidates",
				reason: "Preserves the implemented form-entry header title and left affordance without adding progress chrome or route-level header styling.",
			},
			{
				section: "intro",
				selected: "PageStackContents(title=TitleMain)",
				source: "componentCandidates",
				reason: "Preserves the current step caption, task title, and supporting copy in one leading intro rail before the section divider.",
			},
			{
				section: "authMethod",
				selected:
					"PageStackContents + TitleSection + SectionItem + RQRListOption(type=\"radio\") + Callout",
				source: "componentCandidates",
				reason: "Satisfies the section layoutContract by keeping the policy-ordered options in one radio group and the failure/terms notice in the same auth-method section.",
				rejected: [
					{
						candidate: "ListSelected",
						reason: "Rejected because current Screen.tsx uses RQRListOption radio rows and changing the vocabulary risks row scale, radio semantics, and disabled-CTA state drift.",
					},
				],
			},
			{
				section: "actions",
				selected:
					"Bottom(preset=\"primary-cta\") + SinglePrimaryAction + Button(fullWidth, size=\"xlarge\", variant=\"primary\")",
				source: "componentCandidates",
				reason: "Preserves the fixed bottom primary CTA and its disabled-until-selection behavior instead of moving the action into scroll content.",
			},
		],
	},
} as const satisfies ScreenRouteConfig);
