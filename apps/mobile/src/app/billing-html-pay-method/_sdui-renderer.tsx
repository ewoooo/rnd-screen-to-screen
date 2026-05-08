"use client";

import {
  InfoList,
  type InfoListItem,
  SectionCard,
  type SelectableItem,
  SelectableList,
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
type TargetData = {
  label: string;
  line: string;
  period: string;
  amount: string;
};
type MethodsData = {
  label: string;
  selectionMode: "single" | "multi";
  items: readonly {
    id: string;
    title: string;
    sub: string;
    defaultChecked?: boolean;
    trailingLabel?: string;
  }[];
};
type ContinueData = {
  eyebrow: string;
  primaryAction: string;
};
export function BillingPayMethodScreen({
  spec,
}: {
  spec: RenderableScreenSpecV1;
}) {
  const flow = readData<FlowData>(spec, "flow");
  const hero = readData<HeroData>(spec, "hero");
  const target = readData<TargetData>(spec, "target");
  const methods = readData<MethodsData>(spec, "methods");
  const cont = readData<ContinueData>(spec, "continue");
  const methodItems = methods.items.map<SelectableItem>((it) => ({
    id: it.id,
    title: it.title,
    sub: it.sub,
    trailingLabel: it.trailingLabel,
  }));
  const defaultId =
    methods.items.find((it) => it.defaultChecked)?.id ?? methodItems[0]?.id;
  const targetItems: InfoListItem[] = [
    {
      id: "line",
      title: "회선",
      sub: "",
      trailingLabel: target.line,
    },
    {
      id: "period",
      title: "청구월",
      sub: "",
      trailingLabel: target.period,
    },
    {
      id: "amount",
      title: "납부 금액",
      sub: "",
      trailingLabel: target.amount,
    },
  ];
  return (
    <AppScreen>
      <AppScreen.SystemHeader />
      <AppScreen.Header>
        <ProgressTopBar
          title="납부수단 선택"
          leading="back"
          progress={{
            label: flow.progress,
            percent: (flow.step / flow.total) * 100,
          }}
        />
      </AppScreen.Header>
      <AppScreen.Content>
        <FlowHero {...hero} />
        <SectionCard label={target.label} title="">
          <InfoList items={targetItems} />
        </SectionCard>
        <SectionCard label={methods.label} title="">
          <SelectableList
            name="methods"
            items={methodItems}
            value={defaultId}
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
    throw new Error(`billing-pay-method spec missing data.${key}`);
  }
  return value as unknown as T;
}
