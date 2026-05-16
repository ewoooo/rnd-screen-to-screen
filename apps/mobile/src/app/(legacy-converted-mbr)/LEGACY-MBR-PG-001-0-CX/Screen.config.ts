import type { ScreenRouteConfig } from "@pxds/pxds-spec";
import { defineScreenConfig } from "@pxds/pxds-spec";

export const screenConfig = defineScreenConfig({
	id: "LEGACY-MBR-PG-001-0-CX",
	name: "회원 가입 본인인증 (CX 전환)",
	label: "회원 가입 본인인증 (CX)",
	route: "/LEGACY-MBR-PG-001-0-CX",
	group: "legacy-converted-mbr",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-15",
	domain: "membership",
	node: {
		kind: "screen",
	},
	generation: {
		source: "legacy-conversion-map-backfill",
		pattern: "form-entry",
		policyRefs: [
			"POL-MBR-AUTH-002-01",
			"POL-MBR-AUTH-005-01",
			"POL-MBR-AUTH-005-03",
		],
		ognIds: [
			"ogn-mbr-auth-app-bar",
			"ogn-mbr-auth-intro",
			"ogn-mbr-auth-method-selector",
			"ogn-mbr-auth-policy-callout",
			"ogn-mbr-auth-primary-action",
		],
		designDocsChecked: [
			"DESIGN_PATTERNS.md",
			"DESIGN_FOUNDATION.md",
			"SPACING_PATTERNS.md",
			"SCREEN_STRUCTURE_PRINCIPLES.md",
		],
	},
} as const satisfies ScreenRouteConfig);
