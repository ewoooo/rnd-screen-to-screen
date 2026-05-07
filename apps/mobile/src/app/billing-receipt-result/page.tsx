import { activeRenderableScreenSpecs } from "@screen/specs";

import { BillingReceiptResultScreen } from "./_sdui-renderer";

export default function BillingReceiptResultPage() {
	return (
		<BillingReceiptResultScreen
			spec={activeRenderableScreenSpecs["billing-receipt-result"]}
		/>
	);
}
