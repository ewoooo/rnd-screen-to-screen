import type { CSSProperties } from "react";

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

import { paymentAccountFormV1MockupMock as mock } from "./_mock";

export default function PaymentAccountFormV1MockupPage() {
	return (
		<DetailShell title={mock.header} bottom={<StickyCTA text={mock.cta} />}>
			<PayContent>
				<StepBar index={mock.stepIndex} total={mock.stepTotal} />
				<Hero title={mock.heroTitle} sub={mock.heroSub} />
				<div style={formStyle}>
					<FieldGroup>
						<FieldLabel>{mock.fields.bank.label}</FieldLabel>
						<FieldInput
							value={mock.fields.bank.value}
							focused
							trailing={
								<span style={{ color: "var(--semantic-label-alternative)", fontSize: 16 }}>›</span>
							}
						/>
					</FieldGroup>
					<FieldGroup>
						<FieldLabel>{mock.fields.accountNumber.label}</FieldLabel>
						<FieldInput placeholder={mock.fields.accountNumber.placeholder} />
					</FieldGroup>
					<div style={twoColStyle}>
						<FieldGroup>
							<FieldLabel>{mock.fields.ownerName.label}</FieldLabel>
							<FieldInput value={mock.fields.ownerName.value} />
						</FieldGroup>
						<FieldGroup>
							<FieldLabel>{mock.fields.ownerBirth.label}</FieldLabel>
							<FieldInput placeholder={mock.fields.ownerBirth.placeholder} />
						</FieldGroup>
					</div>
				</div>
				<InfoBox title={mock.notice.title} bullets={mock.notice.bullets} />
			</PayContent>
		</DetailShell>
	);
}

const formStyle: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: "var(--spacing-16)",
};

const twoColStyle: CSSProperties = {
	display: "grid",
	gridTemplateColumns: "1fr 1fr",
	gap: "var(--spacing-12)",
};
