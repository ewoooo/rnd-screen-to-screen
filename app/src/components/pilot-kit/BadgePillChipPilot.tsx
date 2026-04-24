import type { ReactNode } from "react";

import { FONT } from "./tokens";

/**
 * 12 / 600 / alternative / fill-normal bg — 리스트 행 우측 pill ("예매", "상세")
 * (구 home-kit/PillChip — pilot-kit Badge 컨벤션으로 명명 변경)
 */
export function BadgePillChipPilot({ children }: { children: ReactNode }) {
	return (
		<span
			style={{
				margin: 0,
				fontStyle: "normal",
				...FONT.pillChip,
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				background: "var(--semantic-fill-normal)",
				borderRadius: 999,
				padding: "var(--spacing-6) var(--spacing-12)",
				color: "var(--semantic-label-alternative)",
				flexShrink: 0,
			}}
		>
			{children}
		</span>
	);
}
