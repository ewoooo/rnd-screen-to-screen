# Frame 01 — 상세_정보 입력_인풋

## Screen Contract

- reference pack: `SKT GenUI Test 0512 / node 14243:28433 / frame index 01`
- figma source: `SKT GenUI Test 0512` / exact frame `상세_정보 입력_인풋` (`14243:28434`, `393×1186`)
- figma verification: screenshot from exact node + shallow text/geometry inspection from exact node
- route: `reference-only/not-an-implementation-route`
- screen title: `가입자 정보 입력`
- pattern: `form`
- source confidence: `figma-screenshot + exact-node-text-inspection`
- policy refs: `unknown-from-figma-only/TBD`
- OGN refs: `unknown-from-figma-only/TBD`
- AppScreen slots: `Header`, `Content`, `Bottom`
- bottom: `Bottom(preset="primary-cta")`
- visible primary CTA: `다음`
- visible content sections: `phone`, `authComplete`, `subscriberAddress`, `homeArea`, `email`

## Screen Wire

```txt
┌─AppScreen 393×1186────────────────────────────────────┐
├─Header────────────────────────────────────────────────┤
│ 9:41                                      ▮▮▮  wifi ▰ │
│                                                        │
│   ‹   가입자 정보 입력                                │
├─Content(scroll)───────────────────────────────────────┤
│                                                        │
│ [phone]                                               │
│   기기변경 휴대폰 번호                                │
│   ┌────────────────────────────────────────────────┐   │
│   │ 010-1234-5678                                  │   │
│   └──────────────────── disabled gray field ───────┘   │
│                                                        │
├══Divider 4px / bg-alt══════════════════════════════════┤
│                                                        │
│ [authComplete]                                        │
│   본인인증 완료                                       │
│   조현호 고객님의 본인인증이 완료되었습니다.          │
│                                                        │
├══Divider 4px / bg-alt══════════════════════════════════┤
│                                                        │
│ [subscriberAddress]                                   │
│   가입자 주소                                         │
│   ┌──────────────────────────────────┐  ┌──────────┐   │
│   │ 01155                            │  │ 주소 찾기│   │
│   └──────────── disabled gray field ─┘  └─ button ─┘   │
│   ┌────────────────────────────────────────────────┐   │
│   │ 서울 강북구 오현로 45,                         │   │
│   └──────────────────── disabled gray field ───────┘   │
│   ┌────────────────────────────────────────────────┐   │
│   │ 107동 203호(미아동, 꿈의숲해링턴플레이스)      │   │
│   └──────────────────── typed bordered field ──────┘   │
│                                                        │
├══Divider 4px / bg-alt══════════════════════════════════┤
│                                                        │
│ [homeArea]                                            │
│   주 생활지역                                         │
│   ● 가입자 정보와 동일                               │
│   ┌──────────────────────────────────┐  ┌──────────┐   │
│   │ 01155                            │  │ 주소 찾기│   │
│   └──────────── disabled gray field ─┘  └─ button ─┘   │
│   ┌────────────────────────────────────────────────┐   │
│   │ 서울 강북구 오현로 45,                         │   │
│   └──────────────────── disabled gray field ───────┘   │
│   5G 가용지역 확인 동의를 위한 정보                  │
│                                                        │
├══Divider 4px / bg-alt══════════════════════════════════┤
│                                                        │
│ [email]                                               │
│   이메일                                              │
│   ┌────────────────────────────────────────────────┐   │
│   │ example@plus-ex.com                            │   │
│   └──────────────────── typed bordered field ──────┘   │
│                                                        │
├─Bottom(preset="primary-cta")──────────────────────────┤
│ [actions]                                             │
│   ┌────────────────────────────────────────────────┐   │
│   │                      다음                      │   │
│   └──────────────────── brand primary button ──────┘   │
└────────────────────────────────────────────────────────┘
```

## Section Contracts

### [phone]

- slot: `Content`
- visibleTitle: `기기변경 휴대폰 번호`
- visibleContent: disabled gray text field containing `010-1234-5678`
- vocabularyDecision: reuse `PageStackContents`, `TitleSection`, `TextFieldDisabled`
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [authComplete]

- slot: `Content`
- visibleTitle: `본인인증 완료`
- visibleContent: muted list text `조현호 고객님의 본인인증이 완료되었습니다.`
- vocabularyDecision: reuse `PageStackContents`, `TitleSection`, `ListText`
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [subscriberAddress]

