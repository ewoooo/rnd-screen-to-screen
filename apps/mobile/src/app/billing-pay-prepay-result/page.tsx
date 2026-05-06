import { activeRenderableScreenSpecs } from "@screen/screens";

import { BillingPayPrepayResultScreen } from "./_sdui-renderer";

export default function BillingPayPrepayResultPage() {
	return (
		<BillingPayPrepayResultScreen
			spec={activeRenderableScreenSpecs["billing-pay-prepay-result"]}
		/>
	);
}
