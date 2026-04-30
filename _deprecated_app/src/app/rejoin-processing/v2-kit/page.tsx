import type { CSSProperties } from "react";

import { StatusRowList } from "@/components/auth-kit";
import { Heading20, ListSub } from "@/components/home-kit";
import {
	DetailGrid,
	InfoBox,
	PayContent,
	ResultIcon,
	StickyCTA,
} from "@/components/payment-kit";
import { DetailShell } from "@/components/search-kit";

import { rejoinProcessingV2KitMock as mock } from "./_mock";

export default function RejoinProcessingV2KitPage() {
	return (
		<DetailShell title={mock.header} bottom={<StickyCTA text={mock.cta} />}>
			<PayContent>
				<div style={resultStyle}>
					<ResultIcon tone="success" glyph={mock.resultGlyph} />
					<div style={{ paddingTop: 6, textAlign: "center" }}>
						<Heading20>{mock.title.join("\n")}</Heading20>
					</div>
					<div style={{ textAlign: "center" }}>
						<ListSub>{mock.timestamp}</ListSub>
					</div>
				</div>
				<DetailGrid items={mock.detail} />
				<StatusRowList title={mock.statusTitle} items={mock.status} />
				<InfoBox bullets={mock.infoBullets} />
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
