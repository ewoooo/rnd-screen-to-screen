"use client";

import { FilterTabs } from "@pxds/pxds-components/molecules";
import {
  InfoList,
  type InfoListItem,
  PrimaryCTABar,
} from "@pxds/pxds-components/molecules";
import { ProgressTopBar } from "@pxds/pxds-components/shared/global";
import { AppScreen, TabsContents } from "@pxds/pxds-layout/app-screen";
import type { RenderableScreenSpecV1 } from "@/screens";
type FilterData = {
  items: readonly {
    id: string;
    label: string;
  }[];
  active: string;
};
type ListData = {
  title: string;
  rows: readonly InfoListItem[];
};
type CtaData = {
  primary: {
    id: string;
    label: string;
  };
  secondary?: {
    id: string;
    label: string;
  };
};
export function BillingMscHistoryScreen({
  spec,
}: {
  spec: RenderableScreenSpecV1;
}) {
  const filter = readData<FilterData>(spec, "filter");
  const list = readData<ListData>(spec, "list");
  const cta = readData<CtaData>(spec, "cta");
  return (
    <AppScreen>
      <AppScreen.SystemHeader />
      <AppScreen.Header>
        <ProgressTopBar title="이용내역" leading="back" />
      </AppScreen.Header>
      <AppScreen.Content>
        <TabsContents>
          <FilterTabs tabs={filter.items} activeId={filter.active} />
        </TabsContents>
        <InfoList
          items={list.rows.map((r) => ({
            id: r.id,
            title: r.title,
            sub: r.sub ?? "",
            trailingLabel: r.trailingLabel,
          }))}
        />
      </AppScreen.Content>
      <AppScreen.Bottom>
        <PrimaryCTABar
          primaryLabel={cta.primary.label}
          secondaryLabel={cta.secondary?.label}
        />
      </AppScreen.Bottom>
    </AppScreen>
  );
}
function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
  const v = spec.data[key];
  if (!v || typeof v !== "object" || Array.isArray(v)) {
    throw new Error(`billing-msc-history spec missing data.${key}`);
  }
  return v as unknown as T;
}
