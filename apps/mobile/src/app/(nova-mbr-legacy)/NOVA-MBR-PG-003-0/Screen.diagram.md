# NOVA-MBR-PG-003-0 — MBR 가입 3·본인인증

## Screen Contract

- screenId: `NOVA-MBR-PG-003-0`
- route: `/NOVA-MBR-PG-003-0`
- group: `nova-mbr-legacy`
- domain: `mbr`
- pattern: `form`
- implementation source: `Screen.tsx`
- policyRefs: `POL-MBR-AUTH-001-01`, `POL-MBR-AUTH-002-01`, `POL-MBR-AUTH-002-05`, `POL-MBR-AUTH-002-09`, `POL-MBR-AUTH-005-01`, `POL-MBR-AUTH-005-03`, `POL-MBR-AUTH-005-07`
- OGN refs: `ogn-mbr-section-header-page`, `ogn-mbr-list-cell-auth-method`
- appliedGovernanceRefs: `UXPT_BTN`, `UXPT_ERR`, `UXPT_NAV`, `VOT_RUL`
- AppScreen slots: `SystemHeader`, `Header`, `Content`, `Bottom`
- header: `AppBar(title="회원 가입")`
- bottom: `Bottom(preset="primary-cta")`
- visible primary CTA: `인증 완료`, disabled
- visible content sections: `intro`, `authMethods`
- structural sections: `actions`
- wireReference: `apps/mobile/src/screen-diagrams/skt-genui-test-0512/detail-form/personal-info-input.diagram.md`
- wireReferenceIntent: use AppScreen rails and fixed bottom CTA placement only
- wireReferenceLimitation: reference fields and address sections are not part of the authentication route

## Screen Wire

```txt
┌─AppScreen 375×812─────────────────────────────────────┐
├─SystemHeader──────────────────────────────────────────┤
│ 9:41                                      ▮▮▮  wifi ▰ │
│                                                        │
├─Header────────────────────────────────────────────────┤
│                                                        │
│   ‹   회원 가입                                       │
├─Content(scroll)───────────────────────────────────────┤
│                                                        │
│ [intro]                                               │
│   본인 인증                                           │
│   본인 명의 인증 수단으로 가입자를 확인해 주세요      │
│                                                        │
│ [authMethods]                                         │
│   ┌────────────────────────────────────────────────┐   │
│   │ ● 휴대폰 인증                                  │   │
│   │   본인 명의 휴대폰으로 인증                    │   │
│   │ ────────────────────────────────────────────── │   │
│   │ ○ PASS 인증                                    │   │
│   │   통신사 PASS 앱으로 인증                      │   │
│   │ ────────────────────────────────────────────── │   │
│   │ ○ 공동인증서                                   │   │
│   │   공동·금융인증서로 인증                       │   │
│   └──────────────────────── auth method list ──────┘   │
│   ┌────────────────────────────────────────────────┐   │
│   │ 인증번호                                       │   │
│   │ 6자리 숫자                                     │   │
│   └──────────────────── numeric input field ───────┘   │
│   유효시간 02:48                                    │
│   ┌──────────────────────┐ ┌───────────────────────┐  │
│   │        재요청        │ │      인증번호 요청     │  │
│   └──── secondary button ┘ └───── primary button ───┘  │
│                                                        │
├─Bottom(preset="primary-cta")──────────────────────────┤
│ [actions]                                             │
│   ┌────────────────────────────────────────────────┐   │
│   │                    인증 완료                   │   │
│   └──────────────────── disabled primary CTA ──────┘   │
└────────────────────────────────────────────────────────┘
```

## Section Contracts

### [intro]

- slot: `Content`
- OGN: `ogn-mbr-section-header-page`
- role: Explain the purpose of identity verification before the user chooses a method.
- visibleTitle: `본인 인증`
- visibleContent: `본인 명의 인증 수단으로 가입자를 확인해 주세요`
- policy: `POL-MBR-AUTH-001-01`, `POL-MBR-AUTH-002-01`
- appliedGovernanceRefs: `UXPT_NAV`, `VOT_RUL`
- layoutStrategy: first content section under `Header`; title precedes subtitle with no route-level typography overrides
- vocabularyDecision: reuse `SectionHeaderPage`
- distortionRisk: low; risk is replacing current copy with legacy step copy during recreation

