"use client";

import {
	InfoList,
	type InfoListItem,
	NoticeBlock,
	PrimaryCTABar,
	type SelectableItem,
	SelectableList,
	SummaryCard,
} from "@/components/molecules";
import { ProgressTopBar } from "@/components/organisms/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";

import type { RenderableScreenSpecV1 } from "@screen/specs";

type TargetsData = {
	title: string;
	selectionMode: "multi" | "single";
	options: readonly {
		id: string;
		label: string;
		sub: string;
		value: number;
		selected?: boolean;
	}[];
};

type TotalData = {
	label: string;
	title: string;
	meta: readonly { id: string; label: string; value: string }[];
};

type NoticeData = {
	tone: "info" | "warning" | "critical";
	title: string;
	text: string;
};

type CtaData = { primary: { id: string; label: string } };

export function BillingTargetSelectScreen({
	spec,
}: {
	spec: RenderableScreenSpecV1;
}) {
	const targets = readData<TargetsData>(spec, "targets");
	const total = readData<TotalData>(spec, "total");
	const notice = readData<NoticeData>(spec, "notice");
	const cta = readData<CtaData>(spec, "cta");

	// 1차: multi-select UI는 후속. 현재는 selected=true 항목만 trailingLabel="선택됨"으로 표기.
	const items = targets.options.map<SelectableItem>((opt) => ({
		id: opt.id,
		title: opt.label,
		sub: opt.sub,
		trailingLabel: opt.selected ? "선택됨" : undefined,
	}));
	const firstSelected =
		targets.options.find((o) => o.selected)?.id ?? items[0]?.id;

	return (
		<AppScreen
			top={<ProgressTopBar title="납부 대상 선택" leading="back" />}
			bottom={<PrimaryCTABar primaryLabel={cta.primary.label} />}
		>
			<SelectableList
				name="targets"
				items={items}
				value={firstSelected}
			/>
			<SummaryCard
				label={total.label}
				title={total.title}
				mediaAlt={total.label}
			>
				<InfoList
					items={total.meta.map<InfoListItem>((m) => ({
						id: m.id,
						title: m.label,
						sub: "",
						trailingLabel: m.value,
					}))}
				/>
			</SummaryCard>
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
		throw new Error(`billing-target-select spec missing data.${key}`);
	}
	return value as unknown as T;
}
