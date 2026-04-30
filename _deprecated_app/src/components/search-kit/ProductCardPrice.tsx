import { Card, Placeholder, T_BRAND } from "@/components/home-kit";

type Props = {
	title: string;
	originalPrice: string;
	monthlyPrice: string;
	tags: string[];
	/** 첫 tag를 T_BRAND 채움으로 강조 */
	primaryTag?: boolean;
};

/**
 * 제품 가격 카드 — 단말기 섹션(step 05) 2x2 grid.
 */
export function ProductCardPrice({
	title,
	originalPrice,
	monthlyPrice,
	tags,
	primaryTag = false,
}: Props) {
	return (
		<Card
			style={{
				padding: "var(--spacing-16)",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: "var(--spacing-8)",
			}}
		>
			<Placeholder w="100%" h={110} label="product" />
			<span
				style={{
					fontSize: 14,
					fontWeight: 700,
					color: "var(--semantic-label-normal)",
				}}
			>
				{title}
			</span>
			<span
				style={{
					fontSize: 12,
					fontWeight: 400,
					color: "var(--semantic-label-alternative)",
					textDecoration: "line-through",
				}}
			>
				{originalPrice}
			</span>
			<span
				style={{
					fontSize: 16,
					fontWeight: 700,
					color: "var(--semantic-label-normal)",
				}}
			>
				{monthlyPrice}
			</span>
			<div
				style={{
					display: "flex",
					gap: "var(--spacing-4)",
					flexWrap: "wrap",
					justifyContent: "center",
				}}
			>
				{tags.map((t, i) => {
					const highlight = primaryTag && i === 0;
					return (
						<span
							key={t}
							style={{
								padding: "var(--spacing-2) var(--spacing-6)",
								borderRadius: 4,
								fontSize: 11,
								fontWeight: 600,
								background: highlight ? T_BRAND : "var(--semantic-fill-normal)",
								color: highlight
									? "#fff"
									: "var(--semantic-label-alternative)",
							}}
						>
							{t}
						</span>
					);
				})}
			</div>
		</Card>
	);
}
