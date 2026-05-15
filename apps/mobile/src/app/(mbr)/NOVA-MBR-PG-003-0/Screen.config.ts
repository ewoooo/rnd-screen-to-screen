import type { ScreenRouteConfig } from "@pxds/pxds-spec";
import { defineScreenConfig } from "@pxds/pxds-spec";

export const screenConfig = defineScreenConfig({
	id: "NOVA-MBR-PG-003-0",
	name: "MBR 가입 3·본인인증",
	label: "MBR 가입 3·본인인증",
	route: "/NOVA-MBR-PG-003-0",
	group: "mbr",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-11",
	domain: "mbr",
	node: {
		kind: "screen",
	},
	figma: {
		frameName: "NOVA-MBR-PG-003-0",
		width: 375,
		height: 812,
	},
} as const satisfies ScreenRouteConfig);
