import { activeRenderableScreenSpecs } from "@screen/screens";

import { BillingMscHistoryScreen } from "./_sdui-renderer";

export default function BillingMscHistoryPage() {
	return (
		<BillingMscHistoryScreen
			spec={activeRenderableScreenSpecs["billing-html-msc-history"]}
		/>
	);
}
