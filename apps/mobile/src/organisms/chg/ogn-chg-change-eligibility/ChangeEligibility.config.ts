import { defineComponentConfig } from "@pxds/cx-spec";

import type { ChangeEligibility } from "./ChangeEligibility";

export const changeEligibilityConfig = defineComponentConfig<
	typeof ChangeEligibility
>({
	id: "ogn-chg-change-eligibility",
	name: "ChangeEligibility",
	layer: "organism",
	owner: "@screen/mobile",
	node: {
		kind: "component",
		selectable: true,
		exportable: true,
	},
	props: {},
	figma: {
		componentName: "OGN / CHG / Change Eligibility",
	},
});
