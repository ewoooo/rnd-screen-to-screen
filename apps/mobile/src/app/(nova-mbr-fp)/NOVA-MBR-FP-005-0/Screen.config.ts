import { defineScreenConfig } from "@pxds/cx-spec";
import type { ScreenRouteConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "NOVA-MBR-FP-005-0",
	name: "5-가입 완료",
	label: "5-가입 완료",
	route: "/NOVA-MBR-FP-005-0",
	group: "nova-mbr-fp",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-17",
	domain: "mbr",
	node: {
		kind: "screen",
	},
	figma: {
		frameName: "NOVA-MBR-FP-005-0",
		width: 375,
		height: 812,
	},
	generation: {
		source: "SB",
		pattern: "complete",
		policyRefs: [],
		ognIds: ["ogn-mbr-join-complete"],
		designDocsChecked: [
			"DESIGN_PATTERNS.md",
			"DESIGN_FOUNDATION.md",
			"SCREEN_STRUCTURE_PRINCIPLES.md",
		],
	},
} as const satisfies ScreenRouteConfig);
