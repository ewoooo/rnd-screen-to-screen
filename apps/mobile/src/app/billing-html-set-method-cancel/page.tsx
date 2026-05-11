import { activeRenderableScreenSpecs } from "@/screens";

import { BillingSetMethodCancelScreen } from "./_sdui-renderer";

export default function BillingSetMethodCancelPage() {
	return (
		<BillingSetMethodCancelScreen
			spec={activeRenderableScreenSpecs["billing-html-set-method-cancel"]}
		/>
	);
}
