# Frame 04 - 상세_결제_결제하기

## Screen Contract

- artifactType: `Screen Wire reference diagram`
- referencePack: `SKT GenUI Test 0512 / node 14243:28433 / frame index 04`
- figmaSource: `SKT GenUI Test 0512`
- figmaSot:
  - parentNode: `14243:28433`
  - exactNodeId: `14243:28546`
  - exactNodeName: `상세_결제_결제하기`
  - frame: `393x3352`
- figmaVerification: Figma metadata tool confirmed exact node id/name/frame and visible rail/component hierarchy on 2026-05-17.
- route: `reference-only/not-an-implementation-route`
- screenTitle: `결제하기`
- pattern: `detail-checkout`
- wireReference:
  - source: `apps/mobile/src/screen-diagrams/skt-genui-test-0512/detail-form/payment-checkout.diagram.md`
  - matchedParts: exact frame reference; checkout review sections, product cards, coupon/point controls, subscription/payment choices, payment summary, agreements, notices, fixed Bottom CTA
  - intentionalDifferences: none; this file is the visual reference itself
  - limitation: reference-only visual structure; policy/copy/OGN ids must come from policy-core before implementation
- sourceConfidence: `figma-metadata-tool-confirmed + existing exact-node evidence`
- policyRefs: `unknown-from-figma-only/TBD`
- OGNRefs: `unknown-from-figma-only/TBD`
- AppScreenSlots: `Header`, `Content`, `Bottom`
- bottom: `Bottom(preset="primary-cta")`
- visiblePrimaryCTA: `약관 동의하고 결제하기`
- visibleSections: `ordererInfo`, `customerAuth`, `productInfo`, `couponVoucher`, `tPlusPoint`, `subscriptionType`, `paymentMethod`, `paymentSummary`, `agreements`, `notices`, `actions`

## Screen Wire With Wire Semantic Tags

