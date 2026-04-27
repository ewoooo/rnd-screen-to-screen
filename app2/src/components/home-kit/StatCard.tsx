import { Placeholder } from "@/components/system";
import { Typography } from "@/components/typography";

import { Card } from "./Card";
import { StatBadge } from "./text";

type Props = {
	label: string;
	value: string;
	badge?: string;
	graphic?: { w: number; h: number; label: string };
};

/**
 * Card/L2 stat 패턴 — 숫자를 강조한 카드.
 * 라벨 + 큰 값 + 작은 배지 + 우측 그래픽 placeholder.
 * 관리 화면의 4개 stat 카드에서 반복 사용.
 */
export function StatCard({ label, value, badge, graphic }: Props) {
	return (
		<Card
			style={{
				height: 112,
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-4)",
				}}
			>
				<Typography variant="section-label">{label}</Typography>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "var(--spacing-6)",
					}}
				>
					<Typography variant="heading-20">{value}</Typography>
					{badge ? <StatBadge>{badge}</StatBadge> : null}
				</div>
			</div>
			{graphic ? (
				<Placeholder w={graphic.w} h={graphic.h} label={graphic.label} />
			) : null}
		</Card>
	);
}
