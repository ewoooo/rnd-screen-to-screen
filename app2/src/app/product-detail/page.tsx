import {
	ProductBenefitList,
	ProductOptionSelector,
	ProductPromoBanner,
	ProductPurchaseBar,
	ProductShell,
	ProductSummaryCard,
} from "@/components/product-kit";
import { MobileScreen } from "@/components/system";

import { productDetailFixture } from "./_mock";

export default function ProductDetailPage() {
	const f = productDetailFixture;

	return (
		<MobileScreen>
			<ProductShell
				purchaseBar={
					<ProductPurchaseBar
						title={f.purchase.title}
						aiText={f.purchase.aiText}
						ctaText={f.purchase.ctaText}
					/>
				}
			>
				<ProductSummaryCard {...f.product} />
				<ProductOptionSelector
					label={f.options.label}
					title={f.options.title}
					items={f.options.items}
					selectedId="white"
				/>
				<ProductPromoBanner
					badge={f.promo.badge}
					text={f.promo.text}
					action={f.promo.action}
				/>
				<ProductBenefitList
					label={f.benefits.label}
					title={f.benefits.title}
					items={f.benefits.items}
				/>
			</ProductShell>
		</MobileScreen>
	);
}
