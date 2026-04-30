import type { CSSProperties } from "react";

import { TermsRow } from "@/components/auth-kit";
import { SectionLabel } from "@/components/home-kit";
import { Hero, InfoBox, PayContent, StickyCTA } from "@/components/payment-kit";
import { DetailShell } from "@/components/search-kit";

import { termsReconsentDormancyV2KitMock as mock } from "./_mock";

export default function TermsReconsentDormancyV2KitPage() {
	return (
		<DetailShell title={mock.header} bottom={<StickyCTA text={mock.cta} />}>
			<PayContent>
				<Hero title={mock.heroTitle} sub={mock.heroSub} />
				<TermsRow label={mock.agreeAll.label} checked={mock.agreeAll.checked} emphasized />

				<div style={groupStyle}>
					<SectionLabel>{mock.required.label}</SectionLabel>
					{mock.required.items.map((it) => (
						<TermsRow key={it.key} label={it.label} required checked={it.checked} />
					))}
				</div>

				<div style={groupStyle}>
					<SectionLabel>{mock.optional.label}</SectionLabel>
					{mock.optional.items.map((it) => (
						<TermsRow key={it.key} label={it.label} checked={it.checked} />
					))}
				</div>

				<InfoBox bullets={mock.infoBullets} />
			</PayContent>
		</DetailShell>
	);
}

const groupStyle: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: "var(--spacing-4)",
	paddingTop: "var(--spacing-8)",
};
