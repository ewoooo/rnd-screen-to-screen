"use client";

import {
  ConsentList,
  type ConsentListItem,
  InfoList,
  type InfoListItem,
  NoticeBlock,
  SectionCard,
  StickyActionBar,
} from "@/components/molecules";
import { FlowHero, ProgressTopBar } from "@/components/organisms/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";
import type { RenderableScreenSpecV1 } from "@screen/specs";
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
type ConsentItemSpec = {
  id: string;
  title: string;
  required: boolean;
  defaultChecked?: boolean;
};
type ConsentsData = {
  selectionMode: "single" | "multi";
  items: readonly ConsentItemSpec[];
};
type ContinueData = {
  eyebrow: string;
  primaryAction: string;
};
export function BillingPayThirdPartyConsentScreen({
  spec,
}: {
  spec: RenderableScreenSpecV1;
}) {
  const flow = readData<FlowData>(spec, "flow");
  const hero = readData<HeroData>(spec, "hero");
  const notice = readData<NoticeData>(spec, "notice");
  const info = readData<InfoData>(spec, "info");
  const consents = readData<ConsentsData>(spec, "consents");
  const cont = readData<ContinueData>(spec, "continue");
  const infoItems = info.items.map<InfoListItem>((it) => ({
    id: it.id,
    title: it.label,
    sub: "",
    trailingLabel: it.value,
  }));
  const consentItems = consents.items.map<ConsentListItem>((it) => ({
    id: it.id,
    title: it.title,
    caption: "명의자 동의",
    required: it.required,
    defaultChecked: it.defaultChecked,
  }));
  return (
    <AppScreen>
      <AppScreen.SystemHeader />
      <AppScreen.Header>
        <ProgressTopBar
          title="명의자 동의"
          leading="back"
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
          <InfoList items={infoItems} />
        </SectionCard>
        <SectionCard label="동의 항목">
          <ConsentList
            allLabel="모든 항목 동의"
            allCaption="아래 항목 모두에 동의해요"
            items={consentItems}
          />
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
    throw new Error(`billing-pay-third-party-consent spec missing data.${key}`);
  }
  return value as unknown as T;
}
