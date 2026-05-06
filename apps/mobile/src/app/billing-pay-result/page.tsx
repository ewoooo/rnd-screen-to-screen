import { activeRenderableScreenSpecs } from "@screen/screens";

import { BillingPayResultScreen } from "./_sdui-renderer";

export default function BillingPayResultPage() {
	return (
		<BillingPayResultScreen
			spec={activeRenderableScreenSpecs["billing-pay-result"]}
		/>
	);
}
