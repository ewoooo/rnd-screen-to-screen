import type { CSSProperties } from "react";

import { ActionChip, TermsRow } from "@/components/auth-kit";
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

import { personalInfoInputRejoinV2KitMock as mock } from "./_mock";

export default function PersonalInfoInputRejoinV2KitPage() {
	return (
		<DetailShell title={mock.header} bottom={<StickyCTA text={mock.cta} />}>
			<PayContent>
				<StepBar index={mock.stepIndex} total={mock.stepTotal} />
				<Hero title={mock.heroTitle} sub={mock.heroSub} />

				<div style={formStyle}>
					<FieldGroup>
						<FieldLabel>{mock.fields.name.label}</FieldLabel>
						<FieldInput
							value={mock.fields.name.value}
							trailing={<ActionChip label={mock.fields.name.trailing} />}
						/>
					</FieldGroup>
					<FieldGroup>
						<FieldLabel>{mock.fields.email.label}</FieldLabel>
						<FieldInput
							value={mock.fields.email.value}
							trailing={<ActionChip label={mock.fields.email.trailing} />}
						/>
					</FieldGroup>
					<FieldGroup>
						<FieldLabel>{mock.fields.phone.label}</FieldLabel>
						<FieldInput value={mock.fields.phone.value} focused />
					</FieldGroup>
				</div>

				<TermsRow
					label={mock.consentLabel}
					checked={mock.consentChecked}
					required
					emphasized
				/>

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
