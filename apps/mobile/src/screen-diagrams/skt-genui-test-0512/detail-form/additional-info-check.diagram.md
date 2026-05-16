# Frame 02 - 상세_정보 체크

## Screen Contract

- artifactType: `Screen Wire reference diagram`
- referencePack: `SKT GenUI Test 0512 / node 14243:28433 / frame index 02`
- figmaSource: `SKT GenUI Test 0512`
- figmaSot:
  - parentNode: `14243:28433`
  - exactNodeId: `14243:28474`
  - exactNodeName: `상세_정보 체크`
  - frame: `393x2450`
- figmaVerification: Figma metadata tool confirmed exact node id/name/frame and visible rail/component hierarchy on 2026-05-17.
- route: `reference-only/not-an-implementation-route`
- screenTitle: `추가 정보 입력`
- pattern: `detail-form`
- wireReference:
  - source: `apps/mobile/src/screen-diagrams/skt-genui-test-0512/detail-form/additional-info-check.diagram.md`
  - matchedParts: exact frame reference; Local_Sheet summary, radio lists, address field groups, callouts, fixed Bottom CTA
  - intentionalDifferences: none; this file is the visual reference itself
  - limitation: reference-only visual structure; policy/copy/OGN ids must come from policy-core before implementation
- sourceConfidence: `figma-metadata-tool-confirmed + existing exact-node evidence`
- policyRefs: `unknown-from-figma-only/TBD`
- OGNRefs: `unknown-from-figma-only/TBD`
- AppScreenSlots: `Header`, `Content`, `Bottom`
- scrollOwner: `AppScreen.Content`
- fixedActionOwner: `AppScreen.Bottom`
- bottom: `Bottom(preset="primary-cta")`
- visiblePrimaryCTA: `다음`
- visibleSections: `stickyDeviceSummary`, `bundleDiscount`, `usimEsim`, `phoneDeliveryMethod`, `deliveryAddress`, `instantCompensation`, `tGiftDelivery`, `primaryAction`

## Screen Wire With Wire Semantic Tags

```txt
┌─AppScreen 393x2450────────────────────────────────────┐
├─Header────────────────────────────────────────────────┤
│ 9:41                                      ▮▮▮  wifi ▰ │
│                                                        │
│   ‹   추가 정보 입력                                  │
├─Content(scroll)───────────────────────────────────────┤
│                                                        │
│ [stickyDeviceSummary | product-summary | local-sheet] │
│   ┌────────────────────────────────────────────────┐   │
│   │ ┌────┐  iPhone 20 Pro 코스믹 오렌지 512G   +  │   │
│   │ │img │  129,797원 /월                         │   │
│   │ └────┘  (부가세, 할부수수료 포함)             │   │
│   └────────────────────────── rounded summary sheet ┘   │
│                                                        │
│ [bundleDiscount | choice-list | section]              │
│   결합 할인                                           │
│   ●  온가족 할인 (월 -26,700원)                       │
│   ○  적용하지 않음                                    │
│                                                        │
├══Divider 4px / bg-alt══════════════════════════════════┤
│ [usimEsim | choice-list-with-callout | section]       │
│   USIMㆍ이심(eSIM)                                    │
│   ○  신규 USIM 구매 (7,700원)                         │
│   ●  기존 USIM 사용                                   │
│   ○  eSIM 구매(2,750원)                               │
│   ┌────────────────────────────── notice callout ──┐   │
│   │ 기존 단말기에 고객님이 가입하셨던 유심은...    │   │
│   │ TBD/illegible-from-screenshot                  │   │
│   └────────────────────────────────────────────────┘   │
│                                                        │
├══Divider 4px / bg-alt══════════════════════════════════┤
│ [phoneDeliveryMethod | choice-list | section]         │
│   휴대폰 배송 방법                                    │
│   ○  바로도착                                         │
│   ○  행복배송                                         │
│   ●  택배                                             │
│   ○  매장 픽업                                        │
│                                                        │
│ [deliveryAddress | checkbox-address-field-group]      │
│   배송지                                              │
│   ☑  가입자 정보와 동일                               │
│   받으시는 분 / 조현호                                │
│   연락처 / 010-1234-5678                              │
│   주소 / 01155  [주소 찾기]                           │
│   서울 강북구 오현로 45,                              │
│   107동 203호(미아동, 꿈의숲해링턴플레이스)           │
│                                                        │
├══Divider 4px / bg-alt══════════════════════════════════┤
│ [instantCompensation | form-summary-callout | section]│
│   바로 보상 안내  ⓘ                                   │
│   보상 폰 반납하면 최대금액 당일 보상                 │
│   휴대폰 모델명                 등급산정기준 보기     │
│   ┌──────────────────────────────┐ ┌──────────────┐   │
│   │ 아이폰14 256GB               │ │ 검색         │   │
│   └──────────────── field block ─┘ └──── action ──┘   │
│   예시 : 갤럭시 S10, 갤럭시 노트9                    │
│   ────────────────────────────────────────────────     │
│   A등급 기준 최대 보상금액                 295,000원  │
│   [바로보상 신청]                                      │
│   ┌────────────────────────────── notice callout ──┐   │
│   │ 바로보상이란?                                  │   │
│   │ • 사용하던 휴대폰을 반납하고 당일에 현금으로...│   │
│   └────────────────────────────────────────────────┘   │
│                                                        │
├══Divider 4px / bg-alt══════════════════════════════════┤
│ [tGiftDelivery | checkbox-address-field-group]        │
│   T기프트 배송 정보                         [배송]    │
│   ☑  가입자 정보와 동일                               │
│   받으시는 분 / 조현호                                │
│   연락처 / 010-1234-5678                              │
│   주소 / 01155  [주소 찾기]                           │
│   서울 강북구 오현로 45,                              │
│   107동 203호(미아동, 꿈의숲해링턴플레이스)           │
├─Bottom(preset="primary-cta")──────────────────────────┤
│ [primaryAction | bottom-primary-action | bottom-fixed]│
│   ┌────────────────────────────────────────────────┐   │
│   │ 다음                                           │   │
│   └──────────────────────────── primary CTA / fixed ┘   │
└────────────────────────────────────────────────────────┘
```

