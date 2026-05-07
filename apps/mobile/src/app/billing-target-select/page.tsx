import { activeRenderableScreenSpecs } from "@screen/specs";

import { BillingTargetSelectScreen } from "./_sdui-renderer";

export default function BillingTargetSelectPage() {
	return (
		<BillingTargetSelectScreen
			spec={activeRenderableScreenSpecs["billing-target-select"]}
		/>
	);
}
