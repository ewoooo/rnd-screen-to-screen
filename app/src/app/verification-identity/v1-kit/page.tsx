import type { CSSProperties } from "react";

import { MethodToggle } from "@/components/auth-kit";
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

import { verificationIdentityV1KitMock as mock } from "./_mock";

const linkChip = (label: string) => (
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

const timerChip = (label: string) => (
	<span
		style={{
			fontSize: 13,
			fontWeight: 700,
			color: T_BRAND,
			fontVariantNumeric: "tabular-nums",
			whiteSpace: "nowrap",
		}}
	>
		{label}
	</span>
);

export default function VerificationIdentityV1KitPage() {
	return (
		<DetailShell title={mock.header} bottom={<StickyCTA text={mock.cta} />}>
			<PayContent>
				<StepBar index={mock.stepIndex} total={mock.stepTotal} />
				<Hero title={mock.heroTitle} sub={mock.heroSub} />

				<MethodToggle items={mock.methods} />

				<div style={formStyle}>
					<FieldGroup>
						<FieldLabel>{mock.channel.label}</FieldLabel>
						<FieldInput
							value={mock.channel.value}
							trailing={linkChip(mock.channel.trailing)}
						/>
					</FieldGroup>
					<FieldGroup>
						<FieldLabel>{mock.code.label}</FieldLabel>
						<FieldInput
							value={mock.code.value}
							focused
							letterSpacing={6}
							trailing={timerChip(mock.code.timer)}
						/>
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
