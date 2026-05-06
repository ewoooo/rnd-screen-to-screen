import { activeRenderableScreenSpecs } from "@screen/screens";

import { BillingPaymentHistoryScreen } from "./_sdui-renderer";

export default function BillingPaymentHistoryPage() {
	return (
		<BillingPaymentHistoryScreen
			spec={activeRenderableScreenSpecs["billing-payment-history"]}
		/>
	);
}
