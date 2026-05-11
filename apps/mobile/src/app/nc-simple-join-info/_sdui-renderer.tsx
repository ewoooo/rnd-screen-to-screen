"use client";

import { useState } from "react";
import {
  FlowContinueBar,
  FlowHero,
  FlowPersonalInfoForm,
  ProgressTopBar,
  type FlowFieldKind,
  type FlowPersonalField,
} from "@/components/organisms/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";
import type { RenderableScreenSpecV1 } from "@/screens";
type TopbarData = {
  title: string;
  progressLabel?: string;
  progressPercent?: number;
  showProgressLabel?: boolean;
};
type HeroData = {
  titleLines: readonly string[];
  description: string;
};
type SpecField = {
  id: string;
  label: string;
  placeholder?: string;
  type: "text" | "password" | "email" | "tel" | "date";
  required?: boolean;
  rule?: string;
};
type FormData = {
  fields: readonly SpecField[];
};
type ContinueData = {
  eyebrow?: string;
  primaryAction: string;
};
const KIND_MAP: Record<SpecField["type"], FlowFieldKind> = {
  text: "text",
  password: "text",
  email: "text",
  tel: "tel",
  date: "date",
};
export function NcSimpleJoinInfoScreen({
  spec,
}: {
  spec: RenderableScreenSpecV1;
}) {
  const topbar = readData<TopbarData>(spec, "topbar");
  const hero = readData<HeroData>(spec, "hero");
  const form = readData<FormData>(spec, "form");
  const continueData = readData<ContinueData>(spec, "continue");
  const fields: readonly FlowPersonalField[] = form.fields.map((f) => ({
    id: f.id,
    label: f.label,
    required: f.required,
    placeholder: f.placeholder,
    helperText: f.rule,
    kind: KIND_MAP[f.type] ?? "text",
  }));
  const [values, setValues] = useState<Record<string, string | undefined>>({});
  const errors: Record<string, string | undefined> = {};
  const missing = fields.filter(
    (f) => f.required && !values[f.id]?.trim(),
  ).length;
  const blocked = missing > 0;
  const dynamicEyebrow = blocked
    ? "필수 항목을 입력해 주세요"
    : (continueData.eyebrow ?? "");
  return (
    <AppScreen>
      <AppScreen.SystemHeader />
      <AppScreen.Header>
        <ProgressTopBar
          title={topbar.title}
          leading="back"
          progress={
            topbar.progressLabel && topbar.progressPercent !== undefined
              ? {
                  label: topbar.progressLabel,
                  percent: topbar.progressPercent,
                  showLabel: topbar.showProgressLabel,
                }
              : undefined
          }
        />
      </AppScreen.Header>
      <AppScreen.Content>
        <FlowHero {...hero} />
        <FlowPersonalInfoForm
          fields={fields}
          values={values}
          errors={errors}
          onChange={(id, value) =>
            setValues((current) => ({
              ...current,
              [id]: value,
            }))
          }
        />
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
function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
  const value = spec.data[key];
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`nc-simple-join-info spec missing data.${key}`);
  }
  return value as T;
}
