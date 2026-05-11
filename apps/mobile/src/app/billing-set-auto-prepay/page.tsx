import { activeRenderableScreenSpecs } from "@/screens";

import { BillingSetAutoPrepayScreen } from "./_sdui-renderer";

export default function BillingSetAutoPrepayPage() {
	return (
		<BillingSetAutoPrepayScreen
			spec={activeRenderableScreenSpecs["billing-set-auto-prepay"]}
		/>
	);
}
