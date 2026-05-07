import { activeRenderableScreenSpecs } from "@screen/specs";

import { BillingPayProxyScreen } from "./_sdui-renderer";

export default function BillingPayProxyPage() {
	return (
		<BillingPayProxyScreen
			spec={activeRenderableScreenSpecs["billing-html-pay-proxy"]}
		/>
	);
}
