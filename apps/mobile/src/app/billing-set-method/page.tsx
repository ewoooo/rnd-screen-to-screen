import { activeRenderableScreenSpecs } from "@screen/screens";

import { BillingSetMethodScreen } from "./_sdui-renderer";

export default function BillingSetMethodPage() {
	return (
		<BillingSetMethodScreen
			spec={activeRenderableScreenSpecs["billing-set-method"]}
		/>
	);
}
