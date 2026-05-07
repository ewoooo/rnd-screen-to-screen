"use client";

import { VStack } from "@/components/atoms/layout";
import {
	ChipGroup,
	type ChipItem,
	FormField,
	NoticeBlock,
	SectionCard,
	StickyActionBar,
	Switch,
	TextField,
} from "@/components/molecules";
import { FlowHero, ProgressTopBar } from "@/components/organisms/global";
import { AppScreen, ContentSection } from "@/components/templates/app-screen";
import { evalVisibleWhen } from "@/lib/visible-when";

import type { RenderableScreenSpecV1 } from "@screen/screens";

type TopData = { title: string; leading: "back" | "close" };
type HeroData = { titleLines: readonly string[]; description: string };
type EnableField = {
	id: string;
	label: string;
	required?: boolean;
	control: "switch";
	value: boolean;
	helperText?: string;
};
type ThresholdField = {
	id: string;
	label: string;
	required?: boolean;
	control: "text";
	placeholder?: string;
	helperText?: string;
	visibleWhen?: string;
};
type TargetsField = {
	id: string;
	label: string;
	required?: boolean;
	control: "selectable";
	selectionMode: "single" | "multi";
	value: readonly string[];
	options: readonly { id: string; title: string }[];
};
type FormData = {
	enable: EnableField;
	threshold: ThresholdField;
	targets: TargetsField;
};
type EffectiveData = {
	tone: "info" | "warning" | "critical" | "success";
	text: string;
};
type ContinueData = { eyebrow: string; primaryAction: string };

export function BillingSetAutoPrepayScreen({
	spec,
}: {
	spec: RenderableScreenSpecV1;
}) {
	const top = readData<TopData>(spec, "top");
	const hero = readData<HeroData>(spec, "hero");
	const form = readData<FormData>(spec, "form");
	const effective = readData<EffectiveData>(spec, "effective");
	const cont = readData<ContinueData>(spec, "continue");

	// strain: targets는 multi-select. SelectableList는 single만 지원 → ChipGroup으로 read-only 표현
	const targetItems: ChipItem[] = form.targets.options.map((o) => ({
		id: o.id,
		label: o.title,
	}));

	return (
		<AppScreen
			top={<ProgressTopBar title={top.title} leading={top.leading} />}
			bottom={
				<StickyActionBar
					eyebrow={cont.eyebrow}
					title={cont.primaryAction}
					secondaryAction=""
					primaryAction={cont.primaryAction}
				/>
			}
		>
			<FlowHero {...hero} />
			<ContentSection>
				<VStack gap="block">
					<FormField
						label={form.enable.label}
						helperText={form.enable.helperText}
					>
						<Switch defaultChecked={form.enable.value} disabled />
					</FormField>
					{evalVisibleWhen(form.threshold.visibleWhen, {
						enable: form.enable.value,
					}) ? (
						<FormField
							label={form.threshold.label}
							required={form.threshold.required}
							helperText={form.threshold.helperText}
						>
							<TextField
								placeholder={form.threshold.placeholder}
								inputMode="numeric"
								disabled
							/>
						</FormField>
					) : null}
				</VStack>
			</ContentSection>
			<SectionCard label={form.targets.label}>
				<ChipGroup items={targetItems} selectedIds={form.targets.value} />
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
		throw new Error(`billing-set-auto-prepay spec missing data.${key}`);
	}
	return v as unknown as T;
}
