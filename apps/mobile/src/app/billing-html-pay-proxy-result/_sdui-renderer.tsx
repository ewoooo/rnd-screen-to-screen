"use client";

import {
	InfoList,
	type InfoListItem,
	PrimaryCTABar,
	SectionCard,
} from "@/components/molecules";
import { FlowHero, ProgressTopBar } from "@/components/organisms/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";

import type { RenderableScreenSpecV1 } from "@screen/specs";

type HeroData = { titleLines: readonly string[]; description: string };
type CardData = {
	title: string;
	items: readonly { id: string; label: string; value: string }[];
};
type ActionsData = {
	primary: { id: string; label: string };
	secondary?: { id: string; label: string };
};

export function BillingPayProxyResultScreen({
	spec,
}: {
	spec: RenderableScreenSpecV1;
}) {
	const hero = readData<HeroData>(spec, "hero");
	const executor = readData<CardData>(spec, "executorCard");
	const target = readData<CardData>(spec, "targetCard");
	const actions = readData<ActionsData>(spec, "actions");

	const toItems = (rows: CardData["items"]): InfoListItem[] =>
		rows.map((it) => ({
			id: it.id,
			title: it.label,
			sub: "",
			trailingLabel: it.value,
		}));

	return (
		<AppScreen
			top={<ProgressTopBar title="대리 납부 결과" leading="close" />}
			bottom={
				<PrimaryCTABar
					primaryLabel={actions.primary.label}
					secondaryLabel={actions.secondary?.label}
				/>
			}
		>
			<FlowHero {...hero} />
			<SectionCard label={executor.title}>
				<InfoList items={toItems(executor.items)} />
			</SectionCard>
			<SectionCard label={target.title}>
				<InfoList items={toItems(target.items)} />
			</SectionCard>
		</AppScreen>
	);
}


function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
	const value = spec.data[key];
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		throw new Error(`billing-pay-proxy-result spec missing data.${key}`);
	}
	return value as unknown as T;
}
