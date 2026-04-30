import type { CSSProperties } from "react";

import { CARD_BORDER, T_BRAND } from "@/components/payment-kit/tokens";

type Item = { key: string; label: string; active?: boolean };

/**
 * 인증 수단·옵션을 가로 세그먼트로 토글. 결제도메인 MethodCard와 의미축이 다름.
 */
export function MethodToggle({ items }: { items: readonly Item[] }) {
	return (
		<div style={wrapStyle}>
			{items.map((it) => (
				<div key={it.key} style={it.active ? onStyle : offStyle}>
					{it.label}
				</div>
			))}
		</div>
	);
}

const wrapStyle: CSSProperties = {
	display: "grid",
	gridAutoFlow: "column",
	gridAutoColumns: "1fr",
	gap: "var(--spacing-8)",
	background: "transparent",
};

const baseSeg: CSSProperties = {
	textAlign: "center",
	padding: "var(--spacing-12) var(--spacing-16)",
	borderRadius: 14,
	fontSize: 14,
	fontWeight: 700,
	letterSpacing: -0.2,
};

const onStyle: CSSProperties = {
	...baseSeg,
	background: T_BRAND,
	color: "#fff",
};

const offStyle: CSSProperties = {
	...baseSeg,
	background: "var(--semantic-fill-normal)",
	color: "var(--semantic-label-alternative)",
	border: `1px solid ${CARD_BORDER}`,
};
