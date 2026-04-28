import type { CSSProperties } from "react";

import { CARD_BORDER, T_BRAND } from "@/components/payment-kit/tokens";

/**
 * 22px 원형 체크 인디케이터. TermsRow / CheckList 등 동의·선택 row의 leading.
 */
export function CheckIndicator({ checked }: { checked?: boolean }) {
	return <span style={checked ? onStyle : offStyle}>{checked ? "✓" : ""}</span>;
}

const baseStyle: CSSProperties = {
	width: 22,
	height: 22,
	borderRadius: 11,
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	fontSize: 12,
	fontWeight: 800,
	flexShrink: 0,
};

const onStyle: CSSProperties = {
	...baseStyle,
	background: T_BRAND,
	color: "#fff",
};

const offStyle: CSSProperties = {
	...baseStyle,
	background: "transparent",
	color: "transparent",
	border: `1.5px solid ${CARD_BORDER}`,
};
