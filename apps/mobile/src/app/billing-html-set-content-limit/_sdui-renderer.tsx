"use client";

import { FormField, TextField } from "@pxds/pxds-components/patterns";
import {
	InfoList,
	type InfoListItem,
	NoticeBlock,
	PrimaryCTABar,
	SectionCard,
	type SelectableItem,
	SelectableList,
} from "@/components/molecules";
import { FlowHero, ProgressTopBar } from "@/components/organisms/global";
import { AppScreen, ContentSection } from "@pxds/pxds-layout/app-screen";

import type { RenderableScreenSpecV1 } from "@screen/specs";

type TopData = { title: string; leading: "back" | "close" };
type HeroData = { titleLines: readonly string[]; description: string };
type CurrentData = {
	title: string;
	items: readonly { id: string; label: string; value: string }[];
};
type AmountField = {
	id: string;
	label: string;
	required?: boolean;
	control: "text";
	placeholder?: string;
	helperText?: string;
};
type StatusField = {
	id: string;
	label: string;
	required?: boolean;
	control: "radio";
	value: string;
	options: readonly { id: string; title: string }[];
};
type FormData = { amount: AmountField; status: StatusField };
type EffectiveData = {
	tone: "info" | "warning" | "critical" | "success";
	text: string;
};
type ActionsData = {
	primary: { id: string; label: string };
	secondary?: { id: string; label: string };
};

// strain: msc-limit과 content-limit 데이터 shape 동일. 후속 차수에 BillingLimitScreen organism으로 승격 후보
export function BillingSetContentLimitScreen({
	spec,
}: {
	spec: RenderableScreenSpecV1;
}) {
	const top = readData<TopData>(spec, "top");
	const hero = readData<HeroData>(spec, "hero");
	const current = readData<CurrentData>(spec, "current");
	const form = readData<FormData>(spec, "form");
	const effective = readData<EffectiveData>(spec, "effective");
	const actions = readData<ActionsData>(spec, "actions");

	const currentItems: InfoListItem[] = current.items.map((it) => ({
		id: it.id,
		title: it.label,
		sub: "",
		trailingLabel: it.value,
	}));
	const statusItems: SelectableItem[] = form.status.options.map((o) => ({
		id: o.id,
		title: o.title,
	}));

	return (
		<AppScreen
			top={<ProgressTopBar title={top.title} leading={top.leading} />}
			bottom={
				<PrimaryCTABar
					primaryLabel={actions.primary.label}
					secondaryLabel={actions.secondary?.label}
				/>
			}
		>
			<FlowHero {...hero} />
			<SectionCard label={current.title}>
				<InfoList items={currentItems} />
			</SectionCard>
			<ContentSection>
				<FormField
					label={form.amount.label}
					required={form.amount.required}
					helperText={form.amount.helperText}
				>
					<TextField
						placeholder={form.amount.placeholder}
						inputMode="numeric"
						disabled
					/>
				</FormField>
			</ContentSection>
			<SectionCard label={form.status.label}>
				<SelectableList
					name={form.status.id}
					items={statusItems}
					value={form.status.value}
					density="compact"
				/>
			</SectionCard>
			<NoticeBlock
				tone={effective.tone}
				badge="적용 시점"
				text={effective.text}
			/>
		</AppScreen>
	);
}

function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
	const v = spec.data[key];
	if (!v || typeof v !== "object" || Array.isArray(v)) {
		throw new Error(`billing-set-content-limit spec missing data.${key}`);
	}
	return v as unknown as T;
}
