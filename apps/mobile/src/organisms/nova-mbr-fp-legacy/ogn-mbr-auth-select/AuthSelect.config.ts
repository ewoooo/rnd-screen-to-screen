import { defineComponentConfig } from "@pxds/cx-spec";
import type { AuthSelectProps } from "./AuthSelect";

export const authSelectConfig = defineComponentConfig<AuthSelectProps>({
	id: "ogn-mbr-auth-select",
	name: "AuthSelect",
	layer: "organism",
	owner: "@screen/mobile",
	node: {
		kind: "component",
		selectable: true,
		exportable: true,
	},
	props: {},
	figma: {
		componentName: "Legacy OGN / MBR-FP / Auth Select",
	},
});
