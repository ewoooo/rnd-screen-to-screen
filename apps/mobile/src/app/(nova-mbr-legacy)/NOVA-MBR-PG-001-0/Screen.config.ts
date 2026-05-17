import { defineScreenConfig } from "@pxds/cx-spec";
import type { ScreenRouteConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "NOVA-MBR-PG-001-0",
	name: "1-약관 동의",
	label: "1-약관 동의",
	route: "/NOVA-MBR-PG-001-0",
	group: "nova-mbr-legacy",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-11",
	domain: "mbr",
	node: {
		kind: "screen",
	},
	figma: {
		frameName: "NOVA-MBR-PG-001-0",
		width: 375,
		height: 812,
	},
	generation: {
		source: "implementation",
		pattern: "form",
		policyRefs: [
			"POL-MBR-TERM-001-06",
			"POL-MBR-TERM-002-01",
			"POL-MBR-TERM-002-05",
		],
		ognIds: [
			"ogn-mbr-section-header-page",
			"ogn-mbr-checkbox-terms",
			"ogn-mbr-text-field-guardian-request",
			"ogn-mbr-action-area-terms",
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
					"Preserves the Diagram layoutContract by keeping the step intro as a content-owned title/subtitle organism; Screen.tsx only owns Content placement and does not move intro copy into AppBar chrome.",
			},
			{
				section: "terms",
				selected: "CheckboxTerms",
				source: "componentCandidates",
				reason:
					"Preserves the terms checklist, required/optional hierarchy, agreement state, and negative notice inside the policy OGN without route-level row reconstruction or spacing patches.",
			},
			{
				section: "guardian",
				selected: "TextFieldGuardianRequest",
				source: "componentCandidates",
				reason:
					"Preserves the hidden guardian state boundary with `visible={false}` so the reserved state contributes no visible spacing or misleading fields in the initial screen.",
			},
			{
				section: "actions",
				selected: "ActionAreaTerms",
				source: "componentCandidates",
				reason:
					"Preserves the disabled progression action inside `AppScreen.Bottom(preset=\"primary-cta\")`; the OGN owns disabled action state while cx-layout owns the fixed bottom rail.",
			},
		],
	},
} as const satisfies ScreenRouteConfig);
