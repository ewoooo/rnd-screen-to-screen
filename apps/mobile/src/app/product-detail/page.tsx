import { activeRenderableScreenSpecs } from "@screen/specs";

import { renderProductDetailFromSpec } from "./_sdui-renderer";

export default function ProductDetailPage() {
	return renderProductDetailFromSpec(
		activeRenderableScreenSpecs["product-detail"],
	);
}
