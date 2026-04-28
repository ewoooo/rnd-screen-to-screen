import type { CSSProperties } from "react";

import { FONT } from "@/components/home-kit";
import { CARD_BG, CARD_BORDER } from "@/components/payment-kit/tokens";

type Props = {
	label?: string;
	placeholder?: string;
	value?: string;
	max: number;
};

/**
 * 자유 텍스트 + 글자수 카운터. 탈퇴 사유, 의견 입력 등에 사용.
 */
export function CharCountTextarea({ label, placeholder, value, max }: Props) {
	const display = value ?? placeholder ?? "";
	const isPlaceholder = !value;
	const current = value?.length ?? 0;
	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
			{label ? (
				<label
					style={{
						...FONT.pillChip,
						color: "var(--semantic-label-alternative)",
					}}
				>
					{label}
				</label>
			) : null}
			<div style={boxStyle}>
				<div
					style={{
						minHeight: 96,
						fontSize: 15,
						lineHeight: 1.5,
						color: isPlaceholder
							? "var(--semantic-label-assistive)"
							: "var(--semantic-label-normal)",
						whiteSpace: "pre-wrap",
					}}
				>
					{display}
				</div>
				<div style={counterStyle}>
					<span>
						{current}/{max}
					</span>
				</div>
			</div>
		</div>
	);
}

const boxStyle: CSSProperties = {
	padding: "var(--spacing-14) var(--spacing-16)",
	borderRadius: 16,
	border: `1px solid ${CARD_BORDER}`,
	background: CARD_BG,
	display: "flex",
	flexDirection: "column",
	gap: "var(--spacing-8)",
};

const counterStyle: CSSProperties = {
	textAlign: "right",
	fontSize: 12,
	color: "var(--semantic-label-assistive)",
	fontVariantNumeric: "tabular-nums",
};
