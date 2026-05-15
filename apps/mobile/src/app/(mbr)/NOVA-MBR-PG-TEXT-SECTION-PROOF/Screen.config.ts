import type { ScreenRouteConfig } from "@pxds/pxds-spec";
import { defineScreenConfig } from "@pxds/pxds-spec";

export const screenConfig = defineScreenConfig({
	id: "NOVA-MBR-PG-TEXT-SECTION-PROOF",
	name: "Text Section proof",
	label: "Text Section proof",
	route: "/NOVA-MBR-PG-TEXT-SECTION-PROOF",
	group: "membership",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-15",
	domain: "mbr",
	node: {
		kind: "screen",
	},
	figma: {
		frameName: "SKT GenUI Test 0512 / Text Section",
		width: 393,
		height: 1186,
	},
} as const satisfies ScreenRouteConfig);
