import type { CSSProperties } from "react";

import { PillChip } from "@/components/home-kit";
import {
	AmountDivider,
	AmountRow,
	Hero,
	InfoBox,
	MethodCard,
	PayContent,
	PaySection,
	StepBar,
	StickyCTA,
	SubLabel,
	ThickDivider,
} from "@/components/payment-kit";
import { DetailShell } from "@/components/search-kit";

import { paymentSupplementAddV1MockupMock as mock, type SupplementOption } from "./_mock";

export default function PaymentSupplementAddV1MockupPage() {
	return (
		<DetailShell title={mock.header} bottom={<StickyCTA text={mock.cta} />}>
			<PayContent>
				<StepBar index={mock.stepIndex} total={mock.stepTotal} />
				<Hero title={mock.heroTitle} sub={mock.heroSub} />
				<div style={pillRowStyle}>
					<PillChip tone="violet">{mock.primaryPill}</PillChip>
				</div>
				<PaySection>
					<SubLabel text="보조 결제 수단" mark="선택 · 택 1" />
					<div style={cardListStyle}>
						{mock.options.map((opt) => (
							<MethodCard
								key={opt.id}
								emoji={opt.emoji}
								gradient={opt.gradient}
								name={opt.name}
								sub={opt.sub}
								disabled={opt.disabled}
								trailing={renderTrailing(opt)}
							/>
						))}
					</div>
				</PaySection>
				<ThickDivider />
				<div style={summaryStyle}>
					<AmountRow label={mock.summary.productLabel} value={mock.summary.productAmount} />
					<AmountRow
						label={mock.summary.discountLabel}
						value={mock.summary.discountAmount}
						tone="discount"
					/>
					<AmountDivider />
					<AmountRow label={mock.summary.totalLabel} value={mock.summary.totalAmount} tone="total" />
				</div>
				<InfoBox title={mock.exclusiveNotice.title} bullets={mock.exclusiveNotice.bullets} />
			</PayContent>
		</DetailShell>
	);
}

function renderTrailing(opt: SupplementOption) {
	if (opt.disabled) {
		return (
			<span style={{ fontSize: 13, color: "var(--semantic-label-assistive)" }}>미보유</span>
		);
	}
	if (opt.badge) {
		return <PillChip tone={opt.badge.tone}>{opt.badge.text}</PillChip>;
	}
	return null;
}

const pillRowStyle: CSSProperties = {
	display: "flex",
};

const cardListStyle: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: "var(--spacing-8)",
};

const summaryStyle: CSSProperties = {
	display: "flex",
	flexDirection: "column",
};
