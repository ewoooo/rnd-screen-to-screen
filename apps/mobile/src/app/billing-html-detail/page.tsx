import { activeRenderableScreenSpecs } from "@screen/screens";

import { BillingDetailScreen } from "./_sdui-renderer";

export default function BillingDetailPage() {
	return (
		<BillingDetailScreen spec={activeRenderableScreenSpecs["billing-html-detail"]} />
	);
}
