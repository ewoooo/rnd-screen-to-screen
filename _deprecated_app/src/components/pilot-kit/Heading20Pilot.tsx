import type { ReactNode } from "react";

import { FONT } from "./tokens";

/**
 * 20 / 700 — 큰 타이틀 ("5곳에서 사용가능", "32GB", "엄마의 사용패턴에...")
 * pre-line으로 개행 유지.
 */
export function Heading20Pilot({ children }: { children: ReactNode }) {
	return (
		<p
			style={{
				margin: 0,
				fontStyle: "normal",
				...FONT.heading20,
				whiteSpace: "pre-line",
				color: "var(--semantic-label-normal)",
			}}
		>
			{children}
		</p>
	);
}
