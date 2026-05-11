"use client";

import { IconChat, IconLock, IconMessage, IconMobile } from "@pxds/pxds-icons";
import { type ReactNode, useState } from "react";
import { SelectableList } from "@pxds/pxds-components/shared";
import {
  FlowContinueBar,
  FlowHero,
  FlowNotice,
  ProgressTopBar,
} from "@pxds/pxds-components/shared/global";
import { AppScreen, ContentSection } from "@pxds/pxds-layout/app-screen";
import type { RenderableScreenSpecV1 } from "@/screens";
type MethodIcon = "chat" | "mobile" | "message" | "lock";
const METHOD_ICON: Record<MethodIcon, ReactNode> = {
  chat: <IconChat width={28} height={28} />,
  mobile: <IconMobile width={28} height={28} />,
  message: <IconMessage width={28} height={28} />,
  lock: <IconLock width={28} height={28} />,
};
type IdentityData = {
  topbar: {
    title: string;
    progressLabel: string;
    progressPercent: number;
  };
  hero: {
    titleLines: readonly string[];
    description: string;
  };
  methods: {
    items: readonly {
      id: string;
      title: string;
      sub?: string;
      trailingLabel?: string;
      leadingIcon?: MethodIcon;
    }[];
  };
  notice: {
    badge: string;
    text: string;
    action: string;
    tone: "info" | "warning" | "critical";
  };
  continue: {
    eyebrow: string;
    primaryAction: string;
  };
};
export function MembershipIdentityVerificationScreen({
  spec,
}: {
  spec: RenderableScreenSpecV1;
}) {
  const data = spec.data as unknown as IdentityData;
  const { topbar, hero, methods, notice, continue: continueData } = data;
  const [value, setValue] = useState<string | undefined>(undefined);
  const blocked = !value;
  const dynamicEyebrow = blocked
    ? "인증 수단을 선택해주세요"
    : continueData.eyebrow;
  const items = methods.items.map((item) => ({
    ...item,
    leading: item.leadingIcon ? METHOD_ICON[item.leadingIcon] : undefined,
  }));
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
        <ContentSection>
          <SelectableList
            name="identity-method"
            items={items}
            value={value}
            onChange={setValue}
            density="comfortable"
          />
        </ContentSection>
        <FlowNotice {...notice} />
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
