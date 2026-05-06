import { activeRenderableScreenSpecs } from "@screen/screens";

import { BillingStatementResultScreen } from "./_sdui-renderer";

export default function BillingStatementResultPage() {
	return (
		<BillingStatementResultScreen
			spec={activeRenderableScreenSpecs["billing-statement-result"]}
		/>
	);
}
