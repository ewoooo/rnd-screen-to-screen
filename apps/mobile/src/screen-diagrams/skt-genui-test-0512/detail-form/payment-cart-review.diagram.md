# SKT GenUI Test 0512 / node 14243:28433 / frame 03

## Screen Contract

- artifact type: `Screen Wire reference diagram`
- implementation route: `N/A` / reference pack only
- source: `Figma`
- source file: `SKT GenUI Test 0512`
- verified Figma SOT node: `14243:28669`
- verified Figma SOT node name: `상세_결제_카트`
- frame index: `03`
- frame role: cart review and payment agreement
- observed pattern: `detail` + cart product list + fixed bottom purchase CTA
- bottom: `Bottom(preset="primary-cta")`
- policy scope: `unknown-from-figma-only/TBD`
- OGN scope: `unknown-from-figma-only/TBD`
- required rail contract: `AppScreen -> Header -> Content -> Bottom`
- visible content basis: Figma screenshot and shallow text inspection from exact node `14243:28669`

This reference captures the visible wire only. It must not be treated as a route implementation contract until policy refs, domain module ids, and OGN ids are confirmed from the source policy package.

## Screen Wire

```txt
┌─AppScreen 393×scroll──────────────────────────────────┐
├─Header────────────────────────────────────────────────┤
│ 9:41                                      ▮▮▮  wifi ▰ │
│                                                        │
│   ‹   카트                                           │
├─Content(scroll)───────────────────────────────────────┤
│                                                        │
│ [shippingInfo]                                        │
│   배송지 정보                                         │
│                                                        │
│   회사                                            변경 │
│   010-1234-5678                                      │
│   서울특별시 강남구 논현동 언주로149길 17             │
│   4층 Plus X                                          │
│   배송 요청 사항          부재 시 전화 부탁드립니다   │
│                                                        │
├══Divider 4px / bg-alt══════════════════════════════════┤
│                                                        │
│ [sktCustomerAuth]                                     │
│   SKT 고객 인증  ⓘ        선택한 휴대폰 번호 3개   ›  │
│   ┌────────────────────────────────────────────────┐   │
│   │ 데이터 및 혜택이 제공돼요                     │   │
│   └──────────────────────────────── rounded callout ┘   │
│                                                        │
├══Divider 4px / bg-alt══════════════════════════════════┤
│                                                        │
│ [cartProducts]                                        │
│   상품 3                                      전체삭제 │
│                                                        │
│   배달의민족 쿠폰팩                                 × │
│   ┌─Product Card───────────────────────────────────┐   │
│   │ (배민 logo)  배달의민족                       │   │
│   │              배달의민족 5,000원 쿠폰           │   │
│   │              + 배민1 10,000원 쿠폰             │   │
│   │ ┌─Price Box─────────────────────────────────┐ │   │
│   │ │ 첫 구독 할인가              50% 10,000원 │ │   │
│   │ │                                      5,000원 │   │
│   │ │ 이용 금액                    2주/48,000원 │ │   │
│   │ └────────────────────────── nested price box ┘ │   │
│   │              상품/옵션 변경하기                │   │
│   └──────────────────────────────── product card ──┘   │
│                                                        │
│   배달의민족 쿠폰팩                                 × │
│   ┌─Product Card───────────────────────────────────┐   │
│   │ (배민 logo)  배달의민족                       │   │
│   │              배달의민족 5,000원 쿠폰           │   │
│   │              + 배민1 10,000원 쿠폰             │   │
│   │ ┌─Price Box─────────────────────────────────┐ │   │
│   │ │ 첫 구독 할인가              50% 10,000원 │ │   │
│   │ │                                      5,000원 │   │
│   │ │ 이용 금액                    2주/48,000원 │ │   │
│   │ └────────────────────────── nested price box ┘ │   │
│   │              상품/옵션 변경하기                │   │
│   └──────────────────────────────── product card ──┘   │
│                                                        │
│   배달의민족 쿠폰팩                                 × │
│   ┌─Product Card───────────────────────────────────┐   │
│   │ [T logo]      티빙                             │   │
│   │              티빙 광고형 스탠다드 이용권       │   │
│   │ [Disney]     디즈니플러스                     │   │
│   │              디즈니 플러스 이용권 50% 할인    │   │
│   │ ┌─Price Box─────────────────────────────────┐ │   │
│   │ │ 첫 구독 할인가              50% 10,000원 │ │   │
│   │ │                                      5,000원 │   │
│   │ │ 이용 금액                    2주/48,000원 │ │   │
│   │ └────────────────────────── nested price box ┘ │   │
│   │              상품/옵션 변경하기                │   │
│   └──────────────────────────────── product card ──┘   │
│                                                        │
├══Divider 4px / bg-alt══════════════════════════════════┤
│                                                        │
│ [paymentInfo]                                         │
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
│                                                        │
│ [notices]                                             │
│   유의사항                                            │
│   · 카트에 상품은 최대 10개까지 담을 수 있습니다.     │
│   · 담긴 상품은 90일간 보관됩니다.                    │
│                                                        │
├─Bottom(preset="primary-cta")──────────────────────────┤
│ [actions]                                             │
│   ┌────────────────────────────────────────────────┐   │
│   │              약관 동의하고 결제하기            │   │
│   └──────────────────────────── centered CTA button ┘   │
└────────────────────────────────────────────────────────┘
```

