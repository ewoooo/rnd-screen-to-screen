import { StatusRowList } from "@/components/auth-kit";
import {
	DetailGrid,
	Hero,
	InfoBox,
	PayContent,
	StickyCTA,
} from "@/components/payment-kit";
import { DetailShell } from "@/components/search-kit";

import { rejoinHistoryCheckV1KitMock as mock } from "./_mock";

export default function RejoinHistoryCheckV1KitPage() {
	return (
		<DetailShell title={mock.header} bottom={<StickyCTA text={mock.cta} />}>
			<PayContent>
				<Hero title={mock.heroTitle} sub={mock.heroSub} />
				<DetailGrid items={mock.detail} />
				<StatusRowList title={mock.timelineTitle} items={mock.timeline} />
				<InfoBox bullets={mock.infoBullets} />
			</PayContent>
		</DetailShell>
	);
}
