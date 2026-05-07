import { activeRenderableScreenSpecs } from "@screen/screens";

import { BillingSetMscLimitScreen } from "./_sdui-renderer";

export default function BillingSetMscLimitPage() {
	return (
		<BillingSetMscLimitScreen
			spec={activeRenderableScreenSpecs["billing-html-set-msc-limit"]}
		/>
	);
}
