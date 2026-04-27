import type { CSSProperties } from "react";

import { ListSub } from "@/components/home-kit";
import {
	ActionRow,
	DualCTA,
	PayContent,
	T_BRAND,
} from "@/components/payment-kit";
import { DetailShell } from "@/components/search-kit";

import {
	paymentRecurringHoldV1MockupMock as mock,
	type ProgressStep,
} from "./_mock";

export default function PaymentRecurringHoldV1MockupPage() {
	return (
		<DetailShell
			title={mock.header}
			bottom={
				<DualCTA
					secondaryText={mock.secondaryCta}
					primaryText={mock.primaryCta}
				/>
			}
		>
			<PayContent>
				<SubscriptionCard />
				<AlertBanner />
				<HorizontalSteps />
				<div style={actionLabelStyle}>{mock.actionLabel}</div>
				<div>
					{mock.actions.map((a) => (
						<ActionRow
							key={a.id}
							label={a.label}
							desc={a.desc}
							trailing={a.trailing}
							state={a.state}
						/>
					))}
				</div>
			</PayContent>
		</DetailShell>
	);
}

function SubscriptionCard() {
	return (
		<div style={subCardStyle}>
			<ListSub>{mock.subscriptionCard.label}</ListSub>
			<span style={subNameStyle}>{mock.subscriptionCard.name}</span>
			<span style={subMetaStyle}>{mock.subscriptionCard.meta}</span>
		</div>
	);
}

function AlertBanner() {
	return (
		<div style={alertStyle}>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					gap: "var(--spacing-8)",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "var(--spacing-8)",
					}}
				>
					<span style={alertGlyph}>⚠️</span>
					<span style={alertTitleStyle}>{mock.alert.title}</span>
				</div>
				<span style={alertBadgeStyle}>{mock.alert.badge}</span>
			</div>
			<p style={alertBodyStyle}>{mock.alert.body}</p>
		</div>
	);
}

function HorizontalSteps() {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "flex-start",
				padding: "var(--spacing-8) 0",
			}}
		>
			{mock.steps.map((step, i) => (
				<HorizontalStep
					key={step.id}
					step={step}
					isLast={i === mock.steps.length - 1}
				/>
			))}
		</div>
	);
}

function HorizontalStep({
	step,
	isLast,
}: {
	step: ProgressStep;
	isLast: boolean;
}) {
	const palette = stepPalette(step.state);
	return (
		<>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					flex: 1,
				}}
			>
				<div
					style={{
						width: 28,
						height: 28,
						borderRadius: 14,
						background: palette.bg,
						border: palette.border,
						color: palette.text,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: 11,
						fontWeight: 700,
					}}
				>
					{palette.icon}
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						paddingTop: 8,
					}}
				>
					{step.label.map((l) => (
						<span
							key={l}
							style={{
								fontSize: 10,
								color:
									step.state === "current"
										? T_BRAND
										: "var(--semantic-label-alternative)",
								fontWeight:
									step.state === "current" ? 700 : 400,
								lineHeight: "14px",
								textAlign: "center",
							}}
						>
							{l}
						</span>
					))}
				</div>
			</div>
			{isLast ? null : (
				<div
					style={{
						flex: 1,
						height: 2,
						marginTop: 13,
						background:
							step.state === "done"
								? T_BRAND
								: "var(--semantic-line-normal-normal, #ecf1ff)",
					}}
				/>
			)}
		</>
	);
}

function stepPalette(state: ProgressStep["state"]) {
	if (state === "done") {
		return { bg: T_BRAND, border: "none", text: "#FFFFFF", icon: "✓" };
	}
	if (state === "current") {
		return {
			bg: "transparent",
			border: `2px solid ${T_BRAND}`,
			text: T_BRAND,
			icon: "!",
		};
	}
	return {
		bg: "var(--semantic-fill-normal)",
		border: "none",
		text: "var(--semantic-label-alternative)",
		icon: "×",
	};
}

const subCardStyle: CSSProperties = {
	background: "var(--semantic-fill-normal)",
	borderRadius: 20,
	padding: "var(--spacing-16)",
	display: "flex",
	flexDirection: "column",
	gap: 4,
};

const subNameStyle: CSSProperties = {
	fontSize: 18,
	fontWeight: 800,
	color: "var(--semantic-label-normal)",
};

const subMetaStyle: CSSProperties = {
	fontSize: 12,
	color: "var(--semantic-label-alternative)",
};

const alertStyle: CSSProperties = {
	background: "var(--semantic-fill-normal)",
	borderLeft: `4px solid ${T_BRAND}`,
	borderRadius: 16,
	padding: "var(--spacing-16)",
	display: "flex",
	flexDirection: "column",
	gap: 6,
};

const alertGlyph: CSSProperties = {
	fontSize: 16,
};

const alertTitleStyle: CSSProperties = {
	fontSize: 14,
	fontWeight: 800,
	color: T_BRAND,
};

const alertBadgeStyle: CSSProperties = {
	background: "#FFFFFF",
	color: T_BRAND,
	padding: "3px 10px",
	borderRadius: 999,
	fontSize: 11,
	fontWeight: 700,
};

const alertBodyStyle: CSSProperties = {
	margin: 0,
	fontSize: 12,
	color: "var(--semantic-label-alternative)",
	lineHeight: "19.2px",
};

const actionLabelStyle: CSSProperties = {
	fontSize: 12,
	fontWeight: 700,
	color: "var(--semantic-label-alternative)",
	letterSpacing: -0.3,
	paddingTop: "var(--spacing-8)",
};
