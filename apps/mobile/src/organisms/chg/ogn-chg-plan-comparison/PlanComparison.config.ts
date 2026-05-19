import { defineComponentConfig } from "@pxds/cx-spec";

export const planComparisonConfig = defineComponentConfig({
	id: "ogn-chg-plan-comparison",
	name: "PlanComparison",
	layer: "organism",
	owner: "@screen/mobile",
	node: {
		kind: "component",
		selectable: true,
		exportable: true,
	},
	props: {},
	figma: {
		componentName: "OGN / CHG / Plan Comparison",
	},
});
