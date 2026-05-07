import { activeRenderableScreenSpecs } from "@screen/specs";

import { BillingPayPrepayScreen } from "./_sdui-renderer";

export default function BillingPayPrepayPage() {
	return (
		<BillingPayPrepayScreen
			spec={activeRenderableScreenSpecs["billing-pay-prepay"]}
		/>
	);
}
