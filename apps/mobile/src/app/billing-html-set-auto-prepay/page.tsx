import { activeRenderableScreenSpecs } from "@screen/specs";

import { BillingSetAutoPrepayScreen } from "./_sdui-renderer";

export default function BillingSetAutoPrepayPage() {
	return (
		<BillingSetAutoPrepayScreen
			spec={activeRenderableScreenSpecs["billing-html-set-auto-prepay"]}
		/>
	);
}
