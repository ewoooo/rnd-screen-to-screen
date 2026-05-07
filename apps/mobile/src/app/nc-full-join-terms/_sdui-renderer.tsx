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

type FlowData = {
	useCase: string;
	name: string;
	step: number;
	total: number;
	progress: string;
};

type HeroData = {
	titleLines: readonly string[];
	description: string;
};

type TermsData = {
	title: string;
	allLabel: string;
	allCaption?: string;
	items: readonly TermsAgreementItem[];
};

type NoticeData = {
	badge: string;
	text: string;
	action?: string | null;
	tone?: "info" | "warning" | "critical";
};

type ContinueData = {
	eyebrow: string;
	primaryAction: string;
};

type UserData = {
	isMinor: boolean;
};

export function NcFullJoinTermsScreen({
	spec,
}: {
	spec: RenderableScreenSpecV1;
}) {
	const flow = readData<FlowData>(spec, "flow");
	const hero = readData<HeroData>(spec, "hero");
	const terms = readData<TermsData>(spec, "terms");
	const notice = readData<NoticeData>(spec, "notice");
	const continueData = readData<ContinueData>(spec, "continue");
	const user = readData<UserData>(spec, "user");

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

	const percent = Math.min(100, Math.max(0, (flow.step / flow.total) * 100));

	return (
		<AppScreen
			top={
				<ProgressTopBar
					title="회원가입"
					leading="close"
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
			<FlowHero
				titleLines={hero.titleLines}
				description={hero.description}
			/>
			<TermsAgreementGroup
				title={terms.title}
				allLabel={terms.allLabel}
				allCaption={terms.allCaption ?? ""}
				items={terms.items}
				onStateChange={(s) => setMissingCount(s.missingRequiredCount)}
			/>
			{user.isMinor ? (
				<FlowNotice
					badge={notice.badge}
					text={notice.text}
					action={notice.action ?? ""}
					tone={notice.tone ?? "info"}
				/>
			) : null}
		</AppScreen>
	);
}

function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
	const value = spec.data[key];
	if (!isObject(value)) {
		throw new Error(`nc-full-join-terms spec missing data.${key}`);
	}
	return value as T;
}

function isObject(value: SDUIJsonValue | undefined): value is JsonObject {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
