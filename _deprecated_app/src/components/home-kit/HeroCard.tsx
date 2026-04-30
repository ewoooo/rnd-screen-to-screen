import { Card } from "./Card";
import { Placeholder } from "./Placeholder";
import { AiText, Heading20, SectionLabel } from "./text";
import { T_BRAND, T_BRAND_SHADOW } from "./tokens";

type Props = {
	label: string;
	headline: string;
	aiText: string;
	ctaText: string;
	onCta?: () => void;
};

/**
 * Card/L3 패턴 — 상단 강조 카드.
 * 라벨 + 2줄 헤드라인 + AI 한 줄 + 우하단 CTA 버튼.
 * 혜택(포인트)과 관리(진단)에서 재사용.
 */
export function HeroCard({ label, headline, aiText, ctaText, onCta }: Props) {
	return (
		<Card
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "var(--spacing-24)",
				alignItems: "flex-end",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-16)",
					width: "100%",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "var(--spacing-8)",
					}}
				>
					<SectionLabel>{label}</SectionLabel>
					<Heading20>{headline}</Heading20>
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "var(--spacing-2)",
					}}
				>
					<Placeholder w={18} h={18} label="ai" />
					<AiText>{aiText}</AiText>
				</div>
			</div>
			<button
				type="button"
				onClick={onCta}
				style={{
					background: T_BRAND,
					color: "#fff",
					height: 36,
					padding: "0 var(--spacing-16)",
					borderRadius: 12,
					border: "none",
					fontSize: 12,
					fontWeight: 600,
					letterSpacing: "-0.48px",
					boxShadow: T_BRAND_SHADOW,
					cursor: "pointer",
					whiteSpace: "nowrap",
				}}
			>
				{ctaText}
			</button>
		</Card>
	);
}
