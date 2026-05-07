"use client";

import { useState } from "react";

import {
	FlowContinueBar,
	FlowHero,
	ProgressTopBar,
} from "@/components/organisms/global";
import {
	FinalConsentRow,
	LeaveImpactChecklist,
	type LeaveImpactItem,
} from "@/components/organisms/nc-simple";
import { AppScreen } from "@pxds/pxds-layout/app-screen";

import type { RenderableScreenSpecV1 } from "@screen/specs";

type TopbarData = {
	title: string;
	progressLabel?: string;
	progressPercent?: number;
	showProgressLabel?: boolean;
};
type HeroData = { titleLines: readonly string[]; description: string };
type ImpactData = { items: readonly LeaveImpactItem[] };
type FinalConsentData = { label: string; required: boolean };
type ContinueData = {
	eyebrow?: string;
	primaryAction: string;
	primaryVariant?: "default" | "destructive";
};

export function NcSimpleLeaveConfirmScreen({
	spec,
}: {
	spec: RenderableScreenSpecV1;
}) {
	const topbar = readData<TopbarData>(spec, "topbar");
	const hero = readData<HeroData>(spec, "hero");
	const impact = readData<ImpactData>(spec, "impact");
	const finalConsent = readData<FinalConsentData>(spec, "finalConsent");
	const continueData = readData<ContinueData>(spec, "continue");

	const [missingRequired, setMissingRequired] = useState(
		impact.items.filter((item) => item.required).length,
	);
	const [consentChecked, setConsentChecked] = useState(false);

	const blocked = missingRequired > 0 || !consentChecked;
	const dynamicEyebrow = blocked
		? missingRequired > 0
			? `확인 항목 ${missingRequired}개가 남았어요`
			: "최종 동의에 체크해 주세요"
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
			<LeaveImpactChecklist
				items={impact.items}
				onStateChange={(s) => setMissingRequired(s.missingRequiredCount)}
			/>
			<FinalConsentRow
				label={finalConsent.label}
				checked={consentChecked}
				onCheckedChange={setConsentChecked}
			/>
		</AppScreen>
	);
}

function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
	const value = spec.data[key];
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		throw new Error(`nc-simple-leave-confirm spec missing data.${key}`);
	}
	return value as T;
}
