import iconShop from "@/assets/icons/ico_line_shop.svg";
import { StickyActionBar } from "@/components/patterns";
import { Icon } from "@/components/system";

type Props = {
	title: string;
	aiText: string;
	ctaText: string;
};

export function ProductPurchaseBar({ title, aiText, ctaText }: Props) {
	return (
		<StickyActionBar
			eyebrow={aiText}
			title={title}
			secondaryAction="장바구니"
			primaryAction={ctaText}
			icon={<Icon src={iconShop} width={20} height={20} color="currentColor" />}
		/>
	);
}
