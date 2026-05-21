import { defineComponentConfig } from "@pxds/cx-spec";
import type { AuthRequestCopyProps } from "./AuthRequestCopy";

export const authRequestCopyConfig = defineComponentConfig<AuthRequestCopyProps>({
	id: "ogn-mbr-auth-request-copy",
	name: "AuthRequestCopy",
	layer: "organism",
	owner: "@screen/mobile",
	node: {
		kind: "component",
		selectable: true,
		exportable: true,
	},
	props: {},
	figma: {
		componentName: "OGN / MBR-FP / Auth Request Copy",
	},
});