```txt
┌─AppScreen 393x3352────────────────────────────────────┐
├─Header────────────────────────────────────────────────┤
│ 9:41                                      ▮▮▮  wifi ▰ │
│                                                        │
│   ‹   결제하기                                        │
├─Content(scroll)───────────────────────────────────────┤
│ [ordererInfo | orderer-summary | section]             │
│   주문자 정보                                    변경 │
│   조현호 / 010-1234-5678 / example@plus-ex.com        │
│   ────────────────────────────────────────────────     │
│   정보 안내 방식                            문자 메시지 │
├══Divider 4px / bg-alt══════════════════════════════════┤
│ [customerAuth | auth-summary-callout | section]       │
│   SKT 고객 인증                              선택 3개 │
│   ┌────────────────────────────────────────────────┐   │
│   │ 데이터 및 혜택이 제공돼요                  ›   │   │
│   └────────────────────────────── rounded info card ┘   │
├══Divider 4px / bg-alt══════════════════════════════════┤
│ [productInfo | checkout-product-list | card-list]     │
│   상품 정보                                      2개   │
│   배달의민족 쿠폰팩                   2주   7,000원   │
│   첫 구독 할인 예정                                   │
│   ┌──────────────── product detail card ───────────┐   │
│   │ 배달의민족 / 쿠폰 혜택 / 요청사항 / 희망일     │   │
│   └────────────────────────────────────────────────┘   │
│   티빙 광고형 스탠다드              1개월   5,000원   │
│   첫 구독 할인 예정                                   │
│   ┌──────────────── product detail card ───────────┐   │
│   │ 티빙 / 티빙 광고형 스탠다드 이용권             │   │
│   └────────────────────────────────────────────────┘   │
│   [상품/옵션 변경하기 ›]                              │
├══Divider 4px / bg-alt══════════════════════════════════┤
│ [couponVoucher | discount-key-value-list | section]   │
│   쿠폰 이용권                                         │
│   배달의민족 5,000원 쿠폰 + 배민1...       -999,999원 │
│   ────────────────────────────────────────────────     │
│   배달의민족 5,000원 쿠폰 + 배민1...       -999,999원 │
├══Divider 4px / bg-alt══════════════════════════════════┤
│ [tPlusPoint | point-input | section]                  │
│   T 플러스 포인트                                     │
│   ┌────────────────────────────────┐ ┌────────────┐   │
│   │ 0                              │ │ 모두 사용  │   │
│   └──────────────── input field ───┘ └── button ──┘   │
│   사용 가능                                  1,000P   │
│   ☑ 정기 결제 시 포인트 자동 사용                    │
├══Divider 4px / bg-alt══════════════════════════════════┤
│ [subscriptionType | radio-choice-list | section]      │
│   구독 방식                                           │
│   ○  1회 구독                                  받기   │
│   ●  정기 구독                                 받기   │
│      구독 주기마다 요금이 정기 결제되며,              │
│      상품을 계속 이용하실 수 있어요                   │
├══Divider 4px / bg-alt══════════════════════════════════┤
│ [paymentMethod | payment-radio-list | section]        │
│   결제 수단                                           │
│   ● 카드/계좌 간편결제  최근 결제 / 11Pay helper     │
│   ○ 카카오페이  빠르게 결제                           │
│   ○ 네이버페이  빠르게 결제                           │
│   ○ 일반 결제                                         │
│   ┌──────────── benefit card: T우주 x 신한카드 ────┐   │
│   └────────────────────────────────────────────────┘   │
├══Divider 4px / bg-alt══════════════════════════════════┤
│ [paymentSummary | key-value-payment-summary | section]│
│   결제 정보                                           │
│   총 상품 금액                              999,999원 │
│   총 구독 할인 금액                        -999,999원 │
│   포인트 할인                              -999,999원 │
│   쿠폰 할인                                -999,999원 │
│   우주패스 즉시 할인                       -999,999원 │
│   ────────────────────────────────────────────────     │
│   이번 결제 금액                            999,999원 │
├══Divider 4px / bg-alt══════════════════════════════════┤
│ [agreements | required-agreement-list | section]      │
│   결제 약관 및 동의                                   │
│   □ (필수) 개인정보 수집 및 이용 동의             ›   │
│   □ (필수) 개인정보 제3자 제공 동의               ›   │
│   □ (필수) 정기 결제 약관 동의                    ›   │
├══Divider 4px / bg-alt══════════════════════════════════┤
│ [notices | notice-link-list | section]                │
│   이용 전에 확인해 주세요                             │
│   T멤버십 고객 혜택안내                           ›   │
│   상품/옵션/결제 관련 유의사항 목록               ›   │
├─Bottom(preset="primary-cta")──────────────────────────┤
│ [actions | bottom-primary-action | bottom-fixed]      │
│   ┌────────────────────────────────────────────────┐   │
│   │              약관 동의하고 결제하기            │   │
│   └──────────────────── centered CTA ──────────────┘   │
└────────────────────────────────────────────────────────┘
```

## Section Contracts

### [ordererInfo]

- patternEvidence: Figma metadata shows `PageStackContents`, `TitleContents`, contact `ListText` rows, and visible `변경` action.
- patternDecision:
  - patternFamily: `orderer-summary-section`
  - decision: `existing composition`
  - reason: checkout starts with a review summary and change affordance.
- layoutStrategy: keep as first section with internal contents divider before information delivery method.
- layoutContract:
  - role: review orderer identity/contact and notification method.
  - structure: title with change action, contact rows, internal divider, key-value notification row.
  - alignment: contact leading; notification method value right-aligned.
  - density: compact summary density.
  - wrapping: email/address-like values remain readable within content column.
  - distortionRisk: contact lines must remain separate from information delivery method.
- componentCandidates:
  - candidate: `orderer summary composition`
    fit: `strong`
    source: `layoutContract capability`
    reason: supports contact stack plus internal key-value row and change action.
    risk: needs owned internal divider spacing.
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [customerAuth]

- patternEvidence: Figma metadata shows `Callout`; visible title row has selected count `선택 3개`.
- patternDecision:
  - patternFamily: `auth-summary-callout`
  - decision: `existing composition`
  - reason: authentication state appears as title/count plus one benefit callout.
- layoutStrategy: keep count and callout together in one section.
- layoutContract:
  - role: summarize SKT customer authentication selection.
  - structure: title/count row, rounded info card with chevron.
  - alignment: title leading; count/action trailing.
  - density: compact.
  - wrapping: callout body wraps inside card.
  - distortionRisk: phone count must not be confused with product count.
- componentCandidates:
  - candidate: `section title accessory + callout capability`
    fit: `strong`
    source: `layoutContract capability`
    reason: preserves title/count/action and callout placement.
    risk: exact interaction behind chevron is TBD.
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [productInfo]

