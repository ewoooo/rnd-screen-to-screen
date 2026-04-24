import type { ReactNode } from "react";

import { FONT, T_BRAND } from "./tokens";

/**
 * 13 / 700 / T_BRAND — AI 제안 인라인 (Card/L3 내부)
 */
export function AiTextPilot({ children }: { children: ReactNode }) {
	return (
		<span
			style={{
				margin: 0,
				fontStyle: "normal",
				...FONT.aiText,
				color: T_BRAND,
			}}
		>
			{children}
		</span>
	);
}
