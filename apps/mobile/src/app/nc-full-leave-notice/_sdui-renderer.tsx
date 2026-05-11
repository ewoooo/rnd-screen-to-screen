"use client";

import {
  FlowContinueBar,
  FlowHero,
  FlowNotice,
  FlowSummaryCard,
  ProgressTopBar,
} from "@/components/organisms/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";
import type { RenderableScreenSpecV1 } from "@/screens";
type FlowData = {
  step: number;
  total: number;
  progress: string;
};
type HeroData = {
  titleLines: readonly string[];
  description: string;
};
type ImpactItem = {
  id: string;
  label: string;
  value: string;
};
type ImpactData = {
  title: string;
  items: readonly ImpactItem[];
};
type NoticeData = {
  badge: string;
  text: string;
  action?: string | null;
  tone?: "info" | "warning" | "critical";
};
type ContinueData = {
  eyebrow: string;
  primaryAction: string;
};
export function NcFullLeaveNoticeScreen({
  spec,
}: {
  spec: RenderableScreenSpecV1;
}) {
  const flow = readData<FlowData>(spec, "flow");
  const hero = readData<HeroData>(spec, "hero");
  const impact = readData<ImpactData>(spec, "impact");
  const cautions = readData<NoticeData>(spec, "cautions");
  const continueData = readData<ContinueData>(spec, "continue");
  const items = impact.items.map((item) => ({
    id: item.id,
    title: item.label,
    sub: "",
    trailingLabel: item.value,
  }));
  const percent = Math.min(100, Math.max(0, (flow.step / flow.total) * 100));
  return (
    <AppScreen>
      <AppScreen.SystemHeader />
      <AppScreen.Header>
        <ProgressTopBar
          title="회원 탈퇴"
          leading="back"
          progress={{
            label: flow.progress,
            percent,
          }}
        />
      </AppScreen.Header>
      <AppScreen.Content>
        <FlowHero {...hero} />
        <FlowSummaryCard label="" title={impact.title} items={items} />
        <FlowNotice
          badge={cautions.badge}
          text={cautions.text}
          action={cautions.action ?? ""}
          tone={cautions.tone ?? "warning"}
        />
      </AppScreen.Content>
      <AppScreen.Bottom>
        <FlowContinueBar
          eyebrow={continueData.eyebrow}
          primaryAction={continueData.primaryAction}
        />
      </AppScreen.Bottom>
    </AppScreen>
  );
}
function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
  const value = spec.data[key];
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`nc-full-leave-notice spec missing data.${key}`);
  }
  return value as T;
}
