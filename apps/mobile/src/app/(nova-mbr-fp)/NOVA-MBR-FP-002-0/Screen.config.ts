import { defineScreenConfig } from "@pxds/cx-spec";
import type { ScreenRouteConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "NOVA-MBR-FP-002-0",
	name: "2-개인정보 입력",
	label: "2-개인정보 입력",
	route: "/NOVA-MBR-FP-002-0",
	group: "nova-mbr-fp",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-17",
	domain: "mbr",
	node: {
		kind: "screen",
	},
	figma: {
		frameName: "NOVA-MBR-FP-002-0",
		width: 375,
		height: 812,
	},
	generation: {
		source: "SB",
		pattern: "form",
		policyRefs: [
			"POL-MBR-INFO-002-03",
			"POL-MBR-INFO-002-04",
			"POL-MBR-INFO-002-05",
			"POL-MBR-INFO-002-06",
			"POL-MBR-INFO-002-08",
		],
		ognIds: ["ogn-mbr-member-input", "ogn-mbr-entry-check"],
		designDocsChecked: [
			"DESIGN_PATTERNS.md",
			"DESIGN_FOUNDATION.md",
			"SCREEN_STRUCTURE_PRINCIPLES.md",
		],
	},
} as const satisfies ScreenRouteConfig);
