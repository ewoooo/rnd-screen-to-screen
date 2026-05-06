import { activeRenderableScreenSpecs } from "@screen/screens";

import { BillingRealtimeScreen } from "./_sdui-renderer";

export default function BillingRealtimePage() {
	return (
		<BillingRealtimeScreen
			spec={activeRenderableScreenSpecs["billing-realtime"]}
		/>
	);
}