- slot: `Content`
- visibleTitle: `가입자 주소`
- visibleContent: disabled postal code field `01155` + `주소 찾기`, disabled base address, typed bordered detail address
- vocabularyDecision: reuse `PageStackContents`, `TitleSection`, `TextFieldDisabled`, `TextFieldTyped`, `Button`
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [homeArea]

- slot: `Content`
- visibleTitle: `주 생활지역`
- visibleContent: checked row `가입자 정보와 동일`, disabled postal code field `01155` + `주소 찾기`, disabled base address, helper `5G 가용지역 확인 동의를 위한 정보`
- vocabularyDecision: reuse `PageStackContents`, `TitleSection`, `CheckBox`, `TextFieldDisabled`, `Button`, `HelpText`
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [email]

- slot: `Content`
- visibleTitle: `이메일`
- visibleContent: typed bordered email field `example@plus-ex.com`
- vocabularyDecision: reuse `PageStackContents`, `TitleSection`, `TextFieldTyped`
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [actions]

- slot: `Bottom`
- visibleTitle: `다음`
- visibleContent: fixed bottom brand primary CTA
- vocabularyDecision: reuse `Bottom(preset="primary-cta")`, `Button`
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

## Policy / OGN Matrix

### [phone]

- visibleEvidence: `기기변경 휴대폰 번호`, disabled field `010-1234-5678`
- policyInterpretation: phone number is present and non-editable in this state; exact policy item is not visible in Figma
- OGNInterpretation: `unknown-from-figma-only/TBD`
- decision: preserve as disabled field; do not add edit action or validation copy

### [authComplete]

- visibleEvidence: `본인인증 완료`, `조현호 고객님의 본인인증이 완료되었습니다.`
- policyInterpretation: identity verification is already complete for this form state; exact policy source is not visible
- OGNInterpretation: `unknown-from-figma-only/TBD`
- decision: preserve as simple muted completion text; do not invent alternate auth states

### [subscriberAddress]

- visibleEvidence: `가입자 주소`, `01155`, `주소 찾기`, `서울 강북구 오현로 45,`, `107동 203호(미아동, 꿈의숲해링턴플레이스)`
- policyInterpretation: subscriber address capture is visible; required/optional and editability rules are not visible
- OGNInterpretation: `unknown-from-figma-only/TBD`
- decision: keep two disabled address fields plus one typed detail field exactly as shown

### [homeArea]

- visibleEvidence: `주 생활지역`, checked `가입자 정보와 동일`, address fields, `5G 가용지역 확인 동의를 위한 정보`
- policyInterpretation: home area can mirror subscriber information and is related to 5G availability consent/info; exact rule is not visible
- OGNInterpretation: `unknown-from-figma-only/TBD`
- decision: preserve checked state, disabled mirrored fields, and helper text only

### [email]

- visibleEvidence: `이메일`, `example@plus-ex.com`
- policyInterpretation: email field is filled; validation rules are not visible
- OGNInterpretation: `unknown-from-figma-only/TBD`
- decision: preserve a single typed bordered field with no invented error/helper state

### [actions]

- visibleEvidence: bottom CTA `다음`
- policyInterpretation: next-step progression is available; enablement rules are not visible
- OGNInterpretation: `unknown-from-figma-only/TBD`
- decision: render as fixed `Bottom(preset="primary-cta")` brand button

## Distortion Gates

- Use exact Figma frame `14243:28434` as the visual SOT; do not substitute the parent section `14243:28433` or an older crop.
- Keep the AppScreen rails explicit: `Header`, scrollable `Content`, and fixed `Bottom(preset="primary-cta")`.
- Preserve the four visible 4px divider bands between the five content sections; do not replace them with whitespace-only gaps.
- Maintain the field state distinction from Figma: gray disabled fields for phone, postal code, and base address; bordered typed fields for address detail and email.
- Keep `가입자 정보와 동일` as a checked control inside `homeArea`, before the home-area address fields.
- Do not surface hidden component placeholder text such as `레이블`, `Help Text`, or template `타이틀` from the Figma component internals.
- Do not invent policy IDs, OGN IDs, route names, validation messages, optional states, or copy not visible in the exact Figma node.
- Long address text must remain inside a single field row in the diagram and must not imply wrapping over the next section or the bottom CTA.
