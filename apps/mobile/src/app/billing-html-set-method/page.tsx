import { activeRenderableScreenSpecs } from "@/screens";

import { BillingSetMethodScreen } from "./_sdui-renderer";

export default function BillingSetMethodPage() {
	return (
		<BillingSetMethodScreen
			spec={activeRenderableScreenSpecs["billing-html-set-method"]}
		/>
	);
}
