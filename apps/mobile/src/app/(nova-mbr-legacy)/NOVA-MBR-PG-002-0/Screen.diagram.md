# NOVA-MBR-PG-002-0 — MBR 가입 2·개인정보 입력

## Screen Contract

- screenId: `NOVA-MBR-PG-002-0`
- route: `/NOVA-MBR-PG-002-0`
- group: `nova-mbr-legacy`
- domain: `mbr`
- pattern: `form`
- implementation source: `Screen.tsx`
- policyRefs: `POL-MBR-INFO-002-03`, `POL-MBR-INFO-002-04`, `POL-MBR-INFO-002-05`, `POL-MBR-INFO-002-06`, `POL-MBR-INFO-002-08`
- OGN refs: `ogn-mbr-section-header-page`, `ogn-mbr-text-field-member-info`, `ogn-mbr-section-message-entry-branch`
- appliedGovernanceRefs: `UXPT_ERR`, `UXPT_NAV`, `VOT_RUL`, `UXP_ACT`
- AppScreen slots: `SystemHeader`, `Header`, `Content`
- header: `ProgressAppBar(title="회원 가입", currentStep=2, totalSteps=5, progressLabel="2 / 5")`
- bottom: `none-visible-in-current-contract`
- visible content sections: `intro`, `memberInfo`
- mounted hidden sections: `entryBranch`
- wireReference: `apps/mobile/src/screen-diagrams/skt-genui-test-0512/detail-form/personal-info-input.diagram.md`
- wireReferenceIntent: use stacked form density and input-state readability only
- wireReferenceLimitation: reference bottom CTA, address/auth sections, and divider bands are not part of this route contract

## Screen Wire

```txt
┌─AppScreen 375×812─────────────────────────────────────┐
├─SystemHeader──────────────────────────────────────────┤
│ 9:41                                      ▮▮▮  wifi ▰ │
│                                                        │
├─Header────────────────────────────────────────────────┤
│                                                        │
│   ‹   회원 가입                                       │
│   ━━━━━━━━━━━━━━━━ progress ━━━━━━━━        2 / 5     │
├─Content(scroll)───────────────────────────────────────┤
│                                                        │
│ [intro]                                               │
│   개인정보 입력                                       │
│                                                        │
│ [memberInfo]                                          │
│   ┌──────────────────────────────────┐  ┌──────────┐   │
│   │ 아이디                           │  │ 중복확인 │   │
│   │ 영문, 숫자 6~20자                │  │          │   │
│   └──────────────── empty input ─────┘  └─ button ─┘   │
│   영문 소문자 또는 숫자 6~20자                       │
│                                                        │
│   ┌────────────────────────────────────────────────┐   │
│   │ 비밀번호                                       │   │
│   │ 영문/숫자/특수문자 조합 10~20자                │   │
│   └──────────────────── secure input field ────────┘   │
│   영문/숫자/특수문자를 조합해 주세요.                │
│                                                        │
│   ┌────────────────────────────────────────────────┐   │
│   │ 비밀번호 확인                                  │   │
│   │ 비밀번호 재입력                                │   │
│   └──────────────────── secure input field ────────┘   │
│                                                        │
│   ┌────────────────────────────────────────────────┐   │
│   │ 이메일                                         │   │
│   │ example@domain.com                             │   │
│   └──────────────────── empty input field ─────────┘   │
│                                                        │
│   ┌────────────────────────────────────────────────┐   │
│   │ 휴대폰번호                                     │   │
│   │ 숫자만 입력                                    │   │
│   └──────────────────── numeric input field ───────┘   │
│                                                        │
│ [entryBranch]                                         │
│   hidden mounted section                              │
│   SectionMessageEntryBranch visible=false             │
│                                                        │
└────────────────────────────────────────────────────────┘
```

## Section Contracts

### [intro]

- slot: `Content`
- OGN: `ogn-mbr-section-header-page`
- role: Introduce the 개인정보 입력 task within 가입 step 2.
- visibleTitle: `개인정보 입력`
- policy: structural title from implementation; field validation policy is owned by `memberInfo`
- appliedGovernanceRefs: `UXPT_NAV`, `VOT_RUL`
- ognBoundaryDecision: reuse `ogn-mbr-section-header-page`; the organism owns the visible task title while the progress header remains screen chrome.
- layoutStrategy: first content section under the progress header; no duplicate progress text inside content
- layoutContract: role=step task intro; structure=single section title; alignment=leading; density=compact form opening; wrapping=title should remain stable in content rail; distortionRisk=duplicating progress or adding unsupported explanatory copy.
- componentCandidates: `SectionHeaderPage` (fit: strong, source: current organism, reason: matches current intro title contract, risk: low).
- vocabularyDecision: reuse `SectionHeaderPage`
- distortionRisk: low; risk is adding explanatory copy that is not visible in the current contract

