import { activeRenderableScreenSpecs } from "@screen/specs";

import { BillingDetailScreen } from "./_sdui-renderer";

export default function BillingDetailPage() {
	return (
		<BillingDetailScreen spec={activeRenderableScreenSpecs["billing-html-detail"]} />
	);
}
