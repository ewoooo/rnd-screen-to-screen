import { defineComponentConfig } from "@pxds/cx-spec";
import type { AuthRequestProps } from "./AuthRequest";

export const authRequestConfig = defineComponentConfig<AuthRequestProps>({
	id: "ogn-mbr-auth-request",
	name: "AuthRequest",
	layer: "organism",
	owner: "@screen/mobile",
	node: {
		kind: "component",
		selectable: true,
		exportable: true,
	},
	props: {},
	figma: {
		componentName: "Legacy OGN / MBR-FP / Auth Request",
	},
});
