"use client";

import {
  InfoList,
  type InfoListItem,
  NoticeBlock,
  PrimaryCTABar,
  SectionCard,
} from "@pxds/pxds-components/shared";
import { ProgressTopBar } from "@pxds/pxds-components/shared/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";
import type { RenderableScreenSpecV1 } from "@/screens";
type StatusTone = "success" | "info" | "warning" | "critical";
type StatusData = {
  tone: StatusTone;
  title: string;
  text: string;
};
type FollowUpData = {
  title: string;
  rows: readonly InfoListItem[];
};
type CtaData = {
  primary: {
    id: string;
    label: string;
  };
};

// trailing label 시맨틱 추론: 숫자 없는 한글 라벨은 status, 그 외는 value.
function inferTrailing(label: string | undefined): {
  kind: "value" | "status";
  tone: "positive" | "cautionary" | "neutral";
} {
  if (!label)
    return {
      kind: "value",
      tone: "neutral",
    };
  if (/\d/.test(label))
    return {
      kind: "value",
      tone: "neutral",
    };
  if (label.includes("완료"))
    return {
      kind: "status",
      tone: "positive",
    };
  if (label.includes("처리"))
    return {
      kind: "status",
      tone: "cautionary",
    };
  return {
    kind: "status",
    tone: "neutral",
  };
}
export function BillingArrearsStatusScreen({
  spec,
}: {
  spec: RenderableScreenSpecV1;
}) {
  const status = readData<StatusData>(spec, "status");
  const followUp = readData<FollowUpData>(spec, "followUp");
  const cta = readData<CtaData>(spec, "cta");
  return (
    <AppScreen>
      <AppScreen.SystemHeader />
      <AppScreen.Header>
        <ProgressTopBar title="미납 해소 상태" leading="close" />
      </AppScreen.Header>
      <AppScreen.Content>
        <NoticeBlock
          tone={status.tone}
          badge={status.title}
          text={status.text}
        />
        <SectionCard label={followUp.title}>
          <InfoList
            items={followUp.rows.map((r) => {
              const trailing = inferTrailing(r.trailingLabel);
              return {
                id: r.id,
                title: r.title,
                sub: r.sub ?? "",
                trailingLabel: r.trailingLabel,
                trailingKind: trailing.kind,
                trailingTone: trailing.tone,
              };
            })}
          />
        </SectionCard>
      </AppScreen.Content>
      <AppScreen.Bottom>
        <PrimaryCTABar primaryLabel={cta.primary.label} />
      </AppScreen.Bottom>
    </AppScreen>
  );
}
function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
  const v = spec.data[key];
  if (!v || typeof v !== "object" || Array.isArray(v)) {
    throw new Error(`billing-arrears-status spec missing data.${key}`);
  }
  return v as unknown as T;
}
