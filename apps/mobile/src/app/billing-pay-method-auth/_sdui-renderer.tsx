"use client";

import { TextBlock } from "@pxds/pxds-components/typography";
import {
  InfoList,
  type InfoListItem,
  NoticeBlock,
  SectionCard,
  StickyActionBar,
} from "@/components/molecules";
import { FlowHero, ProgressTopBar } from "@/components/organisms/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";
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
type ContextData = {
  label: string;
  items: readonly {
    id: string;
    label: string;
    value: string;
  }[];
};
type NoticeTone = "info" | "warning" | "critical" | "success";
type NoticeData = {
  tone: NoticeTone;
  title: string;
  body: string;
};
type WebviewData = {
  kind: string;
  label: string;
};
type ContinueData = {
  eyebrow: string;
  primaryAction: string;
  secondaryAction: string;
};
export function BillingPayMethodAuthScreen({
  spec,
}: {
  spec: RenderableScreenSpecV1;
}) {
  const flow = readData<FlowData>(spec, "flow");
  const hero = readData<HeroData>(spec, "hero");
  const ctx = readData<ContextData>(spec, "context");
  const notice = readData<NoticeData>(spec, "notice");
  const webview = readData<WebviewData>(spec, "webview");
  const cont = readData<ContinueData>(spec, "continue");
  const ctxItems = ctx.items.map<InfoListItem>((it) => ({
    id: it.id,
    title: it.label,
    sub: "",
    trailingLabel: it.value,
  }));
  return (
    <AppScreen>
      <AppScreen.SystemHeader />
      <AppScreen.Header>
        <ProgressTopBar
          title="결제기관 인증"
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
        <SectionCard label={ctx.label}>
          <InfoList items={ctxItems} />
        </SectionCard>
        <SectionCard label={webview.label}>
          <TextBlock
            variant="supportText"
            color={"semantic.label.alternative" as never}
            text={`외부 인증 영역 (${webview.kind})`}
          />
        </SectionCard>
      </AppScreen.Content>
      <AppScreen.Bottom>
        <StickyActionBar
          eyebrow={cont.eyebrow}
          title={cont.primaryAction}
          secondaryAction={cont.secondaryAction}
          primaryAction={cont.primaryAction}
        />
      </AppScreen.Bottom>
    </AppScreen>
  );
}
function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
  const value = spec.data[key];
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`billing-pay-method-auth spec missing data.${key}`);
  }
  return value as unknown as T;
}
