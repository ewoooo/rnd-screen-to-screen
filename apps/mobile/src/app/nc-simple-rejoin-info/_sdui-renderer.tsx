"use client";

import { useState } from "react";

import {
	FlowContinueBar,
	FlowHero,
	FlowPersonalInfoForm,
	ProgressTopBar,
	TermsAgreementGroup,
	type FlowPersonalField,
	type TermsAgreementItem,
} from "@/components/organisms/global";
import {
	ReusedInfoList,
	type ReusedInfoItem,
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
type SpecTermItem = {
	id: string;
	title: string;
	required: boolean;
	hasDetail?: boolean;
	caption?: string;
};
type TermsData = {
	selectAllLabel: string;
	required: readonly SpecTermItem[];
	optional: readonly SpecTermItem[];
};
type ReusedInfoData = {
	label?: string;
	items: readonly ReusedInfoItem[];
};
type SpecField = {
	id: string;
	label: string;
	placeholder?: string;
	type: "text" | "password";
	required?: boolean;
};
type FormData = { fields: readonly SpecField[] };
type ContinueData = { eyebrow?: string; primaryAction: string };

export function NcSimpleRejoinInfoScreen({
	spec,
}: {
	spec: RenderableScreenSpecV1;
}) {
	const topbar = readData<TopbarData>(spec, "topbar");
	const hero = readData<HeroData>(spec, "hero");
	const terms = readData<TermsData>(spec, "terms");
	const reusedInfo = readData<ReusedInfoData>(spec, "reusedInfo");
	const form = readData<FormData>(spec, "form");
	const continueData = readData<ContinueData>(spec, "continue");

	const termsItems: readonly TermsAgreementItem[] = [
		...terms.required,
		...terms.optional,
	].map((item) => ({
		id: item.id,
		title: item.title,
		caption: item.caption ?? "",
		required: item.required,
	}));
	const initialMissing = terms.required.length;
	const [missingTerms, setMissingTerms] = useState(initialMissing);

	const fields: readonly FlowPersonalField[] = form.fields.map((f) => ({
		id: f.id,
		label: f.label,
		required: f.required,
		placeholder: f.placeholder,
		kind: "text" as const,
	}));
	const [values, setValues] = useState<Record<string, string | undefined>>({});
	const errors: Record<string, string | undefined> = {};
	const missingFields = fields.filter(
		(f) => f.required && !values[f.id]?.trim(),
	).length;

	const blocked = missingFields > 0 || missingTerms > 0;
	const dynamicEyebrow = blocked
		? "필수 항목과 약관을 확인해 주세요"
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
			<TermsAgreementGroup
				title="약관 동의"
				allLabel={terms.selectAllLabel}
				allCaption=""
				items={termsItems}
				onStateChange={(s) => setMissingTerms(s.missingRequiredCount)}
			/>
			<ReusedInfoList label={reusedInfo.label} items={reusedInfo.items} />
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
		throw new Error(`nc-simple-rejoin-info spec missing data.${key}`);
	}
	return value as T;
}
