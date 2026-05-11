import { activeRenderableScreenSpecs } from "@/screens";

import { BillingPayScheduleScreen } from "./_sdui-renderer";

export default function BillingPaySchedulePage() {
	return (
		<BillingPayScheduleScreen
			spec={activeRenderableScreenSpecs["billing-html-pay-schedule"]}
		/>
	);
}
