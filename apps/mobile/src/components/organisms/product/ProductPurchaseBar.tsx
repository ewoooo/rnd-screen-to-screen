import { IconBusinessBag } from "@wanteddev/wds-icon";

import { StickyActionBar } from "@/components/molecules";

import type { ProductTextPolicyMap } from "./types";

type Props = {
	title: string;
	aiText: string;
	ctaText: string;
	textPolicy?: ProductTextPolicyMap;
};

export function ProductPurchaseBar({ title, aiText, ctaText, textPolicy }: Props) {
	return (
		<StickyActionBar
			eyebrow={aiText}
			title={title}
			secondaryAction="장바구니"
			primaryAction={ctaText}
			icon={<IconBusinessBag width={20} height={20} />}
			textPolicy={{
				eyebrow: textPolicy?.aiText,
				title: textPolicy?.title,
			}}
		/>
	);
}
