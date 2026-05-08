"use client";

import { useState } from "react";
import {
  FlowContinueBar,
  FlowHero,
  ProgressTopBar,
} from "@/components/organisms/global";
import {
  AuthMethodSelector,
  type AuthMethodItem,
} from "@/components/organisms/nc-simple";
import { AppScreen } from "@pxds/pxds-layout/app-screen";
import type { RenderableScreenSpecV1 } from "@screen/specs";
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
type MethodData = {
  label: string;
  items: readonly AuthMethodItem[];
};
type CodeData = {
  label: string;
  placeholder?: string;
  helperText?: string;
};
type ContinueData = {
  eyebrow?: string;
  primaryActionStep1: string;
  primaryActionStep2: string;
};
export function NcSimpleRejoinAuthScreen({
  spec,
}: {
  spec: RenderableScreenSpecV1;
}) {
  const topbar = readData<TopbarData>(spec, "topbar");
  const hero = readData<HeroData>(spec, "hero");
  const method = readData<MethodData>(spec, "method");
  const code = readData<CodeData>(spec, "code");
  const continueData = readData<ContinueData>(spec, "continue");
  const [step, setStep] = useState<1 | 2>(1);
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [codeValue, setCodeValue] = useState("");
  const blocked =
    step === 1 ? !selected : codeValue.replace(/\D/g, "").length < 6;
  const dynamicEyebrow = blocked
    ? step === 1
      ? "인증 수단을 선택해 주세요"
      : "인증번호 6자리를 입력해 주세요"
    : (continueData.eyebrow ?? "");
  const primaryAction =
    step === 1
      ? continueData.primaryActionStep1
      : continueData.primaryActionStep2;
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
        <AuthMethodSelector
          methodLabel={method.label}
          methods={method.items}
          codeLabel={code.label}
          codePlaceholder={code.placeholder}
          codeHelperText={code.helperText}
          step={step}
          selectedMethod={selected}
          codeValue={codeValue}
          onMethodChange={(id) => {
            setSelected(id);
            setStep(2);
          }}
          onCodeChange={setCodeValue}
        />
      </AppScreen.Content>
      <AppScreen.Bottom>
        <FlowContinueBar
          eyebrow={dynamicEyebrow}
          primaryAction={primaryAction}
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
    throw new Error(`nc-simple-rejoin-auth spec missing data.${key}`);
  }
  return value as T;
}