## Section Contracts

### [shippingInfo]

- slot: `Content`
- visibleResponsibility: shows the delivery destination, recipient/contact details, address, detail address, request note, and a change affordance
- requiredStructure: first content stack below header; title, named destination row with right pill button, then compact text rows
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [sktCustomerAuth]

- slot: `Content`
- visibleResponsibility: shows SKT customer authentication context and selected phone-number count
- requiredStructure: title row with info icon, right-side selected-phone summary, and a rounded dim callout
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [cartProducts]

- slot: `Content`
- visibleResponsibility: shows three cart products with remove controls, service logos/thumbnails, discount/price boxes, and per-item option change links
- requiredStructure: preserve three visible product blocks; preserve card-like price boxes inside each product; do not collapse products into a single summary row
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [paymentInfo]

- slot: `Content`
- visibleResponsibility: shows payment breakdown rows and emphasized expected payment amount
- requiredStructure: left-label/right-value rows, indented sub-discount rows, internal thin divider before final total, final total in brand emphasis
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [notices]

- slot: `Content`
- visibleResponsibility: shows cart retention and cart-size notice bullets before payment
- requiredStructure: title plus bulleted list in scroll content; remains above fixed Bottom CTA
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [actions]

- slot: `Bottom`
- visibleResponsibility: primary agreement/payment action
- requiredStructure: one full-width primary CTA in `Bottom(preset="primary-cta")`; do not place CTA inside scroll content
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

## Policy / OGN Matrix

### [shippingInfo]

- visibleEvidence: 배송지 정보 block with `회사`, phone number, address lines, request note, and `변경` button
- inferredUserTask: confirm or change delivery destination before payment
- policyRef: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- allowedAssertion: shipping/delivery-info section exists; exact validation, address model, and editable fields are TBD

### [sktCustomerAuth]

- visibleEvidence: SKT 고객 인증 section with selected phone-number count `3개` and a dim callout
- inferredUserTask: review SKT customer authentication state attached to selected phone numbers
- policyRef: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- allowedAssertion: authentication/status section exists; exact auth policy and phone-number selection rules are TBD

### [cartProducts]

- visibleEvidence: 상품 `3`, `전체삭제`, three visible product blocks, per-product `×` controls, 배달의민족/티빙/디즈니플러스 copy, price boxes, and `상품/옵션 변경하기` links
- inferredUserTask: review/remove cart products, review benefits/discounts/usage amounts, and change product/options before payment
- policyRef: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- allowedAssertion: cart contains three visible product blocks, product card/list pattern, and option-change affordance; exact product catalog IDs, eligibility rules, and pricing formulas are TBD

### [paymentInfo]

- visibleEvidence: 결제 정보 rows with subtotal, first-month discount, plus/SKT/coupon/point discounts, and final `결제 예상 금액`
- inferredUserTask: review expected payment amount and discount breakdown before agreeing
- policyRef: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- allowedAssertion: payment breakdown and final expected amount exist; calculation rules are not recoverable from Figma alone

### [notices]

- visibleEvidence: 유의사항 bullets: cart max count and retention period
- inferredUserTask: read cart constraints before payment
- policyRef: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- allowedAssertion: notice section includes max cart count and retention-period guidance; enforcement behavior is TBD

### [actions]

- visibleEvidence: Bottom CTA `약관 동의하고 결제하기`
- inferredUserTask: agree to terms and proceed with payment
- policyRef: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- allowedAssertion: primary CTA label is visible; terms agreement mechanics and submission behavior are TBD

## Distortion Gates

- Use only `AppScreen.Header`, `AppScreen.Content`, and `Bottom(preset="primary-cta")` rails for this reference. Do not convert the bottom CTA into scroll content.
- Preserve the visible full-width divider bands as section boundaries using `├══Divider...`; do not replace them with arbitrary whitespace or card margins.
- Keep the actual observed content order: `shippingInfo` -> `sktCustomerAuth` -> `cartProducts` -> `paymentInfo` -> `notices` -> `actions`.
- Do not reintroduce the older device/5G-plan purchase interpretation; the verified SOT node is a cart/payment screen named `상세_결제_카트`.
- Preserve three distinct cart product blocks, each with a visible remove affordance and internal price box. Do not merge them into one product summary or move prices into the payment summary.
- Keep `전체삭제` as a cart-list-level action and `상품/옵션 변경하기` as a per-product action.
- Payment rows must remain label/value rows with right-aligned amounts, indented sub-discount rows, and a thin internal divider before the emphasized final amount.
- Notice bullets must remain visible above the fixed CTA and may scroll. They must not be hidden in a tooltip, modal, or collapsed legal affordance unless policy confirms that interaction.
- Do not invent policy ids, use case ids, domain module ids, OGN ids, product catalog IDs, discount formulas, or validation rules from Figma.
- Any implementation route derived from this diagram must first replace every `unknown-from-figma-only/TBD` with policy-core evidence or explicit source confirmation.
