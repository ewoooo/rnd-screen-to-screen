import { defineComponentConfig } from "@pxds/cx-spec";

export type AuthRequestProps = Record<string, never>;

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
		componentName: "OGN / MBR / Auth Request",
	},
});
