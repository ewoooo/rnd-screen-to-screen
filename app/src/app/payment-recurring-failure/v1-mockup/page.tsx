import type { CSSProperties } from "react";

import { Heading20, ListSub } from "@/components/home-kit";
import {
	BottomSheet,
	DetailGrid,
	DualCTA,
	PayContent,
	ResultIcon,
} from "@/components/payment-kit";
import { DetailShell } from "@/components/search-kit";

import { paymentRecurringFailureV1MockupMock as mock } from "./_mock";

export default function PaymentRecurringFailureV1MockupPage() {
	return (
		<DetailShell
			title={mock.header}
			bottom={
				<BottomSheet>
					<ResultIcon tone="warning" glyph={mock.resultGlyph} />
					<Heading20>{mock.title}</Heading20>
					<DetailGrid items={mock.detail} />
					<p style={bodyStyle}>{mock.body}</p>
					<DualCTA
						sticky={false}
						secondaryText={mock.secondaryCta}
						primaryText={mock.primaryCta}
					/>
				</BottomSheet>
			}
		>
			<PayContent>
				<DimmedSubCard
					name={mock.subscriptionCard.name}
					sub={mock.subscriptionCard.priceLine}
				/>
			</PayContent>
		</DetailShell>
	);
}

function DimmedSubCard({ name, sub }: { name: string; sub: string }) {
	return (
		<div style={{ filter: "blur(1px)", opacity: 0.45 }}>
			<div style={dimCardStyle}>
				<span style={dimTitleStyle}>{name}</span>
				<ListSub>{sub}</ListSub>
			</div>
		</div>
	);
}

const dimCardStyle: CSSProperties = {
	background: "var(--semantic-fill-normal)",
	borderRadius: 20,
	padding: "var(--spacing-16)",
	display: "flex",
	flexDirection: "column",
	gap: "var(--spacing-8)",
};

const dimTitleStyle: CSSProperties = {
	fontSize: 18,
	fontWeight: 700,
	color: "var(--semantic-label-normal)",
};

const bodyStyle: CSSProperties = {
	margin: 0,
	fontSize: 13,
	color: "var(--semantic-label-alternative)",
	lineHeight: "20.8px",
	textAlign: "center",
};
