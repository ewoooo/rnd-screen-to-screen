import { activeRenderableScreenSpecs } from "@screen/specs";

import { BillingPayConfirmScreen } from "./_sdui-renderer";

export default function BillingPayConfirmPage() {
	return (
		<BillingPayConfirmScreen
			spec={activeRenderableScreenSpecs["billing-pay-confirm"]}
		/>
	);
}
