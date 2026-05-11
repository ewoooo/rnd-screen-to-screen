"use client";

import {
  FlowHero,
  FlowNotice,
  FlowResultActions,
  FlowSummaryCard,
  ProgressTopBar,
} from "@pxds/pxds-components/shared/global";
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
export function NcFullRejoinCompleteScreen({
  spec,
}: {
  spec: RenderableScreenSpecV1;
}) {
  const hero = readData<HeroData>(spec, "hero");
  const summary = readData<SummaryData>(spec, "summary");
  const benefitNotice = readData<NoticeData>(spec, "benefitNotice");
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
        <ProgressTopBar title="재가입" leading="close" />
      </AppScreen.Header>
      <AppScreen.Content>
        <FlowHero {...hero} />
        <FlowSummaryCard label="" title={summary.title} items={items} />
        <FlowNotice
          badge={benefitNotice.badge}
          text={benefitNotice.text}
          action={benefitNotice.action ?? ""}
          tone={benefitNotice.tone ?? "info"}
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
    throw new Error(`nc-full-rejoin-complete spec missing data.${key}`);
  }
  return value as T;
}
