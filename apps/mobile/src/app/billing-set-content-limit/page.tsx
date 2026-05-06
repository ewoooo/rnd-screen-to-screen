import { activeRenderableScreenSpecs } from "@screen/screens";

import { BillingSetContentLimitScreen } from "./_sdui-renderer";

export default function BillingSetContentLimitPage() {
	return (
		<BillingSetContentLimitScreen
			spec={activeRenderableScreenSpecs["billing-set-content-limit"]}
		/>
	);
}
