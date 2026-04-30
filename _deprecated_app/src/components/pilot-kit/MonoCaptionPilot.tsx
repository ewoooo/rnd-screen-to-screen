import type { ReactNode } from "react";

import { FONT, T_BRAND } from "./tokens";

/**
 * 11 / 700 / alternative — 모노 숫자 (바코드 digits, 타이머 등)
 * brand=true 면 T_BRAND 컬러.
 */
export function MonoCaptionPilot({
	children,
	brand,
}: {
	children: ReactNode;
	brand?: boolean;
}) {
	return (
		<span
			style={{
				margin: 0,
				fontStyle: "normal",
				...FONT.monoCaption,
				color: brand ? T_BRAND : "var(--semantic-label-alternative)",
			}}
		>
			{children}
		</span>
	);
}
