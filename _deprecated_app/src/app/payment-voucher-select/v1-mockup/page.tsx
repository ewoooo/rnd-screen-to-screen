import type { CSSProperties } from "react";

import { PillChip } from "@/components/home-kit";
import { CARD_BG, CARD_BORDER, T_BRAND } from "@/components/home-kit/tokens";
import {
	Hero,
	InfoBox,
	PayContent,
	PaySection,
	RadioDot,
	StepBar,
	StickyCTA,
	SubLabel,
} from "@/components/payment-kit";
import { DetailShell } from "@/components/search-kit";

import { paymentVoucherSelectV1MockupMock as mock, type VoucherItem } from "./_mock";

export default function PaymentVoucherSelectV1MockupPage() {
	return (
		<DetailShell title={mock.header} bottom={<StickyCTA text={mock.cta} />}>
			<PayContent>
				<StepBar index={mock.stepIndex} total={mock.stepTotal} />
				<Hero title={mock.heroTitle} sub={mock.heroSub} />
				<PaySection>
					<SubLabel text="보유 이용권" mark={`${mock.items.length}장`} />
					<div style={listStyle}>
						{mock.items.map((v) => (
							<VoucherCard key={v.id} item={v} />
						))}
					</div>
				</PaySection>
				<InfoBox title={mock.cashReceiptNotice.title} bullets={mock.cashReceiptNotice.bullets} />
				<InfoBox title={mock.exclusiveNotice.title} bullets={mock.exclusiveNotice.bullets} />
			</PayContent>
		</DetailShell>
	);
}

function VoucherCard({ item }: { item: VoucherItem }) {
	const selected = !!item.selected;
	return (
		<div
			style={{
				...cardStyle,
				border: selected ? `1.5px solid ${T_BRAND}` : `1px solid ${CARD_BORDER}`,
			}}
		>
			<div style={infoStyle}>
				<div style={topRowStyle}>
					<PillChip tone="violet">{item.purchaseAmount}</PillChip>
					<span style={{ fontSize: 11, color: "var(--semantic-label-alternative)" }}>
						{item.expiry}
					</span>
				</div>
				<span
					style={{
						fontSize: 14,
						fontWeight: 700,
						color: "var(--semantic-label-normal)",
					}}
				>
					{item.name}
				</span>
				<span style={{ fontSize: 12, color: "var(--semantic-label-alternative)" }}>
					{item.condition}
				</span>
			</div>
			<RadioDot selected={selected} />
		</div>
	);
}

const cardStyle: CSSProperties = {
	display: "flex",
	alignItems: "center",
	gap: "var(--spacing-12)",
	padding: "var(--spacing-16)",
	borderRadius: 16,
	background: CARD_BG,
};

const infoStyle: CSSProperties = {
	flex: 1,
	minWidth: 0,
	display: "flex",
	flexDirection: "column",
	gap: 6,
};

const topRowStyle: CSSProperties = {
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
};

const listStyle: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: "var(--spacing-8)",
};
