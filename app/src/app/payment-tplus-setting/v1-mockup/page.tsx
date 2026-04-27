import type { CSSProperties } from "react";

import { CARD_BG, CARD_BORDER, T_BRAND } from "@/components/home-kit/tokens";
import {
	FieldGroup,
	FieldInput,
	FieldLabel,
	Hero,
	InfoBox,
	PayContent,
	StepBar,
	StickyCTA,
} from "@/components/payment-kit";
import { DetailShell } from "@/components/search-kit";

import { paymentTplusSettingV1MockupMock as mock } from "./_mock";

export default function PaymentTplusSettingV1MockupPage() {
	return (
		<DetailShell title={mock.header} bottom={<StickyCTA text={mock.cta} />}>
			<PayContent>
				<StepBar index={mock.stepIndex} total={mock.stepTotal} />
				<Hero title={mock.heroTitle} sub={mock.heroSub} />
				<BalanceCard />
				<div style={formStyle}>
					<FieldGroup>
						<FieldLabel>{mock.cardSelect.label}</FieldLabel>
						<FieldInput
							value={mock.cardSelect.value}
							trailing={
								<span style={{ color: "var(--semantic-label-alternative)", fontSize: 16 }}>›</span>
							}
						/>
						<span style={hintStyle}>{mock.cardSelect.hint}</span>
					</FieldGroup>
					<PointInputCard
						label={mock.firstUse.label}
						value={mock.firstUse.value}
						max={mock.firstUse.max}
					/>
					<PointInputCard
						label={mock.recurringUse.label}
						value={mock.recurringUse.value}
						max={mock.recurringUse.max}
					/>
				</div>
				<InfoBox title={mock.notice.title} bullets={mock.notice.bullets} />
			</PayContent>
		</DetailShell>
	);
}

function BalanceCard() {
	return (
		<div>
			<div style={balanceCardStyle}>
				<span
					style={{
						fontSize: 12,
						fontWeight: 600,
						color: "var(--semantic-label-alternative)",
					}}
				>
					{mock.balance.label}
				</span>
				<span
					style={{
						fontSize: 28,
						fontWeight: 700,
						color: T_BRAND,
						letterSpacing: -0.5,
					}}
				>
					{mock.balance.amount}
				</span>
				<span style={{ fontSize: 11, color: "var(--semantic-label-alternative)" }}>
					{mock.balance.conversion}
				</span>
			</div>
		</div>
	);
}

function PointInputCard({ label, value, max }: { label: string; value: string; max: string }) {
	return (
		<div style={pointCardStyle}>
			<span
				style={{
					fontSize: 12,
					fontWeight: 600,
					color: "var(--semantic-label-alternative)",
				}}
			>
				{label}
			</span>
			<div style={inputRowStyle}>
				<span
					style={{
						flex: 1,
						fontSize: 18,
						fontWeight: 700,
						color: "var(--semantic-label-normal)",
					}}
				>
					{value}
				</span>
				<span
					style={{
						fontSize: 16,
						fontWeight: 700,
						color: "var(--semantic-label-alternative)",
					}}
				>
					P
				</span>
			</div>
			<span style={maxHintStyle}>{max}</span>
		</div>
	);
}

const balanceCardStyle: CSSProperties = {
	background: CARD_BG,
	border: `1px solid ${CARD_BORDER}`,
	borderRadius: 16,
	padding: "var(--spacing-20)",
	display: "flex",
	flexDirection: "column",
	gap: "var(--spacing-4)",
};

const formStyle: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: "var(--spacing-16)",
};

const pointCardStyle: CSSProperties = {
	background: CARD_BG,
	border: `1px solid ${CARD_BORDER}`,
	borderRadius: 16,
	padding: "var(--spacing-16)",
	display: "flex",
	flexDirection: "column",
	gap: "var(--spacing-8)",
};

const inputRowStyle: CSSProperties = {
	display: "flex",
	alignItems: "center",
	gap: "var(--spacing-8)",
	paddingBottom: 9,
	borderBottom: `1.5px solid ${T_BRAND}`,
};

const maxHintStyle: CSSProperties = {
	fontSize: 11,
	color: "var(--semantic-label-alternative)",
};

const hintStyle: CSSProperties = {
	fontSize: 11,
	color: "var(--semantic-label-alternative)",
	paddingTop: "var(--spacing-6)",
};
