# Frame 03 - 상세_결제_카트

## Screen Contract

- artifactType: `Screen Wire reference diagram`
- referencePack: `SKT GenUI Test 0512 / node 14243:28433 / frame index 03`
- figmaSource: `SKT GenUI Test 0512`
- figmaSot:
  - parentNode: `14243:28433`
  - exactNodeId: `14243:28669`
  - exactNodeName: `상세_결제_카트`
  - frame: `393x2081`
- figmaVerification: Figma metadata tool confirmed exact node id/name/frame and visible rail/component hierarchy on 2026-05-17.
- route: `reference-only/not-an-implementation-route`
- screenTitle: `카트`
- pattern: `detail-cart-review`
- wireReference:
  - source: `apps/mobile/src/screen-diagrams/skt-genui-test-0512/detail-form/payment-cart-review.diagram.md`
  - matchedParts: exact frame reference; shipping summary, auth callout, repeated cart product cards, payment summary, notices, fixed Bottom CTA
  - intentionalDifferences: none; this file is the visual reference itself
  - limitation: reference-only visual structure; policy/copy/OGN ids must come from policy-core before implementation
- sourceConfidence: `figma-metadata-tool-confirmed + existing exact-node evidence`
- policyRefs: `unknown-from-figma-only/TBD`
- OGNRefs: `unknown-from-figma-only/TBD`
- AppScreenSlots: `Header`, `Content`, `Bottom`
- bottom: `Bottom(preset="primary-cta")`
- visiblePrimaryCTA: `약관 동의하고 결제하기`
- visibleSections: `shippingInfo`, `sktCustomerAuth`, `cartProducts`, `paymentInfo`, `notices`, `actions`

## Screen Wire With Wire Semantic Tags

```txt
┌─AppScreen 393x2081────────────────────────────────────┐
├─Header────────────────────────────────────────────────┤
│ 9:41                                      ▮▮▮  wifi ▰ │
│                                                        │
│   ‹   카트                                           │
├─Content(scroll)───────────────────────────────────────┤
│ [shippingInfo | delivery-summary | section]           │
│   배송지 정보                                         │
│   회사                                            변경 │
│   010-1234-5678                                      │
│   서울특별시 강남구 논현동 언주로149길 17             │
│   4층 Plus X                                          │
│   배송 요청 사항          부재 시 전화 부탁드립니다   │
│                                                        │
├══Divider 4px / bg-alt══════════════════════════════════┤
│ [sktCustomerAuth | auth-summary-callout | section]    │
│   SKT 고객 인증  ⓘ        선택한 휴대폰 번호 3개   ›  │
│   ┌────────────────────────────────────────────────┐   │
│   │ 데이터 및 혜택이 제공돼요                     │   │
│   └──────────────────────────────── rounded callout ┘   │
│                                                        │
├══Divider 4px / bg-alt══════════════════════════════════┤
│ [cartProducts | cart-product-list | card-list]        │
│   상품 3                                      전체삭제 │
│   배달의민족 쿠폰팩                                 × │
│   ┌─Product Card───────────────────────────────────┐   │
│   │ logo/name + benefit copy                       │   │
│   │ ┌─Price Box─────────────────────────────────┐  │   │
│   │ │ 첫 구독 할인가              50% 10,000원 │  │   │
│   │ │ 이용 금액                    2주/48,000원 │  │   │
│   │ └────────────────────────── nested price box ┘  │   │
│   │              상품/옵션 변경하기                │   │
│   └──────────────────────────────── product card ──┘   │
│   ... second visible product card ...                  │
│   ... third visible product card with 티빙/디즈니 ...  │
│                                                        │
├══Divider 4px / bg-alt══════════════════════════════════┤
│ [paymentInfo | key-value-summary | section]           │
│   결제 정보                                           │
│   총 구독가                                999,999원 │
│   총 구독 할인 (첫 달)                    -999,999원 │
│   플러스 할인                             -999,999원 │
│   SKT 고객 할인                           -999,999원 │
│     우주패스 all 이용권                       -1,000원 │
│     T 우주패스 미디어 이용권                  -1,000원 │
│   쿠폰 할인                               -999,999원 │
│     50% 할인 쿠폰                             -1,000원 │
│     30% 할인 쿠폰                             -1,000원 │
│   T 플러스포인트 할인                     -999,999원 │
│   ────────────────────────────────────────────────     │
│   결제 예상 금액                           999,999원 │
│                                                        │
├══Divider 4px / bg-alt══════════════════════════════════┤
│ [notices | notice-list | section]                     │
│   유의사항                                            │
│   · 카트에 상품은 최대 10개까지 담을 수 있습니다.     │
│   · 담긴 상품은 90일간 보관됩니다.                    │
│                                                        │
├─Bottom(preset="primary-cta")──────────────────────────┤
│ [actions | bottom-primary-action | bottom-fixed]      │
│   ┌────────────────────────────────────────────────┐   │
│   │              약관 동의하고 결제하기            │   │
│   └──────────────────────────── centered CTA button ┘   │
└────────────────────────────────────────────────────────┘
```

