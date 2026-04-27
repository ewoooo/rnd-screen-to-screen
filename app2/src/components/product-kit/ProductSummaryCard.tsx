import { CardCaption, CardContent, CardTitle, Typography } from "@wanteddev/wds";

import { MediaBadge, MediaBlock, Surface } from "@/components/patterns";

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
}: Props) {
	return (
		<Surface gap={20}>
			<MediaBlock
				alt={imageLabel}
				ratio="1:1"
				badge={<MediaBadge text={discount} />}
			/>
			<CardContent style={{ gap: "var(--spacing-10)" }}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "var(--spacing-4)",
					}}
				>
					<CardCaption variant="caption1" weight="bold">
						{label} · {brand}
					</CardCaption>
					<CardTitle variant="heading2" weight="bold">
						{name}
					</CardTitle>
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "baseline",
						gap: "var(--spacing-8)",
						flexWrap: "wrap",
					}}
				>
					<Typography variant="title3" weight="bold">
						{price}
					</Typography>
					<Typography
						variant="caption1"
						weight="bold"
						color="semantic.label.alternative"
						style={{ textDecoration: "line-through" }}
					>
						{originalPrice}
					</Typography>
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "var(--spacing-6)",
					}}
				>
					<Typography variant="label2" weight="bold" color="semantic.primary.normal">
						★ {rating}
					</Typography>
					<Typography
						variant="caption1"
						weight="bold"
						color="semantic.label.alternative"
					>
						{reviewCount}
					</Typography>
				</div>
			</CardContent>
		</Surface>
	);
}
