import { activeRenderableScreenSpecs } from "@screen/specs";

import { BillingRealtimeScreen } from "./_sdui-renderer";

export default function BillingRealtimePage() {
	return (
		<BillingRealtimeScreen
			spec={activeRenderableScreenSpecs["billing-html-realtime"]}
		/>
	);
}
