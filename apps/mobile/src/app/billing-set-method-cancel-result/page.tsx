import { activeRenderableScreenSpecs } from "@screen/specs";

import { BillingSetMethodCancelResultScreen } from "./_sdui-renderer";

export default function BillingSetMethodCancelResultPage() {
	return (
		<BillingSetMethodCancelResultScreen
			spec={activeRenderableScreenSpecs["billing-set-method-cancel-result"]}
		/>
	);
}
