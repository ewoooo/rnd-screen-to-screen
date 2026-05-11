import { activeRenderableScreenSpecs } from "@/screens";

import { BillingStatementScreen } from "./_sdui-renderer";

export default function BillingStatementPage() {
	return (
		<BillingStatementScreen
			spec={activeRenderableScreenSpecs["billing-html-statement"]}
		/>
	);
}
