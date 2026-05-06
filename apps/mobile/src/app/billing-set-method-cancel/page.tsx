import { activeRenderableScreenSpecs } from "@screen/screens";

import { BillingSetMethodCancelScreen } from "./_sdui-renderer";

export default function BillingSetMethodCancelPage() {
	return (
		<BillingSetMethodCancelScreen
			spec={activeRenderableScreenSpecs["billing-set-method-cancel"]}
		/>
	);
}
