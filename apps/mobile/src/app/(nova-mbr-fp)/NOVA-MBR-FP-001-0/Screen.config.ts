import { defineScreenConfig } from "@pxds/cx-spec";
import type { ScreenRouteConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "NOVA-MBR-FP-001-0",
	name: "1-약관 동의",
	label: "1-약관 동의",
	route: "/NOVA-MBR-FP-001-0",
	group: "nova-mbr-fp",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-17",
	domain: "mbr",
	node: {
		kind: "screen",
	},
	figma: {
		frameName: "NOVA-MBR-FP-001-0",
		width: 375,
		height: 812,
	},
	generation: {
		source: "SB",
		pattern: "form",
		policyRefs: [
			"POL-MBR-TERM-001-06",
			"POL-MBR-TERM-002-01",
			"POL-MBR-TERM-002-05",
		],
		ognIds: [
			"ogn-mbr-term-list",
			"ogn-mbr-term-agree",
			"ogn-mbr-guardian-input",
			"ogn-mbr-guardian-result",
		],
		designDocsChecked: [
			"DESIGN_PATTERNS.md",
			"DESIGN_FOUNDATION.md",
			"SCREEN_STRUCTURE_PRINCIPLES.md",
		],
	},
} as const satisfies ScreenRouteConfig);