- patternEvidence: Figma metadata shows multiple `Local_Card` instances separated by internal dividers; visible section includes product rows, nested detail cards, and a secondary change action.
- patternDecision:
  - patternFamily: `checkout-product-card-list`
  - decision: `existing composition / reusable candidate`
  - reason: checkout/card capability must preserve product row summary, nested detail card, and list-level option-change action.
- layoutStrategy: keep product cards together under `상품 정보 2개`.
- layoutContract:
  - role: review checkout products and access product/option changes.
  - structure: header with count, repeated product summary rows, nested rounded detail cards, secondary change row/button.
  - alignment: product name leading; period/price right-aligned; card contents leading.
  - density: card-list density with contents dividers.
  - wrapping: product names may truncate/wrap without moving period/price column.
  - distortionRisk: product rows and nested cards must remain visually grouped.
- componentCandidates:
  - candidate: `checkout product card list organism`
    fit: `strong`
    source: `layoutContract capability`
    reason: owns product summary row, detail card, count, dividers, and change action.
    risk: may require new organism if reusable card lacks period/price row capability.
  - candidate: `generic card list`
    fit: `medium`
    source: `Figma Local_Card hierarchy`
    reason: supports repeated card surfaces but header/count and price-row alignment need verification.
    risk: fixed columns or wrappers could distort long product names.
  - candidate: `plain key-value list`
    fit: `reject`
    source: `layout capability comparison`
    reason: cannot preserve nested product detail cards.
    risk: collapses checkout review hierarchy.
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [couponVoucher]

- patternEvidence: Figma metadata shows `ListText` rows with an internal divider; visible rows are long coupon names with right-aligned negative amounts.
- patternDecision:
  - patternFamily: `discount-key-value-list`
  - decision: `existing composition`
  - reason: discount rows require stable label/value alignment and internal separation.
- layoutStrategy: preserve two discount rows and the internal divider.
- layoutContract:
  - role: review coupon/voucher discount application.
  - structure: title, key-value discount rows, internal divider.
  - alignment: label leading, negative amount right-aligned.
  - density: compact financial rows.
  - wrapping: long coupon names may truncate/wrap while amount column stays stable.
  - distortionRisk: amount column squeeze makes discounts unreadable.
- componentCandidates:
  - candidate: `key-value discount list capability`
    fit: `strong`
    source: `layoutContract capability`
    reason: protects long-label/right-amount relationship.
    risk: needs truncation/wrapping behavior check in Build.
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [tPlusPoint]

- patternEvidence: Figma metadata shows `TextField`, availability `ListText`, and `CheckBox`; visible field has trailing/sibling `모두 사용` action.
- patternDecision:
  - patternFamily: `point-input-with-action`
  - decision: `existing composition`
  - reason: numeric point input requires secondary all-use action and auto-use checkbox.
- layoutStrategy: keep input/action, availability row, and checkbox in one section.
- layoutContract:
  - role: enter/use available T Plus points.
  - structure: title, numeric input with secondary action, available-points key-value row, checkbox row.
  - alignment: input grows; `모두 사용` remains action-sized; points value right-aligned.
  - density: form section density.
  - wrapping: checkbox label may wrap after control; button label remains stable.
  - distortionRisk: secondary action must not read as primary CTA.
- componentCandidates:
  - candidate: `field with trailing action + checkbox composition`
    fit: `strong`
    source: `layoutContract capability`
    reason: supports all required point-input controls and state rows.
    risk: exact input validation is policy TBD.
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [subscriptionType]

- patternEvidence: Figma metadata shows two `ListSelected` rows and a `Callout`; visible selected recurring option includes helper explanation.
- patternDecision:
  - patternFamily: `radio-choice-list-with-selected-helper`
  - decision: `existing composition`
  - reason: selected recurring subscription has explanatory helper copy.
- layoutStrategy: keep helper copy visually attached to selected `정기 구독` row.
- layoutContract:
  - role: choose one-time or recurring subscription.
  - structure: title, two radio rows, helper/callout for selected recurring row.
  - alignment: control leading; helper indented/aligned with selected content.
  - density: compact choice section.
  - wrapping: helper wraps under selected row.
  - distortionRisk: helper text must not merge with unrelated choice.
