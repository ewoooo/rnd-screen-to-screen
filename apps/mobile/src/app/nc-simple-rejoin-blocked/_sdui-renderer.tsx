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
type TopbarData = {
  title: string;
};
type HeroData = {
  titleLines: readonly string[];
  description: string;
};
type SummaryItem = {
  id: string;
  title: string;
  trailingLabel: string;
};
type SummaryData = {
  label?: string;
  items: readonly SummaryItem[];
};
type NoticeData = {
  badge: string;
  text: string;
  action?: string | null;
  tone?: "info" | "warning" | "critical";
};
type ActionsData = {
  primaryLabel: string;
  secondaryLabel?: string;
};
export function NcSimpleRejoinBlockedScreen({
  spec,
}: {
  spec: RenderableScreenSpecV1;
}) {
  const topbar = readData<TopbarData>(spec, "topbar");
  const hero = readData<HeroData>(spec, "hero");
  const summary = readData<SummaryData>(spec, "summary");
  const notice = readData<NoticeData>(spec, "notice");
  const actions = readData<ActionsData>(spec, "actions");
  const items = summary.items.map((item) => ({
    id: item.id,
    title: item.title,
    sub: "",
    trailingLabel: item.trailingLabel,
  }));
  return (
    <AppScreen>
      <AppScreen.SystemHeader />
      <AppScreen.Header>
        <ProgressTopBar title={topbar.title} leading="close" />
      </AppScreen.Header>
      <AppScreen.Content>
        <FlowHero {...hero} />
        <FlowSummaryCard label={summary.label ?? ""} title="" items={items} />
        <FlowNotice
          badge={notice.badge}
          text={notice.text}
          action={notice.action ?? ""}
          tone={notice.tone ?? "info"}
        />
      </AppScreen.Content>
      <AppScreen.Bottom>
        <FlowResultActions
          primaryLabel={actions.primaryLabel}
          secondaryLabel={actions.secondaryLabel}
        />
      </AppScreen.Bottom>
    </AppScreen>
  );
}
function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
  const value = spec.data[key];
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`nc-simple-rejoin-blocked spec missing data.${key}`);
  }
  return value as T;
}
