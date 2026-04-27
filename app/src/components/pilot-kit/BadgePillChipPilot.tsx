import type { ReactNode } from "react";

import { BADGE_BG, FONT, T_BRAND } from "./tokens";

type Tone = "neutral" | "violet";

/**
 * 12 / 600 — 리스트/카드 우측 pill chip.
 * - `neutral` (default): fill-normal bg + label-alternative color ("예매", "상세")
 * - `violet`: BADGE_BG + T_BRAND — 결제 등 강조 라벨
 *
 * (구 home-kit/PillChip — pilot-kit Badge 컨벤션으로 명명 변경)
 */
export function BadgePillChipPilot({
	children,
	tone = "neutral",
}: {
	children: ReactNode;
	tone?: Tone;
}) {
	const palette =
		tone === "violet"
			? { bg: BADGE_BG, color: T_BRAND }
			: { bg: "var(--semantic-fill-normal)", color: "var(--semantic-label-alternative)" };
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
