# Frame 04 Diagram - 상세_결제_결제하기

## Screen Contract

- source: Figma `SKT GenUI Test 0512`
- sourceNode: `14243:28546`
- sourceFrameName: `상세_결제_결제하기`
- parentNode: `14243:28433`
- frameIndex: `04`
- referenceRole: payment checkout reference
- route: reference-only
- pattern: checkout / payment
- bottom: `Bottom(preset="primary-cta")`
- policySource: unknown-from-figma-only
- ognSource: unknown-from-figma-only
- verification: Figma screenshot and visible text inspection from exact node `14243:28546`

## Screen Wire

```txt
┌─AppScreen───────────────────────────────┐
├─Header──────────────────────────────────┤
│ 9:41                              ▮▮▮  │
│ ‹  결제하기                             │
├─Content─────────────────────────────────┤
│ [ordererInfo]                           │
│ 주문자 정보                             │
│ 조현호                            변경  │
│ 010-1234-5678                           │
│ example@plus-ex.com                     │
│ 정보 안내 방식              문자 메시지 │
├══Divider════════════════════════════════┤
│ [customerAuth]                          │
│ SKT 고객 인증                           │
│ 선택한 휴대폰 번호                  3개 │
│ ┌─────────────────────────────────────┐ │
│ │ 데이터 및 혜택이 제공돼요           │ │
│ └─────────────────────────────────────┘ │
├══Divider════════════════════════════════┤
│ [productInfo]                           │
│ 상품 정보                           2개 │
│                                         │
│ 배달의민족 쿠폰팩      2주    7,000원  │
│ 첫 구독 할인 예정                       │
│ ┌─────────────────────────────────────┐ │
│ │ 배달의민족                          │ │
│ │ 배달의민족 5,000원 쿠폰 + 배민1... │ │
│ │ 추가 요청 사항  맛있게 드시길...   │ │
│ │ 첫 배송 희망일  2023. 05. 23       │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ 티빙 광고형 스탠다드  1개월  5,000원  │
│ 첫 구독 할인 예정                       │
│ ┌─────────────────────────────────────┐ │
│ │ 티빙                                │ │
│ │ 티빙 광고형 스탠다드 이용권         │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ 상품/옵션 변경하기                      │
├══Divider════════════════════════════════┤
│ [couponVoucher]                         │
│ 쿠폰 이용권                             │
│ 배달의민족 5,000원 쿠폰 + 배민1...     │
│                               -999,999원│
│ 배달의민족 5,000원 쿠폰 + 배민1...     │
│                               -999,999원│
├══Divider════════════════════════════════┤
│ [tPlusPoint]                            │
│ T 플러스 포인트                         │
│ ┌─────────────────────────┐ ┌────────┐ │
│ │ 0                       │ │ 모두 사용│ │
│ └─────────────────────────┘ └────────┘ │
│ 사용 가능                       1,000P │
│ ☑ 정기 결제 시 포인트 자동 사용        │
├══Divider════════════════════════════════┤
│ [subscriptionType]                      │
│ 구독 방식                               │
│ ○ 1회 구독                        받기 │
│ ● 정기 구독                       받기 │
│ 구독 주기마다 요금이 정기 결제되며,    │
│ 상품을 계속 이용하실 수 있어요          │
├══Divider════════════════════════════════┤
│ [paymentMethod]                         │
│ 결제 수단                               │
│ ● 카드/계좌 간편결제        최근 결제   │
│   11Pay 로 쉽고 빠르게                  │
│   이용을 위해 약관 동의를 진행해 주세요 │
│ ○ 카카오페이                 빠르게 결제│
│ ○ 네이버페이                 빠르게 결제│
│ ○ 일반 결제                             │
│ ┌─────────────────────────────────────┐ │
│ │ T우주 x 신한카드 결제 혜택          │ │
│ └─────────────────────────────────────┘ │
├══Divider════════════════════════════════┤
│ [paymentSummary]                        │
│ 결제 정보                               │
│ 총 상품 금액                  999,999원 │
│ 총 구독 할인 금액            -999,999원 │
│ 포인트 할인                  -999,999원 │
│ 쿠폰 할인                    -999,999원 │
│ 우주패스 즉시 할인           -999,999원 │
│ 이번 결제 금액                999,999원 │
├══Divider════════════════════════════════┤
│ [agreements]                            │
│ 결제 약관 및 동의                       │
│ □ (필수) 개인정보 수집 및 이용 동의     │
│ □ (필수) 개인정보 제3자 제공 동의       │
│ □ (필수) 정기 결제 약관 동의            │
├══Divider════════════════════════════════┤
│ [notices]                               │
│ 이용 전에 확인해 주세요                 │
│ T멤버십 고객 혜택안내                   │
│ 상품/옵션/결제 관련 유의사항 목록       │
├─Bottom──────────────────────────────────┤
│ [actions]                               │
│ ┌─────────────────────────────────────┐ │
│ │          약관 동의하고 결제하기      │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

## Section Contracts

### [ordererInfo]

- OGN: TBD
- role: summary
- policy: unknown-from-figma-only
- layoutStrategy: leading identity block with right-side `변경` action
- vocabularyDecision: reuse detail summary rows when mapped
- distortionRisk: contact lines must remain separate from information delivery method

### [customerAuth]

- OGN: TBD
- role: authentication-summary
- policy: unknown-from-figma-only
- layoutStrategy: section title, selected phone count, one muted info box
- vocabularyDecision: reuse notice/card summary
- distortionRisk: phone count must not be confused with product count

### [productInfo]

- OGN: TBD
- role: product-list
- policy: unknown-from-figma-only
- layoutStrategy: repeated product rows with nested benefit/detail cards and change action
- vocabularyDecision: reuse product summary list or create product-option organism after policy mapping
- distortionRisk: product rows and nested cards must remain visually grouped

### [couponVoucher]

- OGN: TBD
- role: discount-list
- policy: unknown-from-figma-only
- layoutStrategy: coupon/voucher rows with right-aligned negative amounts
- vocabularyDecision: reuse key-value list
- distortionRisk: long coupon names require truncation or multiline without stealing amount column

### [tPlusPoint]

- OGN: TBD
- role: point-input
- policy: unknown-from-figma-only
- layoutStrategy: numeric input with secondary `모두 사용` action and auto-use checkbox
- vocabularyDecision: reuse field with trailing action plus checkbox row
- distortionRisk: secondary action must not read as primary CTA

### [subscriptionType]

- OGN: TBD
- role: choice
- policy: unknown-from-figma-only
- layoutStrategy: radio choices with explanatory helper text for recurring subscription
- vocabularyDecision: reuse radio list
- distortionRisk: helper text belongs to selected recurring choice

### [paymentMethod]

- OGN: TBD
- role: payment-choice
- policy: unknown-from-figma-only
- layoutStrategy: radio payment list with selected 11Pay helper copy and card benefit callout
- vocabularyDecision: reuse radio card/list pattern
- distortionRisk: selected payment method helper copy must not merge with unrelated payment choices

### [paymentSummary]

- OGN: TBD
- role: price-summary
- policy: unknown-from-figma-only
- layoutStrategy: key-value price stack with final amount emphasized
- vocabularyDecision: reuse key-value summary; final row needs emphasis variant
- distortionRisk: all amounts are Figma sample values; do not infer calculation rules

### [agreements]

- OGN: TBD
- role: terms
- policy: unknown-from-figma-only
- layoutStrategy: required agreement checklist before final payment CTA
- vocabularyDecision: reuse checkbox terms/list pattern
- distortionRisk: required agreements must stay above the notice block and bottom CTA

### [notices]

- OGN: TBD
- role: notice
- policy: unknown-from-figma-only
- layoutStrategy: stacked notice links/copy after agreements
- vocabularyDecision: reuse notice/list text pattern
- distortionRisk: long notice copy must remain scroll content and not hide under Bottom

### [actions]

- OGN: TBD
- role: action
- policy: unknown-from-figma-only
- layoutStrategy: `Bottom(preset="primary-cta")`, one full-width payment action
- vocabularyDecision: reuse SinglePrimaryAction / ActionButton
- distortionRisk: CTA must not become the last scroll content section

## Policy / OGN Matrix

### [ordererInfo]

- OGN: TBD
- policy: unknown-from-figma-only
- requiredUIEvidence: 주문자 정보, 변경 action, contact lines

### [customerAuth]

- OGN: TBD
- policy: unknown-from-figma-only
- requiredUIEvidence: SKT 고객 인증, selected phone count, info box

### [productInfo]

- OGN: TBD
- policy: unknown-from-figma-only
- requiredUIEvidence: 상품 정보 count, product rows, nested detail cards

### [couponVoucher]

- OGN: TBD
- policy: unknown-from-figma-only
- requiredUIEvidence: coupon/voucher discount rows

### [tPlusPoint]

- OGN: TBD
- policy: unknown-from-figma-only
- requiredUIEvidence: point input, 모두 사용 action, auto-use checkbox

### [subscriptionType]

- OGN: TBD
- policy: unknown-from-figma-only
- requiredUIEvidence: one-time/recurring subscription choices

### [paymentMethod]

- OGN: TBD
- policy: unknown-from-figma-only
- requiredUIEvidence: payment radio list and selected helper copy

### [paymentSummary]

- OGN: TBD
- policy: unknown-from-figma-only
- requiredUIEvidence: price rows and emphasized payment amount

### [agreements]

- OGN: TBD
- policy: unknown-from-figma-only
- requiredUIEvidence: required payment agreement checklist

### [notices]

- OGN: TBD
- policy: unknown-from-figma-only
- requiredUIEvidence: usage/payment notice list

### [actions]

- OGN: TBD
- policy: unknown-from-figma-only
- requiredUIEvidence: fixed bottom payment CTA

## Distortion Gates

- Preserve the Figma order: orderer info -> SKT auth -> product info -> coupon/voucher -> point -> subscription type -> payment method -> payment summary -> agreements -> notices -> Bottom CTA.
- Use `├══Divider════════════════════════════════┤` for visible major section bands.
- Keep `[actions]` in `Bottom(preset="primary-cta")`; never render it as the final scroll section.
- Product, coupon, and payment summary rows require stable right-aligned values.
- Long product/coupon names may truncate or wrap inside the content column without pushing amount values out of alignment.
- Do not infer payment, discount, subscription, or agreement policy behavior from Figma sample copy alone.
