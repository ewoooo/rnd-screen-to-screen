import { activeRenderableScreenSpecs } from "@screen/specs";

import { BillingPayResultScreen } from "./_sdui-renderer";

export default function BillingPayResultPage() {
	return (
		<BillingPayResultScreen
			spec={activeRenderableScreenSpecs["billing-html-pay-result"]}
		/>
	);
}
