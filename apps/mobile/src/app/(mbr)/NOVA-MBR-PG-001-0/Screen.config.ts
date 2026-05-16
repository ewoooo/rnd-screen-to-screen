import { defineScreenConfig } from "@pxds/cx-spec";
import type { ScreenRouteConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "NOVA-MBR-PG-001-0",
	name: "MBR 가입 1·약관 동의",
	label: "MBR 가입 1·약관 동의",
	route: "/NOVA-MBR-PG-001-0",
	group: "mbr",
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
			"SPACING_PATTERNS.md",
			"SCREEN_STRUCTURE_PRINCIPLES.md",
		],
	},
} as const satisfies ScreenRouteConfig);
