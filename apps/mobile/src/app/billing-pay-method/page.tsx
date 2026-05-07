import { activeRenderableScreenSpecs } from "@screen/specs";

import { BillingPayMethodScreen } from "./_sdui-renderer";

export default function BillingPayMethodPage() {
	return (
		<BillingPayMethodScreen
			spec={activeRenderableScreenSpecs["billing-pay-method"]}
		/>
	);
}
