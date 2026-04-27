import type { CSSProperties } from "react";

import {
	ActionRow,
	AmountDivider,
	AmountRow,
	Hero,
	InfoBox,
	MethodCard,
	MethodIcon,
	PayContent,
	StickyCTA,
	ThickDivider,
} from "@/components/payment-kit";
import { DetailShell } from "@/components/search-kit";

import { paymentInstantV1MockupMock as mock } from "./_mock";

export default function PaymentInstantV1MockupPage() {
	return (
		<DetailShell title={mock.header} bottom={<StickyCTA text={mock.cta} />}>
			<PayContent>
				<Hero title={mock.heroTitle} sub={mock.heroSub} />
				<SectionLabel>{mock.registered.label}</SectionLabel>
				<MethodCard
					emoji={mock.registered.emoji}
					gradient={mock.registered.gradient}
					name={mock.registered.name}
					sub={mock.registered.sub}
					selected
				/>
				<SectionLabel>{mock.newMethod.label}</SectionLabel>
				<NewMethodCard />
				<SectionLabel>{mock.supplementLabel}</SectionLabel>
				<div>
					{mock.supplements.map((s) => (
						<ActionRow key={s.id} label={s.label} desc={s.desc} trailing={s.trailing} />
					))}
				</div>
				<ThickDivider />
				<div style={summaryStyle}>
					{mock.summary.map((item) => (
						<AmountRow key={item.label} label={item.label} value={item.value} tone={item.tone} />
					))}
					<AmountDivider />
					<AmountRow tone="total" label={mock.totalLabel} value={mock.totalValue} />
				</div>
				<InfoBox bullets={mock.infoBullets} />
			</PayContent>
		</DetailShell>
	);
}

function SectionLabel({ children }: { children: string }) {
	return <div style={sectionLabelStyle}>{children}</div>;
}

function NewMethodCard() {
	return (
		<div style={dashedCardStyle}>
			<MethodIcon emoji="＋" gradient={["#FFFFFF", "#FFFFFF"]} />
			<div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
				<span
					style={{
						fontSize: 14,
						fontWeight: 700,
						color: "var(--semantic-label-normal)",
					}}
				>
					{mock.newMethod.title}
				</span>
				<span style={{ fontSize: 12, color: "var(--semantic-label-alternative)" }}>
					{mock.newMethod.desc}
				</span>
			</div>
		</div>
	);
}

const sectionLabelStyle: CSSProperties = {
	fontSize: 12,
	fontWeight: 700,
	color: "var(--semantic-label-alternative)",
	letterSpacing: -0.3,
	paddingTop: "var(--spacing-8)",
};

const dashedCardStyle: CSSProperties = {
	display: "flex",
	alignItems: "center",
	gap: "var(--spacing-14)",
	padding: "var(--spacing-16)",
	borderRadius: 20,
	border: "1px dashed var(--semantic-line-normal-normal, #b2b2b2)",
	background: "var(--semantic-background-normal-normal, #FFFFFF)",
};

const summaryStyle: CSSProperties = {
	display: "flex",
	flexDirection: "column",
};
