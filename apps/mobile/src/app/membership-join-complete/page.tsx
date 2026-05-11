import { activeRenderableScreenSpecs } from "@/screens";
import { IconBell, IconCalendar, IconPerson } from "@pxds/pxds-icons";
import type { ReactNode } from "react";
import {
  FlowHero,
  FlowNotice,
  FlowResultActions,
  FlowSummaryCard,
  ProgressTopBar,
  type FlowSummaryItem,
} from "@pxds/pxds-components/shared/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";
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
      items: readonly Omit<FlowSummaryItem, "mediaIcon">[];
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
    <AppScreen>
      <AppScreen.SystemHeader />
      <AppScreen.Header>
        <ProgressTopBar
          title="가입 완료"
          progress={
            progress
              ? {
                  label: data.hero.eyebrow,
                  percent: progress.percent,
                }
              : undefined
          }
        />
      </AppScreen.Header>
      <AppScreen.Content>
        <FlowHero
          titleLines={data.hero.titleLines}
          description={data.hero.description}
        />
        <FlowSummaryCard
          label={data.summary.label}
          title={data.summary.title}
          items={summaryItems}
        />
        <FlowNotice {...data.notice} />
      </AppScreen.Content>
      <AppScreen.Bottom>
        <FlowResultActions
          primaryLabel={data.actions.primaryLabel}
          secondaryLabel={data.actions.secondaryLabel}
        />
      </AppScreen.Bottom>
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
