"use client";

import { VStack } from "@/components/atoms/layout";
import {
	FormField,
	InfoList,
	type InfoListItem,
	SectionCard,
	StickyActionBar,
	TextField,
} from "@/components/molecules";
import { FlowHero, ProgressTopBar } from "@/components/organisms/global";
import { AppScreen } from "@/components/templates/app-screen";

import type { RenderableScreenSpecV1 } from "@screen/screens";

type FlowData = { progress: string; step: number; total: number };
type HeroData = { titleLines: readonly string[]; description: string };
type FormFieldSpec = {
	id: string;
	label: string;
	control: "select" | "text";
	required?: boolean;
	options?: readonly string[];
	placeholder?: string;
	rule?: string;
};
type FormData = { fields: readonly FormFieldSpec[] };
type TargetItem = { id: string; title: string; sub: string };
type TargetsData = {
	label: string;
	selectionMode: "single" | "multi";
	items: readonly TargetItem[];
};
type ContinueData = { eyebrow: string; primaryAction: string };

export function BillingPayScheduleScreen({
	spec,
}: {
	spec: RenderableScreenSpecV1;
}) {
	const flow = readData<FlowData>(spec, "flow");
	const hero = readData<HeroData>(spec, "hero");
	const form = readData<FormData>(spec, "form");
	const targets = readData<TargetsData>(spec, "targets");
	const cont = readData<ContinueData>(spec, "continue");

	const targetItems = targets.items.map<InfoListItem>((it) => ({
		id: it.id,
		title: it.title,
		sub: it.sub,
	}));

	return (
		<AppScreen
			top={
				<ProgressTopBar
					title="예약 납부"
					leading="back"
					progress={{
						label: flow.progress,
						percent: (flow.step / flow.total) * 100,
					}}
				/>
			}
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
			<SectionCard label="예약 정보">
				<VStack gap="block">
					{form.fields.map((field) => (
						<FormField
							key={field.id}
							label={field.label}
							required={field.required}
							helperText={field.rule}
						>
							{field.control === "select" ? (
								<TextField
									value={field.options?.[0] ?? ""}
									readOnly
									placeholder={field.placeholder}
								/>
							) : (
								<TextField
									value=""
									placeholder={field.placeholder}
									inputMode="numeric"
								/>
							)}
						</FormField>
					))}
				</VStack>
			</SectionCard>
			<SectionCard label={targets.label}>
				<InfoList items={targetItems} />
			</SectionCard>
		</AppScreen>
	);
}


function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
	const value = spec.data[key];
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		throw new Error(`billing-pay-schedule spec missing data.${key}`);
	}
	return value as unknown as T;
}
