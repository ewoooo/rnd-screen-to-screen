import { activeRenderableScreenSpecs } from "@screen/screens";
import {
	IconBell,
	IconCalendar,
	IconPerson,
} from "@wanteddev/wds-icon";
import type { ReactNode } from "react";

import {
	MembershipHero,
	MembershipNotice,
	MembershipResultActions,
	MembershipSummaryCard,
	MembershipTopBar,
	type MembershipSummaryItem,
} from "@/components/organisms/membership";
import { AppScreen } from "@/components/templates/app-screen";

const SUMMARY_MEDIA_ICON: Record<string, ReactNode> = {
	id: <IconPerson width={24} height={24} />,
	"joined-at": <IconCalendar width={24} height={24} />,
	session: <IconBell width={24} height={24} />,
};

export default function MembershipJoinCompletePage() {
	const spec = activeRenderableScreenSpecs["membership-join-complete"];
	const data = spec.data as {
		hero: {
			eyebrow: string;
			titleLines: readonly string[];
			description: string;
		};
		summary: {
			label: string;
			title: string;
			items: readonly Omit<MembershipSummaryItem, "mediaIcon">[];
		};
		notice: {
			badge: string;
			text: string;
			action: string;
			tone: "info" | "warning" | "critical";
		};
		actions: {
			primaryLabel: string;
			secondaryLabel: string;
		};
	};

	const summaryItems = data.summary.items.map((item) => ({
		...item,
		mediaIcon: SUMMARY_MEDIA_ICON[item.id],
	}));

	const progress = parseStepProgress(data.hero.eyebrow);

	return (
		<AppScreen
			top={
				<MembershipTopBar
					title="가입 완료"
					progress={
						progress
							? { label: data.hero.eyebrow, percent: progress.percent }
							: undefined
					}
				/>
			}
			bottom={
				<MembershipResultActions
					primaryLabel={data.actions.primaryLabel}
					secondaryLabel={data.actions.secondaryLabel}
				/>
			}
		>
			<MembershipHero
				titleLines={data.hero.titleLines}
				description={data.hero.description}
			/>
			<MembershipSummaryCard
				label={data.summary.label}
				title={data.summary.title}
				items={summaryItems}
			/>
			<MembershipNotice {...data.notice} />
		</AppScreen>
	);
}

function parseStepProgress(label: string) {
	const match = label.match(/(\d+)\s*\/\s*(\d+)/);
	if (!match) return null;

	const current = Number(match[1]);
	const total = Number(match[2]);
	if (!Number.isFinite(current) || !Number.isFinite(total) || total <= 0) {
		return null;
	}

	return {
		current,
		total,
		percent: Math.min(100, Math.max(0, (current / total) * 100)),
	};
}
