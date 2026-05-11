"use client";

import {
  InfoList,
  type InfoListItem,
  NoticeBlock,
  SummaryCard,
} from "@/components/molecules";
import { ProgressTopBar } from "@/components/organisms/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";
import type { RenderableScreenSpecV1 } from "@/screens";
type ForecastData = {
  label: string;
  title: string;
  meta: readonly {
    id: string;
    label: string;
    value: string;
  }[];
};
type RemainingData = {
  title: string;
  rows: readonly InfoListItem[];
};
type MiriData = {
  tone: "info" | "warning" | "critical";
  title: string;
  text: string;
};
export function BillingRealtimeScreen({
  spec,
}: {
  spec: RenderableScreenSpecV1;
}) {
  const forecast = readData<ForecastData>(spec, "forecast");
  const remaining = readData<RemainingData>(spec, "remaining");
  const miri = readData<MiriData>(spec, "miri");
  return (
    <AppScreen>
      <AppScreen.SystemHeader />
      <AppScreen.Header>
        <ProgressTopBar title="실시간·예상 요금" leading="back" />
      </AppScreen.Header>
      <AppScreen.Content>
        <SummaryCard
          label={forecast.label}
          title={forecast.title}
          mediaAlt={forecast.label}
        >
          <InfoList
            items={forecast.meta.map((m) => ({
              id: m.id,
              title: m.label,
              sub: "",
              trailingLabel: m.value,
            }))}
          />
        </SummaryCard>
        <InfoList
          items={remaining.rows.map((r) => ({
            id: r.id,
            title: r.title,
            sub: r.sub ?? "",
            trailingLabel: r.trailingLabel,
          }))}
        />
        <NoticeBlock tone={miri.tone} badge={miri.title} text={miri.text} />
      </AppScreen.Content>
    </AppScreen>
  );
}
function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
  const v = spec.data[key];
  if (!v || typeof v !== "object" || Array.isArray(v)) {
    throw new Error(`billing-realtime spec missing data.${key}`);
  }
  return v as unknown as T;
}
