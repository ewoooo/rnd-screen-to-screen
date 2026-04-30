import type { CSSProperties } from "react";

import { TermsRow } from "@/components/auth-kit";
import {
	Hero,
	InfoBox,
	PayContent,
	StepBar,
	StickyCTA,
} from "@/components/payment-kit";
import { DetailShell } from "@/components/search-kit";

import { withdrawalFinalConsentV2KitMock as mock } from "./_mock";

export default function WithdrawalFinalConsentV2KitPage() {
	return (
		<DetailShell title={mock.header} bottom={<StickyCTA text={mock.cta} />}>
			<PayContent>
				<StepBar index={mock.stepIndex} total={mock.stepTotal} />
				<Hero title={mock.heroTitle} />
				<InfoBox title={mock.graceTitle} bullets={mock.graceBullets} />
				<InfoBox title={mock.dataTitle} bullets={mock.dataBullets} />
				<div style={consentGroupStyle}>
					{mock.consents.map((c) => (
						<TermsRow
							key={c.key}
							label={c.label}
							required={c.required}
							checked={c.checked}
						/>
					))}
				</div>
			</PayContent>
		</DetailShell>
	);
}

const consentGroupStyle: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: "var(--spacing-2)",
	paddingTop: "var(--spacing-8)",
};
