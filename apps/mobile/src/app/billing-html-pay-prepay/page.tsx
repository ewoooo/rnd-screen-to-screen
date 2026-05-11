import { activeRenderableScreenSpecs } from "@/screens";

import { BillingPayPrepayScreen } from "./_sdui-renderer";

export default function BillingPayPrepayPage() {
	return (
		<BillingPayPrepayScreen
			spec={activeRenderableScreenSpecs["billing-html-pay-prepay"]}
		/>
	);
}
