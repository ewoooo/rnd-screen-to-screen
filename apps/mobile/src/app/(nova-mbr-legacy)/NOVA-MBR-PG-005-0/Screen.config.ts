import type { ScreenRouteConfig } from "@pxds/cx-spec";
import { defineScreenConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "NOVA-MBR-PG-005-0",
	name: "5-가입 완료",
	label: "5-가입 완료",
	route: "/NOVA-MBR-PG-005-0",
	group: "nova-mbr-legacy",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-11",
	domain: "mbr",
	node: {
		kind: "screen",
	},
	figma: {
		frameName: "NOVA-MBR-PG-005-0",
		width: 375,
		height: 812,
	},
	generation: {
		source: "implementation",
		pattern: "complete",
		policyRefs: [
			"POL-MBR-ACCT-001-09",
			"POL-MBR-SESS-001-03",
			"POL-MBR-SESS-001-07",
			"POL-MBR-PROF-001-08",
		],
		ognIds: [
			"ogn-mbr-section-header-page",
			"ogn-mbr-section-message-join-complete-view",
		],
		designDocsChecked: [
			"DESIGN_PATTERNS.md",
			"DESIGN_FOUNDATION.md",
			"SPACING_PATTERNS.md",
			"SCREEN_STRUCTURE_PRINCIPLES.md",
		],
	},
} as const satisfies ScreenRouteConfig);
