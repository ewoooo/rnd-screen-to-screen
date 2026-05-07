import { activeRenderableScreenSpecs } from "@screen/specs";

import { BillingSetContentLimitScreen } from "./_sdui-renderer";

export default function BillingSetContentLimitPage() {
	return (
		<BillingSetContentLimitScreen
			spec={activeRenderableScreenSpecs["billing-set-content-limit"]}
		/>
	);
}
