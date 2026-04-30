import { HStack, VStack } from "@/components/atoms/layout";
import { TextBlock } from "@/components/atoms/typography";
import { MediaBadge, SummaryCard } from "@/components/molecules";
import { ContentSection } from "@/components/templates/app-screen";

import type { ProductTextPolicyMap } from "./types";

type Props = {
	label: string;
	name: string;
	brand: string;
	price: string;
	originalPrice: string;
	discount: string;
	rating: string;
	reviewCount: string;
	imageLabel: string;
	textPolicy?: ProductTextPolicyMap;
};

export function ProductSummaryCard({
	label,
	name,
	brand,
	price,
	originalPrice,
	discount,
	rating,
	reviewCount,
	imageLabel,
	textPolicy,
}: Props) {
	return (
		<ContentSection>
			<SummaryCard
				label={`${label} · ${brand}`}
				title={name}
				labelPolicy={textPolicy?.label}
				titlePolicy={textPolicy?.name}
				mediaAlt={imageLabel}
				mediaBadge={<MediaBadge text={discount} />}
			>
				<VStack gap="row">
					<HStack gap="inline" wrap align="baseline">
						<TextBlock
							variant={textPolicy?.price?.variant ?? "contentTitle"}
							text={price}
							maxLines={textPolicy?.price?.maxLines}
							overflow={textPolicy?.price?.overflow}
						/>
						<TextBlock
							variant="supportText"
							text={originalPrice}
							color="semantic.label.alternative"
							style={{ textDecoration: "line-through" }}
						/>
					</HStack>
					<HStack align="center" gap="inline">
						<TextBlock
							variant="rating"
							text={`★ ${rating}`}
							color="semantic.primary.normal"
						/>
						<TextBlock
							variant="supportText"
							text={reviewCount}
							color="semantic.label.alternative"
						/>
					</HStack>
				</VStack>
			</SummaryCard>
		</ContentSection>
	);
}
