import type { CSSProperties } from "react";

import { FONT } from "@/components/home-kit";
import { CARD_BORDER, T_BRAND } from "@/components/payment-kit/tokens";

type Props = {
	label: string;
	required?: boolean;
	checked?: boolean;
	emphasized?: boolean;
};

/**
 * 약관 한 줄 row — 체크 인디케이터 + 라벨 + 본문 보기 chevron.
 * payment-kit ActionRow 와 톤은 같지만 의미축이 '동의 여부'라 별도.
 */
export function TermsRow({ label, required, checked, emphasized }: Props) {
	return (
		<div style={emphasized ? rowEmphStyle : rowStyle}>
			<span style={checked ? checkOnStyle : checkOffStyle}>{checked ? "✓" : ""}</span>
			<span
				style={{
					...FONT.listSub,
					flex: 1,
					fontWeight: emphasized ? 700 : 500,
					color: emphasized
						? "var(--semantic-label-normal)"
						: "var(--semantic-label-normal)",
				}}
			>
				{label}
				{required ? (
					<span
						style={{
							marginLeft: 6,
							color: T_BRAND,
							fontSize: 12,
							fontWeight: 700,
						}}
					>
						필수
					</span>
				) : null}
			</span>
			{!emphasized ? (
				<span style={{ color: "var(--semantic-label-assistive)", fontSize: 14 }}>›</span>
			) : null}
		</div>
	);
}

const rowStyle: CSSProperties = {
	display: "flex",
	alignItems: "center",
	gap: "var(--spacing-12)",
	padding: "var(--spacing-12) var(--spacing-4)",
};

const rowEmphStyle: CSSProperties = {
	...rowStyle,
	padding: "var(--spacing-14) var(--spacing-16)",
	background: "var(--semantic-fill-normal)",
	borderRadius: 16,
	border: `1px solid ${CARD_BORDER}`,
	marginBottom: "var(--spacing-8)",
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
