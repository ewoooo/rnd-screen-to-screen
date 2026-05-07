"use client";

import {
	InfoList,
	type InfoListItem,
	NoticeBlock,
	PrimaryCTABar,
	SectionCard,
} from "@/components/molecules";
import { FlowHero, ProgressTopBar } from "@/components/organisms/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";

import type { RenderableScreenSpecV1 } from "@screen/screens";

type HeroData = { titleLines: readonly string[]; description: string };
type NoticeTone = "info" | "warning" | "critical" | "success";
type NoticeData = { tone: NoticeTone; title: string; body: string };
type SummaryData = {
	title: string;
	items: readonly { id: string; label: string; value: string }[];
};
type ActionsData = {
	primary: { id: string; label: string };
	secondary?: { id: string; label: string };
};

export function BillingPayPrepayResultScreen({
	spec,
}: {
	spec: RenderableScreenSpecV1;
}) {
	const hero = readData<HeroData>(spec, "hero");
	const notice = readData<NoticeData>(spec, "notice");
	const summary = readData<SummaryData>(spec, "summary");
	const actions = readData<ActionsData>(spec, "actions");

	const items = summary.items.map<InfoListItem>((it) => ({
		id: it.id,
		title: it.label,
		sub: "",
		trailingLabel: it.value,
	}));

	return (
		<AppScreen
			top={<ProgressTopBar title="선결제 결과" leading="close" />}
			bottom={
				<PrimaryCTABar
					primaryLabel={actions.primary.label}
					secondaryLabel={actions.secondary?.label}
				/>
			}
		>
			<FlowHero {...hero} />
			<NoticeBlock tone={notice.tone} badge={notice.title} text={notice.body} />
			<SectionCard label={summary.title}>
				<InfoList items={items} />
			</SectionCard>
		</AppScreen>
	);
}


function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
	const value = spec.data[key];
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		throw new Error(`billing-pay-prepay-result spec missing data.${key}`);
	}
	return value as unknown as T;
}
