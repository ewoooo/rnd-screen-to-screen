"use client";

import { VStack } from "@/components/atoms/layout";
import {
	FormField,
	InfoList,
	type InfoListItem,
	NoticeBlock,
	SectionCard,
	SelectableList,
	type SelectableItem,
	StickyActionBar,
	TextField,
} from "@/components/molecules";
import { FlowHero, ProgressTopBar } from "@/components/organisms/global";
import {
	AppScreen,
	ContentRail,
	ContentSection,
} from "@/components/templates/app-screen";

import type { RenderableScreenSpecV1 } from "@screen/screens";

type TopData = { title: string; leading: "back" | "close" };
type HeroData = { titleLines: readonly string[]; description: string };
type CurrentData = {
	title: string;
	items: readonly { id: string; label: string; value: string }[];
};
type SelectableField = {
	id: string;
	label: string;
	required?: boolean;
	control: "selectable";
	selectionMode: "single" | "multi";
	value: string;
	options: readonly { id: string; title: string }[];
};
type SelectField = {
	id: string;
	label: string;
	required?: boolean;
	control: "select";
	placeholder?: string;
	helperText?: string;
};
type TextFieldData = {
	id: string;
	label: string;
	required?: boolean;
	control: "text";
	placeholder?: string;
	helperText?: string;
};
type FormData = {
	methodType: SelectableField;
	methodId: SelectField;
	dueDay: TextFieldData;
};
type EffectiveData = { tone: "info" | "warning" | "critical" | "success"; text: string };
type ContinueData = { eyebrow: string; primaryAction: string };

export function BillingSetMethodScreen({
	spec,
}: {
	spec: RenderableScreenSpecV1;
}) {
	const top = readData<TopData>(spec, "top");
	const hero = readData<HeroData>(spec, "hero");
	const current = readData<CurrentData>(spec, "current");
	const form = readData<FormData>(spec, "form");
	const effective = readData<EffectiveData>(spec, "effective");
	const cont = readData<ContinueData>(spec, "continue");

	const currentItems: InfoListItem[] = current.items.map((it) => ({
		id: it.id,
		title: it.label,
		sub: "",
		trailingLabel: it.value,
	}));
	const methodTypeItems: SelectableItem[] = form.methodType.options.map((o) => ({
		id: o.id,
		title: o.title,
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
			<SectionCard label={current.title}>
				<InfoList items={currentItems} />
			</SectionCard>
			<SectionCard label={form.methodType.label}>
				<SelectableList
					name={form.methodType.id}
					items={methodTypeItems}
					value={form.methodType.value}
				/>
			</SectionCard>
			<ContentSection>
				<ContentRail rail="measure" measure="body">
					<VStack gap="block">
						{/* strain: WDS Select 컴포넌트는 1차에서 placeholder TextField로 대체 */}
						<FormField
							label={form.methodId.label}
							required={form.methodId.required}
							helperText={form.methodId.helperText}
						>
							<TextField
								value=""
								placeholder={form.methodId.placeholder}
								disabled
							/>
						</FormField>
						<FormField
							label={form.dueDay.label}
							required={form.dueDay.required}
							helperText={form.dueDay.helperText}
						>
							<TextField
								value=""
								placeholder={form.dueDay.placeholder}
								disabled
							/>
						</FormField>
					</VStack>
				</ContentRail>
			</ContentSection>
			<NoticeBlock tone={effective.tone} badge="적용 시점" text={effective.text} />
		</AppScreen>
	);
}


function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
	const v = spec.data[key];
	if (!v || typeof v !== "object" || Array.isArray(v)) {
		throw new Error(`billing-set-method spec missing data.${key}`);
	}
	return v as unknown as T;
}
