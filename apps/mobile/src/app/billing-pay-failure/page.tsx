import { activeRenderableScreenSpecs } from "@/screens";

import { BillingPayFailureScreen } from "./_sdui-renderer";

export default function BillingPayFailurePage() {
	return (
		<BillingPayFailureScreen
			spec={activeRenderableScreenSpecs["billing-pay-failure"]}
		/>
	);
}
