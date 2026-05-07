import { activeRenderableScreenSpecs } from "@screen/specs";

import { BillingPaymentHistoryScreen } from "./_sdui-renderer";

export default function BillingPaymentHistoryPage() {
	return (
		<BillingPaymentHistoryScreen
			spec={activeRenderableScreenSpecs["billing-html-payment-history"]}
		/>
	);
}
