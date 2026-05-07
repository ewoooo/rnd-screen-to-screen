import { activeRenderableScreenSpecs } from "@screen/specs";

import { BillingPayScheduleScreen } from "./_sdui-renderer";

export default function BillingPaySchedulePage() {
	return (
		<BillingPayScheduleScreen
			spec={activeRenderableScreenSpecs["billing-pay-schedule"]}
		/>
	);
}
