import type { ReactNode } from "react";

import { BADGE_BG, FONT } from "./tokens";

/**
 * 11 / 700 / alternative / `#f4f5fa` bg — Stat 카드의 작은 회색 배지.
 * (구 home-kit/StatBadge — pilot-kit Badge 컨벤션으로 명명 변경)
 */
export function BadgeStatPilot({ children }: { children: ReactNode }) {
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
