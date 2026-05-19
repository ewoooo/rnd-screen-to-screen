import type { ScreenRouteConfig } from "@pxds/cx-spec";
import { defineScreenConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "CX-EXAMPLE-PERSONAL-INFO-INPUT",
	name: "3-개인정보 입력",
	label: "3-개인정보 입력",
	route: "/CX-EXAMPLE-PERSONAL-INFO-INPUT",
	group: "cx-example",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-15",
	domain: "mbr",
	node: {
		kind: "screen",
	},
	figma: {
		frameName: "SKT GenUI Test 0513 / 상세_정보 입력_인풋",
		width: 393,
		height: 1130,
	},
	generation: {
		source: "Figma",
		pattern: "form",
		policyRefs: [
			"POL-MBR-INFO-002-08",
			"POL-MBR-AUTH-002-01",
		],
		ognIds: [],
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
				reason: "Reverse-engineered from the current perfect screen; preserves the title-only intro without adding body content or a card surface.",
			},
			{
				section: "phone",
				selected: "PageStackContents + TitleSection + SectionItem + TextField(disabled)",
				source: "componentCandidates",
				reason: "Preserves the implemented section title, content padding, and disabled phone field state.",
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
