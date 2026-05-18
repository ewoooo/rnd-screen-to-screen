# Frame 01 - 상세_정보 입력_인풋

## Screen Contract

- artifactType: `Screen Wire reference diagram`
- referencePack: `SKT GenUI Test 0512 / node 14243:28433 / frame index 01`
- figmaSource: `SKT GenUI Test 0512`
- figmaSot:
  - parentNode: `14243:28433`
  - exactNodeId: `14243:28434`
  - exactNodeName: `상세_정보 입력_인풋`
  - frame: `393x1186`
- figmaVerification: Figma metadata tool confirmed exact node id/name/frame and visible rail/component hierarchy on 2026-05-17.
- route: `reference-only/not-an-implementation-route`
- screenTitle: `가입자 정보 입력`
- pattern: `detail-form`
- wireReference:
  - source: `apps/mobile/src/screen-diagrams/skt-genui-test-0512/detail-form/personal-info-input.diagram.md`
  - matchedParts: exact frame reference; Header + scroll Content + fixed Bottom CTA; field groups separated by 4px section dividers
  - intentionalDifferences: none; this file is the visual reference itself
  - limitation: reference-only visual structure; policy/copy/OGN ids must come from policy-core before implementation
- sourceConfidence: `figma-metadata-tool-confirmed + existing exact-node evidence`
- policyRefs: `unknown-from-figma-only/TBD`
- OGNRefs: `unknown-from-figma-only/TBD`
- AppScreenSlots: `Header`, `Content`, `Bottom`
- bottom: `Bottom(preset="primary-cta")`
- visiblePrimaryCTA: `다음`
- visibleSections: `phone`, `authComplete`, `subscriberAddress`, `homeArea`, `email`, `actions`

## Screen Wire With Wire Semantic Tags

```txt
┌─AppScreen 393x1186────────────────────────────────────┐
├─Header────────────────────────────────────────────────┤
│ 9:41                                      ▮▮▮  wifi ▰ │
│                                                        │
│   ‹   가입자 정보 입력                                │
├─Content(scroll)───────────────────────────────────────┤
│                                                        │
│ [phone | readonly-field | section]                    │
│   기기변경 휴대폰 번호                                │
│   ┌────────────────────────────────────────────────┐   │
│   │ 010-1234-5678                                  │   │
│   └──────────────────── disabled gray field ───────┘   │
│                                                        │
├══Divider 4px / bg-alt══════════════════════════════════┤
│                                                        │
│ [authComplete | status-message | section]             │
│   본인인증 완료                                       │
│   조현호 고객님의 본인인증이 완료되었습니다.          │
│                                                        │
├══Divider 4px / bg-alt══════════════════════════════════┤
│                                                        │
│ [subscriberAddress | address-field-group | section]   │
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
│ [homeArea | checkbox-address-field-group | section]   │
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
│ [email | editable-field | section]                    │
│   이메일                                              │
│   ┌────────────────────────────────────────────────┐   │
│   │ example@plus-ex.com                            │   │
│   └──────────────────── typed bordered field ──────┘   │
│                                                        │
├─Bottom(preset="primary-cta")──────────────────────────┤
│ [actions | bottom-primary-action | bottom-fixed]      │
│   ┌────────────────────────────────────────────────┐   │
│   │                      다음                      │   │
│   └──────────────────── brand primary button ──────┘   │
└────────────────────────────────────────────────────────┘
```

## Section Contracts

### [phone]

- patternEvidence: Figma metadata shows `PageStackContents` with `TitleSection/Default` and one `TextField`; visible copy is `기기변경 휴대폰 번호` and disabled value `010-1234-5678`.
- patternDecision:
  - patternFamily: `readonly-form-field-section`
  - decision: `existing composition`
  - reason: single non-editable field in its own section; no policy evidence for edit or validation states.
- layoutStrategy: keep as a compact title + one disabled field section below Header.
- layoutContract:
  - role: show the phone number for this form state.
  - structure: section title, one full-width disabled field.
  - alignment: leading title and field value; field fills content column.
  - density: comfortable form density inside `PageStackContents`.
  - wrapping: phone value remains one line.
  - distortionRisk: enabling the field or adding edit affordances would invent behavior.
