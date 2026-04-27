import type { CSSProperties } from "react";

import { Heading20, ListSub } from "@/components/home-kit";
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
		<div style={methodSummaryStyle}>
			<span style={methodLabelStyle}>{mock.methodSummary.label}</span>
			<div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
				{mock.methodSummary.items.map((it) => (
					<div key={it.id} style={methodRowStyle}>
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
				))}
			</div>
		</div>
	);
}

const resultStyle: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "var(--spacing-8)",
	paddingTop: "var(--spacing-16)",
};

const methodSummaryStyle: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: "var(--spacing-8)",
};

const methodLabelStyle: CSSProperties = {
	fontSize: 12,
	fontWeight: 700,
	color: "var(--semantic-label-alternative)",
	letterSpacing: -0.3,
};

const methodRowStyle: CSSProperties = {
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	background: "var(--semantic-fill-normal)",
	borderRadius: 10,
	padding: "var(--spacing-10) var(--spacing-12)",
};

const amountWrapStyle: CSSProperties = {
	display: "flex",
	flexDirection: "column",
};
