"use client";

import { FormField, TextField } from "@pxds/pxds-components/shared";
import {
  InfoList,
  type InfoListItem,
  NoticeBlock,
  PrimaryCTABar,
  SectionCard,
  type SelectableItem,
  SelectableList,
} from "@pxds/pxds-components/shared";
import { FlowHero, ProgressTopBar } from "@pxds/pxds-components/shared/global";
import { AppScreen, ContentSection } from "@pxds/pxds-layout/app-screen";
import type { RenderableScreenSpecV1 } from "@/screens";
type TopData = {
  title: string;
  leading: "back" | "close";
};
type HeroData = {
  titleLines: readonly string[];
  description: string;
};
type CurrentData = {
  title: string;
  items: readonly {
    id: string;
    label: string;
    value: string;
  }[];
};
type AmountField = {
  id: string;
  label: string;
  required?: boolean;
  control: "text";
  placeholder?: string;
  helperText?: string;
};
type StatusField = {
  id: string;
  label: string;
  required?: boolean;
  control: "radio";
  value: string;
  options: readonly {
    id: string;
    title: string;
  }[];
};
type FormData = {
  amount: AmountField;
  status: StatusField;
};
type EffectiveData = {
  tone: "info" | "warning" | "critical" | "success";
  text: string;
};
type ActionsData = {
  primary: {
    id: string;
    label: string;
  };
  secondary?: {
    id: string;
    label: string;
  };
};
export function BillingSetMscLimitScreen({
  spec,
}: {
  spec: RenderableScreenSpecV1;
}) {
  return <BillingLimitScreen spec={spec} routeId="billing-set-msc-limit" />;
}
function BillingLimitScreen({
  spec,
  routeId,
}: {
  spec: RenderableScreenSpecV1;
  routeId: string;
}) {
  const top = readData<TopData>(spec, "top", routeId);
  const hero = readData<HeroData>(spec, "hero", routeId);
  const current = readData<CurrentData>(spec, "current", routeId);
  const form = readData<FormData>(spec, "form", routeId);
  const effective = readData<EffectiveData>(spec, "effective", routeId);
  const actions = readData<ActionsData>(spec, "actions", routeId);
  const currentItems: InfoListItem[] = current.items.map((it) => ({
    id: it.id,
    title: it.label,
    sub: "",
    trailingLabel: it.value,
  }));
  const statusItems: SelectableItem[] = form.status.options.map((o) => ({
    id: o.id,
    title: o.title,
  }));
  return (
    <AppScreen>
      <AppScreen.SystemHeader />
      <AppScreen.Header>
        <ProgressTopBar title={top.title} leading={top.leading} />
      </AppScreen.Header>
      <AppScreen.Content>
        <FlowHero {...hero} />
        <SectionCard label={current.title}>
          <InfoList items={currentItems} />
        </SectionCard>
        <ContentSection>
          <FormField
            label={form.amount.label}
            required={form.amount.required}
            helperText={form.amount.helperText}
          >
            <TextField
              placeholder={form.amount.placeholder}
              inputMode="numeric"
              disabled
            />
          </FormField>
        </ContentSection>
        <SectionCard label={form.status.label}>
          <SelectableList
            name={form.status.id}
            items={statusItems}
            value={form.status.value}
            density="compact"
          />
        </SectionCard>
        <NoticeBlock
          tone={effective.tone}
          badge="적용 시점"
          text={effective.text}
        />
      </AppScreen.Content>
      <AppScreen.Bottom>
        <PrimaryCTABar
          primaryLabel={actions.primary.label}
          secondaryLabel={actions.secondary?.label}
        />
      </AppScreen.Bottom>
    </AppScreen>
  );
}
function readData<T>(
  spec: RenderableScreenSpecV1,
  key: string,
  routeId: string,
): T {
  const v = spec.data[key];
  if (!v || typeof v !== "object" || Array.isArray(v)) {
    throw new Error(`${routeId} spec missing data.${key}`);
  }
  return v as unknown as T;
}
