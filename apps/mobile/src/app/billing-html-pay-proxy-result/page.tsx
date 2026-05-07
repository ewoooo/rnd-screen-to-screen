import { activeRenderableScreenSpecs } from "@screen/screens";

import { BillingPayProxyResultScreen } from "./_sdui-renderer";

export default function BillingPayProxyResultPage() {
	return (
		<BillingPayProxyResultScreen
			spec={activeRenderableScreenSpecs["billing-html-pay-proxy-result"]}
		/>
	);
}
