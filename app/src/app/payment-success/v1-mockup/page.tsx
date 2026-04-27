import type { CSSProperties } from "react";

import { Card, Heading20, ListSub, SectionLabel } from "@/components/home-kit";
import {
	AmountDivider,
	AmountRow,
	DetailGrid,
	InfoBox,
	PayContent,
	ResultIcon,
	StickyCTA,
	T_BRAND,
} from "@/components/payment-kit";
import { DetailShell } from "@/components/search-kit";

import { paymentSuccessV1MockupMock as mock } from "./_mock";

export default function PaymentSuccessV1MockupPage() {
	return (
		<DetailShell title={mock.header} bottom={<StickyCTA text={mock.cta} />}>
			<PayContent>
				<div style={resultStyle}>
					<ResultIcon tone="success" glyph={mock.resultGlyph} />
					<div style={{ paddingTop: 6, textAlign: "center" }}>
						<Heading20>{mock.title}</Heading20>
					</div>
					<div style={{ textAlign: "center" }}>
						<ListSub>{mock.timestamp}</ListSub>
					</div>
				</div>
				<DetailGrid items={mock.detail} />
				<MethodSummary />
				<div style={amountWrapStyle}>
					<AmountDivider />
					<AmountRow tone="total" label={mock.totalLabel} value={mock.totalValue} />
				</div>
				<InfoBox bullets={mock.infoBullets} />
			</PayContent>
		</DetailShell>
	);
}

function MethodSummary() {
	return (
		<Card
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "var(--spacing-12)",
			}}
		>
			<SectionLabel>{mock.methodSummary.label}</SectionLabel>
			<div>
				{mock.methodSummary.items.map((it, i) => {
					const isLast = i === mock.methodSummary.items.length - 1;
					return (
						<div
							key={it.id}
							style={{
								...methodRowStyle,
								borderBottom: isLast
									? "none"
									: "1px solid var(--semantic-line-normal-normal, #ecf1ff)",
							}}
						>
							<span
								style={{
									fontSize: 13,
									color: "var(--semantic-label-alternative)",
								}}
							>
								{it.label}
							</span>
							<span
								style={{
									fontSize: 13,
									fontWeight: 700,
									color: it.tone === "discount" ? T_BRAND : "var(--semantic-label-normal)",
								}}
							>
								{it.value}
							</span>
						</div>
					);
				})}
			</div>
		</Card>
	);
}

const resultStyle: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "var(--spacing-8)",
	paddingTop: "var(--spacing-16)",
};

const methodRowStyle: CSSProperties = {
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "var(--spacing-12) 0",
};

const amountWrapStyle: CSSProperties = {
	display: "flex",
	flexDirection: "column",
};
