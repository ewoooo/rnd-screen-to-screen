import { defineComponentConfig } from "@pxds/cx-spec";

import type { CurrentPlanSummary } from "./CurrentPlanSummary";

export const currentPlanSummaryConfig = defineComponentConfig<
	typeof CurrentPlanSummary
>({
	id: "ogn-chg-current-plan-summary",
	name: "CurrentPlanSummary",
	layer: "organism",
	owner: "@screen/mobile",
	node: {
		kind: "component",
		selectable: true,
		exportable: true,
	},
	props: {},
	figma: {
		componentName: "OGN / CHG / Current Plan Summary",
	},
});
