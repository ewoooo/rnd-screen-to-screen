"use client";

import type { Config } from "@puckeditor/core";

// chg
import {
  ChangeComplete,
  ChangeEligibility,
  CurrentPlanSummary,
  PlanComparison,
  PlanFilter,
  PlanList,
  PlanNoticeAgree,
} from "@screen/mobile/organisms/chg";

// nova-mbr-fp (NEW)
import {
  AuthRequest,
  AuthSelect,
} from "@screen/mobile/organisms/nova-mbr-fp";

// nova-mbr-fp-legacy
import {
  AuthRequest as AuthRequestLegacy,
  AuthSelect as AuthSelectLegacy,
  EntryCheck,
  GuardianInput,
  GuardianResult,
  JoinComplete,
  MemberInput,
  TermAgree,
  TermList,
} from "@screen/mobile/organisms/nova-mbr-fp-legacy";

// types inlined to avoid re-exporting from barrel files
type AuthRequestErrorState =
  | "none" | "expired" | "mismatch" | "blocked"
  | "resendCooldown" | "resendLimit" | "system";
type EntryCheckVariant = "existing" | "dormant" | "withdrawn";
type GuardianResultStatus = "waiting" | "expired";
type TermListState = "ready" | "loading" | "error";

// nova-mbr-legacy
import {
  ActionAreaTerms,
  CheckboxTerms,
  ConsentTermsAccordion,
  JoinCompleteResult,
  ListCellAuthMethod,
  SectionHeaderPage,
  SectionMessageEntryBranch,
  SectionMessageJoinCompleteView,
  TextFieldGuardianRequest,
  TextFieldMemberInfo,
} from "@screen/mobile/organisms/nova-mbr-legacy";

// ------- prop type map -------

type PuckProps = {
  // ── chg ──────────────────────────────────────────────
  ChangeComplete: Record<string, never>;
  ChangeEligibility: Record<string, never>;
  CurrentPlanSummary: Record<string, never>;
  PlanComparison: Record<string, never>;
  PlanFilter: { totalCount: number };
  PlanList: Record<string, never>;
  PlanNoticeAgree: Record<string, never>;

  // ── nova-mbr-fp (NEW) ─────────────────────────────────
  AuthRequest: { errorState: AuthRequestErrorState; blocked: boolean };
  AuthSelect: { loading: boolean };

  // ── nova-mbr-fp-legacy ───────────────────────────────
  AuthRequestLegacy: { errorState: AuthRequestErrorState; blocked: boolean };
  AuthSelectLegacy: { loading: boolean };
  EntryCheck: { visible: boolean; variant: EntryCheckVariant; message: string };
  GuardianInput: { visible: boolean; showError: boolean };
  GuardianResult: { visible: boolean; status: GuardianResultStatus };
  JoinComplete: { sessionError: boolean };
  MemberInput: Record<string, never>;
  TermAgree: { showRequiredError: boolean };
  TermList: { state: TermListState };

  // ── nova-mbr-legacy ──────────────────────────────────
  ActionAreaTerms: { disabled: boolean };
  CheckboxTerms: Record<string, never>;
  ConsentTermsAccordion: Record<string, never>;
  JoinCompleteResult: Record<string, never>;
  ListCellAuthMethod: Record<string, never>;
  SectionHeaderPage: { title: string; subTitle: string };
  SectionMessageEntryBranch: { visible: boolean };
  SectionMessageJoinCompleteView: Record<string, never>;
  TextFieldGuardianRequest: { visible: boolean };
  TextFieldMemberInfo: Record<string, never>;
};

// ------- helpers -------

const boolRadio = (label: string) =>
  ({
    type: "radio" as const,
    label,
    options: [
      { value: false, label: "false" },
      { value: true, label: "true" },
    ],
  }) as const;

// ------- config -------

