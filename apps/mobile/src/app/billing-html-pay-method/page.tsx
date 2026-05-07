import { activeRenderableScreenSpecs } from "@screen/screens";

import { BillingPayMethodScreen } from "./_sdui-renderer";

export default function BillingPayMethodPage() {
	return (
		<BillingPayMethodScreen
			spec={activeRenderableScreenSpecs["billing-html-pay-method"]}
		/>
	);
}
