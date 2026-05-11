"use client";

import { useState } from "react";
import {
  FlowContinueBar,
  FlowHero,
  FlowNotice,
  ProgressTopBar,
  TermsAgreementGroup,
  type TermsAgreementItem,
} from "@pxds/pxds-components/shared/global";
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
type TermsData = {
  title: string;
  allLabel: string;
  items: readonly TermsAgreementItem[];
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
export function NcFullDormancyTermsScreen({
  spec,
}: {
  spec: RenderableScreenSpecV1;
}) {
  const flow = readData<FlowData>(spec, "flow");
  const hero = readData<HeroData>(spec, "hero");
  const terms = readData<TermsData>(spec, "terms");
  const changeNotice = readData<NoticeData>(spec, "changeNotice");
  const continueData = readData<ContinueData>(spec, "continue");
  const initialMissing = terms.items.filter(
    (item) => item.required && !item.defaultChecked,
  ).length;
  const [missing, setMissing] = useState(initialMissing);
  const blocked = missing > 0;
  const dynamicEyebrow = blocked
    ? `필수 약관 ${missing}개 동의가 남았어요`
    : continueData.eyebrow;
  const percent = Math.min(100, Math.max(0, (flow.step / flow.total) * 100));
  return (
    <AppScreen>
      <AppScreen.SystemHeader />
      <AppScreen.Header>
        <ProgressTopBar
          title="휴면 해제"
          leading="back"
          progress={{
            label: flow.progress,
            percent,
          }}
        />
      </AppScreen.Header>
      <AppScreen.Content>
        <FlowHero {...hero} />
        <TermsAgreementGroup
          title={terms.title}
          allLabel={terms.allLabel}
          allCaption=""
          items={terms.items}
          onStateChange={(s) => setMissing(s.missingRequiredCount)}
        />
        <FlowNotice
          badge={changeNotice.badge}
          text={changeNotice.text}
          action={changeNotice.action ?? ""}
          tone={changeNotice.tone ?? "info"}
        />
      </AppScreen.Content>
      <AppScreen.Bottom>
        <FlowContinueBar
          eyebrow={dynamicEyebrow}
          primaryAction={continueData.primaryAction}
          disabled={blocked}
          state={blocked ? "blocked" : "ready"}
        />
      </AppScreen.Bottom>
    </AppScreen>
  );
}
function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
  const value = spec.data[key];
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`nc-full-dormancy-terms spec missing data.${key}`);
  }
  return value as T;
}
