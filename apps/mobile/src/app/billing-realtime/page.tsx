import { activeRenderableScreenSpecs } from "@/screens";

import { BillingRealtimeScreen } from "./_sdui-renderer";

export default function BillingRealtimePage() {
	return (
		<BillingRealtimeScreen
			spec={activeRenderableScreenSpecs["billing-realtime"]}
		/>
	);
}
