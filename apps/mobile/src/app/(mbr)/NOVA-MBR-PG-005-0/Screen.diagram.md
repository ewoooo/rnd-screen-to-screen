# NOVA-MBR-PG-005-0 — MBR 가입 5·가입 완료

## Screen Contract

- screenId: `NOVA-MBR-PG-005-0`
- route: `/NOVA-MBR-PG-005-0`
- group: `mbr`
- domain: `mbr`
- pattern: `complete`
- implementation source: `Screen.tsx`
- policyRefs: `POL-MBR-ACCT-001-09`, `POL-MBR-SESS-001-03`, `POL-MBR-SESS-001-07`, `POL-MBR-PROF-001-08`
- OGN refs: `ogn-mbr-section-header-page`, `ogn-mbr-section-message-join-complete-view`
- appliedGovernanceRefs: `UXPT_BTN`, `UXPT_NAV`, `VOT_RUL`, `VOT_DEF`
- AppScreen slots: `SystemHeader`, `Header`, `Content`, `Bottom`
- header: `AppBar(title="회원 가입")`
- bottom: `Bottom(preset="primary-cta")`
- visible primary CTA: `홈으로 이동`
- visible content sections: `intro`, `completeMessage`
- structural sections: `actions`
- wireReference: `apps/mobile/src/app/(legacy-converted-mbr)/LEGACY-MBR-PG-002-0-CX/Screen.diagram.md`
- wireReferenceIntent: use only complete-screen result hierarchy and bottom action placement
- wireReferenceLimitation: legacy component names and copy do not override current MBR route contract

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
│   가입이 완료되었습니다                               │
│   잠시 후 홈으로 이동합니다                           │
│                                                        │
│ [completeMessage]                                     │
│   ┌────────────────────────────────────────────────┐   │
│   │ 가입이 정상 처리되었습니다                     │   │
│   │ 일반 회원으로 자동 로그인됩니다.                │   │
│   └──────────────────────── positive notice ───────┘   │
│   가입 후 이용 안내                                  │
│   · 세션 유효시간은 24시간입니다.                    │
│   · 가입 완료 후 홈으로 이동합니다.                  │
│                                                        │
├─Bottom(preset="primary-cta")──────────────────────────┤
│ [actions]                                             │
│   ┌────────────────────────────────────────────────┐   │
│   │                   홈으로 이동                  │   │
│   └──────────────────── brand primary button ──────┘   │
└────────────────────────────────────────────────────────┘
```

## Section Contracts

### [intro]

- slot: `Content`
- OGN: `ogn-mbr-section-header-page`
- role: Communicate signup completion and the immediate home-transition cue.
- visibleTitle: `가입이 완료되었습니다`
- visibleContent: `잠시 후 홈으로 이동합니다`
- policy: `POL-MBR-ACCT-001-09`, `POL-MBR-SESS-001-07`
- appliedGovernanceRefs: `UXPT_NAV`, `VOT_RUL`, `VOT_DEF`
- layoutStrategy: first content section below `Header`; result copy stays in `SectionHeaderPage`
- vocabularyDecision: reuse the existing MBR section-header organism
- distortionRisk: low; risk appears if backend status terminology replaces user-facing completion copy

### [completeMessage]

- slot: `Content`
- OGN: `ogn-mbr-section-message-join-complete-view`
- role: Hold detailed completion-state messaging for signup success, automatic login, and initial member state.
- visibleContent: positive completion notice and post-join guide list owned by `SectionMessageJoinCompleteView`
- policy: `POL-MBR-SESS-001-03`, `POL-MBR-PROF-001-08`
- appliedGovernanceRefs: `VOT_RUL`, `VOT_DEF`
- layoutStrategy: placed directly below `intro` inside `Content(scroll)`; no route-level cards or summary rows
- vocabularyDecision: reuse existing MBR completion-message organism
- distortionRisk: medium; detailed copy must stay policy-aligned, but this diagram does not redefine organism internals

### [actions]

- slot: `Bottom`
- OGN: structural-only; current `MbrPrimaryCTABar` has no config OGN ID
- role: Provide the explicit action to move home from the completion screen.
- visibleContent: primary CTA `홈으로 이동`
- policy: `POL-MBR-SESS-001-07`
- appliedGovernanceRefs: `UXPT_BTN`, `UXPT_NAV`, `VOT_RUL`
- layoutStrategy: fixed `Bottom(preset="primary-cta")`; do not move the CTA into scroll content
- vocabularyDecision: reuse `MbrPrimaryCTABar`; keep structural-only until a config OGN ID exists
- distortionRisk: low; risk appears if secondary actions compete with the home action

## Policy / OGN Matrix

### [intro]

- visibleEvidence: `가입이 완료되었습니다`, `잠시 후 홈으로 이동합니다`
- policyInterpretation: `POL-MBR-ACCT-001-09` and `POL-MBR-SESS-001-07` support completion result and transition expectation
- OGNInterpretation: `ogn-mbr-section-header-page`
- decision: preserve as the first content section

### [completeMessage]

- visibleEvidence: `가입이 정상 처리되었습니다`, `일반 회원으로 자동 로그인됩니다.`, `가입 후 이용 안내`, post-join guide rows
- policyInterpretation: `POL-MBR-SESS-001-03` and `POL-MBR-PROF-001-08` support automatic login and initial member-state messaging
- OGNInterpretation: `ogn-mbr-section-message-join-complete-view`
- decision: keep detailed completion message inside the organism

### [actions]

- visibleEvidence: bottom CTA `홈으로 이동`
- policyInterpretation: `POL-MBR-SESS-001-07` supports transition to home after completion
- OGNInterpretation: structural-only `MbrPrimaryCTABar`
- decision: keep in `Bottom(preset="primary-cta")` and out of config `ognIds`

## Distortion Gates

- Preserve `Header` title `회원 가입`; do not convert the completion route into a marketing or home screen.
- Keep content order as `[intro]`, `[completeMessage]`, then bottom `[actions]`.
- Preserve explicit AppScreen rails: `SystemHeader`, `Header`, `Content(scroll)`, and `Bottom(preset="primary-cta")`.
- Use only the standard bottom slot name; no legacy bottom-action alias appears in this diagram.
- Keep the primary action in the bottom slot; do not move `홈으로 이동` into scroll content.
- Keep `MbrPrimaryCTABar` structural-only in docs/config until a component config ID exists.
- Do not introduce additional completion summary fields, alternate destinations, or secondary actions beyond the current visible contract.
