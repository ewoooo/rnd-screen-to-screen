import { activeRenderableScreenSpecs } from "@screen/screens";

import { BillingPayConfirmScreen } from "./_sdui-renderer";

export default function BillingPayConfirmPage() {
	return (
		<BillingPayConfirmScreen
			spec={activeRenderableScreenSpecs["billing-html-pay-confirm"]}
		/>
	);
}
