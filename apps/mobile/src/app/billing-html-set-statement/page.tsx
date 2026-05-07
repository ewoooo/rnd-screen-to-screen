import { activeRenderableScreenSpecs } from "@screen/specs";

import { BillingSetStatementScreen } from "./_sdui-renderer";

export default function BillingSetStatementPage() {
	return (
		<BillingSetStatementScreen
			spec={activeRenderableScreenSpecs["billing-html-set-statement"]}
		/>
	);
}
