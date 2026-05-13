import { defineScreenConfig } from "@pxds/pxds-spec";
import type { ScreenRouteConfig } from "@pxds/pxds-spec";

export const screenConfig = defineScreenConfig({
	id: "LEGACY-MBR-PG-007-0",
	name: "회원 가입 약관 동의",
	label: "회원 가입 약관 동의",
	route: "/LEGACY-MBR-PG-007-0",
	group: "membership",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-12",
	domain: "membership",
	node: {
		kind: "screen",
	},
} as const satisfies ScreenRouteConfig);
