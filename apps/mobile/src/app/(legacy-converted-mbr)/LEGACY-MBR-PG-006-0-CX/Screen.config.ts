import type { ScreenRouteConfig } from "@pxds/pxds-spec";
import { defineScreenConfig } from "@pxds/pxds-spec";

export const screenConfig = defineScreenConfig({
	id: "LEGACY-MBR-PG-006-0-CX",
	name: "회원 가입 기본 정보 (CX 전환)",
	label: "회원 가입 기본 정보 (CX)",
	route: "/LEGACY-MBR-PG-006-0-CX",
	group: "legacy-converted-mbr",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-15",
	domain: "membership",
	node: {
		kind: "screen",
	},
} as const satisfies ScreenRouteConfig);
