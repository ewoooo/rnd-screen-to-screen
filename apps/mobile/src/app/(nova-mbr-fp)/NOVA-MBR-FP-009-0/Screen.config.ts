import { defineScreenConfig } from "@pxds/cx-spec";
import type { ScreenRouteConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "NOVA-MBR-FP-009-0",
	name: "9-약관 재동의",
	label: "9-약관 재동의",
	route: "/NOVA-MBR-FP-009-0",
	group: "nova-mbr-fp",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-17",
	domain: "mbr",
	node: {
		kind: "screen",
	},
	figma: {
		frameName: "NOVA-MBR-FP-009-0",
		width: 375,
		height: 812,
	},
	generation: {
		source: "SB",
		pattern: "form",
		policyRefs: ["POL-MBR-TERM-001-06"],
		ognIds: ["ogn-mbr-term-list", "ogn-mbr-term-agree"],
		designDocsChecked: [
			"DESIGN_PATTERNS.md",
			"DESIGN_FOUNDATION.md",
			"SCREEN_STRUCTURE_PRINCIPLES.md",
		],
	},
} as const satisfies ScreenRouteConfig);
