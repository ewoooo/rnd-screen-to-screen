"use client";

import {
	InfoList,
	type InfoListItem,
	NoticeBlock,
	PrimaryCTABar,
	SectionCard,
} from "@/components/molecules";
import { ProgressTopBar } from "@/components/organisms/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";

import type { RenderableScreenSpecV1 } from "@screen/screens";

type ResultTone = "success" | "info" | "warning" | "critical";
type ResultData = { tone: ResultTone; title: string; text: string };
type InfoData = { title: string; rows: readonly InfoListItem[] };
type CtaData = { primary: { id: string; label: string } };

export function BillingStatementResultScreen({
	spec,
}: {
	spec: RenderableScreenSpecV1;
}) {
	const result = readData<ResultData>(spec, "result");
	const info = readData<InfoData>(spec, "info");
	const cta = readData<CtaData>(spec, "cta");

	return (
		<AppScreen
			top={<ProgressTopBar title="재발행 결과" leading="close" />}
			bottom={<PrimaryCTABar primaryLabel={cta.primary.label} />}
		>
			<NoticeBlock
				tone={result.tone}
				badge={result.title}
				text={result.text}
			/>
			<SectionCard label={info.title}>
				<InfoList
					items={info.rows.map((r) => ({
						id: r.id,
						title: r.title,
						sub: r.sub ?? "",
						trailingLabel: r.trailingLabel,
					}))}
				/>
			</SectionCard>
		</AppScreen>
	);
}

function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
	const v = spec.data[key];
	if (!v || typeof v !== "object" || Array.isArray(v)) {
		throw new Error(`billing-statement-result spec missing data.${key}`);
	}
	return v as unknown as T;
}
