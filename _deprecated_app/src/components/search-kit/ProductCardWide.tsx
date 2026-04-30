import { Card, Placeholder } from "@/components/home-kit";

type Props = {
	title: string;
	sub: string;
	image?: { w: number; h: number; label: string };
};

/**
 * 가로 이미지 카드 — 기획전 섹션(step 05).
 */
export function ProductCardWide({
	title,
	sub,
	image = { w: 80, h: 60, label: "img" },
}: Props) {
	return (
		<Card
			style={{
				padding: "var(--spacing-16) var(--spacing-20)",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				gap: "var(--spacing-12)",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-4)",
					minWidth: 0,
					flex: 1,
				}}
			>
				<span
					style={{
						fontSize: 15,
						fontWeight: 700,
						color: "var(--semantic-label-normal)",
						letterSpacing: "-0.6px",
					}}
				>
					{title}
				</span>
				<span
					style={{
						fontSize: 13,
						fontWeight: 500,
						color: "var(--semantic-label-alternative)",
						letterSpacing: "-0.52px",
					}}
				>
					{sub}
				</span>
			</div>
			<Placeholder w={image.w} h={image.h} label={image.label} />
		</Card>
	);
}
