"use client";

import { FilterTabs } from "@pxds/pxds-components/patterns";
import {
  InfoList,
  type InfoListItem,
  SectionCard,
  StickyActionBar,
} from "@/components/molecules";
import { FlowHero, ProgressTopBar } from "@/components/organisms/global";
import { AppScreen, ContentSection } from "@pxds/pxds-layout/app-screen";
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
type TabsData = {
  selected: string;
  items: readonly {
    id: string;
    label: string;
  }[];
};
type PrepayItem = {
  id: string;
  title: string;
  sub: string;
  trailingLabel: string;
};
type ItemsData = {
  label: string;
  selectionMode: "single" | "multi";
  items: readonly PrepayItem[];
};
type ContinueData = {
  eyebrow: string;
  primaryAction: string;
};
export function BillingPayPrepayScreen({
  spec,
}: {
  spec: RenderableScreenSpecV1;
}) {
  const flow = readData<FlowData>(spec, "flow");
  const hero = readData<HeroData>(spec, "hero");
  const tabs = readData<TabsData>(spec, "tabs");
  const items = readData<ItemsData>(spec, "items");
  const cont = readData<ContinueData>(spec, "continue");
  const listItems = items.items.map<InfoListItem>((it) => ({
    id: it.id,
    title: it.title,
    sub: it.sub,
    trailingLabel: it.trailingLabel,
    trailingKind: "value",
  }));
  return (
    <AppScreen>
      <AppScreen.SystemHeader />
      <AppScreen.Header>
        <ProgressTopBar
          title="선결제"
          leading="back"
          progress={{
            label: flow.progress,
            percent: (flow.step / flow.total) * 100,
          }}
        />
      </AppScreen.Header>
      <AppScreen.Content>
        <FlowHero {...hero} />
        <ContentSection>
          <FilterTabs tabs={tabs.items} activeId={tabs.selected} />
        </ContentSection>
        <SectionCard label={items.label}>
          <InfoList items={listItems} />
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
    throw new Error(`billing-pay-prepay spec missing data.${key}`);
  }
  return value as unknown as T;
}
