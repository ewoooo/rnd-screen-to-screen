"use client";

import {
  ConsentList,
  type ConsentListItem,
  InfoList,
  type InfoListItem,
  NoticeBlock,
  PrimaryCTABar,
  SectionCard,
} from "@pxds/pxds-components/molecules";
import { FlowHero, ProgressTopBar } from "@pxds/pxds-components/shared/global";
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
type CurrentData = {
  title: string;
  items: readonly {
    id: string;
    label: string;
    value: string;
  }[];
};
type ImpactData = {
  tone: "info" | "warning" | "critical" | "success";
  title: string;
  text: string;
};
type ConsentData = {
  title: string;
  items: readonly {
    id: string;
    title: string;
    required: boolean;
    defaultChecked?: boolean;
  }[];
};
type ContinueData = {
  eyebrow: string;
  primaryAction: string;
  primaryTone?: string;
};
export function BillingSetMethodCancelScreen({
  spec,
}: {
  spec: RenderableScreenSpecV1;
}) {
  const top = readData<TopData>(spec, "top");
  const hero = readData<HeroData>(spec, "hero");
  const current = readData<CurrentData>(spec, "current");
  const impact = readData<ImpactData>(spec, "impact");
  const consent = readData<ConsentData>(spec, "consent");
  const cont = readData<ContinueData>(spec, "continue");
  const currentItems: InfoListItem[] = current.items.map((it) => ({
    id: it.id,
    title: it.label,
    sub: "",
    trailingLabel: it.value,
  }));
  const consentItems: ConsentListItem[] = consent.items.map((it) => ({
    id: it.id,
    title: it.title,
    caption: it.required ? "필수 확인 항목" : "선택 확인 항목",
    required: it.required,
    defaultChecked: it.defaultChecked,
  }));
  const ctaTone =
    cont.primaryTone === "destructive" ? "destructive" : "default";
  return (
    <AppScreen>
      <AppScreen.SystemHeader />
      <AppScreen.Header>
        <ProgressTopBar title={top.title} leading={top.leading} />
      </AppScreen.Header>
      <AppScreen.Content>
        <FlowHero {...hero} />
        <SectionCard label={current.title}>
          <InfoList items={currentItems} />
        </SectionCard>
        <NoticeBlock
          tone={impact.tone}
          badge={impact.title}
          text={impact.text}
        />
        <SectionCard label={consent.title}>
          <ConsentList
            allLabel="모든 영향 확인"
            allCaption="아래 항목을 모두 동의합니다"
            items={consentItems}
          />
        </SectionCard>
      </AppScreen.Content>
      <AppScreen.Bottom>
        <PrimaryCTABar primaryLabel={cont.primaryAction} tone={ctaTone} />
      </AppScreen.Bottom>
    </AppScreen>
  );
}
function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
  const v = spec.data[key];
  if (!v || typeof v !== "object" || Array.isArray(v)) {
    throw new Error(`billing-set-method-cancel spec missing data.${key}`);
  }
  return v as unknown as T;
}
