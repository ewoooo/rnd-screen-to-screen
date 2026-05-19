import { defineComponentConfig } from "@pxds/cx-spec";

export const planListConfig = defineComponentConfig({
	id: "ogn-chg-plan-list",
	name: "PlanList",
	layer: "organism",
	owner: "@screen/mobile",
	node: {
		kind: "component",
		selectable: true,
		exportable: true,
	},
	props: {},
	figma: {
		componentName: "OGN / CHG / Plan List",
	},
});
