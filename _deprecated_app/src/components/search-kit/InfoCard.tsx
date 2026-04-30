import { Card } from "@/components/home-kit";

type Props = {
	title: string;
	description: string;
};

/**
 * 제목 + 긴 설명 카드 — 부가서비스 섹션(step 06).
 */
export function InfoCard({ title, description }: Props) {
	return (
		<Card
			style={{
				padding: "var(--spacing-20) var(--spacing-24)",
				display: "flex",
				flexDirection: "column",
				gap: "var(--spacing-8)",
			}}
		>
			<span
				style={{
					fontSize: 16,
					fontWeight: 700,
					color: "var(--semantic-label-normal)",
					letterSpacing: "-0.64px",
				}}
			>
				{title}
			</span>
			<p
				style={{
					margin: 0,
					fontSize: 13,
					fontWeight: 400,
					color: "var(--semantic-label-neutral)",
					letterSpacing: "-0.39px",
					lineHeight: 1.5,
				}}
			>
				{description}
			</p>
		</Card>
	);
}
