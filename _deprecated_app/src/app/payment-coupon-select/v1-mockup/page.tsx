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

import {
	paymentCouponSelectV1MockupMock as mock,
	type CouponItem,
	type UnavailableCoupon,
} from "./_mock";

export default function PaymentCouponSelectV1MockupPage() {
	return (
		<DetailShell title={mock.header} bottom={<StickyCTA text={mock.cta} />}>
			<PayContent>
				<StepBar index={mock.stepIndex} total={mock.stepTotal} />
				<Hero title={mock.heroTitle} sub={mock.heroSub} />
				<PaySection>
					<SubLabel text="사용 가능한 쿠폰" mark={`${mock.available.length}장`} />
					<div style={listStyle}>
						{mock.available.map((c) => (
							<CouponCard key={c.id} coupon={c} />
						))}
					</div>
				</PaySection>
				<PaySection>
					<SubLabel text="사용 불가 쿠폰" mark={`${mock.unavailable.length}장`} />
					<div style={listStyle}>
						{mock.unavailable.map((c) => (
							<UnavailableCard key={c.id} coupon={c} />
						))}
					</div>
				</PaySection>
				<InfoBox title={mock.exclusiveNotice.title} bullets={mock.exclusiveNotice.bullets} />
			</PayContent>
		</DetailShell>
	);
}

function CouponCard({ coupon }: { coupon: CouponItem }) {
	const selected = !!coupon.selected;
	return (
		<div
			style={{
				...cardStyle,
				border: selected ? `1.5px solid ${T_BRAND}` : `1px solid ${CARD_BORDER}`,
			}}
		>
			<div style={infoStyle}>
				<div style={topRowStyle}>
					<PillChip tone="violet">{coupon.discount}</PillChip>
					<span style={{ fontSize: 11, color: "var(--semantic-label-alternative)" }}>
						{coupon.expiry}
					</span>
				</div>
				<span
					style={{
						fontSize: 14,
						fontWeight: 700,
						color: "var(--semantic-label-normal)",
					}}
				>
					{coupon.name}
				</span>
				<span style={{ fontSize: 12, color: "var(--semantic-label-alternative)" }}>
					{coupon.condition}
				</span>
			</div>
			<RadioDot selected={selected} />
		</div>
	);
}

function UnavailableCard({ coupon }: { coupon: UnavailableCoupon }) {
	return (
		<div
			style={{
				...cardStyle,
				border: `1px solid ${CARD_BORDER}`,
				opacity: 0.55,
			}}
		>
			<div style={infoStyle}>
				<span
					style={{
						fontSize: 14,
						fontWeight: 700,
						color: "var(--semantic-label-normal)",
					}}
				>
					{coupon.name}
				</span>
				<span style={{ fontSize: 12, color: "var(--semantic-label-alternative)" }}>
					{coupon.reason}
				</span>
			</div>
			<span style={{ fontSize: 13, color: "var(--semantic-label-assistive)" }}>사용 불가</span>
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