## Section Contracts

### [stickyDeviceSummary]

- patternEvidence: Figma metadata shows `Local_Sheet` immediately below Header; visible content is thumbnail, product name, monthly price, tax/installment caption, plus affordance.
- patternDecision:
  - patternFamily: `product-summary-local-sheet`
  - decision: `existing composition`
  - reason: a compact summary sheet anchors context before the form choices.
- layoutStrategy: keep the summary at top of scroll content before the first PageStackContents choice section.
- layoutContract:
  - role: summarize selected device/monthly payment context.
  - structure: rounded local sheet with thumbnail, two-line text stack, trailing plus icon.
  - alignment: image leading, text middle, action trailing.
  - density: compact local sheet, visually separate from form sections.
  - wrapping: product name may wrap inside text column; price/caption remain readable.
  - distortionRisk: converting to a normal list row loses the sheet-like anchor.
- componentCandidates:
  - candidate: `local product summary sheet capability`
    fit: `strong`
    source: `Figma Local_Sheet hierarchy`
    reason: directly supports thumbnail, product text, price caption, and trailing affordance.
    risk: exact expanded/collapsed behavior is not known from Figma.
  - candidate: `generic card`
    fit: `weak`
    source: `layout capability comparison`
    reason: card surface alone does not guarantee compact local-sheet placement or trailing plus behavior.
    risk: may inflate height and distort first viewport.
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [bundleDiscount]

- patternEvidence: `PageStackContents` contains two `ListSelected` rows; visible selected option is `온가족 할인 (월 -26,700원)`.
- patternDecision:
  - patternFamily: `radio-choice-list`
  - decision: `existing composition`
  - reason: mutually exclusive discount options are shown as radio rows.
- layoutStrategy: keep two compact radio rows under the title.
- layoutContract:
  - role: choose bundle discount option.
  - structure: title + two radio rows.
  - alignment: control leading, label/caption content leading.
  - density: compact list row density.
  - wrapping: discount amount stays with selected label.
  - distortionRisk: checkboxes would imply multi-select and invent behavior.
- componentCandidates:
  - candidate: `radio/list-selected row capability`
    fit: `strong`
    source: `Figma ListSelected rows`
    reason: supports selected/unselected control rows and compact typography.
    risk: eligibility policy remains TBD.
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [usimEsim]

- patternEvidence: three `ListSelected` rows plus `Callout`; long notice copy is partially illegible in existing screenshot evidence.
- patternDecision:
  - patternFamily: `radio-choice-list-with-callout`
  - decision: `existing composition`
  - reason: USIM/eSIM options require radio list plus supporting notice.
