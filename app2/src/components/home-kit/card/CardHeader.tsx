import { Typography } from "@/components/typography";

type Gap = 4 | 8;

type Props = {
	label?: string;
	title?: string;
	sub?: string;
	/** label · title · sub 사이 세로 gap (CSS var --spacing-N). 기본 4. */
	gap?: Gap;
};

/**
 * Card 안 헤더 묶음 — section-label + heading-20 (+ optional list-sub).
 * 5화면 공통 패턴. 빈 슬롯은 렌더 생략.
 */
export function CardHeader({ label, title, sub, gap = 4 }: Props) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: `var(--spacing-${gap})`,
			}}
		>
			{label !== undefined ? (
				<Typography variant="section-label">{label}</Typography>
			) : null}
			{title !== undefined ? (
				<Typography variant="heading-20">{title}</Typography>
			) : null}
			{sub !== undefined ? (
				<Typography variant="list-sub">{sub}</Typography>
			) : null}
		</div>
	);
}
