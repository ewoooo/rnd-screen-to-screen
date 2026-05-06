"use client";

import {
	InfoList,
	type InfoListItem,
	NoticeBlock,
	PrimaryCTABar,
	SectionCard,
} from "@/components/molecules";
import { FlowHero, ProgressTopBar } from "@/components/organisms/global";
import { AppScreen } from "@/components/templates/app-screen";

import type { RenderableScreenSpecV1 } from "@screen/screens";

type HeroData = { titleLines: readonly string[]; description: string };
type NoticeTone = "info" | "warning" | "critical" | "success";
type NoticeData = { tone: NoticeTone; title: string; body: string };
type InfoData = {
	label: string;
	items: readonly { id: string; label: string; value: string }[];
};
type ActionsData = {
	primary: { id: string; label: string };
	secondary?: { id: string; label: string };
	tertiary?: { id: string; label: string };
};

export function BillingPayFailureScreen({
	spec,
}: {
	spec: RenderableScreenSpecV1;
}) {
	const hero = readData<HeroData>(spec, "hero");
	const notice = readData<NoticeData>(spec, "notice");
	const info = readData<InfoData>(spec, "info");
	const actions = readData<ActionsData>(spec, "actions");

	const items = info.items.map<InfoListItem>((it) => ({
		id: it.id,
		title: it.label,
		sub: "",
		trailingLabel: it.value,
		trailingTone: it.id === "status" ? "negative" : "neutral",
		trailingKind: it.id === "status" ? "status" : "value",
	}));

	return (
		<AppScreen
			top={<ProgressTopBar title="납부 실패" leading="close" />}
			bottom={
				<PrimaryCTABar
					primaryLabel={actions.primary.label}
					secondaryLabel={actions.secondary?.label}
					tertiaryLabel={actions.tertiary?.label}
				/>
			}
		>
			<FlowHero {...hero} />
			<NoticeBlock tone={notice.tone} badge={notice.title} text={notice.body} />
			<SectionCard label={info.label}>
				<InfoList items={items} />
			</SectionCard>
		</AppScreen>
	);
}


function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
	const value = spec.data[key];
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		throw new Error(`billing-pay-failure spec missing data.${key}`);
	}
	return value as unknown as T;
}
