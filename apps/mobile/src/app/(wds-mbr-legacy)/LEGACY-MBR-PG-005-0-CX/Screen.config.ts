import type { ScreenRouteConfig } from "@pxds/cx-spec";
import { defineScreenConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "LEGACY-MBR-PG-005-0-CX",
	name: "회원 탈퇴 사유 (CX 전환)",
	label: "회원 탈퇴 사유 (CX)",
	route: "/LEGACY-MBR-PG-005-0-CX",
	group: "wds-mbr-legacy",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-15",
	domain: "membership",
	node: {
		kind: "screen",
	},
	generation: {
		source: "legacy-conversion-structural-backfill",
		pattern: "form-entry",
		policyRefs: [],
		ognIds: [
			"ogn-mbr-withdraw-reason-intro",
			"ogn-mbr-withdraw-reason-options",
			"ogn-mbr-withdraw-reason-free-text",
			"ogn-mbr-withdraw-reason-actions",
		],
		designDocsChecked: [
			"DESIGN_PATTERNS.md",
			"DESIGN_FOUNDATION.md",
			"SPACING_PATTERNS.md",
			"SCREEN_STRUCTURE_PRINCIPLES.md",
		],
		buildSelections: [
			{
				section: "intro",
				selected: "PageStackContents(title=TitleMain)",
				source: "componentCandidates",
				reason: "Reverse-engineered from the current perfect screen; preserves the implemented step caption, two-line question, and subtitle in the TitleMain slot.",
			},
			{
				section: "reasons",
				selected: "PageStackContents + TitleSection + SectionItem + FieldStack + ListSelected(checkbox)",
				source: "componentCandidates",
				reason: "Preserves the implemented titled section, field stack, six checkbox rows, and closed right/subText row slots.",
			},
			{
				section: "freeText",
				selected: "PageStackContents + TitleSection + SectionItem + TextField(helperText, maxLength=500)",
				source: "componentCandidates",
				reason: "Preserves the optional text field with label, placeholder, max length, and helper counter ownership.",
			},
			{
				section: "actions",
				selected: "ActionBar(preset=\"primary-cta\") + SinglePrimaryAction + Button(fullWidth, size=\"xlarge\", variant=\"primary\")",
				source: "componentCandidates",
				reason: "Preserves the fixed primary action bar and the current disabled-until-selection behavior.",
			},
		],
	},
} as const satisfies ScreenRouteConfig);