- componentCandidates:
  - candidate: `PageStackContents + TitleSection + disabled text field capability`
    fit: `strong`
    source: `Figma metadata component hierarchy`
    reason: supports title + full-width disabled field without route-level layout.
    risk: verify disabled visual state token before Build.
  - candidate: `generic key-value row`
    fit: `reject`
    source: `layout capability comparison`
    reason: loses visible field surface and disabled form affordance.
    risk: would make the section read as summary rather than input state.
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [authComplete]

- patternEvidence: Figma metadata shows `PageStackContents` with `TitleSection/Default` and `ListText`; visible copy confirms a completed identity-auth message.
- patternDecision:
  - patternFamily: `status-message-section`
  - decision: `existing composition`
  - reason: title plus one muted text row, no action or alternate auth state visible.
- layoutStrategy: render as a simple status section between 4px dividers.
- layoutContract:
  - role: communicate completed identity verification.
  - structure: section title + muted body text.
  - alignment: leading text stack.
  - density: compact message, no card boundary.
  - wrapping: body may wrap inside content column.
  - distortionRisk: turning it into a callout or warning would overstate the state.
- componentCandidates:
  - candidate: `PageStackContents + TitleSection + ListText capability`
    fit: `strong`
    source: `Figma metadata component hierarchy`
    reason: matches section title and one body-text row.
    risk: body text style must stay muted, not alert-like.
  - candidate: `notice callout`
    fit: `reject`
    source: `layout capability comparison`
    reason: Figma shows no callout surface for this message.
    risk: adds boundary/emphasis not present in SOT.
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [subscriberAddress]

- patternEvidence: Figma metadata shows three stacked `TextField` instances under `PageStackContents`; wire shows postal code with `주소 찾기`, disabled base address, typed detail address.
- patternDecision:
  - patternFamily: `address-field-stack`
  - decision: `existing composition`
  - reason: address capture requires a field stack with mixed disabled/typed states and inline address-search action capability.
- layoutStrategy: keep postal-code row and address fields grouped under one section title.
- layoutContract:
  - role: show/capture subscriber address details.
  - structure: title, postal-code field with inline/sibling search action, base address field, detail address field.
  - alignment: stable two-column postal row; full-width lower fields.
  - density: stacked form fields with no extra card boundary.
  - wrapping: long detail address must fit within the field row without colliding with next section.
  - distortionRisk: collapsing into a generic textarea or summary row loses field-state distinctions.
- componentCandidates:
  - candidate: `address field group composition`
    fit: `strong`
    source: `layoutContract capability`
    reason: can preserve postal/search row plus stacked address fields and mixed field states.
    risk: needs field state and action placement verification.
  - candidate: `plain FieldStack`
    fit: `medium`
    source: `Figma metadata TextField stack`
    reason: supports vertical field grouping but may not own postal row action alignment.
    risk: address-search button could become a separate content button.
  - candidate: `summary card`
    fit: `reject`
    source: `layout capability comparison`
    reason: visible content is field surfaces, not card summary rows.
    risk: removes input affordance.
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [homeArea]

- patternEvidence: Figma metadata shows `CheckBox` followed by `TextField` instances; visible copy includes checked `가입자 정보와 동일` and helper copy for 5G availability information.
- patternDecision:
  - patternFamily: `checkbox-address-field-stack`
  - decision: `existing composition`
  - reason: section combines same-as-subscriber selection with mirrored address fields and helper text.
- layoutStrategy: keep checkbox before the address fields and preserve disabled mirrored address state.
- layoutContract:
  - role: collect or mirror main living area information.
  - structure: title, checked checkbox row, postal/search row, base address field, helper text.
  - alignment: leading checkbox and field values; postal row keeps action aligned right.
  - density: form stack matching subscriber address density.
  - wrapping: helper text remains below fields inside section.
  - distortionRisk: moving checkbox after fields breaks the visible dependency.
- componentCandidates:
  - candidate: `checkbox + address field group composition`
    fit: `strong`
    source: `layoutContract capability`
    reason: preserves dependency control before mirrored fields.
    risk: exact disabled/mirrored state must be driven by policy later.
  - candidate: `address field group without checkbox slot`
    fit: `weak`
    source: `layout capability comparison`
    reason: can render fields but lacks required leading checkbox relationship.
    risk: needs wrappers or route-level structure.
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [email]