### [authMethods]

- slot: `Content`
- OGN: `ogn-mbr-list-cell-auth-method`
- role: Present available identity verification methods and request-code controls.
- visibleContent: radio method list, 인증번호 field, `재요청`, and `인증번호 요청` controls owned by `ListCellAuthMethod`
- policy: `POL-MBR-AUTH-002-01`, `POL-MBR-AUTH-002-05`, `POL-MBR-AUTH-002-09`
- appliedGovernanceRefs: `UXPT_ERR`, `VOT_RUL`
- layoutStrategy: full method list remains in `Content(scroll)`; generated row order must preserve policy order
- vocabularyDecision: reuse `ListCellAuthMethod`; do not replace with custom list markup in the route
- distortionRisk: medium; unsupported method labels or reordered rows would distort the policy contract

### [actions]

- slot: `Bottom`
- OGN: structural-only; current `MbrPrimaryCTABar` has no config OGN ID
- role: Show the verification-complete action surface for the current initial state.
- visibleContent: disabled primary CTA `인증 완료`
- policy: action state is current implementation behavior; auth failure and restriction policies remain state-bound
- appliedGovernanceRefs: `UXPT_BTN`, `UXPT_NAV`
- layoutStrategy: fixed `Bottom(preset="primary-cta")`; content never creates fixed or absolute CTA chrome
- vocabularyDecision: reuse `MbrPrimaryCTABar`; do not add a non-existent OGN ID to config
- distortionRisk: medium; future recreation could incorrectly treat the bottom bar as a registered OGN

## Policy / OGN Matrix

### [intro]

- visibleEvidence: `본인 인증`, `본인 명의 인증 수단으로 가입자를 확인해 주세요`
- policyInterpretation: `POL-MBR-AUTH-001-01` and `POL-MBR-AUTH-002-01` establish identity verification as the step task
- OGNInterpretation: `ogn-mbr-section-header-page`
- decision: keep as the first content section

### [authMethods]

- visibleEvidence: authentication method rows, 인증번호 field, `재요청`, and `인증번호 요청`
- policyInterpretation: `POL-MBR-AUTH-002-01`, `POL-MBR-AUTH-002-05`, and `POL-MBR-AUTH-002-09` define the available/default verification method behavior
- OGNInterpretation: `ogn-mbr-list-cell-auth-method`
- decision: keep all selectable method rows inside the auth-method OGN

### [authFailureAndRestriction]

- visibleEvidence: none in the initial state
- policyInterpretation: `POL-MBR-AUTH-005-01`, `POL-MBR-AUTH-005-03`, and `POL-MBR-AUTH-005-07` apply to failure, retry, or restricted states
- OGNInterpretation: structural-only future state; no current OGN in config
- decision: preserve policy refs without inventing initial-state error UI

### [actions]

- visibleEvidence: disabled bottom CTA `인증 완료`
- policyInterpretation: completion action is present but unavailable until verification state changes
- OGNInterpretation: structural-only `MbrPrimaryCTABar`
- decision: keep in `Bottom(preset="primary-cta")` and out of config `ognIds`

## Distortion Gates

- Preserve explicit AppScreen rails: `SystemHeader`, `Header`, `Content(scroll)`, and `Bottom(preset="primary-cta")`.
- Keep section order exactly `[intro]`, `[authMethods]`, then bottom `[actions]`.
- Use only the standard bottom slot name; no legacy bottom-action alias appears in this diagram.
- Do not add route-level margin, padding, raw font sizing, fixed positioning, or custom CTA chrome.
- Register only `ogn-mbr-section-header-page` and `ogn-mbr-list-cell-auth-method` in config `ognIds`.
- Treat bottom CTA and auth failure/retry surfaces as structural-only until supported OGN IDs exist.
- Do not surface failure, retry, lockout, or restriction copy in the initial screen wire.