- componentCandidates:
  - candidate: `radio list with selected helper capability`
    fit: `strong`
    source: `Figma ListSelected + Callout hierarchy`
    reason: supports selected row explanation.
    risk: exact recurrence policy is TBD.
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [paymentMethod]

- patternEvidence: Figma metadata shows multiple `Local_PaymentList` rows plus `BannerHorizontal`; visible selected 11Pay row has helper copy, and other payment methods are radio rows.
- patternDecision:
  - patternFamily: `payment-radio-list-with-benefit-banner`
  - decision: `existing composition / reusable candidate`
  - reason: payment method selection requires radio state, badges/helper copy, row separators, and benefit banner.
- layoutStrategy: keep payment method rows and benefit banner in the same section.
- layoutContract:
  - role: select payment method and view payment benefit.
  - structure: title, selected payment row with helper copy, unselected payment rows, contents dividers, benefit banner/card.
  - alignment: control leading; badges/action captions trailing; helper copy under selected row.
  - density: payment-list density with clear row separation.
  - wrapping: helper text wraps within selected row; row labels do not collide with badges.
  - distortionRisk: selected helper copy must not merge with unrelated payment choices.
- componentCandidates:
  - candidate: `payment method list organism`
    fit: `strong`
    source: `Figma Local_PaymentList + BannerHorizontal hierarchy`
    reason: owns radio rows, selected helper, badges, dividers, and benefit banner.
    risk: likely domain-specific payment organism candidate.
  - candidate: `generic radio list`
    fit: `weak`
    source: `layout capability comparison`
    reason: lacks payment-specific helper/badge/banner capabilities.
    risk: would require wrappers or route-level CSS.
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [paymentSummary]

- patternEvidence: Figma metadata shows many `ListText` rows, internal divider, and `Callout`; visible copy is financial breakdown and final `이번 결제 금액`.
- patternDecision:
  - patternFamily: `key-value-payment-summary`
  - decision: `existing composition`
  - reason: payment summary requires label/value rows, stable amount column, internal divider, and emphasized final amount.
- layoutStrategy: keep after payment method and before agreements.
- layoutContract:
  - role: summarize this checkout payment amount.
  - structure: title, financial key-value rows, internal divider, final amount row, optional callout area if visible in exact implementation.
  - alignment: labels leading, amounts right-aligned.
  - density: compact financial summary.
  - wrapping: long labels may wrap without moving amount column.
  - distortionRisk: all amounts are Figma sample values; do not infer calculation rules.
- componentCandidates:
  - candidate: `key-value payment summary capability`
    fit: `strong`
    source: `layoutContract capability`
    reason: protects financial row alignment and final emphasis.
    risk: exact callout copy/state must be confirmed before Build.
  - candidate: `plain ListText stack`
    fit: `weak`
    source: `Figma primitive hierarchy`
    reason: primitive rows alone do not guarantee stable amount column.
    risk: amount alignment may drift.
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [agreements]

- patternEvidence: Figma metadata shows checkbox/list rows; visible copy has required agreement rows with chevrons.
- patternDecision:
  - patternFamily: `required-agreement-list`
  - decision: `existing composition`
  - reason: payment agreements are a required checklist before final CTA.
- layoutStrategy: keep agreements above notice links and Bottom CTA.
- layoutContract:
  - role: collect required payment/legal agreements.
  - structure: title, required checkbox rows, trailing chevrons/details affordances.
  - alignment: checkbox leading, label leading, chevron trailing.
  - density: list row density.
  - wrapping: required labels wrap without hiding checkbox or chevron.
  - distortionRisk: required agreements must not be hidden below notices or CTA.
- componentCandidates:
  - candidate: `terms checkbox list capability`
    fit: `strong`
    source: `layoutContract capability`
    reason: supports required rows and detail affordances.
    risk: all-agree state not visible in this reference.
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [notices]

- patternEvidence: Figma metadata shows final PageStackContents with `ListText` and `ListSelected` rows; visible section includes notice links.
- patternDecision:
  - patternFamily: `notice-link-list-section`
  - decision: `existing composition`
  - reason: checkout guidance links remain visible above fixed payment CTA.
- layoutStrategy: keep as final scroll content section.
- layoutContract:
  - role: expose benefit/payment notices before purchase.
  - structure: title plus stacked link rows with chevrons.
  - alignment: labels leading, chevrons trailing.
  - density: compact list.
  - wrapping: long notice labels wrap/truncate within row without hiding chevron.
  - distortionRisk: notices must not hide under Bottom.
