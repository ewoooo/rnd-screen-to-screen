import type { CSSProperties } from "react";

import { DividerPilot } from "@/components/pilot-kit/DividerPilot";
import { T_BRAND } from "./tokens";

type Tone = "default" | "discount" | "total";

export function AmountRow({ label, value, tone = "default" }: { label: string; value: string; tone?: Tone }) {
	const isTotal = tone === "total";
	const isDiscount = tone === "discount";
	return (
		<div style={rowStyle}>
			<span
				style={{
					fontSize: isTotal ? 14 : 13,
					fontWeight: isTotal ? 700 : 400,
					color: isTotal
						? "var(--semantic-label-normal)"
						: "var(--semantic-label-alternative)",
				}}
			>
				{label}
			</span>
			<span
				style={{
					fontSize: isTotal ? 18 : 13,
					fontWeight: 700,
					color: isTotal ? T_BRAND : isDiscount ? T_BRAND : "var(--semantic-label-normal)",
				}}
			>
				{value}
			</span>
		</div>
	);
}

export function AmountDivider() {
	return (
		<div style={{ margin: "var(--spacing-4) 0" }}>
			<DividerPilot type="light" />
		</div>
	);
}

const rowStyle: CSSProperties = {
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "var(--spacing-6) 0",
};
