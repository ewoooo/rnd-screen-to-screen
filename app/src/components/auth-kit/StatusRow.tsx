import type { CSSProperties } from "react";

import { FONT } from "@/components/home-kit";
import { GNB_BORDER, T_BRAND } from "@/components/payment-kit/tokens";

type Tone = "default" | "success" | "warning";

type Item = { id: string; label: string; value: string; tone?: Tone };

/**
 * 상태 row 묶음 — payment-kit MethodSummary와 톤은 같지만 의미가 '발송 결과/처리 상태'.
 * 가입 완료, 휴면 해제 완료 등 결과 화면에서 사용.
 */
export function StatusRowList({ title, items }: { title?: string; items: readonly Item[] }) {
	return (
		<div style={cardStyle}>
			{title ? <div style={titleStyle}>{title}</div> : null}
			<div>
				{items.map((it, i) => {
					const isLast = i === items.length - 1;
					const valueColor =
						it.tone === "success"
							? T_BRAND
							: it.tone === "warning"
								? "var(--semantic-label-normal)"
								: "var(--semantic-label-normal)";
					return (
						<div
							key={it.id}
							style={{
								...rowStyle,
								borderBottom: isLast ? "none" : `1px solid ${GNB_BORDER}`,
							}}
						>
							<span style={labelStyle}>{it.label}</span>
							<span style={{ ...valueStyle, color: valueColor }}>{it.value}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}

const cardStyle: CSSProperties = {
	background: "var(--semantic-background-normal, #fff)",
	border: `1px solid ${GNB_BORDER}`,
	borderRadius: 16,
	padding: "var(--spacing-12) var(--spacing-16)",
};

const titleStyle: CSSProperties = {
	...FONT.pillChip,
	color: "var(--semantic-label-alternative)",
	paddingBottom: "var(--spacing-8)",
};

const rowStyle: CSSProperties = {
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "var(--spacing-12) 0",
};

const labelStyle: CSSProperties = {
	fontSize: 13,
	color: "var(--semantic-label-alternative)",
};

const valueStyle: CSSProperties = {
	fontSize: 13,
	fontWeight: 700,
};
