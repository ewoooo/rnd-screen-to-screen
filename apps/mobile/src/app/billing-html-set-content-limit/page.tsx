import { activeRenderableScreenSpecs } from "@/screens";

import { BillingSetContentLimitScreen } from "./_sdui-renderer";

export default function BillingSetContentLimitPage() {
	return (
		<BillingSetContentLimitScreen
			spec={activeRenderableScreenSpecs["billing-html-set-content-limit"]}
		/>
	);
}
