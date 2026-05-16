import type { ScreenRouteConfig } from "@pxds/cx-spec";
import { defineScreenConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "LEGACY-MBR-PG-006-0-CX",
	name: "회원 가입 기본 정보 (CX 전환)",
	label: "회원 가입 기본 정보 (CX)",
	route: "/LEGACY-MBR-PG-006-0-CX",
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
		pattern: "form-entry",
		policyRefs: [],
		ognIds: [
			"ogn-mbr-signup-profile-intro",
			"ogn-mbr-signup-basic-profile",
			"ogn-mbr-signup-gender-choice",
			"ogn-mbr-signup-profile-actions",
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
				reason: "Reverse-engineered from the current perfect screen; preserves the implemented step caption, two-line title, and explanatory subtitle in the TitleMain slot.",
			},
			{
				section: "profile",
				selected: "PageStackContents + TitleSection + SectionItem + FieldStack + TextField",
				source: "componentCandidates",
				reason: "Preserves the implemented titled section, three-field stack, helper text ownership, input modes, and max-length contracts.",
			},
			{
				section: "gender",
				selected: "PageStackContents + TitleSection + SectionItem + FieldStack + ListSelected(radio)",
				source: "componentCandidates",
				reason: "Preserves the implemented single-select radio row stack including the visible '선택 안 함' option and closed right/subText slots.",
			},
			{
				section: "actions",
				selected: "ActionBar(preset=\"primary-cta\") + SinglePrimaryAction + Button(fullWidth, size=\"xlarge\", variant=\"primary\")",
				source: "componentCandidates",
				reason: "Preserves the fixed primary action bar and the current disabled-until-required-inputs behavior.",
			},
		],
	},
} as const satisfies ScreenRouteConfig);
