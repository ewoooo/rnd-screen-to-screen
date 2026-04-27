import type { CSSProperties } from "react";

import { Heading20, ListSub } from "@/components/home-kit";
import { ButtonCallToActionPilot } from "@/components/pilot-kit/ButtonCallToActionPilot";
import {
	BottomSheet,
	DetailGrid,
	PayContent,
	ResultIcon,
	T_BRAND,
} from "@/components/payment-kit";
import { DetailShell } from "@/components/search-kit";

import { subscriptionCanceledV1MockupMock as mock } from "./_mock";

export default function SubscriptionCanceledV1MockupPage() {
	return (
		<DetailShell
			title={mock.header}
			bottom={
				<BottomSheet>
					<ResultIcon tone="warning" glyph={mock.resultGlyph} />
					<Heading20>{mock.title}</Heading20>
					<div style={{ textAlign: "center" }}>
						<ListSub>{mock.subtitle}</ListSub>
					</div>
					<DetailGrid items={mock.detail} />
					<div style={warningStyle}>{mock.warning}</div>
					<p style={bodyStyle}>{mock.body}</p>
					<div style={{ width: "100%", paddingTop: "var(--spacing-4)" }}>
						<ButtonCallToActionPilot text={mock.cta} />
					</div>
				</BottomSheet>
			}
		>
			<PayContent>
				<DimmedSubCard name={mock.subscriptionCard.name} sub={mock.subscriptionCard.priceLine} />
			</PayContent>
		</DetailShell>
	);
}

function DimmedSubCard({ name, sub }: { name: string; sub: string }) {
	return (
		<div style={{ filter: "blur(1px)", opacity: 0.4 }}>
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

const warningStyle: CSSProperties = {
	background: "var(--semantic-fill-normal)",
	borderRadius: 10,
	padding: "var(--spacing-12)",
	fontSize: 12,
	color: T_BRAND,
	fontWeight: 600,
	lineHeight: "19.2px",
	width: "100%",
	boxSizing: "border-box",
};

const bodyStyle: CSSProperties = {
	margin: 0,
	fontSize: 13,
	color: "var(--semantic-label-alternative)",
	lineHeight: "20.8px",
	textAlign: "center",
};
