"use client";

import {
	NcContinueBar,
	NcHero,
	NcNotice,
	NcSummaryCard,
	NcTopBar,
} from "@/components/organisms/nc";
import { AppScreen } from "@/components/templates/app-screen";

import type { RenderableScreenSpecV1 } from "@screen/screens";

type FlowData = { step: number; total: number; progress: string };
type HeroData = { titleLines: readonly string[]; description: string };
type ImpactItem = { id: string; label: string; value: string };
type ImpactData = { title: string; items: readonly ImpactItem[] };
type NoticeData = {
	badge: string;
	text: string;
	action?: string | null;
	tone?: "info" | "warning" | "critical";
};
type ContinueData = { eyebrow: string; primaryAction: string };

export function NcFullLeaveNoticeScreen({
	spec,
}: {
	spec: RenderableScreenSpecV1;
}) {
	const flow = readData<FlowData>(spec, "flow");
	const hero = readData<HeroData>(spec, "hero");
	const impact = readData<ImpactData>(spec, "impact");
	const cautions = readData<NoticeData>(spec, "cautions");
	const continueData = readData<ContinueData>(spec, "continue");

	const items = impact.items.map((item) => ({
		id: item.id,
		title: item.label,
		sub: "",
		trailingLabel: item.value,
	}));
	const percent = Math.min(100, Math.max(0, (flow.step / flow.total) * 100));

	return (
		<AppScreen
			top={
				<NcTopBar
					title="회원 탈퇴"
					leading="back"
					progress={{ label: flow.progress, percent }}
				/>
			}
			bottom={
				<NcContinueBar
					eyebrow={continueData.eyebrow}
					primaryAction={continueData.primaryAction}
				/>
			}
		>
			<NcHero {...hero} />
			<NcSummaryCard label="" title={impact.title} items={items} />
			<NcNotice
				badge={cautions.badge}
				text={cautions.text}
				action={cautions.action ?? ""}
				tone={cautions.tone ?? "warning"}
			/>
		</AppScreen>
	);
}

function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
	const value = spec.data[key];
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		throw new Error(`nc-full-leave-notice spec missing data.${key}`);
	}
	return value as T;
}
