import type { CSSProperties, ReactNode } from "react";

import { CARD_BG, CARD_BORDER, CARD_RADIUS } from "./tokens";

type Props = {
	children: ReactNode;
	style?: CSSProperties;
};

/**
 * home-kit 카드 공통 컨테이너. 내부 padding 32, radius 24, 반투명 흰색.
 * HeroCard/StatCard/BarcodeCard 등이 이걸 베이스로 쓴다.
 */
export function Card({ children, style }: Props) {
	return (
		<section
			style={{
				background: CARD_BG,
				border: `1px solid ${CARD_BORDER}`,
				borderRadius: CARD_RADIUS,
				padding: "var(--spacing-32)",
				width: "100%",
				boxSizing: "border-box",
				...style,
			}}
		>
			{children}
		</section>
	);
}
