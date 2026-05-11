"use client";

import {
  InfoList,
  type InfoListItem,
  NoticeBlock,
  PrimaryCTABar,
  SectionCard,
} from "@/components/molecules";
import { FlowHero, ProgressTopBar } from "@/components/organisms/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";
import type { RenderableScreenSpecV1 } from "@/screens";
type TopData = {
  title: string;
  leading: "back" | "close";
};
type HeroData = {
  titleLines: readonly string[];
  description: string;
};
type SummaryData = {
  title: string;
  items: readonly {
    id: string;
    label: string;
    value: string;
  }[];
};
type AlternateData = {
  tone: "info" | "warning" | "critical" | "success";
  title: string;
  text: string;
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
export function BillingSetMethodCancelResultScreen({
  spec,
}: {
  spec: RenderableScreenSpecV1;
}) {
  const top = readData<TopData>(spec, "top");
  const hero = readData<HeroData>(spec, "hero");
  const summary = readData<SummaryData>(spec, "summary");
  const alternate = readData<AlternateData>(spec, "alternate");
  const actions = readData<ActionsData>(spec, "actions");
  const summaryItems: InfoListItem[] = summary.items.map((it) => ({
    id: it.id,
    title: it.label,
    sub: "",
    trailingLabel: it.value,
  }));
  return (
    <AppScreen>
      <AppScreen.SystemHeader />
      <AppScreen.Header>
        <ProgressTopBar title={top.title} leading="close" />
      </AppScreen.Header>
      <AppScreen.Content>
        <FlowHero {...hero} />
        <SectionCard label={summary.title}>
          <InfoList items={summaryItems} />
        </SectionCard>
        <NoticeBlock
          tone={alternate.tone}
          badge={alternate.title}
          text={alternate.text}
        />
      </AppScreen.Content>
      <AppScreen.Bottom>
        <PrimaryCTABar
          primaryLabel={actions.primary.label}
          secondaryLabel={actions.secondary?.label}
        />
      </AppScreen.Bottom>
    </AppScreen>
  );
}
function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
  const v = spec.data[key];
  if (!v || typeof v !== "object" || Array.isArray(v)) {
    throw new Error(
      `billing-set-method-cancel-result spec missing data.${key}`,
    );
  }
  return v as unknown as T;
}