- layoutStrategy: preserve choices first, callout immediately after choice rows.
- layoutContract:
  - role: choose USIM/eSIM purchase/use option and read related notice.
  - structure: title, three radio rows, muted callout.
  - alignment: list rows leading; callout full content width.
  - density: radio rows compact; callout follows without separate section.
  - wrapping: callout copy wraps within callout; exact missing copy remains TBD.
  - distortionRisk: separating callout into another section breaks option context.
- componentCandidates:
  - candidate: `radio list + callout composition`
    fit: `strong`
    source: `Figma ListSelected + Callout hierarchy`
    reason: directly preserves option list and contextual notice.
    risk: exact callout text must be sourced before implementation.
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [phoneDeliveryMethod]

- patternEvidence: `PageStackContents` contains four `ListSelected` rows for delivery choices, with `택배` selected in the visual reference.
- patternDecision:
  - patternFamily: `radio-choice-list`
  - decision: `existing composition`
  - reason: four mutually exclusive delivery methods.
- layoutStrategy: keep delivery method choices above delivery address fields in the same visual band.
- layoutContract:
  - role: select phone delivery method.
  - structure: title + four radio rows.
  - alignment: control leading, label leading.
  - density: compact list row density.
  - wrapping: labels remain short; selection rules TBD.
  - distortionRisk: moving address fields above delivery choice changes task order.
- componentCandidates:
  - candidate: `radio/list-selected row capability`
    fit: `strong`
    source: `Figma ListSelected rows`
    reason: supports selected `택배` and three unselected methods.
    risk: delivery eligibility policy is not visible.
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [deliveryAddress]

- patternEvidence: same content band includes checked `CheckBox` followed by multiple `TextField` instances for recipient/contact/address.
- patternDecision:
  - patternFamily: `checkbox-address-field-stack`
  - decision: `existing composition`
  - reason: visible address fields depend on checked same-as-subscriber control.
- layoutStrategy: keep the address field stack directly below delivery method choices.
- layoutContract:
  - role: capture phone delivery destination.
  - structure: section label, checked checkbox, recipient field, contact field, postal/search row, base address field, detail address field.
  - alignment: fields fill content column; postal row keeps search action stable.
  - density: tall field stack inside one section band.
  - wrapping: long address/detail values stay in field rows without overlapping next section.
  - distortionRisk: using plain text rows loses input/edit affordances.
- componentCandidates:
  - candidate: `checkbox + address field group capability`
    fit: `strong`
    source: `Figma CheckBox + TextField hierarchy`
    reason: preserves same-as control and stacked address fields.
    risk: actual disabled/editable state per field must be confirmed by policy.
  - candidate: `generic field stack`
    fit: `medium`
    source: `layout capability comparison`
    reason: can handle vertical fields but may not own checkbox dependency or postal action.
    risk: needs composition guard for address-search alignment.
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [instantCompensation]

- patternEvidence: metadata shows title/body frames, `TextFieldTyped`, help text, contents divider, `ListText`, `Button`, and `Callout`; visible copy includes model search and max compensation amount.
- patternDecision:
  - patternFamily: `form-summary-callout`
  - decision: `existing composition`
  - reason: section combines explanatory copy, field with action, summary amount row, secondary action, and callout.
- layoutStrategy: preserve all sub-units as separate visual units in one section.
- layoutContract:
  - role: explain and initiate instant compensation flow.
  - structure: title/body, label/action link, model input + search, helper text, internal divider, amount summary row, secondary CTA, explanatory callout.
  - alignment: input/action row stable; summary amount right-aligned.
  - density: dense but separated by internal divider and button/callout surfaces.
  - wrapping: callout bullets may wrap; amount column remains stable.
  - distortionRisk: collapsing amount row into callout hides the compensation result.
- componentCandidates:
  - candidate: `section organism candidate for compensation form`
    fit: `strong`
    source: `layoutContract capability`
    reason: the section has multiple coupled subpatterns that need owned spacing and order.
    risk: Build must not invent compensation rules.
  - candidate: `generic form field + callout composition`
    fit: `medium`
    source: `Figma component hierarchy`
    reason: supports most primitives but summary/button/callout spacing needs verification.
    risk: route-level spacing patches may appear if not wrapped as an organism.
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [tGiftDelivery]

- patternEvidence: metadata mirrors delivery address group with `CheckBox` and multiple `TextField` instances; visible title includes small `배송` badge.
- patternDecision:
  - patternFamily: `badge-title-checkbox-address-field-stack`
  - decision: `existing composition`
  - reason: same address-field capabilities as delivery address, with title badge requirement.