- patternEvidence: Figma metadata shows `PageStackContents` with one `TextField`; visible copy is `이메일` and `example@plus-ex.com`.
- patternDecision:
  - patternFamily: `editable-form-field-section`
  - decision: `existing composition`
  - reason: single typed field, no helper/error/validation state visible.
- layoutStrategy: keep a final form-field section before Bottom CTA.
- layoutContract:
  - role: capture/display email value.
  - structure: section title + one full-width typed field.
  - alignment: leading title and value.
  - density: same one-field section density as phone.
  - wrapping: email should stay within field row; validation is TBD.
  - distortionRisk: adding validation text invents policy.
- componentCandidates:
  - candidate: `PageStackContents + TitleSection + typed text field capability`
    fit: `strong`
    source: `Figma metadata component hierarchy`
    reason: exactly matches single editable field section.
    risk: ensure typed state is visually distinct from disabled fields.
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [actions]

- patternEvidence: fixed bottom `Component 2` at y=1078 with visible primary CTA `다음`.
- patternDecision:
  - patternFamily: `bottom-primary-action`
  - decision: `existing pattern`
  - reason: one fixed bottom CTA outside scroll content.
- layoutStrategy: use fixed `Bottom(preset="primary-cta")`.
- layoutContract:
  - role: proceed to next step.
  - structure: bottom rail with one full-width primary button.
  - alignment: centered CTA label.
  - density: fixed action area, not scroll content.
  - wrapping: label remains one line.
  - distortionRisk: placing CTA in content changes the rail contract.
- componentCandidates:
  - candidate: `Bottom(preset="primary-cta") + primary button capability`
    fit: `strong`
    source: `AppScreen rail contract`
    reason: owns fixed bottom action placement.
    risk: none for reference; enablement policy is TBD.
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

## Policy / OGN Matrix

| section | visibleEvidence | policyRef | OGN | allowedAssertion |
| --- | --- | --- | --- | --- |
| `phone` | `기기변경 휴대폰 번호`, disabled `010-1234-5678` | `unknown-from-figma-only/TBD` | `unknown-from-figma-only/TBD` | phone number appears non-editable in this visual state |
| `authComplete` | `본인인증 완료`, completion sentence | `unknown-from-figma-only/TBD` | `unknown-from-figma-only/TBD` | completed identity-auth status exists |
| `subscriberAddress` | `가입자 주소`, `01155`, `주소 찾기`, address lines | `unknown-from-figma-only/TBD` | `unknown-from-figma-only/TBD` | subscriber address field group exists |
| `homeArea` | `주 생활지역`, checked `가입자 정보와 동일`, helper copy | `unknown-from-figma-only/TBD` | `unknown-from-figma-only/TBD` | home area can mirror subscriber info in this visual state |
| `email` | `이메일`, `example@plus-ex.com` | `unknown-from-figma-only/TBD` | `unknown-from-figma-only/TBD` | email field exists |
| `actions` | bottom CTA `다음` | `unknown-from-figma-only/TBD` | `unknown-from-figma-only/TBD` | next-step CTA exists |

## Distortion Gates

- Use exact Figma frame `14243:28434` named `상세_정보 입력_인풋` as the visual SOT; do not substitute parent node `14243:28433`.
- Keep route as `reference-only/not-an-implementation-route` and keep all policy/OGN refs as `unknown-from-figma-only/TBD`.
- Preserve AppScreen rails: `Header`, scrollable `Content`, fixed `Bottom(preset="primary-cta")`.
- Preserve the four visible 4px divider bands between five content sections.
- Preserve field state distinction: disabled fields for phone, postal code, and base address; typed bordered fields for address detail and email.
- Keep `가입자 정보와 동일` as a checked control before home-area fields.
- Do not surface hidden component placeholder text such as `레이블`, `Help Text`, or template `타이틀`.
- Do not invent route names, policy IDs, OGN IDs, validation messages, optional states, eligibility logic, or copy not visible in the exact Figma node.
