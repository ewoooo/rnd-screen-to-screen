"use client";

import { useState } from "react";

import {
	FlowContinueBar,
	FlowHero,
	FlowReasonForm,
	ProgressTopBar,
} from "@/components/organisms/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";

import type { RenderableScreenSpecV1 } from "@screen/specs";

type FlowData = { step: number; total: number; progress: string };
type HeroData = { titleLines: readonly string[]; description: string };
type ReasonItem = { id: string; title: string };
type FormData = {
	reasons: readonly ReasonItem[];
	detailsPlaceholder: string;
	detailsMaxLength: number;
};
type ContinueData = { eyebrow: string; primaryAction: string };

export function NcFullLeaveReasonScreen({
	spec,
}: {
	spec: RenderableScreenSpecV1;
}) {
	const flow = readData<FlowData>(spec, "flow");
	const hero = readData<HeroData>(spec, "hero");
	const form = readData<FormData>(spec, "form");
	const continueData = readData<ContinueData>(spec, "continue");

	const [reasonId, setReasonId] = useState<string | undefined>(undefined);
	const [details, setDetails] = useState("");

	const blocked = !reasonId;
	const dynamicEyebrow = blocked
		? "탈퇴 사유를 선택해 주세요"
		: continueData.eyebrow;
	const percent = Math.min(100, Math.max(0, (flow.step / flow.total) * 100));

	return (
		<AppScreen
			top={
				<ProgressTopBar
					title="회원 탈퇴"
					leading="back"
					progress={{ label: flow.progress, percent }}
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
				items={form.reasons}
				freeTextLabel="추가 의견 (선택)"
				freeTextPlaceholder={form.detailsPlaceholder}
				freeTextMaxLength={form.detailsMaxLength}
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
		throw new Error(`nc-full-leave-reason spec missing data.${key}`);
	}
	return value as T;
}