- componentCandidates:
  - candidate: `notice link list capability`
    fit: `strong`
    source: `layoutContract capability`
    reason: supports visible link rows before CTA.
    risk: exact destination behavior is TBD.
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [actions]

- patternEvidence: fixed bottom `Component 2` with visible CTA `약관 동의하고 결제하기`.
- patternDecision:
  - patternFamily: `bottom-primary-action`
  - decision: `existing pattern`
  - reason: one fixed checkout CTA outside scroll content.
- layoutStrategy: use `Bottom(preset="primary-cta")`.
- layoutContract:
  - role: agree to terms and submit payment.
  - structure: fixed bottom rail with one full-width primary button.
  - alignment: centered label.
  - density: fixed action area.
  - wrapping: long CTA remains readable within button.
  - distortionRisk: CTA must not become the last scroll section.
- componentCandidates:
  - candidate: `Bottom(preset="primary-cta") + primary button capability`
    fit: `strong`
    source: `AppScreen rail contract`
    reason: owns fixed primary payment action placement.
    risk: enablement/agreement behavior is policy TBD.
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

## Policy / OGN Matrix

| section | visibleEvidence | policyRef | OGN | allowedAssertion |
| --- | --- | --- | --- | --- |
| `ordererInfo` | orderer/contact rows, `변경`, information method | `unknown-from-figma-only/TBD` | `unknown-from-figma-only/TBD` | orderer summary exists |
| `customerAuth` | `SKT 고객 인증`, `선택 3개`, info card | `unknown-from-figma-only/TBD` | `unknown-from-figma-only/TBD` | auth selection summary exists |
| `productInfo` | product count, product rows, nested detail cards, change action | `unknown-from-figma-only/TBD` | `unknown-from-figma-only/TBD` | checkout product card list exists |
| `couponVoucher` | coupon names and negative amounts | `unknown-from-figma-only/TBD` | `unknown-from-figma-only/TBD` | coupon/voucher discount rows exist |
| `tPlusPoint` | point input, `모두 사용`, available points, auto-use checkbox | `unknown-from-figma-only/TBD` | `unknown-from-figma-only/TBD` | point input section exists |
| `subscriptionType` | one-time/recurring choices and recurring helper copy | `unknown-from-figma-only/TBD` | `unknown-from-figma-only/TBD` | subscription choice exists |
| `paymentMethod` | payment radio list, selected 11Pay helper, benefit banner | `unknown-from-figma-only/TBD` | `unknown-from-figma-only/TBD` | payment method choice section exists |
| `paymentSummary` | financial rows and final `이번 결제 금액` | `unknown-from-figma-only/TBD` | `unknown-from-figma-only/TBD` | payment summary exists; formulas TBD |
| `agreements` | required agreement checkbox rows | `unknown-from-figma-only/TBD` | `unknown-from-figma-only/TBD` | required agreement list exists |
| `notices` | benefit/payment notice links | `unknown-from-figma-only/TBD` | `unknown-from-figma-only/TBD` | notice link list exists |
| `actions` | bottom CTA `약관 동의하고 결제하기` | `unknown-from-figma-only/TBD` | `unknown-from-figma-only/TBD` | final payment CTA exists |

## Distortion Gates

- Use exact Figma frame `14243:28546` named `상세_결제_결제하기`; do not substitute cart frame `14243:28669`.
- Keep route as `reference-only/not-an-implementation-route` and keep all policy/OGN refs as `unknown-from-figma-only/TBD`.
- Preserve order: `ordererInfo` -> `customerAuth` -> `productInfo` -> `couponVoucher` -> `tPlusPoint` -> `subscriptionType` -> `paymentMethod` -> `paymentSummary` -> `agreements` -> `notices` -> `actions`.
- Preserve visible 4px major section divider bands.
- Keep `[actions]` in `Bottom(preset="primary-cta")`; never render it as final scroll content.
- Product, coupon, and payment summary rows require stable right-aligned values.
- Long product/coupon names may truncate or wrap inside content columns without pushing amount values out of alignment.
- Helper copy belongs to the selected subscription/payment row and must not merge with unrelated choices.
- Do not infer payment, discount, subscription, agreement, product catalog, route, policy, or OGN behavior from Figma sample copy alone.
