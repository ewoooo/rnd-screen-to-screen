import type { CSSProperties } from "react";

import { StatusRowList } from "@/components/auth-kit";
import { Heading20, ListSub } from "@/components/home-kit";
import { InfoBox, PayContent, ResultIcon } from "@/components/payment-kit";
import { DetailShell } from "@/components/search-kit";

import { withdrawalProcessingV1KitMock as mock } from "./_mock";

export default function WithdrawalProcessingV1KitPage() {
	return (
		<DetailShell title={mock.header}>
			<PayContent>
				<div style={resultStyle}>
					<ResultIcon tone="warning" glyph={mock.resultGlyph} />
					<div style={{ paddingTop: 6, textAlign: "center" }}>
						<Heading20>{mock.title.join("\n")}</Heading20>
					</div>
					<div style={{ textAlign: "center" }}>
						<ListSub>{mock.subtitle}</ListSub>
					</div>
				</div>
				<StatusRowList title={mock.progressTitle} items={mock.progress} />
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
