"use client";

import { Switch, TextField } from "@pxds/pxds-components/patterns";
import { VStack } from "@pxds/pxds-layout/primitives";
import {
  NoticeBlock,
  SectionCard,
  type SelectableItem,
  SelectableList,
  StickyActionBar,
} from "@/components/molecules";
import { FormField } from "@pxds/pxds-components/patterns";
import { FlowHero, ProgressTopBar } from "@/components/organisms/global";
import { AppScreen, ContentSection } from "@pxds/pxds-layout/app-screen";
import { evalVisibleWhen } from "@/lib/visible-when";
import type { RenderableScreenSpecV1 } from "@/screens";
type TopData = {
  title: string;
  leading: "back" | "close";
};
type HeroData = {
  titleLines: readonly string[];
  description: string;
};
type RadioField = {
  id: string;
  label: string;
  required?: boolean;
  control: "radio";
  value: string;
  options: readonly {
    id: string;
    title: string;
    sub?: string;
  }[];
};
type TextFieldData = {
  id: string;
  label: string;
  required?: boolean;
  control: "text";
  placeholder?: string;
  helperText?: string;
  visibleWhen?: string;
};
type SwitchFieldData = {
  id: string;
  label: string;
  required?: boolean;
  control: "switch";
  value: boolean;
  helperText?: string;
};
type FormData = {
  channel: RadioField;
  contact: TextFieldData;
  alert: SwitchFieldData;
};
type EffectiveData = {
  tone: "info" | "warning" | "critical" | "success";
  text: string;
};
type ContinueData = {
  eyebrow: string;
  primaryAction: string;
};
export function BillingSetStatementScreen({
  spec,
}: {
  spec: RenderableScreenSpecV1;
}) {
  const top = readData<TopData>(spec, "top");
  const hero = readData<HeroData>(spec, "hero");
  const form = readData<FormData>(spec, "form");
  const effective = readData<EffectiveData>(spec, "effective");
  const cont = readData<ContinueData>(spec, "continue");
  const channelItems: SelectableItem[] = form.channel.options.map((o) => ({
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
        <SectionCard label={form.channel.label}>
          <SelectableList
            name={form.channel.id}
            items={channelItems}
            value={form.channel.value}
            density="compact"
          />
        </SectionCard>
        <ContentSection>
          <VStack gap="block">
            {evalVisibleWhen(form.contact.visibleWhen, {
              channel: form.channel.value,
            }) ? (
              <FormField
                label={form.contact.label}
                required={form.contact.required}
                helperText={form.contact.helperText}
              >
                <TextField placeholder={form.contact.placeholder} disabled />
              </FormField>
            ) : null}
            <FormField
              label={form.alert.label}
              helperText={form.alert.helperText}
            >
              <Switch defaultChecked={form.alert.value} disabled />
            </FormField>
          </VStack>
        </ContentSection>
        <NoticeBlock
          tone={effective.tone}
          badge="적용 시점"
          text={effective.text}
        />
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
  const v = spec.data[key];
  if (!v || typeof v !== "object" || Array.isArray(v)) {
    throw new Error(`billing-set-statement spec missing data.${key}`);
  }
  return v as unknown as T;
}
