import { activeRenderableScreenSpecs } from "@/screens";

import { BillingPayProxyResultScreen } from "./_sdui-renderer";

export default function BillingPayProxyResultPage() {
	return (
		<BillingPayProxyResultScreen
			spec={activeRenderableScreenSpecs["billing-pay-proxy-result"]}
		/>
	);
}
