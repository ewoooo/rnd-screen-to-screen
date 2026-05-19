import { defineComponentConfig } from "@pxds/cx-spec";

export const changeCompleteConfig = defineComponentConfig({
	id: "ogn-chg-change-complete",
	name: "ChangeComplete",
	layer: "organism",
	owner: "@screen/mobile",
	node: {
		kind: "component",
		selectable: true,
		exportable: true,
	},
	props: {},
	figma: {
		componentName: "OGN / CHG / Change Complete",
	},
});