export const puckConfig: Config<PuckProps> = {
  root: {
    render: ({ children }) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "24px",
          background: "#f0f0f0",
          minHeight: "100dvh",
        }}
      >
        <div className="mobile-shell">{children}</div>
      </div>
    ),
  },

  categories: {
    "CHG (요금제 변경)": {
      components: [
        "CurrentPlanSummary",
        "ChangeEligibility",
        "PlanFilter",
        "PlanList",
        "PlanComparison",
        "PlanNoticeAgree",
        "ChangeComplete",
      ],
      defaultExpanded: true,
    },
    "MBR FP — NEW": {
      components: ["AuthSelect", "AuthRequest"],
      defaultExpanded: true,
    },
    "MBR FP — Legacy": {
      components: [
        "AuthSelectLegacy",
        "AuthRequestLegacy",
        "EntryCheck",
        "MemberInput",
        "TermList",
        "TermAgree",
        "GuardianInput",
        "GuardianResult",
        "JoinComplete",
      ],
      defaultExpanded: false,
    },
    "MBR Legacy": {
      components: [
        "SectionHeaderPage",
        "CheckboxTerms",
        "ConsentTermsAccordion",
        "ActionAreaTerms",
        "ListCellAuthMethod",
        "TextFieldMemberInfo",
        "TextFieldGuardianRequest",
        "SectionMessageEntryBranch",
        "JoinCompleteResult",
        "SectionMessageJoinCompleteView",
      ],
      defaultExpanded: false,
    },
  },

  components: {
    // ── CHG ──────────────────────────────────────────────

    CurrentPlanSummary: {
      label: "Current Plan Summary",
      fields: {},
      defaultProps: {},
      render: () => <CurrentPlanSummary />,
    },

    ChangeEligibility: {
      label: "Change Eligibility",
      fields: {},
      defaultProps: {},
      render: () => <ChangeEligibility />,
    },

    PlanFilter: {
      label: "Plan Filter",
      fields: {
        totalCount: { type: "number", label: "총 요금제 수" },
      },
      defaultProps: { totalCount: 12 },
      render: ({ totalCount }) => <PlanFilter totalCount={totalCount} />,
    },

    PlanList: {
      label: "Plan List",
      fields: {},
      defaultProps: {},
      render: () => <PlanList />,
    },

    PlanComparison: {
      label: "Plan Comparison",
      fields: {},
      defaultProps: {},
      render: () => <PlanComparison />,
    },

    PlanNoticeAgree: {
      label: "Plan Notice Agree",
      fields: {},
      defaultProps: {},
      render: () => (
        <PlanNoticeAgree agreed={false} onAgreedChange={() => undefined} />
      ),
    },

    ChangeComplete: {
      label: "Change Complete",
      fields: {},
      defaultProps: {},
      render: () => <ChangeComplete />,
    },

    // ── NOVA-MBR-FP (NEW) ─────────────────────────────────

    AuthSelect: {
      label: "Auth Select (NEW)",
      fields: {
        loading: boolRadio("로딩 상태"),
      },
      defaultProps: { loading: false },
      render: ({ loading }) => <AuthSelect loading={loading} />,
    },

    AuthRequest: {
      label: "Auth Request (NEW)",
      fields: {
        errorState: {
          type: "select",
          label: "에러 상태",
          options: [
            { value: "none", label: "없음" },
            { value: "expired", label: "expired" },
            { value: "mismatch", label: "mismatch" },
            { value: "blocked", label: "blocked" },
            { value: "resendCooldown", label: "resendCooldown" },
            { value: "resendLimit", label: "resendLimit" },
            { value: "system", label: "system" },
          ],
        },
        blocked: boolRadio("입력 차단"),
      },
      defaultProps: { errorState: "none", blocked: false },
      render: ({ errorState, blocked }) => (
        <AuthRequest
          errorState={errorState}
          blocked={blocked}
          resendDisabled={false}
          confirmDisabled={false}
        />
      ),
    },

    // ── NOVA-MBR-FP LEGACY ───────────────────────────────

    AuthSelectLegacy: {
      label: "Auth Select (Legacy)",
      fields: {
        loading: boolRadio("로딩 상태"),
      },
      defaultProps: { loading: false },
      render: ({ loading }) => <AuthSelectLegacy loading={loading} />,
    },

    AuthRequestLegacy: {
      label: "Auth Request (Legacy)",
      fields: {
        errorState: {
          type: "select",
          label: "에러 상태",
          options: [
            { value: "none", label: "없음" },
            { value: "expired", label: "expired" },
            { value: "mismatch", label: "mismatch" },
            { value: "blocked", label: "blocked" },
            { value: "resendCooldown", label: "resendCooldown" },
            { value: "resendLimit", label: "resendLimit" },
            { value: "system", label: "system" },
          ],
        },
        blocked: boolRadio("입력 차단"),
      },
      defaultProps: { errorState: "none", blocked: false },
      render: ({ errorState, blocked }) => (
        <AuthRequestLegacy
          errorState={errorState}
          blocked={blocked}
          resendDisabled={false}
          confirmDisabled={false}
        />
      ),
    },

    EntryCheck: {
      label: "Entry Check",
      fields: {
        visible: boolRadio("표시"),
        variant: {
          type: "select",
          label: "분기 종류",
          options: [
            { value: "existing", label: "existing (기존 회원)" },
            { value: "dormant", label: "dormant (휴면)" },
            { value: "withdrawn", label: "withdrawn (탈퇴)" },
          ],
        },
        message: { type: "textarea", label: "안내 메시지" },
      },
      defaultProps: {
        visible: true,
        variant: "existing",
        message: "이미 가입된 회원입니다.",
      },
      render: ({ visible, variant, message }) => (
        <EntryCheck visible={visible} variant={variant} message={message} />
      ),
    },

    MemberInput: {
      label: "Member Input",
      fields: {},
      defaultProps: {},
      render: () => <MemberInput />,
    },

    TermList: {
      label: "Term List",
      fields: {
        state: {
          type: "select",
          label: "로드 상태",
          options: [
            { value: "ready", label: "ready" },
            { value: "loading", label: "loading" },
            { value: "error", label: "error" },
          ],
        },
      },
      defaultProps: { state: "ready" },
      render: ({ state }) => <TermList state={state} />,
    },

    TermAgree: {
      label: "Term Agree",
      fields: {
        showRequiredError: boolRadio("필수 약관 에러 표시"),
      },
      defaultProps: { showRequiredError: false },
      render: ({ showRequiredError }) => (
        <TermAgree showRequiredError={showRequiredError} />
      ),
    },

    GuardianInput: {
      label: "Guardian Input",
      fields: {
        visible: boolRadio("표시"),
        showError: boolRadio("에러 표시"),
      },
      defaultProps: { visible: true, showError: false },
      render: ({ visible, showError }) => (
        <GuardianInput visible={visible} showError={showError} />
      ),
    },

    GuardianResult: {
      label: "Guardian Result",
      fields: {
        visible: boolRadio("표시"),
        status: {
          type: "radio",
          label: "상태",
          options: [
            { value: "waiting", label: "waiting (대기)" },
            { value: "expired", label: "expired (만료)" },
          ],
        },
      },
      defaultProps: { visible: true, status: "waiting" },
      render: ({ visible, status }) => (
        <GuardianResult visible={visible} status={status} />
      ),
    },

    JoinComplete: {
      label: "Join Complete (FP)",
      fields: {
        sessionError: boolRadio("세션 오류"),
      },
      defaultProps: { sessionError: false },
      render: ({ sessionError }) => <JoinComplete sessionError={sessionError} />,
    },

    // ── NOVA-MBR LEGACY ──────────────────────────────────

    SectionHeaderPage: {
      label: "Section Header Page",
      fields: {
        title: { type: "text", label: "제목" },
        subTitle: { type: "text", label: "부제목" },
      },
      defaultProps: { title: "페이지 제목", subTitle: "" },
      render: ({ title, subTitle }) => (
        <SectionHeaderPage title={title} subTitle={subTitle || undefined} />
      ),
    },

    CheckboxTerms: {
      label: "Checkbox Terms",
      fields: {},
      defaultProps: {},
      render: () => <CheckboxTerms />,
    },

    ConsentTermsAccordion: {
      label: "Consent Terms Accordion",
      fields: {},
      defaultProps: {},
      render: () => (
        <ConsentTermsAccordion
          allChecked={false}
          onAllCheckedChange={() => undefined}
          checkedById={{}}
          onItemCheckedChange={() => undefined}
        />
      ),
    },

    ActionAreaTerms: {
      label: "Action Area Terms (CTA 버튼)",
      fields: {
        disabled: boolRadio("비활성"),
      },
      defaultProps: { disabled: false },
      render: ({ disabled }) => <ActionAreaTerms disabled={disabled} />,
    },

    ListCellAuthMethod: {
      label: "List Cell Auth Method",
      fields: {},
      defaultProps: {},
      render: () => <ListCellAuthMethod />,
    },

    TextFieldMemberInfo: {
      label: "Text Field Member Info",
      fields: {},
      defaultProps: {},
      render: () => <TextFieldMemberInfo />,
    },

    TextFieldGuardianRequest: {
      label: "Text Field Guardian Request",
      fields: {
        visible: boolRadio("표시"),
      },
      defaultProps: { visible: true },
      render: ({ visible }) => <TextFieldGuardianRequest visible={visible} />,
    },

    SectionMessageEntryBranch: {
      label: "Section Message Entry Branch",
      fields: {
        visible: boolRadio("표시"),
      },
      defaultProps: { visible: true },
      render: ({ visible }) => (
        <SectionMessageEntryBranch visible={visible} />
      ),
    },

    JoinCompleteResult: {
      label: "Join Complete Result (Legacy)",
      fields: {},
      defaultProps: {},
      render: () => <JoinCompleteResult />,
    },

    SectionMessageJoinCompleteView: {
      label: "Section Message Join Complete",
      fields: {},
      defaultProps: {},
      render: () => <SectionMessageJoinCompleteView />,
    },
  },
};
