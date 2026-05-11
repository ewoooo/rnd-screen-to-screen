"use client";

import { useState } from "react";
import {
  FlowContinueBar,
  FlowHero,
  ProgressTopBar,
  TermsAgreementGroup,
  type TermsAgreementItem,
} from "@pxds/pxds-components/shared/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";
import type { RenderableScreenSpecV1 } from "@/screens";
type TopbarData = {
  title: string;
  progressLabel?: string;
  progressPercent?: number;
  showProgressLabel?: boolean;
};
type HeroData = {
  titleLines: readonly string[];
  description: string;
};
type SpecTermItem = {
  id: string;
  title: string;
  required: boolean;
  hasDetail?: boolean;
  caption?: string;
  changeBadge?: string;
};
type TermsData = {
  selectAllLabel: string;
  required: readonly SpecTermItem[];
  optional: readonly SpecTermItem[];
};
type ContinueData = {
  eyebrow?: string;
  primaryAction: string;
};
export function NcSimpleDormancyTermsScreen({
  spec,
}: {
  spec: RenderableScreenSpecV1;
}) {
  const topbar = readData<TopbarData>(spec, "topbar");
  const hero = readData<HeroData>(spec, "hero");
  const terms = readData<TermsData>(spec, "terms");
  const continueData = readData<ContinueData>(spec, "continue");
  const termsItems: readonly TermsAgreementItem[] = [
    ...terms.required,
    ...terms.optional,
  ].map((item) => ({
    id: item.id,
    title: item.changeBadge
      ? `${item.title} (${item.changeBadge})`
      : item.title,
    caption: item.caption ?? "",
    required: item.required,
  }));
  const [missing, setMissing] = useState(terms.required.length);
  const blocked = missing > 0;
  const dynamicEyebrow = blocked
    ? `필수 약관 ${missing}개 동의가 남았어요`
    : (continueData.eyebrow ?? "");
  return (
    <AppScreen>
      <AppScreen.SystemHeader />
      <AppScreen.Header>
        <ProgressTopBar
          title={topbar.title}
          leading="back"
          progress={
            topbar.progressLabel && topbar.progressPercent !== undefined
              ? {
                  label: topbar.progressLabel,
                  percent: topbar.progressPercent,
                  showLabel: topbar.showProgressLabel,
                }
              : undefined
          }
        />
      </AppScreen.Header>
      <AppScreen.Content>
        <FlowHero {...hero} />
        <TermsAgreementGroup
          title="약관 재동의"
          allLabel={terms.selectAllLabel}
          allCaption=""
          items={termsItems}
          onStateChange={(s) => setMissing(s.missingRequiredCount)}
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
    throw new Error(`nc-simple-dormancy-terms spec missing data.${key}`);
  }
  return value as T;
}
