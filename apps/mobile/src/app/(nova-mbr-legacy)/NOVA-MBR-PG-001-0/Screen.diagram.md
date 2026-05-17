# NOVA-MBR-PG-001-0 — MBR 가입 1·약관 동의

## Screen Contract

- screenId: `NOVA-MBR-PG-001-0`
- route: `/NOVA-MBR-PG-001-0`
- group: `nova-mbr-legacy`
- domain: `mbr`
- pattern: `form`
- implementation source: `Screen.tsx`
- policyRefs: `POL-MBR-TERM-001-06`, `POL-MBR-TERM-002-01`, `POL-MBR-TERM-002-05`
- OGN refs: `ogn-mbr-section-header-page`, `ogn-mbr-checkbox-terms`, `ogn-mbr-text-field-guardian-request`, `ogn-mbr-action-area-terms`
- appliedGovernanceRefs: `UXPT_BTN`, `UXPT_ERR`, `UXPT_NAV`, `VOT_RUL`
- AppScreen slots: `SystemHeader`, `Header`, `Content`, `Bottom`
- header: `AppBar(title="회원 가입")`
- bottom: `Bottom(preset="primary-cta")`
- visible primary CTA: disabled action owned by `ActionAreaTerms`
- visible content sections: `intro`, `terms`
- mounted hidden sections: `guardian`
- wireReference: `apps/mobile/src/screen-diagrams/skt-genui-test-0512/detail-form/personal-info-input.diagram.md`
- wireReferenceIntent: use AppScreen rails, scroll rhythm, and fixed bottom CTA placement only
- wireReferenceLimitation: reference form fields, dividers, address sections, and enabled CTA do not apply to this terms-consent state

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
│   약관 동의                                           │
│   회원 가입을 위한 필수·선택 약관에 동의해 주세요     │
│                                                        │
│ [terms]                                               │
│   ┌────────────────────────────────────────────────┐   │
│   │ □ 전체 동의                                    │   │
│   │   필수·선택 약관을 모두 동의합니다             │   │
│   │ ────────────────────────────────────────────── │   │
│   │ □ [필수] 서비스 이용약관 동의                  │   │
│   │   회원 가입 및 서비스 이용을 위해 필요합니다.  │   │
│   │ □ [필수] 개인정보 수집·이용 동의               │   │
│   │   이름·연락처 등 회원 정보 처리에 필요합니다.  │   │
│   │ □ [선택] 마케팅 정보 수신 동의                 │   │
│   │   혜택·이벤트 안내를 받습니다.                 │   │
│   └──────────────────────── terms checklist ───────┘   │
│   ┌────────────────────────────────────────────────┐   │
│   │ 필수 약관 동의가 필요합니다                    │   │
│   │ 2개의 필수 약관에 동의해 주세요.               │   │
│   └──────────────────────── negative notice ───────┘   │
│                                                        │
│ [guardian]                                            │
│   hidden mounted section                              │
│   TextFieldGuardianRequest visible=false              │
│                                                        │
├─Bottom(preset="primary-cta")──────────────────────────┤
│ [actions]                                             │
│   ┌────────────────────────────────────────────────┐   │
│   │                      다음                      │   │
│   └──────────────────── disabled primary CTA ──────┘   │
└────────────────────────────────────────────────────────┘
```

## Section Contracts

### [intro]

- slot: `Content`
- OGN: `ogn-mbr-section-header-page`
- role: Introduce the membership terms step and set the agreement task before the checklist.
- visibleTitle: `약관 동의`
- visibleContent: `회원 가입을 위한 필수·선택 약관에 동의해 주세요`
- policy: supports `POL-MBR-TERM-001-06` by making the agreement task explicit before the blocking action
- appliedGovernanceRefs: `UXPT_NAV`, `VOT_RUL`
- ognBoundaryDecision: reuse `ogn-mbr-section-header-page`; the organism owns intro title/subtitle copy while the screen owns only Content placement.
- layoutStrategy: first content section below `Header`; no divider before the opening page header
- layoutContract: role=step intro; structure=title plus supporting copy; alignment=leading; density=comfortable opening section; wrapping=subtitle may wrap within content rail; distortionRisk=intro must not become header chrome or policy prose.
- componentCandidates: `SectionHeaderPage` (fit: strong, source: current organism, reason: directly owns page-intro copy, risk: low).
- vocabularyDecision: reuse `SectionHeaderPage`
- distortionRisk: low; risk appears if the intro is collapsed into the header or expanded with policy prose

### [terms]

- slot: `Content`
- OGN: `ogn-mbr-checkbox-terms`
- role: Present required and optional terms agreement choices that determine whether progression is allowed.
- visibleContent: terms checklist with all-agree affordance, individual agreement rows, and required-agreement negative notice while required items are unchecked
- policy: primary visible contract for `POL-MBR-TERM-001-06`
- appliedGovernanceRefs: `UXPT_BTN`, `UXPT_ERR`, `VOT_RUL`
- ognBoundaryDecision: reuse `ogn-mbr-checkbox-terms`; agreement state, all-agree behavior, required/optional hierarchy, and negative notice stay inside the OGN.
- layoutStrategy: placed directly after `intro` in `Content(scroll)`; checklist ownership stays inside the OGN
- layoutContract: role=terms choice and blocking-state explanation; structure=checklist card/list plus negative notice; alignment=leading rows with stable checkbox-label relationship; density=grouped form rhythm; wrapping=row captions may wrap without changing row order; distortionRisk=required/optional hierarchy or error state becomes unclear if split across route markup.
- componentCandidates: `CheckboxTerms` (fit: strong, source: current organism, reason: owns checklist logic and visible negative notice, risk: medium if recreated as route-local rows).
- vocabularyDecision: reuse `CheckboxTerms`; do not invent route-local checkbox rows
- distortionRisk: medium; required/optional hierarchy and error states can be distorted if agreement logic is moved outside the OGN

### [guardian]

- slot: `Content`
- OGN: `ogn-mbr-text-field-guardian-request`
- role: Reserve guardian consent request behavior for under-14 membership states.
- visibleContent: none in the current state; section is mounted with `visible={false}`
- policy: `POL-MBR-TERM-002-01`, `POL-MBR-TERM-002-05`
- appliedGovernanceRefs: `UXPT_ERR`, `VOT_RUL`
- ognBoundaryDecision: reuse hidden `ogn-mbr-text-field-guardian-request`; the organism remains mounted for the guardian state but contributes no visible layout in this state.
- layoutStrategy: keep after `terms` in logical content order but do not draw fields, timer, helper, or error copy while hidden
- layoutContract: role=reserved guardian consent state; structure=hidden mounted section only; alignment=none visible; density=no visible spacing contribution; wrapping=not applicable while hidden; distortionRisk=visible fields or timers would imply a different state.
- componentCandidates: `TextFieldGuardianRequest` (fit: strong, source: current hidden organism, reason: preserves current `visible={false}` boundary, risk: high if shown in initial state).
- vocabularyDecision: reuse `TextFieldGuardianRequest`
- distortionRisk: high; showing this section in the wire would imply a different screen state

### [actions]

- slot: `Bottom`
- OGN: `ogn-mbr-action-area-terms`
- role: Own the bottom progression action and reflect the blocked state before required terms are satisfied.
- visibleContent: disabled primary CTA
- policy: enforces `POL-MBR-TERM-001-06`
- appliedGovernanceRefs: `UXPT_BTN`, `UXPT_ERR`, `UXPT_NAV`, `VOT_RUL`
- ognBoundaryDecision: reuse `ogn-mbr-action-area-terms`; the OGN owns disabled progression state while `Bottom(preset="primary-cta")` owns fixed rail placement.
- layoutStrategy: fixed `Bottom(preset="primary-cta")`; content never creates fixed CTA chrome
- layoutContract: role=bottom primary progression action; structure=single disabled primary CTA in Bottom rail; alignment=full-width rail button; density=standard primary-cta bottom spacing; wrapping=button label remains centered; distortionRisk=enabled state or secondary actions would change the policy state.
- componentCandidates: `ActionAreaTerms` (fit: strong, source: current organism, reason: owns disabled terms action state, risk: medium if replaced by generic enabled CTA).
- vocabularyDecision: reuse `ActionAreaTerms disabled`
- distortionRisk: medium; risk appears if the action is documented as enabled or if secondary actions are added

## Policy / OGN Matrix

### [intro]

- visibleEvidence: `약관 동의`, membership agreement task copy
- policyInterpretation: introduces the agreement step before the required consent checklist
- OGNInterpretation: `ogn-mbr-section-header-page`
- decision: preserve as the first content section

### [terms]

- visibleEvidence: all-agree row, individual terms rows, and negative notice `필수 약관 동의가 필요합니다`
- policyInterpretation: visible source for `POL-MBR-TERM-001-06`; required agreement controls CTA availability
- OGNInterpretation: `ogn-mbr-checkbox-terms`
- decision: keep agreement hierarchy inside the terms OGN

### [guardian]

- visibleEvidence: none; mounted hidden section only
- policyInterpretation: `POL-MBR-TERM-002-01` and `POL-MBR-TERM-002-05` are reserved for the guardian consent state
- OGNInterpretation: `ogn-mbr-text-field-guardian-request`
- decision: preserve as hidden state; do not surface guardian request UI in this diagram

### [actions]

- visibleEvidence: disabled bottom primary CTA `다음`
- policyInterpretation: progression is blocked until required agreement rules are satisfied
- OGNInterpretation: `ogn-mbr-action-area-terms`
- decision: keep the action in `Bottom(preset="primary-cta")`

## Distortion Gates

- Keep section order as `[intro]`, `[terms]`, hidden `[guardian]`, then bottom `[actions]`.
- Preserve explicit AppScreen rails: `SystemHeader`, `Header`, `Content(scroll)`, and `Bottom(preset="primary-cta")`.
- Use only the standard bottom slot name; no legacy bottom-action alias appears in this diagram.
- Do not add divider bands between `intro` and `terms`; the current terms screen does not require Figma-style section divider bands.
- Do not surface guardian fields, timer, helper, or error copy while `TextFieldGuardianRequest visible={false}` remains the current state.
- Do not describe the CTA as enabled.
- Use the wire reference only for AppScreen form structure and bottom CTA placement; do not import its address/email sections.
