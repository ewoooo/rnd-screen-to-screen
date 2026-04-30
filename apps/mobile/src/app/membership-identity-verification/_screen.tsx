"use client";

import {
	IconChat,
	IconLock,
	IconMessage,
	IconMobile,
} from "@wanteddev/wds-icon";
import { useState, type ReactNode } from "react";

import { SelectableList } from "@/components/molecules";
import {
	MembershipContinueBar,
	MembershipHero,
	MembershipNotice,
	MembershipTopBar,
} from "@/components/organisms/membership";
import { AppScreen, ContentSection } from "@/components/templates/app-screen";

import type { RenderableScreenSpecV1 } from "@screen/screens";

type MethodIcon = "chat" | "mobile" | "message" | "lock";

const METHOD_ICON: Record<MethodIcon, ReactNode> = {
	chat: <IconChat width={28} height={28} />,
	mobile: <IconMobile width={28} height={28} />,
	message: <IconMessage width={28} height={28} />,
	lock: <IconLock width={28} height={28} />,
};

type IdentityData = {
	topbar: { title: string; progressLabel: string; progressPercent: number };
	hero: { titleLines: readonly string[]; description: string };
	methods: {
		items: readonly {
			id: string;
			title: string;
			sub?: string;
			trailingLabel?: string;
			leadingIcon?: MethodIcon;
		}[];
	};
	notice: {
		badge: string;
		text: string;
		action: string;
		tone: "info" | "warning" | "critical";
	};
	continue: { eyebrow: string; primaryAction: string };
};

export function MembershipIdentityVerificationScreen({
	spec,
}: {
	spec: RenderableScreenSpecV1;
}) {
	const data = spec.data as unknown as IdentityData;
	const { topbar, hero, methods, notice, continue: continueData } = data;

	const [value, setValue] = useState<string | undefined>(undefined);
	const blocked = !value;
	const dynamicEyebrow = blocked
		? "인증 수단을 선택해주세요"
		: continueData.eyebrow;

	const items = methods.items.map((item) => ({
		...item,
		leading: item.leadingIcon ? METHOD_ICON[item.leadingIcon] : undefined,
	}));

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
			<ContentSection>
				<SelectableList
					name="identity-method"
					items={items}
					value={value}
					onChange={setValue}
					density="comfortable"
				/>
			</ContentSection>
			<MembershipNotice {...notice} />
		</AppScreen>
	);
}
