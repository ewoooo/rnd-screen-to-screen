"use client";

import { useState } from "react";
import { Checkbox } from "@pxds/pxds-components/molecules";
import {
  FlowContinueBar,
  FlowHero,
  FlowNotice,
  FlowSummaryCard,
  ProgressTopBar,
  type FlowSummaryItem,
} from "@pxds/pxds-components/shared/global";
import { HStack } from "@pxds/pxds-layout/primitives";
import { TextBlock } from "@pxds/pxds-components/atoms/typography";
import { AppScreen, ContentSection } from "@pxds/pxds-layout/app-screen";
import type { RenderableScreenSpecV1 } from "@/screens";
type LeaveImpactData = {
  topbar: {
    title: string;
    progressLabel: string;
    progressPercent: number;
  };
  hero: {
    titleLines: readonly string[];
    description: string;
  };
  impact: {
    label: string;
    title: string;
    items: readonly FlowSummaryItem[];
  };
  unpaid?: {
    badge: string;
    text: string;
    action: string;
    tone: "info" | "warning" | "critical";
  };
  confirm: {
    text: string;
  };
  continue: {
    eyebrow: string;
    primaryAction: string;
  };
};
export function MembershipLeaveImpactScreen({
  spec,
}: {
  spec: RenderableScreenSpecV1;
}) {
  const data = spec.data as unknown as LeaveImpactData;
  const {
    topbar,
    hero,
    impact,
    unpaid,
    confirm,
    continue: continueData,
  } = data;
  const [checked, setChecked] = useState(false);
  const blocked = !checked;
  const dynamicEyebrow = blocked
    ? "위 내용을 확인했는지 체크해주세요"
    : continueData.eyebrow;
  return (
    <AppScreen>
      <AppScreen.SystemHeader />
      <AppScreen.Header>
        <ProgressTopBar
          title={topbar.title}
          progress={{
            label: topbar.progressLabel,
            percent: topbar.progressPercent,
          }}
        />
      </AppScreen.Header>
      <AppScreen.Content>
        <FlowHero {...hero} />
        <FlowSummaryCard
          label={impact.label}
          title={impact.title}
          items={impact.items}
        />
        {unpaid ? <FlowNotice {...unpaid} /> : null}
        <ContentSection>
          <HStack
            align="center"
            gap="stack"
            as="label"
            style={{
              minHeight: 48,
              cursor: "pointer",
            }}
          >
            <Checkbox
              checked={checked}
              onCheckedChange={(next) => setChecked(Boolean(next))}
            />
            <TextBlock variant="listTitle" text={confirm.text} />
          </HStack>
        </ContentSection>
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
