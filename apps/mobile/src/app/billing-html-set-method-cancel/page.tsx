import { activeRenderableScreenSpecs } from "@screen/specs";

import { BillingSetMethodCancelScreen } from "./_sdui-renderer";

export default function BillingSetMethodCancelPage() {
	return (
		<BillingSetMethodCancelScreen
			spec={activeRenderableScreenSpecs["billing-html-set-method-cancel"]}
		/>
	);
}
