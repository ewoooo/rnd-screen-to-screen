import { activeRenderableScreenSpecs } from "@screen/specs";

import { BillingSetMscLimitScreen } from "./_sdui-renderer";

export default function BillingSetMscLimitPage() {
	return (
		<BillingSetMscLimitScreen
			spec={activeRenderableScreenSpecs["billing-set-msc-limit"]}
		/>
	);
}
