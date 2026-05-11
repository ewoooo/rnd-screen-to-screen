"use client";

import {
  FlowHero,
  FlowNotice,
  FlowResultActions,
  FlowSummaryCard,
  ProgressTopBar,
} from "@/components/organisms/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";
import type { RenderableScreenSpecV1 } from "@/screens";
type HeroData = {
  titleLines: readonly string[];
  description: string;
};
type SummaryItem = {
  id: string;
  label: string;
  value: string;
};
type SummaryData = {
  title: string;
  items: readonly SummaryItem[];
};
type NoticeData = {
  badge: string;
  text: string;
  action?: string | null;
  tone?: "info" | "warning" | "critical";
};
type ActionsData = {
  primary: {
    id: string;
    label: string;
  };
  secondary?: {
    id: string;
    label: string;
  };
};
export function NcFullLeaveResultScreen({
  spec,
}: {
  spec: RenderableScreenSpecV1;
}) {
  const hero = readData<HeroData>(spec, "hero");
  const summary = readData<SummaryData>(spec, "summary");
  const withdrawNotice = readData<NoticeData>(spec, "withdrawNotice");
  const actions = readData<ActionsData>(spec, "actions");
  const items = summary.items.map((item) => ({
    id: item.id,
    title: item.label,
    sub: "",
    trailingLabel: item.value,
  }));
  return (
    <AppScreen>
      <AppScreen.SystemHeader />
      <AppScreen.Header>
        <ProgressTopBar title="회원 탈퇴" leading="close" />
      </AppScreen.Header>
      <AppScreen.Content>
        <FlowHero {...hero} />
        <FlowSummaryCard label="" title={summary.title} items={items} />
        <FlowNotice
          badge={withdrawNotice.badge}
          text={withdrawNotice.text}
          action={withdrawNotice.action ?? ""}
          tone={withdrawNotice.tone ?? "info"}
        />
      </AppScreen.Content>
      <AppScreen.Bottom>
        <FlowResultActions
          primaryLabel={actions.primary.label}
          secondaryLabel={actions.secondary?.label}
        />
      </AppScreen.Bottom>
    </AppScreen>
  );
}
function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
  const value = spec.data[key];
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`nc-full-leave-result spec missing data.${key}`);
  }
  return value as T;
}
