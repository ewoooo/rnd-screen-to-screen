import { activeRenderableScreenSpecs } from "@screen/screens";

import { BillingPayScheduleResultScreen } from "./_sdui-renderer";

export default function BillingPayScheduleResultPage() {
	return (
		<BillingPayScheduleResultScreen
			spec={activeRenderableScreenSpecs["billing-pay-schedule-result"]}
		/>
	);
}
