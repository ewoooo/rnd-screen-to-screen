import { activeRenderableScreenSpecs } from "@screen/specs";

import { BillingMscHistoryScreen } from "./_sdui-renderer";

export default function BillingMscHistoryPage() {
	return (
		<BillingMscHistoryScreen
			spec={activeRenderableScreenSpecs["billing-msc-history"]}
		/>
	);
}
