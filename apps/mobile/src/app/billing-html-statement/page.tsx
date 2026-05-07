import { activeRenderableScreenSpecs } from "@screen/specs";

import { BillingStatementScreen } from "./_sdui-renderer";

export default function BillingStatementPage() {
	return (
		<BillingStatementScreen
			spec={activeRenderableScreenSpecs["billing-html-statement"]}
		/>
	);
}
