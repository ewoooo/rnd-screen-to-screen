import type { CSSProperties } from "react";

import { FONT } from "@/components/home-kit";
import { CARD_BORDER, T_BRAND } from "@/components/payment-kit/tokens";

type Item = { key: string; label: string; checked?: boolean };

/**
 * 다중 체크 리스트 — 탈퇴 사유 선택, 동의 항목 등 반복 사용.
 * TermsRow와 의미축 다름: 본문 보기 chevron 없음, 라벨 위주.
 */
export function CheckList({ items }: { items: readonly Item[] }) {
	return (
		<div style={listStyle}>
			{items.map((it) => (
				<div key={it.key} style={rowStyle}>
					<span style={it.checked ? checkOnStyle : checkOffStyle}>{it.checked ? "✓" : ""}</span>
					<span
						style={{
							...FONT.listSub,
							flex: 1,
							fontWeight: it.checked ? 700 : 500,
							color: "var(--semantic-label-normal)",
						}}
					>
						{it.label}
					</span>
				</div>
			))}
		</div>
	);
}

const listStyle: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: "var(--spacing-2)",
};

const rowStyle: CSSProperties = {
	display: "flex",
	alignItems: "center",
	gap: "var(--spacing-12)",
	padding: "var(--spacing-12) var(--spacing-4)",
};

const checkBase: CSSProperties = {
	width: 22,
	height: 22,
	borderRadius: 11,
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	fontSize: 12,
	fontWeight: 800,
};

const checkOnStyle: CSSProperties = {
	...checkBase,
	background: T_BRAND,
	color: "#fff",
};

const checkOffStyle: CSSProperties = {
	...checkBase,
	background: "transparent",
	color: "transparent",
	border: `1.5px solid ${CARD_BORDER}`,
};
