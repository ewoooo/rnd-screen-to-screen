"use client";

import { useMemo, useState } from "react";

import {
	FlowContinueBar,
	FlowHero,
	FlowNotice,
	ProgressTopBar,
	TermsAgreementGroup,
	type TermsAgreementItem,
} from "@/components/organisms/global";
import { AppScreen } from "@/components/templates/app-screen";

import type { RenderableScreenSpecV1, SDUIJsonValue } from "@screen/screens";

type JsonObject = Record<string, SDUIJsonValue>;

type HeroData = {
	eyebrow: string;
	titleLines: readonly string[];
	description: string;
};

type TermsData = {
	label?: string;
	title: string;
	allLabel: string;
	allCaption: string;
	items: readonly TermsAgreementItem[];
};

type NoticeData = {
	badge: string;
	text: string;
	action: string;
	tone?: "info" | "warning" | "critical";
};

type ContinueData = {
	eyebrow: string;
	primaryAction: string;
};

export function MembershipTermsConsentScreen({
	spec,
}: {
	spec: RenderableScreenSpecV1;
}) {
	const hero = readData<HeroData>(spec, "hero");
	const terms = readData<TermsData>(spec, "terms");
	const notice = readData<NoticeData>(spec, "notice");
	const continueData = readData<ContinueData>(spec, "continue");
	const progress = parseStepProgress(hero.eyebrow);

	const initialMissing = useMemo(
		() =>
			terms.items.filter((item) => item.required && !item.defaultChecked)
				.length,
		[terms.items],
	);
	const [missingCount, setMissingCount] = useState(initialMissing);
	const blocked = missingCount > 0;
	const dynamicEyebrow = blocked
		? `필수 약관 ${missingCount}개 동의가 남았어요`
		: continueData.eyebrow;

	return (
		<AppScreen
			top={
				<ProgressTopBar
					title="회원가입"
					progress={
						progress
							? { label: hero.eyebrow, percent: progress.percent }
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
			<FlowHero
				titleLines={hero.titleLines}
				description={hero.description}
			/>
			<TermsAgreementGroup
				{...terms}
				onStateChange={(s) => setMissingCount(s.missingRequiredCount)}
			/>
			<FlowNotice {...notice} tone={notice.tone ?? "info"} />
		</AppScreen>
	);
}

function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
	const value = spec.data[key];
	if (!isObject(value)) {
		throw new Error(`membership terms spec missing data.${key}`);
	}
	return value as T;
}

function isObject(value: SDUIJsonValue | undefined): value is JsonObject {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function parseStepProgress(label: string) {
	const match = label.match(/(\d+)\s*\/\s*(\d+)/);
	if (!match) return null;

	const current = Number(match[1]);
	const total = Number(match[2]);
	if (!Number.isFinite(current) || !Number.isFinite(total) || total <= 0) {
		return null;
	}

	return {
		current,
		total,
		percent: Math.min(100, Math.max(0, (current / total) * 100)),
	};
}
