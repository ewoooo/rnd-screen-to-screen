"use client";

import {
	InfoList,
	type InfoListItem,
	SectionCard,
	StickyActionBar,
} from "@/components/molecules";
import { FlowHero, ProgressTopBar } from "@/components/organisms/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";

import type { RenderableScreenSpecV1 } from "@screen/specs";

type FlowData = { progress: string; step: number; total: number };
type HeroData = { titleLines: readonly string[]; description: string };
type TargetItem = {
	id: string;
	title: string;
	sub: string;
	defaultChecked?: boolean;
	trailingLabel?: string;
};
type TargetsData = {
	label: string;
	selectionMode: "single" | "multi";
	items: readonly TargetItem[];
};
type InfoData = {
	label: string;
	items: readonly { id: string; label: string; value: string }[];
};
type ContinueData = { eyebrow: string; primaryAction: string };

export function BillingPayProxyExecuteScreen({
	spec,
}: {
	spec: RenderableScreenSpecV1;
}) {
	const flow = readData<FlowData>(spec, "flow");
	const hero = readData<HeroData>(spec, "hero");
	const targets = readData<TargetsData>(spec, "targets");
	const info = readData<InfoData>(spec, "info");
	const cont = readData<ContinueData>(spec, "continue");

	// strain: SelectableList multi-mode 미지원 — InfoList trailingLabel로 선택 표식만 표시
	const targetItems = targets.items.map<InfoListItem>((it) => ({
		id: it.id,
		title: it.title,
		sub: it.sub,
		trailingLabel: it.trailingLabel ?? (it.defaultChecked ? "선택" : undefined),
	}));

	const infoItems = info.items.map<InfoListItem>((it) => ({
		id: it.id,
		title: it.label,
		sub: "",
		trailingLabel: it.value,
	}));

	return (
		<AppScreen
			top={
				<ProgressTopBar
					title="대리 납부 실행"
					leading="back"
					progress={{
						label: flow.progress,
						percent: (flow.step / flow.total) * 100,
					}}
				/>
			}
			bottom={
				<StickyActionBar
					eyebrow={cont.eyebrow}
					title={cont.primaryAction}
					secondaryAction=""
					primaryAction={cont.primaryAction}
				/>
			}
		>
			<FlowHero {...hero} />
			<SectionCard label={targets.label}>
				<InfoList items={targetItems} />
			</SectionCard>
			<SectionCard label={info.label}>
				<InfoList items={infoItems} />
			</SectionCard>
		</AppScreen>
	);
}


function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
	const value = spec.data[key];
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		throw new Error(`billing-pay-proxy-execute spec missing data.${key}`);
	}
	return value as unknown as T;
}
