import { defineComponentConfig } from "@pxds/cx-spec";
import type { AuthSelectCopyProps } from "./AuthSelectCopy";

export const authSelectCopyConfig = defineComponentConfig<AuthSelectCopyProps>({
	id: "ogn-mbr-auth-select-copy",
	name: "AuthSelectCopy",
	layer: "organism",
	owner: "@screen/mobile",
	node: {
		kind: "component",
		selectable: true,
		exportable: true,
	},
	props: {},
	figma: {
		componentName: "OGN / MBR-FP / Auth Select Copy",
	},
});
