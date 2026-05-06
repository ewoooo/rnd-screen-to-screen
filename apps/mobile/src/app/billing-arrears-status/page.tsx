import { activeRenderableScreenSpecs } from "@screen/screens";

import { BillingArrearsStatusScreen } from "./_sdui-renderer";

export default function BillingArrearsStatusPage() {
	return (
		<BillingArrearsStatusScreen
			spec={activeRenderableScreenSpecs["billing-arrears-status"]}
		/>
	);
}
