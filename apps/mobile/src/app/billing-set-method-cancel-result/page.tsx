import { activeRenderableScreenSpecs } from "@screen/screens";

import { BillingSetMethodCancelResultScreen } from "./_sdui-renderer";

export default function BillingSetMethodCancelResultPage() {
	return (
		<BillingSetMethodCancelResultScreen
			spec={activeRenderableScreenSpecs["billing-set-method-cancel-result"]}
		/>
	);
}
