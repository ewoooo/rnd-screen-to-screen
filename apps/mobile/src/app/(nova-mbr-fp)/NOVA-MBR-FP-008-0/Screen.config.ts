import type { ScreenRouteConfig } from "@pxds/cx-spec";
import { defineScreenConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "NOVA-MBR-FP-008-0",
	name: "8-본인인증(휴면)",
	label: "8-본인인증(휴면)",
	route: "/NOVA-MBR-FP-008-0",
	group: "nova-mbr-fp",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-17",
	domain: "mbr",
	node: {
		kind: "screen",
	},
	figma: {
		frameName: "NOVA-MBR-FP-008-0",
		width: 375,
		height: 812,
	},
	generation: {
		source: "SB",
		pattern: "form",
		policyRefs: [
			"POL-MBR-AUTH-001-01",
			"POL-MBR-AUTH-002-01",
			"POL-MBR-AUTH-002-05",
			"POL-MBR-AUTH-002-09",
			"POL-MBR-AUTH-003-01",
			"POL-MBR-AUTH-003-03",
			"POL-MBR-AUTH-004-01",
			"POL-MBR-AUTH-004-02",
			"POL-MBR-AUTH-005-01",
			"POL-MBR-AUTH-005-03",
			"POL-MBR-AUTH-005-07",
		],
		ognIds: ["ogn-mbr-auth-select", "ogn-mbr-auth-request"],
		designDocsChecked: [
			"DESIGN_PATTERNS.md",
			"DESIGN_FOUNDATION.md",
			"SCREEN_STRUCTURE_PRINCIPLES.md",
		],
	},
} as const satisfies ScreenRouteConfig);
