import type { CSSProperties, ReactNode } from "react";

import { FONT } from "@/components/home-kit";
import { CARD_BG, CARD_BORDER, T_BRAND } from "./tokens";

export function FieldGroup({ children }: { children: ReactNode }) {
	return <div style={{ display: "flex", flexDirection: "column" }}>{children}</div>;
}

export function FieldLabel({ children }: { children: ReactNode }) {
	return (
		<label
			style={{
				display: "block",
				...FONT.pillChip,
				color: "var(--semantic-label-alternative)",
				paddingBottom: "var(--spacing-8)",
			}}
		>
			{children}
		</label>
	);
}

export function FieldInput({
	value,
	placeholder,
	focused,
	letterSpacing,
	trailing,
}: {
	value?: string;
	placeholder?: string;
	focused?: boolean;
	letterSpacing?: number;
	trailing?: ReactNode;
}) {
	const display = value ?? placeholder;
	const isPlaceholder = !value && placeholder;
	const border = focused ? `1.5px solid ${T_BRAND}` : `1px solid ${CARD_BORDER}`;
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				gap: "var(--spacing-8)",
				padding: "var(--spacing-14) var(--spacing-16)",
				borderRadius: 16,
				border,
				background: CARD_BG,
			}}
		>
			<span
				style={{
					...textStyle,
					fontWeight: isPlaceholder ? 400 : 700,
					color: isPlaceholder
						? "var(--semantic-label-assistive)"
						: "var(--semantic-label-normal)",
					letterSpacing: letterSpacing ?? -0.3,
				}}
			>
				{display}
			</span>
			{trailing}
		</div>
	);
}

const textStyle: CSSProperties = {
	flex: 1,
	minWidth: 0,
	fontSize: 16,
	whiteSpace: "pre-wrap",
};