- layoutStrategy: keep title badge, checkbox, and address field group together in final content section.
- layoutContract:
  - role: capture T-gift delivery destination.
  - structure: title with small badge, checked checkbox, recipient/contact/address field stack.
  - alignment: badge aligned with title area; fields fill content column.
  - density: same field-stack density as delivery address.
  - wrapping: long detail address remains in field row.
  - distortionRisk: dropping the badge loses visible product/shipping classification.
- componentCandidates:
  - candidate: `address field group with title accessory capability`
    fit: `strong`
    source: `layoutContract capability`
    reason: supports required field stack plus title badge.
    risk: title accessory slot must be available or implemented by organism.
  - candidate: `plain address field group`
    fit: `weak`
    source: `layout capability comparison`
    reason: does not provide the required title badge/accessory behavior.
    risk: badge may become arbitrary inline UI.
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [primaryAction]

- patternEvidence: fixed bottom `Component 2` at frame bottom with visible CTA `다음`.
- patternDecision:
  - patternFamily: `bottom-primary-action`
  - decision: `existing pattern`
  - reason: one fixed primary CTA, outside scroll content.
- layoutStrategy: use `Bottom(preset="primary-cta")`.
- layoutContract:
  - role: proceed to next step.
  - structure: one full-width primary button in fixed bottom rail.
  - alignment: centered CTA label.
  - density: fixed action area.
  - wrapping: label remains one line.
  - distortionRisk: making CTA terminal scroll content breaks screen rails.
- componentCandidates:
  - candidate: `Bottom(preset="primary-cta") + primary button capability`
    fit: `strong`
    source: `AppScreen rail contract`
    reason: owns fixed placement and primary action hierarchy.
    risk: enablement rules are policy TBD.
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

## Policy / OGN Matrix

| section | visibleEvidence | policyRef | OGN | allowedAssertion |
| --- | --- | --- | --- | --- |
| `stickyDeviceSummary` | iPhone product, monthly price, plus affordance | `unknown-from-figma-only/TBD` | `unknown-from-figma-only/TBD` | selected-device summary sheet exists |
| `bundleDiscount` | `결합 할인`, two radio options | `unknown-from-figma-only/TBD` | `unknown-from-figma-only/TBD` | bundle discount choice list exists |
| `usimEsim` | three USIM/eSIM choices and notice callout | `unknown-from-figma-only/TBD` | `unknown-from-figma-only/TBD` | USIM/eSIM option list exists; long notice copy TBD |
| `phoneDeliveryMethod` | four delivery choices with `택배` selected | `unknown-from-figma-only/TBD` | `unknown-from-figma-only/TBD` | phone delivery method choice list exists |
| `deliveryAddress` | checked same-as row and delivery fields | `unknown-from-figma-only/TBD` | `unknown-from-figma-only/TBD` | delivery-address field group exists |
| `instantCompensation` | model search, amount row, 신청 button, callout | `unknown-from-figma-only/TBD` | `unknown-from-figma-only/TBD` | instant compensation information/application section exists |
| `tGiftDelivery` | `T기프트 배송 정보`, badge, checked row, address fields | `unknown-from-figma-only/TBD` | `unknown-from-figma-only/TBD` | T-gift delivery field group exists |
| `primaryAction` | bottom CTA `다음` | `unknown-from-figma-only/TBD` | `unknown-from-figma-only/TBD` | next-step CTA exists |

## Distortion Gates

- Use exact Figma frame `14243:28474` named `상세_정보 체크`; do not substitute parent node `14243:28433`.
- Keep route as `reference-only/not-an-implementation-route` and keep all policy/OGN refs as `unknown-from-figma-only/TBD`.
- Keep AppScreen slot ownership as `Header`, `Content`, `Bottom`; `Content` scrolls and `Bottom(preset="primary-cta")` owns `다음`.
- Preserve order: local device summary -> bundle discount -> USIM/eSIM -> phone delivery method/delivery address -> instant compensation -> T-gift delivery -> Bottom CTA.
- Preserve visible 4px divider bands as section boundaries.
- Do not collapse radio groups, field groups, notice boxes, summary rows, secondary action, or callout into generic component-tree notation.
- Keep `TBD/illegible-from-screenshot` for long helper/callout sentences where exact copy is not stable.
- Do not invent policy constraints, validation rules, shipping eligibility, USIM/eSIM eligibility, compensation rules, route names, or OGN names from this visual reference.
