import type { ReactNode } from "react";

import { FONT } from "./tokens";

/**
 * 13 / 700 / label-alternative — 리스트 행 부제 ("VVIP CGV 1인 무료 이용", "D-2")
 */
export function ListSubPilot({ children }: { children: ReactNode }) {
	return (
		<span
			style={{
				margin: 0,
				fontStyle: "normal",
				...FONT.listSub,
				color: "var(--semantic-label-alternative)",
			}}
		>
			{children}
		</span>
	);
}
