"use client";

import { useState } from "react";

import {
	MembershipContinueBar,
	MembershipHero,
	MembershipReasonForm,
	MembershipTopBar,
	type MembershipReasonItem,
} from "@/components/organisms/membership";
import { AppScreen } from "@/components/templates/app-screen";

import type { RenderableScreenSpecV1 } from "@screen/screens";

type LeaveReasonData = {
	hero: {
		titleLines: readonly string[];
		description: string;
	};
	reason: {
		items: readonly MembershipReasonItem[];
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
				<MembershipTopBar
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
				<MembershipContinueBar
					eyebrow={dynamicEyebrow}
					primaryAction={continueData.primaryAction}
					disabled={blocked}
					state={blocked ? "blocked" : "ready"}
				/>
			}
		>
			<MembershipHero
				titleLines={hero.titleLines}
				description={hero.description}
			/>
			<MembershipReasonForm
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