## Section Contracts

### [shippingInfo]

- patternEvidence: Figma metadata shows `PageStackContents` with `TitleContents`, multiple `ListText` rows, and visible `변경` affordance.
- patternDecision:
  - patternFamily: `delivery-summary-section`
  - decision: `existing composition`
  - reason: delivery destination is a text summary with an edit/change action, not a form field stack.
- layoutStrategy: keep as first content section below Header.
- layoutContract:
  - role: let user review/change delivery destination before payment.
  - structure: title, destination label with trailing change action, contact/address/request text rows.
  - alignment: text leading; change action right-aligned in title/content row.
  - density: compact summary rows with no card boundary.
  - wrapping: address may wrap inside content column; change action remains stable.
  - distortionRisk: rendering as editable fields changes review-state semantics.
- componentCandidates:
  - candidate: `delivery summary organism/composition`
    fit: `strong`
    source: `layoutContract capability`
    reason: owns summary rows plus right-side change action.
    risk: request-note row alignment needs verification.
  - candidate: `field stack`
    fit: `reject`
    source: `layout capability comparison`
    reason: visible section is a review summary, not editable inputs.
    risk: invents form behavior.
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [sktCustomerAuth]

- patternEvidence: Figma metadata shows section title and one `Callout`; visible title row includes info icon, selected-phone count, and chevron.
- patternDecision:
  - patternFamily: `auth-summary-callout`
  - decision: `existing composition`
  - reason: summary row and callout explain authentication-related benefit.
- layoutStrategy: preserve title row accessory/count and callout in one section.
- layoutContract:
  - role: summarize SKT customer authentication context.
  - structure: title row with info icon and trailing selected count, then rounded callout.
  - alignment: title leading, count/action trailing, callout full width.
  - density: compact section.
  - wrapping: callout text wraps inside surface.
  - distortionRisk: selected phone count must not be confused with product count.
- componentCandidates:
  - candidate: `section title with accessory + callout capability`
    fit: `strong`
    source: `layoutContract capability`
    reason: supports title metadata and callout placement.
    risk: title accessory slots must be available.
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [cartProducts]

- patternEvidence: Figma metadata shows three `Local_Card` product cards separated by internal dividers; visible list has `상품 3`, `전체삭제`, per-product remove controls, nested price boxes, and option-change links.
- patternDecision:
  - patternFamily: `cart-card-list`
  - decision: `existing composition / reusable candidate`
  - reason: cart/checkout card capability is required before any component name: repeated cards, removable item header, logo/content body, nested price box, and per-item option action.
- layoutStrategy: keep three distinct product cards under one cart-list header.
- layoutContract:
  - role: review/remove cart products and adjust options before payment.
  - structure: list header with count and bulk delete, repeated product card blocks, per-card remove affordance, service logo/content, nested price/discount box, option-change action.
  - alignment: list-level actions right-aligned; card content leading; price rows label/value aligned inside nested box.
  - density: card-list density with contents dividers between product cards.
  - wrapping: product/benefit names may wrap within card; price values stay right-aligned.
  - distortionRisk: merging products or moving prices into payment summary breaks cart review.
- componentCandidates:
  - candidate: `cart product card list organism`
    fit: `strong`
    source: `layoutContract capability`
    reason: directly owns list header, repeated cards, remove controls, nested price boxes, and per-item option actions.
    risk: would likely need a new organism if no existing cart card supports all capabilities.
  - candidate: `generic product card`
    fit: `medium`
    source: `Figma Local_Card hierarchy`
    reason: may support card body, but list-level count/delete and nested price box need verification.
    risk: could require wrappers for remove and option actions.
  - candidate: `key-value summary list`
    fit: `reject`
    source: `layout capability comparison`
    reason: cannot preserve repeated card surfaces, logos, and per-item actions.
    risk: collapses product review into payment summary.
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [paymentInfo]

- patternEvidence: Figma metadata shows multiple `ListText` rows and an internal `Divider`; visible copy is a payment breakdown with indented sub-discount rows and emphasized final expected amount.
- patternDecision:
  - patternFamily: `key-value-payment-summary`
  - decision: `existing composition`
  - reason: required capability is stable label/value rows, nested discount rows, internal divider, and emphasized total.
