import { TermsRow } from "@/components/auth-kit";
import {
	DetailGrid,
	Hero,
	InfoBox,
	PayContent,
	StepBar,
	StickyCTA,
} from "@/components/payment-kit";
import { DetailShell } from "@/components/search-kit";

import { withdrawalPreNoticeV1KitMock as mock } from "./_mock";

export default function WithdrawalPreNoticeV1KitPage() {
	return (
		<DetailShell title={mock.header} bottom={<StickyCTA text={mock.cta} />}>
			<PayContent>
				<StepBar index={mock.stepIndex} total={mock.stepTotal} />
				<Hero title={mock.heroTitle} />
				<DetailGrid items={mock.asset} />
				<InfoBox title={mock.warningTitle} bullets={mock.warningBullets} />
				<InfoBox title={mock.linkedTitle} bullets={mock.linkedBullets} />
				<TermsRow label={mock.consentLabel} checked={mock.consentChecked} emphasized />
			</PayContent>
		</DetailShell>
	);
}
