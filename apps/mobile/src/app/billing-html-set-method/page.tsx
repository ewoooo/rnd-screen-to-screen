import { activeRenderableScreenSpecs } from "@screen/specs";

import { BillingSetMethodScreen } from "./_sdui-renderer";

export default function BillingSetMethodPage() {
	return (
		<BillingSetMethodScreen
			spec={activeRenderableScreenSpecs["billing-html-set-method"]}
		/>
	);
}
