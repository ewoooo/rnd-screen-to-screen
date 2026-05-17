import { defineComponentConfig } from "@pxds/cx-spec";

import type { PlanFilterProps } from "./PlanFilter";

export const planFilterConfig = defineComponentConfig<PlanFilterProps>({
	id: "ogn-chg-plan-filter",
	name: "PlanFilter",
	layer: "organism",
	owner: "@screen/mobile",
	node: {
		kind: "component",
		selectable: true,
		exportable: true,
	},
	props: {},
	figma: {
		componentName: "OGN / CHG / Plan Filter",
	},
});
