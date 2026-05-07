"use client";

import {
	FlowHero,
	FlowResultActions,
	ProgressTopBar,
} from "@/components/organisms/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";

import type { RenderableScreenSpecV1 } from "@screen/screens";

type TopbarData = { title: string };
type HeroData = { titleLines: readonly string[]; description: string };
type ActionsData = { primaryLabel: string; secondaryLabel?: string };

export function NcSimpleDormancyResultScreen({
	spec,
}: {
	spec: RenderableScreenSpecV1;
}) {
	const topbar = readData<TopbarData>(spec, "topbar");
	const hero = readData<HeroData>(spec, "hero");
	const actions = readData<ActionsData>(spec, "actions");

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
		</AppScreen>
	);
}

function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
	const value = spec.data[key];
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		throw new Error(`nc-simple-dormancy-result spec missing data.${key}`);
	}
	return value as T;
}
