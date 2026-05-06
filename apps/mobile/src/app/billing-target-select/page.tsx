import { activeRenderableScreenSpecs } from "@screen/screens";

import { BillingTargetSelectScreen } from "./_sdui-renderer";

export default function BillingTargetSelectPage() {
	return (
		<BillingTargetSelectScreen
			spec={activeRenderableScreenSpecs["billing-target-select"]}
		/>
	);
}
