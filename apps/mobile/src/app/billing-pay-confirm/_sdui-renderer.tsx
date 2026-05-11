"use client";

import {
  InfoList,
  type InfoListItem,
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
type SummaryData = {
  title: string;
  line: string;
  period: string;
  amount: string;
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
export function BillingPayConfirmScreen({
  spec,
}: {
  spec: RenderableScreenSpecV1;
}) {
  const flow = readData<FlowData>(spec, "flow");
  const hero = readData<HeroData>(spec, "hero");
  const summary = readData<SummaryData>(spec, "summary");
  const info = readData<InfoData>(spec, "info");
  const cont = readData<ContinueData>(spec, "continue");
  const summaryItems: InfoListItem[] = [
    {
      id: "line",
      title: "회선",
      sub: "",
      trailingLabel: summary.line,
    },
    {
      id: "period",
      title: "청구월",
      sub: "",
      trailingLabel: summary.period,
    },
    {
      id: "amount",
      title: "납부 금액",
      sub: "",
      trailingLabel: summary.amount,
    },
  ];
  const infoItems = info.items.map<InfoListItem>((it) => ({
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
          title="즉시 납부 확인"
          leading="back"
          progress={{
            label: flow.progress,
            percent: (flow.step / flow.total) * 100,
          }}
        />
      </AppScreen.Header>
      <AppScreen.Content>
        <FlowHero {...hero} />
        <SectionCard label={summary.title} title="">
          <InfoList items={summaryItems} />
        </SectionCard>
        <SectionCard label={info.label} title="">
          <InfoList items={infoItems} />
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
    throw new Error(`billing-pay-confirm spec missing data.${key}`);
  }
  return value as unknown as T;
}
