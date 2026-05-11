import { activeRenderableScreenSpecs } from "@/screens";

import { BillingPayPrepayResultScreen } from "./_sdui-renderer";

export default function BillingPayPrepayResultPage() {
	return (
		<BillingPayPrepayResultScreen
			spec={activeRenderableScreenSpecs["billing-html-pay-prepay-result"]}
		/>
	);
}