- layoutStrategy: keep breakdown after cart list and before notices.
- layoutContract:
  - role: explain expected payment amount and discount breakdown.
  - structure: title, label/value rows, indented subrows, internal divider, final total row.
  - alignment: labels leading and amounts right-aligned with stable value column.
  - density: compact financial summary.
  - wrapping: long labels can wrap without pushing amount column out.
  - distortionRisk: sample amounts are not calculation rules; do not infer formulas.
- componentCandidates:
  - candidate: `key-value payment summary capability`
    fit: `strong`
    source: `layoutContract capability`
    reason: owns financial row alignment, subrow indentation, and final emphasis.
    risk: final emphasis token must match design system.
  - candidate: `plain ListText stack`
    fit: `weak`
    source: `Figma primitive hierarchy`
    reason: primitive rows alone do not guarantee amount-column stability or subrow indentation.
    risk: can drift under long labels.
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [notices]

- patternEvidence: Figma metadata shows final `PageStackContents` with `ListText`; visible copy has `유의사항` and two bullets.
- patternDecision:
  - patternFamily: `notice-list-section`
  - decision: `existing composition`
  - reason: simple legal/constraint bullet list above fixed CTA.
- layoutStrategy: keep notices in scroll content immediately before Bottom.
- layoutContract:
  - role: show cart constraints before payment.
  - structure: title + bullet list.
  - alignment: leading text.
  - density: compact notice text.
  - wrapping: bullets wrap within content column.
  - distortionRisk: hiding notices in tooltip/modal would remove visible constraints.
- componentCandidates:
  - candidate: `notice list capability`
    fit: `strong`
    source: `layoutContract capability`
    reason: supports title and visible bullet rows.
    risk: exact bullet copy source remains Figma-only until policy mapping.
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [actions]

- patternEvidence: fixed bottom `Component 2` with visible CTA `약관 동의하고 결제하기`.
- patternDecision:
  - patternFamily: `bottom-primary-action`
  - decision: `existing pattern`
  - reason: one fixed payment CTA.
- layoutStrategy: use `Bottom(preset="primary-cta")`.
- layoutContract:
  - role: agree to terms and proceed with payment.
  - structure: fixed bottom rail with one full-width primary button.
  - alignment: centered label.
  - density: fixed action area.
  - wrapping: CTA label stays readable on one line or button-owned wrapping.
  - distortionRisk: CTA must not become final scroll content.
- componentCandidates:
  - candidate: `Bottom(preset="primary-cta") + primary button capability`
    fit: `strong`
    source: `AppScreen rail contract`
    reason: owns fixed primary payment action placement.
    risk: agreement mechanics are policy TBD.
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

## Policy / OGN Matrix

| section | visibleEvidence | policyRef | OGN | allowedAssertion |
| --- | --- | --- | --- | --- |
| `shippingInfo` | destination label, phone, address, request note, `변경` | `unknown-from-figma-only/TBD` | `unknown-from-figma-only/TBD` | delivery summary exists |
| `sktCustomerAuth` | `SKT 고객 인증`, selected phone count, callout | `unknown-from-figma-only/TBD` | `unknown-from-figma-only/TBD` | auth summary/callout exists |
| `cartProducts` | `상품 3`, `전체삭제`, three cards, remove controls, nested price boxes | `unknown-from-figma-only/TBD` | `unknown-from-figma-only/TBD` | three cart product cards exist |
| `paymentInfo` | payment breakdown rows and final `결제 예상 금액` | `unknown-from-figma-only/TBD` | `unknown-from-figma-only/TBD` | payment summary exists; formulas TBD |
| `notices` | cart max count and retention bullets | `unknown-from-figma-only/TBD` | `unknown-from-figma-only/TBD` | notice section exists |
| `actions` | bottom CTA `약관 동의하고 결제하기` | `unknown-from-figma-only/TBD` | `unknown-from-figma-only/TBD` | payment CTA exists |

## Distortion Gates

- Use exact Figma frame `14243:28669` named `상세_결제_카트`; do not reintroduce older device/5G-plan purchase interpretation.
- Keep route as `reference-only/not-an-implementation-route` and keep all policy/OGN refs as `unknown-from-figma-only/TBD`.
- Preserve AppScreen rails and keep `[actions]` in `Bottom(preset="primary-cta")`.
- Preserve visible order: `shippingInfo` -> `sktCustomerAuth` -> `cartProducts` -> `paymentInfo` -> `notices` -> `actions`.
- Preserve section divider bands and card-list internal dividers.
- Preserve three distinct cart product cards with remove controls, nested price boxes, and per-item `상품/옵션 변경하기`.
- Keep `전체삭제` as a cart-list-level action.
- Payment rows must remain label/value rows with right-aligned amounts, indented sub-discount rows, and internal divider before final amount.
- Do not invent policy ids, use case ids, OGN ids, product catalog IDs, discount formulas, validation rules, or terms mechanics from Figma.
