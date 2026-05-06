import { activeRenderableScreenSpecs } from "@screen/screens";

import { BillingReceiptResultScreen } from "./_sdui-renderer";

export default function BillingReceiptResultPage() {
	return (
		<BillingReceiptResultScreen
			spec={activeRenderableScreenSpecs["billing-receipt-result"]}
		/>
	);
}
