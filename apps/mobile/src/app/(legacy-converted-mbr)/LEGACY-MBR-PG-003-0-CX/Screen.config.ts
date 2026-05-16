import type { ScreenRouteConfig } from "@pxds/cx-spec";
import { defineScreenConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "LEGACY-MBR-PG-003-0-CX",
	name: "회원 탈퇴 완료 (CX 전환)",
	label: "회원 탈퇴 완료 (CX)",
	route: "/LEGACY-MBR-PG-003-0-CX",
	group: "legacy-converted-mbr",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-15",
	domain: "membership",
	node: {
		kind: "screen",
	},
} as const satisfies ScreenRouteConfig);
