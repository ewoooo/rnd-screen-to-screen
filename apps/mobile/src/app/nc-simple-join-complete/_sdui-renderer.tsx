"use client";

import {
	FlowHero,
	FlowResultActions,
	FlowSummaryCard,
	ProgressTopBar,
} from "@/components/organisms/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";

import type { RenderableScreenSpecV1 } from "@screen/specs";

type TopbarData = {
	title: string;
	progressLabel?: string;
	progressPercent?: number;
	showProgressLabel?: boolean;
};
type HeroData = { titleLines: readonly string[]; description: string };
type SummaryItem = { id: string; title: string; trailingLabel: string };
type SummaryData = { label?: string; items: readonly SummaryItem[] };
type ActionsData = { primaryLabel: string; secondaryLabel?: string };

export function NcSimpleJoinCompleteScreen({
	spec,
}: {
	spec: RenderableScreenSpecV1;
}) {
	const topbar = readData<TopbarData>(spec, "topbar");
	const hero = readData<HeroData>(spec, "hero");
	const summary = readData<SummaryData>(spec, "summary");
	const actions = readData<ActionsData>(spec, "actions");

	const items = summary.items.map((item) => ({
		id: item.id,
		title: item.title,
		sub: "",
		trailingLabel: item.trailingLabel,
	}));

	return (
		<AppScreen
			top={<ProgressTopBar title={topbar.title} leading="close" />}
			bottom={
				<FlowResultActions
					primaryLabel={actions.primaryLabel}
					secondaryLabel={actions.secondaryLabel}
				/>
			}
		>
			<FlowHero {...hero} />
			<FlowSummaryCard
				label={summary.label ?? ""}
				title=""
				items={items}
			/>
		</AppScreen>
	);
}

function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
	const value = spec.data[key];
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		throw new Error(`nc-simple-join-complete spec missing data.${key}`);
	}
	return value as T;
}
