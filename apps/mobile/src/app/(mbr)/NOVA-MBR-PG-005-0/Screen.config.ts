import { defineScreenConfig } from "@pxds/pxds-spec";
import type { ScreenRouteConfig } from "@pxds/pxds-spec";

export const screenConfig = defineScreenConfig({
	id: "NOVA-MBR-PG-005-0",
	name: "MBR 가입 5·가입 완료",
	label: "MBR 가입 5·가입 완료",
	route: "/NOVA-MBR-PG-005-0",
	group: "membership",
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
} as const satisfies ScreenRouteConfig);
