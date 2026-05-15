import type { ScreenRouteConfig } from "@pxds/pxds-spec";
import { defineScreenConfig } from "@pxds/pxds-spec";

export const screenConfig = defineScreenConfig({
	id: "CX-EXAMPLE-PERSONAL-INFO-INPUT",
	name: "Personal info input",
	label: "Personal info input",
	route: "/CX-EXAMPLE-PERSONAL-INFO-INPUT",
	group: "cx",
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
			"SPACING_PATTERNS.md",
			"SCREEN_STRUCTURE_PRINCIPLES.md",
		],
	},
} as const satisfies ScreenRouteConfig);
