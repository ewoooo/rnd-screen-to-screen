import type { CSSProperties } from "react";

import { Heading20, ListSub } from "@/components/home-kit";
import {
	DetailGrid,
	InfoBox,
	PayContent,
	ResultIcon,
	StickyCTA,
} from "@/components/payment-kit";
import { DetailShell } from "@/components/search-kit";

import { membershipValidationV2KitMock as mock } from "./_mock";

export default function MembershipValidationV2KitPage() {
	return (
		<DetailShell title={mock.header} bottom={<StickyCTA text={mock.cta} />}>
			<PayContent>
				<div style={resultStyle}>
					<ResultIcon tone="warning" glyph={mock.resultGlyph} />
					<div style={{ paddingTop: 6, textAlign: "center" }}>
						<Heading20>{mock.title.join("\n")}</Heading20>
					</div>
					<div style={{ textAlign: "center", padding: "0 var(--spacing-8)" }}>
						<ListSub>{mock.subtitle}</ListSub>
					</div>
				</div>
				<DetailGrid items={mock.detail} />
				<InfoBox title={mock.infoTitle} bullets={mock.infoBullets} />
			</PayContent>
		</DetailShell>
	);
}

const resultStyle: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "var(--spacing-8)",
	paddingTop: "var(--spacing-16)",
};
