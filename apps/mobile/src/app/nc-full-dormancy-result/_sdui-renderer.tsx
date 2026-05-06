"use client";

import {
	NcHero,
	NcNotice,
	NcResultActions,
	NcSummaryCard,
	NcTopBar,
} from "@/components/organisms/nc";
import { AppScreen } from "@/components/templates/app-screen";

import type { RenderableScreenSpecV1 } from "@screen/screens";

type HeroData = { titleLines: readonly string[]; description: string };
type SummaryItem = { id: string; label: string; value: string };
type SummaryData = { title: string; items: readonly SummaryItem[] };
type NoticeData = {
	badge: string;
	text: string;
	action?: string | null;
	tone?: "info" | "warning" | "critical";
};
type ActionsData = {
	primary: { id: string; label: string };
	secondary?: { id: string; label: string };
};

export function NcFullDormancyResultScreen({
	spec,
}: {
	spec: RenderableScreenSpecV1;
}) {
	const hero = readData<HeroData>(spec, "hero");
	const summary = readData<SummaryData>(spec, "summary");
	const sessionNotice = readData<NoticeData>(spec, "sessionNotice");
	const actions = readData<ActionsData>(spec, "actions");

	const items = summary.items.map((item) => ({
		id: item.id,
		title: item.label,
		sub: "",
		trailingLabel: item.value,
	}));

	return (
		<AppScreen
			top={<NcTopBar title="휴면 해제" leading="close" />}
			bottom={
				<NcResultActions
					primaryLabel={actions.primary.label}
					secondaryLabel={actions.secondary?.label}
				/>
			}
		>
			<NcHero {...hero} />
			<NcSummaryCard label="" title={summary.title} items={items} />
			<NcNotice
				badge={sessionNotice.badge}
				text={sessionNotice.text}
				action={sessionNotice.action ?? ""}
				tone={sessionNotice.tone ?? "info"}
			/>
		</AppScreen>
	);
}

function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
	const value = spec.data[key];
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		throw new Error(`nc-full-dormancy-result spec missing data.${key}`);
	}
	return value as T;
}
