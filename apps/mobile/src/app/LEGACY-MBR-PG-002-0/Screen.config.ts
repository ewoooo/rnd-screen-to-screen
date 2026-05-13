import { defineScreenConfig } from "@pxds/pxds-spec";
import type { MobileScreenConfig } from "../screen-config";

export const screenConfig = defineScreenConfig({
	id: "LEGACY-MBR-PG-002-0",
	name: "회원 가입 완료",
	label: "회원 가입 완료",
	route: "/LEGACY-MBR-PG-002-0",
	group: "membership",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-12",
	domain: "membership",
	node: {
		kind: "screen",
	},
} as const satisfies MobileScreenConfig);
