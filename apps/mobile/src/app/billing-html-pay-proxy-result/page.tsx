import { activeRenderableScreenSpecs } from "@screen/specs";

import { BillingPayProxyResultScreen } from "./_sdui-renderer";

export default function BillingPayProxyResultPage() {
	return (
		<BillingPayProxyResultScreen
			spec={activeRenderableScreenSpecs["billing-html-pay-proxy-result"]}
		/>
	);
}
