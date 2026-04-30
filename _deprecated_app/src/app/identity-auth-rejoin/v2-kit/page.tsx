import type { CSSProperties } from "react";

import { ActionChip, MethodToggle } from "@/components/auth-kit";
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

import { identityAuthRejoinV2KitMock as mock } from "./_mock";

export default function IdentityAuthRejoinV2KitPage() {
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
							trailing={<ActionChip label={mock.channel.trailing} />}
						/>
					</FieldGroup>
					<FieldGroup>
						<FieldLabel>{mock.code.label}</FieldLabel>
						<FieldInput
							value={mock.code.value}
							focused
							letterSpacing={6}
							trailing={<ActionChip label={mock.code.timer} tone="plain" tabular />}
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
