import { activeRenderableScreenSpecs } from "@screen/specs";

import { BillingPayFailureScreen } from "./_sdui-renderer";

export default function BillingPayFailurePage() {
	return (
		<BillingPayFailureScreen
			spec={activeRenderableScreenSpecs["billing-pay-failure"]}
		/>
	);
}
