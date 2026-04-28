import type { CSSProperties } from "react";

import { T_BRAND } from "@/components/payment-kit/tokens";

type Tone = "fill" | "plain";

/**
 * FieldInput trailing 슬롯에 들어가는 보라색 액션 chip.
 * - fill (기본): 옅은 보라 배경의 텍스트 버튼 (예: 중복확인, 인증번호 받기)
 * - plain: 배경 없이 강조 텍스트 (예: 카운트다운 타이머)
 */
export function ActionChip({
	label,
	tone = "fill",
	tabular,
}: {
	label: string;
	tone?: Tone;
	tabular?: boolean;
}) {
	const style: CSSProperties = {
		fontSize: 13,
		fontWeight: 700,
		color: T_BRAND,
		whiteSpace: "nowrap",
		...(tone === "fill"
			? {
					padding: "6px 12px",
					borderRadius: 999,
					background: "rgba(94,63,247,0.08)",
				}
			: {}),
		...(tabular ? { fontVariantNumeric: "tabular-nums" } : {}),
	};
	return <span style={style}>{label}</span>;
}
