import { activeRenderableScreenSpecs } from "@screen/screens";

import { renderProductDetailFromSpec } from "./_sdui-renderer";

export default function ProductDetailPage() {
	return renderProductDetailFromSpec(
		activeRenderableScreenSpecs["product-detail"],
	);
}
