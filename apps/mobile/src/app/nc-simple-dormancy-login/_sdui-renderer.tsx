"use client";

import { useState } from "react";

import {
	FlowContinueBar,
	FlowHero,
	FlowNotice,
	ProgressTopBar,
} from "@/components/organisms/global";
import {
	LoginForm,
	type LoginField,
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
type SpecField = {
	id: string;
	label: string;
	placeholder?: string;
	type: "text" | "password";
	required?: boolean;
};
type LoginData = { fields: readonly SpecField[] };
type NoticeData = {
	badge: string;
	text: string;
	action?: string | null;
	tone?: "info" | "warning" | "critical";
};
type ContinueData = {
	primaryActionInitial: string;
	primaryActionDormancy: string;
	eyebrow?: string;
};

export function NcSimpleDormancyLoginScreen({
	spec,
}: {
	spec: RenderableScreenSpecV1;
}) {
	const topbar = readData<TopbarData>(spec, "topbar");
	const hero = readData<HeroData>(spec, "hero");
	const login = readData<LoginData>(spec, "login");
	const notice = readData<NoticeData>(spec, "notice");
	const continueData = readData<ContinueData>(spec, "continue");

	const fields: readonly LoginField[] = login.fields.map((f) => ({
		id: f.id,
		label: f.label,
		placeholder: f.placeholder,
		type: f.type,
		required: f.required,
	}));

	const [values, setValues] = useState<Record<string, string | undefined>>({});
	const missing = fields.filter(
		(f) => f.required && !values[f.id]?.trim(),
	).length;
	const blocked = missing > 0;
	const dynamicEyebrow = blocked
		? "아이디와 비밀번호를 입력해 주세요"
		: continueData.eyebrow ?? "";

	return (
		<AppScreen
			top={
				<ProgressTopBar
					title={topbar.title}
					leading="close"
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
					primaryAction={continueData.primaryActionDormancy}
					disabled={blocked}
					state={blocked ? "blocked" : "ready"}
				/>
			}
		>
			<FlowHero {...hero} />
			<FlowNotice
				badge={notice.badge}
				text={notice.text}
				action={notice.action ?? ""}
				tone={notice.tone ?? "info"}
			/>
			<LoginForm
				fields={fields}
				values={values}
				onChange={(id, value) =>
					setValues((current) => ({ ...current, [id]: value }))
				}
			/>
		</AppScreen>
	);
}

function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
	const value = spec.data[key];
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		throw new Error(`nc-simple-dormancy-login spec missing data.${key}`);
	}
	return value as T;
}
