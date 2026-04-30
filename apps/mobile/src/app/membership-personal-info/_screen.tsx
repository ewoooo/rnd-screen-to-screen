"use client";

import { useMemo, useState } from "react";

import {
	MembershipContinueBar,
	MembershipHero,
	MembershipPersonalInfoForm,
	MembershipTopBar,
	type MembershipPersonalField,
} from "@/components/organisms/membership";
import { AppScreen } from "@/components/templates/app-screen";

import type { RenderableScreenSpecV1 } from "@screen/screens";

type PersonalInfoData = {
	topbar: { title: string; progressLabel: string; progressPercent: number };
	hero: { titleLines: readonly string[]; description: string };
	form: { fields: readonly MembershipPersonalField[] };
	continue: { eyebrow: string; primaryAction: string };
};

export function MembershipPersonalInfoScreen({
	spec,
}: {
	spec: RenderableScreenSpecV1;
}) {
	const data = spec.data as unknown as PersonalInfoData;
	const { topbar, hero, form, continue: continueData } = data;

	const [values, setValues] = useState<Record<string, string | undefined>>({});

	const errors = useMemo(() => {
		const next: Record<string, string | undefined> = {};
		for (const field of form.fields) {
			const value = values[field.id]?.trim() ?? "";
			if (field.required && !value) continue; // 빈값은 errorText 안 띄움 (eyebrow가 안내)
			const validation = field.validation;
			if (!validation || !value) continue;
			if (
				(validation.minLength && value.length < validation.minLength) ||
				(validation.maxLength && value.length > validation.maxLength)
			) {
				next[field.id] = validation.errorMessage ?? "입력 형식을 확인해주세요";
			}
		}
		return next;
	}, [form.fields, values]);

	const missingRequired = form.fields.filter(
		(f) => f.required && !(values[f.id]?.trim()),
	).length;
	const hasErrors = Object.values(errors).some(Boolean);
	const blocked = missingRequired > 0 || hasErrors;

	const dynamicEyebrow = blocked
		? missingRequired > 0
			? `남은 필수 항목 ${missingRequired}개를 입력해주세요`
			: "입력 형식을 확인해주세요"
		: continueData.eyebrow;

	return (
		<AppScreen
			top={
				<MembershipTopBar
					title={topbar.title}
					progress={{
						label: topbar.progressLabel,
						percent: topbar.progressPercent,
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
			<MembershipHero {...hero} />
			<MembershipPersonalInfoForm
				fields={form.fields}
				values={values}
				errors={errors}
				onChange={(id, value) =>
					setValues((current) => ({ ...current, [id]: value }))
				}
			/>
		</AppScreen>
	);
}
