"use client";

import { useState } from "react";

import {
	FlowContinueBar,
	FlowHero,
	FlowReasonForm,
	ProgressTopBar,
} from "@/components/organisms/global";
import { AppScreen } from "@/components/templates/app-screen";

import type { RenderableScreenSpecV1 } from "@screen/screens";

type TopbarData = {
	title: string;
	progressLabel?: string;
	progressPercent?: number;
	showProgressLabel?: boolean;
};
type HeroData = { titleLines: readonly string[]; description: string };
type ReasonItem = { id: string; title: string };
type ReasonData = {
	items: readonly ReasonItem[];
	freeText: {
		label: string;
		placeholder: string;
		maxLength: number;
	};
};
type ContinueData = { eyebrow?: string; primaryAction: string };

export function NcSimpleLeaveReasonScreen({
	spec,
}: {
	spec: RenderableScreenSpecV1;
}) {
	const topbar = readData<TopbarData>(spec, "topbar");
	const hero = readData<HeroData>(spec, "hero");
	const reason = readData<ReasonData>(spec, "reason");
	const continueData = readData<ContinueData>(spec, "continue");

	const [reasonId, setReasonId] = useState<string | undefined>(undefined);
	const [details, setDetails] = useState("");
	const blocked = !reasonId;
	const dynamicEyebrow = blocked
		? "탈퇴 사유를 선택해 주세요"
		: continueData.eyebrow ?? "";

	return (
		<AppScreen
			top={
				<ProgressTopBar
					title={topbar.title}
					leading="back"
					progress={
						topbar.progressLabel && topbar.progressPercent !== undefined
							? {
									label: topbar.progressLabel,
									percent: topbar.progressPercent,
									showLabel: topbar.showProgressLabel,
								}
							: undefined
					}
				/>
			}
			bottom={
				<FlowContinueBar
					eyebrow={dynamicEyebrow}
					primaryAction={continueData.primaryAction}
					disabled={blocked}
					state={blocked ? "blocked" : "ready"}
				/>
			}
		>
			<FlowHero {...hero} />
			<FlowReasonForm
				items={reason.items}
				freeTextLabel={reason.freeText.label}
				freeTextPlaceholder={reason.freeText.placeholder}
				freeTextMaxLength={reason.freeText.maxLength}
				value={reasonId}
				freeText={details}
				onValueChange={setReasonId}
				onFreeTextChange={setDetails}
			/>
		</AppScreen>
	);
}

function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
	const value = spec.data[key];
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		throw new Error(`nc-simple-leave-reason spec missing data.${key}`);
	}
	return value as T;
}
