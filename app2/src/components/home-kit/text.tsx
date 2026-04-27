import type { ReactNode } from "react";

import { BADGE_BG, FONT, T_BRAND } from "./tokens";

/**
 * 장식 wrap 2종 — bg/padding/radius 포함.
 * 순수 타이포 6 슬롯은 @/components/typography 의 Typography variant 로 이전.
 */

/** 11 / 700 / alternative / `#f4f5fa` bg — Stat 카드의 작은 회색 배지 */
export function StatBadge({ children }: { children: ReactNode }) {
	return (
		<span
			style={{
				margin: 0,
				fontStyle: "normal",
				...FONT.statBadge,
				background: BADGE_BG,
				borderRadius: 6,
				padding: "var(--spacing-4) var(--spacing-6)",
				color: "var(--semantic-label-alternative)",
				whiteSpace: "nowrap",
			}}
		>
			{children}
		</span>
	);
}

type PillTone = "neutral" | "violet";

/**
 * 12 / 600 — 리스트/카드 우측 pill chip.
 * - `neutral` (default): fill-normal bg + label-alternative color
 * - `violet`: BADGE_BG + T_BRAND
 */
export function PillChip({
	children,
	tone = "neutral",
}: {
	children: ReactNode;
	tone?: PillTone;
}) {
	const palette =
		tone === "violet"
			? { bg: BADGE_BG, color: T_BRAND }
			: {
					bg: "var(--semantic-fill-normal)",
					color: "var(--semantic-label-alternative)",
				};
	return (
		<span
			style={{
				margin: 0,
				fontStyle: "normal",
				...FONT.pillChip,
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				background: palette.bg,
				borderRadius: 999,
				padding: "var(--spacing-6) var(--spacing-12)",
				color: palette.color,
				flexShrink: 0,
			}}
		>
			{children}
		</span>
	);
}
