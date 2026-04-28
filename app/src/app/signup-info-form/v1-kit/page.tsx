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
import { T_BRAND } from "@/components/payment-kit/tokens";
import { DetailShell } from "@/components/search-kit";

import { signupInfoFormV1KitMock as mock } from "./_mock";

const trailingChip = (label: string) => (
	<span
		style={{
			fontSize: 13,
			fontWeight: 700,
			color: T_BRAND,
			padding: "6px 12px",
			borderRadius: 999,
			background: "rgba(94,63,247,0.08)",
			whiteSpace: "nowrap",
		}}
	>
		{label}
	</span>
);

export default function SignupInfoFormV1KitPage() {
	return (
		<DetailShell title={mock.header} bottom={<StickyCTA text={mock.cta} />}>
			<PayContent>
				<StepBar index={mock.stepIndex} total={mock.stepTotal} />
				<Hero title={mock.heroTitle} sub={mock.heroSub} />

				<div style={formStyle}>
					<FieldGroup>
						<FieldLabel>{mock.fields.name.label}</FieldLabel>
						<FieldInput value={mock.fields.name.value} />
					</FieldGroup>
					<FieldGroup>
						<FieldLabel>{mock.fields.userId.label}</FieldLabel>
						<FieldInput
							value={mock.fields.userId.value}
							trailing={trailingChip(mock.fields.userId.trailing)}
						/>
					</FieldGroup>
					<FieldGroup>
						<FieldLabel>{mock.fields.password.label}</FieldLabel>
						<FieldInput value={mock.fields.password.value} letterSpacing={4} />
					</FieldGroup>
					<FieldGroup>
						<FieldLabel>{mock.fields.passwordConfirm.label}</FieldLabel>
						<FieldInput value={mock.fields.passwordConfirm.value} letterSpacing={4} />
					</FieldGroup>
					<FieldGroup>
						<FieldLabel>{mock.fields.email.label}</FieldLabel>
						<FieldInput
							value={mock.fields.email.value}
							trailing={trailingChip(mock.fields.email.trailing)}
						/>
					</FieldGroup>
					<FieldGroup>
						<FieldLabel>{mock.fields.phone.label}</FieldLabel>
						<FieldInput value={mock.fields.phone.value} focused />
					</FieldGroup>
				</div>

				<InfoBox bullets={mock.infoBullets} />
			</PayContent>
		</DetailShell>
	);
}

const formStyle: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: "var(--spacing-12)",
};
