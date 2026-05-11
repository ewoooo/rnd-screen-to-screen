"use client";

import {
  InfoList,
  type InfoListItem,
  NoticeBlock,
  SectionCard,
  SummaryCard,
} from "@pxds/pxds-components/shared";
import { ProgressTopBar } from "@pxds/pxds-components/shared/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";
import type { RenderableScreenSpecV1 } from "@/screens";
type TotalData = {
  label: string;
  title: string;
  meta: readonly {
    id: string;
    label: string;
    value: string;
  }[];
};
type ItemsData = {
  title: string;
  rows: readonly InfoListItem[];
};
type DeltaData = {
  tone: "info" | "warning" | "critical";
  title: string;
  text: string;
};
export function BillingDetailScreen({
  spec,
}: {
  spec: RenderableScreenSpecV1;
}) {
  const total = readData<TotalData>(spec, "total");
  const items = readData<ItemsData>(spec, "items");
  const delta = readData<DeltaData>(spec, "delta");
  return (
    <AppScreen>
      <AppScreen.SystemHeader />
      <AppScreen.Header>
        <ProgressTopBar title="청구 상세" leading="back" />
      </AppScreen.Header>
      <AppScreen.Content>
        <SummaryCard
          label={total.label}
          title={total.title}
          mediaAlt={total.label}
        >
          <InfoList
            items={total.meta.map((m) => ({
              id: m.id,
              title: m.label,
              sub: "",
              trailingLabel: m.value,
            }))}
          />
        </SummaryCard>
        <SectionCard label={items.title}>
          <InfoList
            items={items.rows.map((r) => ({
              id: r.id,
              title: r.title,
              sub: r.sub ?? "",
              trailingLabel: r.trailingLabel,
            }))}
          />
        </SectionCard>
        <NoticeBlock tone={delta.tone} badge={delta.title} text={delta.text} />
      </AppScreen.Content>
    </AppScreen>
  );
}
function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
  const v = spec.data[key];
  if (!v || typeof v !== "object" || Array.isArray(v)) {
    throw new Error(`billing-detail spec missing data.${key}`);
  }
  return v as unknown as T;
}
