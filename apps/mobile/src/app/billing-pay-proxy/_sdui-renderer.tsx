"use client";

import {
  InfoList,
  type InfoListItem,
  NoticeBlock,
  SectionCard,
  StickyActionBar,
} from "@pxds/pxds-components/shared";
import { FlowHero, ProgressTopBar } from "@pxds/pxds-components/shared/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";
import type { RenderableScreenSpecV1 } from "@/screens";
type FlowData = {
  progress: string;
  step: number;
  total: number;
};
type HeroData = {
  titleLines: readonly string[];
  description: string;
};
type NoticeTone = "info" | "warning" | "critical" | "success";
type NoticeData = {
  tone: NoticeTone;
  title: string;
  body: string;
};
type InfoData = {
  label: string;
  items: readonly {
    id: string;
    label: string;
    value: string;
  }[];
};
type ContinueData = {
  eyebrow: string;
  primaryAction: string;
};
export function BillingPayProxyScreen({
  spec,
}: {
  spec: RenderableScreenSpecV1;
}) {
  const flow = readData<FlowData>(spec, "flow");
  const hero = readData<HeroData>(spec, "hero");
  const notice = readData<NoticeData>(spec, "notice");
  const info = readData<InfoData>(spec, "info");
  const cont = readData<ContinueData>(spec, "continue");
  const items = info.items.map<InfoListItem>((it) => ({
    id: it.id,
    title: it.label,
    sub: "",
    trailingLabel: it.value,
  }));
  return (
    <AppScreen>
      <AppScreen.SystemHeader />
      <AppScreen.Header>
        <ProgressTopBar
          title="대리 납부 권한"
          leading="close"
          progress={{
            label: flow.progress,
            percent: (flow.step / flow.total) * 100,
          }}
        />
      </AppScreen.Header>
      <AppScreen.Content>
        <FlowHero {...hero} />
        <NoticeBlock
          tone={notice.tone}
          badge={notice.title}
          text={notice.body}
        />
        <SectionCard label={info.label}>
          <InfoList items={items} />
        </SectionCard>
      </AppScreen.Content>
      <AppScreen.Bottom>
        <StickyActionBar
          eyebrow={cont.eyebrow}
          title={cont.primaryAction}
          secondaryAction=""
          primaryAction={cont.primaryAction}
        />
      </AppScreen.Bottom>
    </AppScreen>
  );
}
function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
  const value = spec.data[key];
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`billing-pay-proxy spec missing data.${key}`);
  }
  return value as unknown as T;
}
