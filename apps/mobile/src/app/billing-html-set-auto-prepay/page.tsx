import { activeRenderableScreenSpecs } from "@screen/screens";

import { BillingSetAutoPrepayScreen } from "./_sdui-renderer";

export default function BillingSetAutoPrepayPage() {
	return (
		<BillingSetAutoPrepayScreen
			spec={activeRenderableScreenSpecs["billing-html-set-auto-prepay"]}
		/>
	);
}
