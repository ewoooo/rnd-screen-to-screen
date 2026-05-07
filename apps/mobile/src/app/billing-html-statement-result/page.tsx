import { activeRenderableScreenSpecs } from "@screen/specs";

import { BillingStatementResultScreen } from "./_sdui-renderer";

export default function BillingStatementResultPage() {
	return (
		<BillingStatementResultScreen
			spec={activeRenderableScreenSpecs["billing-html-statement-result"]}
		/>
	);
}
