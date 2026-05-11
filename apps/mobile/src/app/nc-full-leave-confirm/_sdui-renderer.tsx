"use client";

import { useState } from "react";
import {
  FlowContinueBar,
  FlowHero,
  ProgressTopBar,
  TermsAgreementGroup,
  type TermsAgreementItem,
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
type ConfirmData = {
  title: string;
  items: readonly TermsAgreementItem[];
};
type ContinueData = {
  eyebrow: string;
  primaryAction: string;
};
export function NcFullLeaveConfirmScreen({
  spec,
}: {
  spec: RenderableScreenSpecV1;
}) {
  const flow = readData<FlowData>(spec, "flow");
  const hero = readData<HeroData>(spec, "hero");
  const confirm = readData<ConfirmData>(spec, "confirm");
  const continueData = readData<ContinueData>(spec, "continue");
  const initialMissing = confirm.items.filter(
    (item) => item.required && !item.defaultChecked,
  ).length;
  const [missingCount, setMissingCount] = useState(initialMissing);
  const blocked = missingCount > 0;
  const dynamicEyebrow = blocked
    ? "확인 항목에 모두 동의해 주세요"
    : continueData.eyebrow;
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
        <TermsAgreementGroup
          title={confirm.title}
          allLabel="모두 확인했어요"
          allCaption=""
          items={confirm.items}
          onStateChange={(s) => setMissingCount(s.missingRequiredCount)}
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
    throw new Error(`nc-full-leave-confirm spec missing data.${key}`);
  }
  return value as T;
}
