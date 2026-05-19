import type { ScreenRouteConfig } from "@pxds/cx-spec";
import { defineScreenConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "LEGACY-MBR-PG-007-0-CX",
	name: "7-회원 가입 약관 동의",
	label: "7-회원 가입 약관 동의",
	route: "/LEGACY-MBR-PG-007-0-CX",
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
			"ogn-mbr-consent-intro",
			"ogn-mbr-consent-terms-section",
			"ogn-mbr-consent-terms-accordion",
			"ogn-mbr-consent-actions",
		],
		designDocsChecked: [
			"DESIGN_PATTERNS.md",
			"DESIGN_FOUNDATION.md",
			"SCREEN_STRUCTURE_PRINCIPLES.md",
		],
		buildSelections: [
			{
				section: "intro",
				selected: "PageStackContents(title=TitleMain)",
				source: "componentCandidates",
				reason: "Reverse-engineered from the current perfect screen; preserves the implemented step caption, two-line title, and required/optional consent subtitle.",
			},
			{
				section: "terms",
				selected: "PageStackContents + TitleSection + SectionItem + ConsentTermsAccordion + Callout",
				source: "componentCandidates",
				reason: "Preserves the implemented terms section with the domain consent organism and the attached legal guardian callout in one SectionItem.",
			},
			{
				section: "termsAccordion",
				selected: "ConsentTermsAccordion",
				source: "existing-composition",
				reason: "Preserves the existing domain organism boundary, all/required consent constants, and accordion-based terms behavior.",
			},
			{
				section: "actions",
				selected: "ActionBar(preset=\"primary-cta\") + SinglePrimaryAction + Button(fullWidth, size=\"xlarge\", variant=\"primary\")",
				source: "componentCandidates",
				reason: "Preserves the fixed primary action bar and the current disabled-until-required-consents behavior.",
			},
		],
	},
} as const satisfies ScreenRouteConfig);
