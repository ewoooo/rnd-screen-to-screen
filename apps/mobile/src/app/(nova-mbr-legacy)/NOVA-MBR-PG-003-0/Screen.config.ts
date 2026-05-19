import type { ScreenRouteConfig } from "@pxds/cx-spec";
import { defineScreenConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "NOVA-MBR-PG-003-0",
	name: "3-본인인증",
	label: "3-본인인증",
	route: "/NOVA-MBR-PG-003-0",
	group: "nova-mbr-legacy",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-11",
	domain: "mbr",
	node: {
		kind: "screen",
	},
	figma: {
		frameName: "NOVA-MBR-PG-003-0",
		width: 375,
		height: 812,
	},
	generation: {
		source: "implementation",
		pattern: "form",
		policyRefs: [
			"POL-MBR-AUTH-001-01",
			"POL-MBR-AUTH-002-01",
			"POL-MBR-AUTH-002-05",
			"POL-MBR-AUTH-002-09",
			"POL-MBR-AUTH-005-01",
			"POL-MBR-AUTH-005-03",
			"POL-MBR-AUTH-005-07",
		],
		ognIds: ["ogn-mbr-section-header-page", "ogn-mbr-list-cell-auth-method"],
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
					"Preserves the authentication step intro as a content-owned title/subtitle organism; the Screen only places it in the Content rail.",
			},
			{
				section: "authMethods",
				selected: "ListCellAuthMethod",
				source: "componentCandidates",
				reason:
					"Preserves authentication method rows, request-code controls, and policy ordering inside the OGN without route-local control reconstruction.",
			},
			{
				section: "actions",
				selected: "MbrPrimaryCTABar",
				source: "componentCandidates",
				reason:
					"Preserves the disabled verification completion action in `AppScreen.Bottom(preset=\"primary-cta\")`; the bar remains structural-only while cx-layout owns fixed rail placement.",
			},
		],
	},
} as const satisfies ScreenRouteConfig);
