"use client";

import {
	InfoList,
	type InfoListItem,
	NoticeBlock,
	PrimaryCTABar,
	SummaryCard,
} from "@/components/molecules";
import { ProgressTopBar } from "@/components/organisms/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";

import type { RenderableScreenSpecV1 } from "@screen/specs";

type SummaryData = {
	label: string;
	title: string;
	meta: readonly { id: string; label: string; value: string }[];
};

type DetailsData = {
	title: string;
	rows: readonly InfoListItem[];
};

type NoticeData = {
	tone: "info" | "warning" | "critical";
	title: string;
	text: string;
};

type CtaData = {
	primary: { id: string; label: string };
};

export function BillingSummaryScreen({
	spec,
}: {
	spec: RenderableScreenSpecV1;
}) {
	const summary = readData<SummaryData>(spec, "summary");
	const details = readData<DetailsData>(spec, "details");
	const notice = readData<NoticeData>(spec, "notice");
	const cta = readData<CtaData>(spec, "cta");

	return (
		<AppScreen
			top={<ProgressTopBar title="청구 요약" leading="back" />}
			bottom={<PrimaryCTABar primaryLabel={cta.primary.label} />}
		>
			<SummaryCard
				label={summary.label}
				title={summary.title}
				mediaAlt={summary.label}
			>
				<InfoList
					items={summary.meta.map((m) => ({
						id: m.id,
						title: m.label,
						sub: "",
						trailingLabel: m.value,
					}))}
				/>
			</SummaryCard>
			<InfoList items={details.rows} />
			<NoticeBlock
				tone={notice.tone}
				badge={notice.title}
				text={notice.text}
			/>
		</AppScreen>
	);
}

function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
	const value = spec.data[key];
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		throw new Error(`billing-summary spec missing data.${key}`);
	}
	return value as unknown as T;
}
