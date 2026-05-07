import { activeRenderableScreenSpecs } from "@screen/specs";

import { BillingArrearsStatusScreen } from "./_sdui-renderer";

export default function BillingArrearsStatusPage() {
	return (
		<BillingArrearsStatusScreen
			spec={activeRenderableScreenSpecs["billing-html-arrears-status"]}
		/>
	);
}
