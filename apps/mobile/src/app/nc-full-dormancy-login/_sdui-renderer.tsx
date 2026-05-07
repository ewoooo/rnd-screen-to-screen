"use client";

import { useMemo, useState } from "react";

import {
	FlowContinueBar,
	FlowHero,
	FlowNotice,
	FlowPersonalInfoForm,
	ProgressTopBar,
	type FlowPersonalField,
} from "@/components/organisms/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";

import type { RenderableScreenSpecV1 } from "@screen/screens";

type SpecField = {
	id: string;
	label: string;
	control: "text" | "password" | "select";
	required?: boolean;
	placeholder?: string;
};
type FormData = { fields: readonly SpecField[] };
type FlowData = { step: number; total: number; progress: string };
type HeroData = { titleLines: readonly string[]; description: string };
type NoticeData = {
	badge: string;
	text: string;
	action?: string | null;
	tone?: "info" | "warning" | "critical";
};
type ContinueData = { eyebrow: string; primaryAction: string };

export function NcFullDormancyLoginScreen({
	spec,
}: {
	spec: RenderableScreenSpecV1;
}) {
	const flow = readData<FlowData>(spec, "flow");
	const hero = readData<HeroData>(spec, "hero");
	const form = readData<FormData>(spec, "form");
	const notice = readData<NoticeData>(spec, "notice");
	const continueData = readData<ContinueData>(spec, "continue");

	const fields = useMemo<readonly FlowPersonalField[]>(
		() =>
			form.fields.map((f) => ({
				id: f.id,
				label: f.label,
				required: f.required,
				placeholder: f.placeholder,
				kind: "text" as const,
			})),
		[form.fields],
	);

	const [values, setValues] = useState<Record<string, string | undefined>>({});
	const errors: Record<string, string | undefined> = {};
	const missing = fields.filter(
		(f) => f.required && !values[f.id]?.trim(),
	).length;
	const blocked = missing > 0;
	const dynamicEyebrow = blocked
		? "아이디와 비밀번호를 입력해 주세요"
		: continueData.eyebrow;
	const percent = Math.min(100, Math.max(0, (flow.step / flow.total) * 100));

	return (
		<AppScreen
			top={
				<ProgressTopBar
					title="휴면 해제"
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
			<FlowHero {...hero} />
			<FlowPersonalInfoForm
				fields={fields}
				values={values}
				errors={errors}
				onChange={(id, value) =>
					setValues((current) => ({ ...current, [id]: value }))
				}
			/>
			<FlowNotice
				badge={notice.badge}
				text={notice.text}
				action={notice.action ?? ""}
				tone={notice.tone ?? "info"}
			/>
		</AppScreen>
	);
}

function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
	const value = spec.data[key];
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		throw new Error(`nc-full-dormancy-login spec missing data.${key}`);
	}
	return value as T;
}
