"use client";

import {
	IconLock,
	IconMessage,
	IconMobile,
} from "@wanteddev/wds-icon";
import { useState, type ReactNode } from "react";

import { SelectableList } from "@/components/molecules";
import {
	NcContinueBar,
	NcHero,
	NcNotice,
	NcTopBar,
} from "@/components/organisms/nc";
import { AppScreen, ContentSection } from "@/components/templates/app-screen";

import type { RenderableScreenSpecV1 } from "@screen/screens";

type IconKind = "smartphone" | "shield-check" | "certificate";
const ICON_MAP: Record<IconKind, ReactNode> = {
	smartphone: <IconMobile width={28} height={28} />,
	"shield-check": <IconLock width={28} height={28} />,
	certificate: <IconMessage width={28} height={28} />,
};

type FlowData = { step: number; total: number; progress: string };
type HeroData = { titleLines: readonly string[]; description: string };
type MethodItem = {
	id: string;
	title: string;
	leadingIcon?: IconKind;
	trailingChip?: string | null;
};
type MethodsData = { items: readonly MethodItem[] };
type NoticeData = {
	badge: string;
	text: string;
	action?: string | null;
	tone?: "info" | "warning" | "critical";
};
type ContinueData = { eyebrow: string; primaryAction: string };

export function NcFullDormancyAuthScreen({
	spec,
}: {
	spec: RenderableScreenSpecV1;
}) {
	const flow = readData<FlowData>(spec, "flow");
	const hero = readData<HeroData>(spec, "hero");
	const methods = readData<MethodsData>(spec, "methods");
	const policyNotice = readData<NoticeData>(spec, "policyNotice");
	const continueData = readData<ContinueData>(spec, "continue");

	const [value, setValue] = useState<string | undefined>(undefined);
	const blocked = !value;
	const dynamicEyebrow = blocked
		? "인증 수단을 선택해 주세요"
		: continueData.eyebrow;
	const percent = Math.min(100, Math.max(0, (flow.step / flow.total) * 100));

	const items = methods.items.map((item) => ({
		id: item.id,
		title: item.title,
		trailingLabel: item.trailingChip ?? undefined,
		leading: item.leadingIcon ? ICON_MAP[item.leadingIcon] : undefined,
	}));

	return (
		<AppScreen
			top={
				<NcTopBar
					title="휴면 해제"
					leading="back"
					progress={{ label: flow.progress, percent }}
				/>
			}
			bottom={
				<NcContinueBar
					eyebrow={dynamicEyebrow}
					primaryAction={continueData.primaryAction}
					disabled={blocked}
					state={blocked ? "blocked" : "ready"}
				/>
			}
		>
			<NcHero {...hero} />
			<ContentSection inset="bleed">
				<SelectableList
					name="dormancy-auth-method"
					items={items}
					value={value}
					onChange={setValue}
					density="comfortable"
				/>
			</ContentSection>
			<NcNotice
				badge={policyNotice.badge}
				text={policyNotice.text}
				action={policyNotice.action ?? ""}
				tone={policyNotice.tone ?? "info"}
			/>
		</AppScreen>
	);
}

function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
	const value = spec.data[key];
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		throw new Error(`nc-full-dormancy-auth spec missing data.${key}`);
	}
	return value as T;
}
