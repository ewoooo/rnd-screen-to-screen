"use client";

import { useState } from "react";
import {
  FlowContinueBar,
  FlowHero,
  FlowPersonalInfoForm,
  ProgressTopBar,
  type FlowPersonalField,
} from "@pxds/pxds-components/shared/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";
import type { RenderableScreenSpecV1 } from "@/screens";
type PersonalInfoData = {
  topbar: {
    title: string;
    progressLabel: string;
    progressPercent: number;
  };
  hero: {
    titleLines: readonly string[];
    description: string;
  };
  form: {
    fields: readonly FlowPersonalField[];
  };
  continue: {
    eyebrow: string;
    primaryAction: string;
  };
};
export function MembershipPersonalInfoScreen({
  spec,
}: {
  spec: RenderableScreenSpecV1;
}) {
  const data = spec.data as unknown as PersonalInfoData;
  const { topbar, hero, form, continue: continueData } = data;
  const [values, setValues] = useState<Record<string, string | undefined>>({});
  const errors = (() => {
    const next: Record<string, string | undefined> = {};
    for (const field of form.fields) {
      const value = values[field.id]?.trim() ?? "";
      if (field.required && !value) continue; // 빈값은 errorText 안 띄움 (eyebrow가 안내)
      const validation = field.validation;
      if (!validation || !value) continue;
      if (
        (validation.minLength && value.length < validation.minLength) ||
        (validation.maxLength && value.length > validation.maxLength)
      ) {
        next[field.id] = validation.errorMessage ?? "입력 형식을 확인해주세요";
      }
    }
    return next;
  })();
  const missingRequired = form.fields.filter(
    (f) => f.required && !values[f.id]?.trim(),
  ).length;
  const hasErrors = Object.values(errors).some(Boolean);
  const blocked = missingRequired > 0 || hasErrors;
  const dynamicEyebrow = blocked
    ? missingRequired > 0
      ? `남은 필수 항목 ${missingRequired}개를 입력해주세요`
      : "입력 형식을 확인해주세요"
    : continueData.eyebrow;
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
        <FlowPersonalInfoForm
          fields={form.fields}
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
