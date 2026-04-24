import type { ReactNode } from "react";

import { FONT } from "./tokens";

/**
 * 13 / 700 / neutral — 카드 상단 라벨 ("T멤버십 포인트", "결합가족 보기" 등)
 * Figma 픽셀 실측 기반 (memory: feedback_typography_spec_fidelity).
 */
export function SectionLabelPilot({ children }: { children: ReactNode }) {
	return (
		<span
			style={{
				margin: 0,
				fontStyle: "normal",
				...FONT.sectionLabel,
				color: "var(--semantic-label-neutral)",
			}}
		>
			{children}
		</span>
	);
}
