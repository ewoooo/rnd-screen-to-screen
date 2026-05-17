import { defineComponentConfig } from "@pxds/cx-spec";

export type AuthSelectProps = Record<string, never>;

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
		componentName: "OGN / MBR / Auth Select",
	},
});
