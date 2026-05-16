import type { ScreenRouteConfig } from "@pxds/cx-spec";
import { defineScreenConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "CX-EXAMPLE-TEXT-SECTION-PROOF",
	name: "Text Section proof",
	label: "Text Section proof",
	route: "/CX-EXAMPLE-TEXT-SECTION-PROOF",
	group: "cx-example",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-15",
	domain: "mbr",
	node: {
		kind: "screen",
	},
	figma: {
		frameName: "SKT GenUI Test 0512 / Text Section",
		width: 393,
		height: 1186,
	},
	generation: {
		source: "SB",
		pattern: "form",
		policyRefs: [
			"POL-MBR-INFO-002-08",
			"POL-MBR-AUTH-002-01",
		],
		ognIds: [],
		designDocsChecked: [
			"DESIGN_PATTERNS.md",
			"DESIGN_FOUNDATION.md",
			"SPACING_PATTERNS.md",
			"SCREEN_STRUCTURE_PRINCIPLES.md",
		],
		buildSelections: [
			{
				section: "phone",
				selected: "PageStackContents + TitleSection + SectionItem + TextField(disabled)",
				source: "componentCandidates",
				reason: "Reverse-engineered from the current perfect screen; preserves the first content section as a disabled phone field without adding an intro.",
			},
			{
				section: "authComplete",
				selected: "PageStackContents + TitleSection + SectionItem + ListText(showRightItem=false)",
				source: "componentCandidates",
				reason: "Preserves the quiet read-only authentication completion message with no right item or invented alert state.",
			},
			{
				section: "address",
				selected: "PageStackContents + TitleSection + SectionItem + FieldStack + TextField(actionButton)",
				source: "componentCandidates",
				reason: "Preserves the implemented address field stack, disabled/typed states, and inline address lookup action.",
			},
			{
				section: "homeArea",
				selected: "PageStackContents + TitleSection + SectionItem + FieldStack + Checkbox + TextField(actionButton, helperText)",
				source: "componentCandidates",
				reason: "Preserves the checkbox, mirrored address fields, inline address action, and helper text ownership inside TextField.",
			},
			{
				section: "email",
				selected: "PageStackContents + TitleSection + SectionItem + TextField(typed)",
				source: "componentCandidates",
				reason: "Preserves the implemented typed email field without adding validation or helper states.",
			},
			{
				section: "actions",
				selected: "Bottom(preset=\"primary-cta\") + SinglePrimaryAction + Button(fullWidth, size=\"xlarge\", variant=\"primary\")",
				source: "componentCandidates",
				reason: "Preserves the fixed bottom primary CTA instead of moving the action into scroll content.",
			},
		],
	},
} as const satisfies ScreenRouteConfig);
