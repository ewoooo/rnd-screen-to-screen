import { activeRenderableScreenSpecs } from "@screen/screens";

import { BillingSummaryScreen } from "./_sdui-renderer";

export default function BillingSummaryPage() {
	return (
		<BillingSummaryScreen
			spec={activeRenderableScreenSpecs["billing-summary"]}
		/>
	);
}
