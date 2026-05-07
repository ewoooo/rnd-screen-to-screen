"use client";

import { useState } from "react";

import {
	FlowContinueBar,
	FlowHero,
	FlowReasonForm,
	ProgressTopBar,
	type FlowReasonItem,
} from "@/components/organisms/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";

import type { RenderableScreenSpecV1 } from "@screen/screens";

type LeaveReasonData = {
	hero: {
		titleLines: readonly string[];
		description: string;
	};
	reason: {
		items: readonly FlowReasonItem[];
		freeTextLabel: string;
		freeTextPlaceholder: string;
		freeTextMaxLength: number;
	};
	topbar: {
		title: string;
		progressLabel: string;
		progressPercent: number;
	};
	continue: {
		eyebrow: string;
		primaryAction: string;
	};
};

export function MembershipLeaveReasonScreen({
	spec,
}: {
	spec: RenderableScreenSpecV1;
}) {
	const data = spec.data as unknown as LeaveReasonData;
	const { hero, reason, topbar, continue: continueData } = data;

	const [value, setValue] = useState<string | undefined>(undefined);
	const [freeText, setFreeText] = useState("");

	const tooLong = freeText.length > reason.freeTextMaxLength;
	const blocked = !value || tooLong;
	const dynamicEyebrow = !value
		? "탈퇴 사유를 선택해주세요"
		: continueData.eyebrow;

	return (
		<AppScreen
			top={
				<ProgressTopBar
					title={topbar.title}
					leading="back"
					progress={{
						label: topbar.progressLabel,
						percent: topbar.progressPercent,
						showLabel: false,
					}}
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
			<FlowHero
				titleLines={hero.titleLines}
				description={hero.description}
			/>
			<FlowReasonForm
				items={reason.items}
				freeTextLabel={reason.freeTextLabel}
				freeTextPlaceholder={reason.freeTextPlaceholder}
				freeTextMaxLength={reason.freeTextMaxLength}
				value={value}
				freeText={freeText}
				onValueChange={setValue}
				onFreeTextChange={setFreeText}
			/>
		</AppScreen>
	);
}
