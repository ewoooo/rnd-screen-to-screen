import { activeRenderableScreenSpecs } from "@screen/specs";

import { BillingPayProxyExecuteScreen } from "./_sdui-renderer";

export default function BillingPayProxyExecutePage() {
	return (
		<BillingPayProxyExecuteScreen
			spec={activeRenderableScreenSpecs["billing-pay-proxy-execute"]}
		/>
	);
}
