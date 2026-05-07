"use client";

import { useState } from "react";

import {
	FlowContinueBar,
	FlowHero,
	FlowPersonalInfoForm,
	ProgressTopBar,
	type FlowPersonalField,
} from "@/components/organisms/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";

import type { RenderableScreenSpecV1 } from "@screen/specs";

type SpecField = {
	id: string;
	label: string;
	control: "text" | "select" | "password";
	required?: boolean;
	placeholder?: string;
	rule?: string;
	options?: readonly string[];
};

type FormData = { fields: readonly SpecField[] };
type FlowData = { step: number; total: number; progress: string };
type HeroData = { titleLines: readonly string[]; description: string };
type ContinueData = { eyebrow: string; primaryAction: string };

export function NcFullJoinInfoScreen({
	spec,
}: {
	spec: RenderableScreenSpecV1;
}) {
	const flow = readData<FlowData>(spec, "flow");
	const hero = readData<HeroData>(spec, "hero");
	const form = readData<FormData>(spec, "form");
	const continueData = readData<ContinueData>(spec, "continue");

	const fields: readonly FlowPersonalField[] = form.fields.map((f) => ({
		id: f.id,
		label: f.label,
		required: f.required,
		placeholder: f.placeholder,
		helperText: f.rule,
		kind: f.control === "select" ? ("selectable" as const) : ("text" as const),
		options: f.options?.map((value) => ({ id: value, title: value })),
	}));

	const [values, setValues] = useState<Record<string, string | undefined>>({});
	const errors: Record<string, string | undefined> = {};
	const missingRequired = fields.filter(
		(f) => f.required && !(values[f.id]?.trim()),
	).length;
	const blocked = missingRequired > 0;

	const dynamicEyebrow = blocked
		? "필수 항목을 입력해 주세요"
		: continueData.eyebrow;
	const percent = Math.min(100, Math.max(0, (flow.step / flow.total) * 100));

	return (
		<AppScreen
			top={
				<ProgressTopBar
					title="회원가입"
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
			<FlowPersonalInfoForm
				fields={fields}
				values={values}
				errors={errors}
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
		throw new Error(`nc-full-join-info spec missing data.${key}`);
	}
	return value as T;
}
