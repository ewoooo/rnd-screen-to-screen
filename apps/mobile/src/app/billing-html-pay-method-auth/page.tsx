import { activeRenderableScreenSpecs } from "@/screens";

import { BillingPayMethodAuthScreen } from "./_sdui-renderer";

export default function BillingPayMethodAuthPage() {
	return (
		<BillingPayMethodAuthScreen
			spec={activeRenderableScreenSpecs["billing-html-pay-method-auth"]}
		/>
	);
}
