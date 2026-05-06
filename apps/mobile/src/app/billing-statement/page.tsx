import { activeRenderableScreenSpecs } from "@screen/screens";

import { BillingStatementScreen } from "./_sdui-renderer";

export default function BillingStatementPage() {
	return (
		<BillingStatementScreen
			spec={activeRenderableScreenSpecs["billing-statement"]}
		/>
	);
}
