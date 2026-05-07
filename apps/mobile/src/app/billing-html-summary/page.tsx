import { activeRenderableScreenSpecs } from "@screen/specs";

import { BillingSummaryScreen } from "./_sdui-renderer";

export default function BillingSummaryPage() {
	return (
		<BillingSummaryScreen
			spec={activeRenderableScreenSpecs["billing-html-summary"]}
		/>
	);
}
