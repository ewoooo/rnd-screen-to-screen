import { activeRenderableScreenSpecs } from "@screen/specs";

import { BillingPayScheduleResultScreen } from "./_sdui-renderer";

export default function BillingPayScheduleResultPage() {
	return (
		<BillingPayScheduleResultScreen
			spec={activeRenderableScreenSpecs["billing-pay-schedule-result"]}
		/>
	);
}
