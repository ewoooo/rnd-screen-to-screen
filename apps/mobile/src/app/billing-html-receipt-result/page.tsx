import { activeRenderableScreenSpecs } from "@/screens";

import { BillingReceiptResultScreen } from "./_sdui-renderer";

export default function BillingReceiptResultPage() {
	return (
		<BillingReceiptResultScreen
			spec={activeRenderableScreenSpecs["billing-html-receipt-result"]}
		/>
	);
}
