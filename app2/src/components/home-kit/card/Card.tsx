import type { CSSProperties, ReactNode } from "react";

import { Typography } from "@/components/typography";

import { CARD_BG, CARD_BORDER, CARD_RADIUS, T_BRAND, T_BRAND_SHADOW } from "../tokens";
import { CardHeader } from "./CardHeader";

/**
 * Figma `Card/L1`·`Card/L2`·`Card/L3` 정규화.
 * level 별 슬롯 구조를 강제한다 — children 자유도 없음.
 */

type Slot = { icon: ReactNode; label: string };
type AiSlot = { icon?: ReactNode; text: string };
type CtaSlot = { text: string; onClick?: () => void };

type CommonProps = { style?: CSSProperties };

/** Card/L1 — 64h 고정. icon+label 두 슬롯 + 가운데 divider. (DualMenu 패턴) */
type L1Props = CommonProps & {
	level: 1;
	left: Slot;
	right: Slot;
};

/**
 * Card/L2 — label 헤더 + (title / badge / body / aside).
 * - aside 있음 → row layout (StatCard 패턴, 112h)
 * - aside 없음 → column layout (BarcodeCard / list 패턴, 가변 h)
 */
type L2Props = CommonProps & {
	level: 2;
	label: string;
	title?: string;
	badge?: ReactNode;
	body?: ReactNode;
	aside?: ReactNode;
};

/** Card/L3 — label + heading + AI + CTA 4 슬롯 고정. (Hero 패턴) */
type L3Props = CommonProps & {
	level: 3;
	label: string;
	title: string;
	ai?: AiSlot;
	cta: CtaSlot;
};

type Props = L1Props | L2Props | L3Props;

const BASE: CSSProperties = {
	background: CARD_BG,
	border: `1px solid ${CARD_BORDER}`,
	borderRadius: CARD_RADIUS,
	width: "100%",
	boxSizing: "border-box",
};

export function Card(props: Props) {
	switch (props.level) {
		case 1:
			return <CardL1 {...props} />;
		case 2:
			return <CardL2 {...props} />;
		case 3:
			return <CardL3 {...props} />;
	}
}

function CardL1({ left, right, style }: L1Props) {
	return (
		<section
			style={{
				...BASE,
				height: 64,
				padding: 0,
				display: "flex",
				alignItems: "stretch",
				...style,
			}}
		>
			<L1Slot {...left} />
			<div
				style={{
					width: 1,
					margin: "24px 0",
					background: "var(--semantic-line-solid-alternative)",
				}}
			/>
			<L1Slot {...right} />
		</section>
	);
}

function L1Slot({ icon, label }: Slot) {
	return (
		<div
			style={{
				flex: 1,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				gap: "var(--spacing-2)",
			}}
		>
			{icon}
			<Typography variant="list-title">{label}</Typography>
		</div>
	);
}

function CardL2({ label, title, badge, body, aside, style }: L2Props) {
	if (aside !== undefined) {
		return (
			<section
				style={{
					...BASE,
					height: 112,
					padding: "var(--spacing-32)",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					...style,
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "var(--spacing-4)",
					}}
				>
					<Typography variant="section-label">{label}</Typography>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "var(--spacing-6)",
						}}
					>
						{title !== undefined ? (
							<Typography variant="heading-20">{title}</Typography>
						) : null}
						{badge}
					</div>
				</div>
				{aside}
			</section>
		);
	}
	return (
		<section
			style={{
				...BASE,
				padding: "var(--spacing-32)",
				display: "flex",
				flexDirection: "column",
				gap: "var(--spacing-24)",
				...style,
			}}
		>
			<CardHeader label={label} title={title} />
			{body}
		</section>
	);
}

function CardL3({ label, title, ai, cta, style }: L3Props) {
	return (
		<section
			style={{
				...BASE,
				padding: "var(--spacing-32)",
				display: "flex",
				flexDirection: "column",
				gap: "var(--spacing-24)",
				alignItems: "flex-end",
				...style,
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-16)",
					width: "100%",
				}}
			>
				<CardHeader label={label} title={title} gap={8} />
				{ai ? (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "var(--spacing-2)",
						}}
					>
						{ai.icon}
						<Typography variant="ai-text">{ai.text}</Typography>
					</div>
				) : null}
			</div>
			<button
				type="button"
				onClick={cta.onClick}
				style={{
					background: T_BRAND,
					color: "#fff",
					height: 36,
					padding: "0 var(--spacing-16)",
					borderRadius: 12,
					border: "none",
					fontSize: 12,
					fontWeight: 600,
					letterSpacing: "-0.48px",
					boxShadow: T_BRAND_SHADOW,
					cursor: "pointer",
					whiteSpace: "nowrap",
				}}
			>
				{cta.text}
			</button>
		</section>
	);
}
