import { activeRenderableScreenSpecs } from "@screen/screens";
import {
	IconCalendarPerson,
	IconCheckThick,
	IconCircleBlock,
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
	"leave-at": <IconCheckThick width={24} height={24} />,
	grace: <IconCalendarPerson width={24} height={24} />,
	purge: <IconCircleBlock width={24} height={24} />,
};

export default function MembershipLeaveCompletePage() {
	const spec = activeRenderableScreenSpecs["membership-leave-complete"];
	const data = spec.data as {
		topbar: { title: string; progressLabel: string; progressPercent: number };
		hero: { titleLines: readonly string[]; description: string };
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
		actions: { primaryLabel: string; secondaryLabel: string };
	};

	const summaryItems = data.summary.items.map((item) => ({
		...item,
		mediaIcon: SUMMARY_MEDIA_ICON[item.id],
	}));

	return (
		<AppScreen
			top={
				<MembershipTopBar
					title={data.topbar.title}
					leading="close"
					progress={{
						label: data.topbar.progressLabel,
						percent: data.topbar.progressPercent,
					}}
				/>
			}
			bottom={
				<MembershipResultActions
					primaryLabel={data.actions.primaryLabel}
					secondaryLabel={data.actions.secondaryLabel}
				/>
			}
		>
			<MembershipHero {...data.hero} />
			<MembershipSummaryCard
				label={data.summary.label}
				title={data.summary.title}
				items={summaryItems}
			/>
			<MembershipNotice {...data.notice} />
		</AppScreen>
	);
}
