import { defineScreenConfig } from "@pxds/pxds-spec";
import type { ScreenRouteConfig } from "@pxds/pxds-spec";

export const screenConfig = defineScreenConfig({
	id: "LEGACY-MBR-PG-005-0",
	name: "회원 탈퇴 사유",
	label: "회원 탈퇴 사유",
	route: "/LEGACY-MBR-PG-005-0",
	group: "membership",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-12",
	domain: "membership",
	node: {
		kind: "screen",
	},
} as const satisfies ScreenRouteConfig);