### [memberInfo]

- slot: `Content`
- OGN: `ogn-mbr-text-field-member-info`
- role: Capture member information and own field-level validation for id, password, and phone number.
- visibleContent: stacked member information fields for id, password, password confirmation, email, and phone; id field includes `중복확인`
- policy: `POL-MBR-INFO-002-03`, `POL-MBR-INFO-002-04`, `POL-MBR-INFO-002-05`, `POL-MBR-INFO-002-06`, `POL-MBR-INFO-002-08`
- appliedGovernanceRefs: `UXPT_ERR`, `VOT_RUL`, `UXP_ACT`
- ognBoundaryDecision: reuse `ogn-mbr-text-field-member-info`; the organism owns field labels, helper text, validation copy, and the id duplicate-check action.
- layoutStrategy: dense stacked form rhythm in `Content(scroll)`; field copy and errors are not duplicated by the route
- layoutContract: role=member information form; structure=stacked input fields with inline id action and field-level helpers/errors; alignment=leading inputs with stable inline button alignment; density=dense form rhythm; wrapping=helper/error text may wrap under its field without becoming global notices; distortionRisk=validation meaning is distorted if policies are rendered outside the field organism.
- componentCandidates: `TextFieldMemberInfo` (fit: strong, source: current organism, reason: owns all member-info fields and validation behavior, risk: medium if split into route-level fields/notices).
- vocabularyDecision: reuse `TextFieldMemberInfo`
- distortionRisk: medium; validation rules become confusing if rendered as separate notices outside the field organism

### [entryBranch]

- slot: `Content`
- OGN: `ogn-mbr-section-message-entry-branch`
- role: Reserve 가입 분기 안내 behavior for states that expose branch messaging.
- visibleContent: none in current state; section is mounted with `visible={false}`
- policy: no visible policy requirement in this state
- appliedGovernanceRefs: `VOT_RUL`
- ognBoundaryDecision: reuse hidden `ogn-mbr-section-message-entry-branch`; the organism remains mounted for branch states but contributes no visible content here.
- layoutStrategy: keep after `memberInfo` in logical content order but hidden
- layoutContract: role=reserved entry-branch messaging state; structure=hidden mounted section only; alignment=none visible; density=no visible spacing contribution; wrapping=not applicable while hidden; distortionRisk=visible branch copy or placeholder spacing would imply a state change.
- componentCandidates: `SectionMessageEntryBranch` (fit: strong, source: current hidden organism, reason: preserves current `visible={false}` branch boundary, risk: medium if surfaced).
- vocabularyDecision: reuse `SectionMessageEntryBranch`
- distortionRisk: medium; visible branch copy, CTA, or spacing placeholder would imply a state change

## Policy / OGN Matrix

### [intro]

- visibleEvidence: `개인정보 입력`
- policyInterpretation: provides the task label for step 2; validation policy is not expressed here
- OGNInterpretation: `ogn-mbr-section-header-page`
- decision: preserve as first content section under `ProgressAppBar`

### [memberInfo]

- visibleEvidence: id with `중복확인`, password, password confirmation, email, and phone input stack
- policyInterpretation: `POL-MBR-INFO-002-03`, `POL-MBR-INFO-002-04`, `POL-MBR-INFO-002-05`, `POL-MBR-INFO-002-06`, and `POL-MBR-INFO-002-08` define the field constraints and error conditions
- OGNInterpretation: `ogn-mbr-text-field-member-info`
- decision: keep all field behavior inside the member-info organism

### [entryBranch]

- visibleEvidence: none; mounted hidden section only
- policyInterpretation: no branch message is visible in the current state
- OGNInterpretation: `ogn-mbr-section-message-entry-branch`
- decision: preserve as hidden state; do not create branch copy in the diagram

## Distortion Gates

- Keep `AppScreen.Content` as the only scroll owner.
- Preserve `ProgressAppBar(title="회원 가입", currentStep=2, totalSteps=5, progressLabel="2 / 5")` in the `Header` slot.
- Keep content order exactly `[intro]`, `[memberInfo]`, hidden `[entryBranch]`.
- Do not add `Bottom`, fixed CTA, or `[actions]`; the current visible contract has no bottom slot.
- Use only the standard bottom slot name when a bottom action exists; no legacy bottom-action alias appears in this diagram.
- Keep `entryBranch` hidden while `visible={false}`.
- Bind id, password, and phone constraints to `TextFieldMemberInfo`; do not render validation policy as route-level notices.
- Use the wire reference only as a field-density guide; its address/auth/bottom sections are outside this screen contract.
