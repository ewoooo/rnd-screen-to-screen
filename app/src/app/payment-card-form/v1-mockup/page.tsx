import type { CSSProperties } from "react";

import {
	FieldGroup,
	FieldInput,
	FieldLabel,
	InfoBox,
	PayContent,
	StepBar,
	StickyCTA,
} from "@/components/payment-kit";
import { DetailShell } from "@/components/search-kit";

import { paymentCardFormV1MockupMock as mock } from "./_mock";

export default function PaymentCardFormV1MockupPage() {
	return (
		<DetailShell title={mock.header} bottom={<StickyCTA text={mock.cta} />}>
			<PayContent>
				<StepBar index={mock.stepIndex} total={mock.stepTotal} />
				<CardPreview />
				<div style={formStyle}>
					<FieldGroup>
						<FieldLabel>{mock.fields.cardNumber.label}</FieldLabel>
						<FieldInput value={mock.fields.cardNumber.value} focused letterSpacing={2} />
					</FieldGroup>
					<div style={twoColStyle}>
						<FieldGroup>
							<FieldLabel>{mock.fields.expiry.label}</FieldLabel>
							<FieldInput value={mock.fields.expiry.value} />
						</FieldGroup>
						<FieldGroup>
							<FieldLabel>{mock.fields.password.label}</FieldLabel>
							<FieldInput value={mock.fields.password.value} letterSpacing={4} />
						</FieldGroup>
					</div>
					<FieldGroup>
						<FieldLabel>{mock.fields.birth.label}</FieldLabel>
						<FieldInput placeholder={mock.fields.birth.placeholder} />
					</FieldGroup>
				</div>
				<InfoBox title={mock.notice.title} bullets={mock.notice.bullets} />
			</PayContent>
		</DetailShell>
	);
}

function CardPreview() {
	return (
		<div>
			<div style={cardPreviewStyle}>
				<span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>
					{mock.preview.issuer}
				</span>
				<span
					style={{
						fontSize: 18,
						color: "#FFFFFF",
						fontWeight: 700,
						letterSpacing: 3,
						marginTop: "var(--spacing-12)",
					}}
				>
					{mock.preview.number}
				</span>
				<div style={previewBottomStyle}>
					<div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
						<span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>VALID THRU</span>
						<span style={{ fontSize: 14, fontWeight: 700, color: "#FFFFFF" }}>
							{mock.preview.expiry}
						</span>
					</div>
					<span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)" }}>
						{mock.preview.brand}
					</span>
				</div>
				<div style={cardSheenStyle} />
			</div>
		</div>
	);
}

const cardPreviewStyle: CSSProperties = {
	position: "relative",
	height: 180,
	padding: "var(--spacing-24)",
	borderRadius: 16,
	background: "linear-gradient(135deg, #1f2240 0%, #2a2266 60%, #3617ce 100%)",
	color: "#FFFFFF",
	display: "flex",
	flexDirection: "column",
	overflow: "hidden",
	boxShadow: "0 12px 40px rgba(27, 11, 102, 0.18)",
};

const cardSheenStyle: CSSProperties = {
	position: "absolute",
	right: -20,
	top: -20,
	width: 160,
	height: 160,
	borderRadius: 80,
	background: "rgba(255,255,255,0.04)",
};

const previewBottomStyle: CSSProperties = {
	marginTop: "auto",
	display: "flex",
	alignItems: "flex-end",
	justifyContent: "space-between",
};

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
