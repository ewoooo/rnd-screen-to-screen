# SKT GenUI Test 0512 / node 14243:28433 / frame 02 — Screen Wire Reference

## Screen Contract

- reference pack: `apps/mobile/src/screen-diagrams/skt-genui-test-0512/detail-form/additional-info-check.diagram.md`
- source: `Figma`
- Figma file: `SKT GenUI Test 0512`
- Figma SOT node verified: `14243:28474`
- Figma SOT node name: `상세_정보 체크`
- frame index: `02`
- frame role: `reference-only` / not an implementation route
- visible pattern: `form-entry`
- visible task: 추가 정보 입력 후 다음 단계로 진행
- AppScreen rails: `Header`, `Content`, `Bottom`
- scroll owner: `AppScreen.Content`
- fixed action owner: `AppScreen.Bottom`
- bottom: `Bottom(preset="primary-cta")`
- policy refs: `unknown-from-figma-only/TBD`
- OGN refs: `unknown-from-figma-only/TBD`
- Figma verification: exact node screenshot captured; design context inspected for visible text and hierarchy
- required SOT before implementation: `DESIGN_FOUNDATION.md`, `DESIGN_PATTERNS.md`, `SPACING_PATTERNS.md`, `SCREEN_STRUCTURE_PRINCIPLES.md`

## Screen Wire

```txt
┌─AppScreen 393×1062────────────────────────────────────┐
├─Header────────────────────────────────────────────────┤
│ 9:41                                      ▮▮▮  wifi ▰ │
│                                                        │
│   ‹   추가 정보 입력                                  │
├─Content(scroll)───────────────────────────────────────┤
│                                                        │
│ [stickyDeviceSummary]                                 │
│   ┌────────────────────────────────────────────────┐   │
│   │ ┌────┐  iPhone 20 Pro 코스믹 오렌지 512G   +  │   │
│   │ │img │  129,797원 /월                         │   │
│   │ └────┘  (부가세, 할부수수료 포함)             │   │
│   └────────────────────────── rounded summary sheet ┘   │
│                                                        │
│ [bundleDiscount]                                      │
│   결합 할인                                           │
│   ●  온가족 할인 (월 -26,700원)                       │
│   ○  적용하지 않음                                    │
│                                                        │
├══Divider 4px / bg-alt══════════════════════════════════┤
│                                                        │
│ [usimEsim]                                            │
│   USIMㆍ이심(eSIM)                                    │
│   ○  신규 USIM 구매 (7,700원)                         │
│   ●  기존 USIM 사용                                   │
│   ○  eSIM 구매(2,750원)                               │
│                                                        │
│   ┌────────────────────────────── notice callout ──┐   │
│   │ 기존 단말기에 고객님이 가입하셨던 유심은...    │   │
│   │ TBD/illegible-from-screenshot                  │   │
│   └────────────────────────────────────────────────┘   │
│                                                        │
├══Divider 4px / bg-alt══════════════════════════════════┤
│                                                        │
│ [phoneDeliveryMethod]                                 │
│   휴대폰 배송 방법                                    │
│   ○  바로도착                                         │
│   ○  행복배송                                         │
│   ●  택배                                             │
│   ○  매장 픽업                                        │
│                                                        │
│ [deliveryAddress]                                     │
│   배송지                                              │
│   ☑  가입자 정보와 동일                               │
│                                                        │
│   받으시는 분                                         │
│   ┌────────────────────────────────────────────────┐   │
│   │ 조현호                                         │   │
│   └──────────────────────────────────── field block ┘   │
│   연락처                                             │
│   ┌────────────────────────────────────────────────┐   │
│   │ 010-1234-5678                                  │   │
│   └──────────────────────────────────── field block ┘   │
│   주소                                               │
│   ┌──────────────────────────────┐ ┌──────────────┐   │
│   │ 01155                        │ │ 주소 찾기    │   │
│   └──────────────── field block ─┘ └──── action ──┘   │
│   ┌────────────────────────────────────────────────┐   │
│   │ 서울 강북구 오현로 45,                         │   │
│   └──────────────────────────────────── field block ┘   │
│   ┌────────────────────────────────────────────────┐   │
│   │ 107동 203호(미아동, 꿈의숲해링턴플레이스)     │   │
│   └──────────────────────────────────── field block ┘   │
│                                                        │
├══Divider 4px / bg-alt══════════════════════════════════┤
│                                                        │
│ [instantCompensation]                                 │
│   바로 보상 안내  ⓘ                                   │
│   보상 폰 반납하면 최대금액 당일 보상                 │
│                                                        │
│   휴대폰 모델명                      등급산정기준 보기 │
│   ┌──────────────────────────────┐ ┌──────────────┐   │
│   │ 아이폰14 256GB               │ │ 검색         │   │
│   └──────────────── field block ─┘ └──── action ──┘   │
│   예시 : 갤럭시 S10, 갤럭시 노트9                    │
│   ────────────────────────────────────────────────     │
│   A등급 기준 최대 보상금액                 295,000원  │
│                                                        │
│   ┌────────────────────────────────────────────────┐   │
│   │ 바로보상 신청                                  │   │
│   └────────────────────────────── secondary action ┘   │
│                                                        │
│   ┌────────────────────────────── notice callout ──┐   │
│   │ 바로보상이란?                                  │   │
│   │ • 사용하던 휴대폰을 반납하고 당일에 현금으로...│   │
│   │ • 바로도착, 행복배송, 택배인 경우만 신청 가능...│  │
│   └────────────────────────────────────────────────┘   │
│                                                        │
├══Divider 4px / bg-alt══════════════════════════════════┤
│                                                        │
│ [tGiftDelivery]                                       │
│   T기프트 배송 정보                         ┌────┐   │
│                                             │배송│   │
│   ☑  가입자 정보와 동일                    └────┘   │
│                                                        │
│   받으시는 분                                         │
│   ┌────────────────────────────────────────────────┐   │
│   │ 조현호                                         │   │
│   └──────────────────────────────────── field block ┘   │
│   연락처                                             │
│   ┌────────────────────────────────────────────────┐   │
│   │ 010-1234-5678                                  │   │
│   └──────────────────────────────────── field block ┘   │
│   주소                                               │
│   ┌──────────────────────────────┐ ┌──────────────┐   │
│   │ 01155                        │ │ 주소 찾기    │   │
│   └──────────────── field block ─┘ └──── action ──┘   │
│   ┌────────────────────────────────────────────────┐   │
│   │ 서울 강북구 오현로 45,                         │   │
│   └──────────────────────────────────── field block ┘   │
│   ┌────────────────────────────────────────────────┐   │
│   │ 107동 203호(미아동, 꿈의숲해링턴플레이스)     │   │
│   └──────────────────────────────────── field block ┘   │
├─Bottom(preset="primary-cta")──────────────────────────┤
│ [primaryAction]                                       │
│   ┌────────────────────────────────────────────────┐   │
│   │ 다음                                           │   │
│   └──────────────────────────── primary CTA / fixed ┘   │
└────────────────────────────────────────────────────────┘
```

## Section Contracts

### [stickyDeviceSummary]

- slot: `Content`
- visibleRole: 선택 단말/월 납부 요약
- visibleStructure: thumbnail, two-line product/price summary, plus icon
- copyEvidence: `iPhone 20 Pro 코스믹 오렌지 512G`, `129,797원`, `/월`, `(부가세, 할부수수료 포함)`
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [bundleDiscount]

- slot: `Content`
- visibleRole: 결합 할인 선택
- visibleStructure: title, two radio rows
- copyEvidence: `결합 할인`, `온가족 할인 (월 -26,700원)`, `적용하지 않음`
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [usimEsim]

- slot: `Content`
- visibleRole: USIM/eSIM 선택
- visibleStructure: title, three radio rows, notice box
- copyEvidence: `USIMㆍ이심(eSIM)`, `신규 USIM 구매 (7,700원)`, `기존 USIM 사용`, `eSIM 구매(2,750원)`, notice text partly `TBD/illegible-from-screenshot`
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [phoneDeliveryMethod]

- slot: `Content`
- visibleRole: 휴대폰 배송 방법 선택
- visibleStructure: title, four radio rows
- copyEvidence: `휴대폰 배송 방법`, `바로도착`, `행복배송`, `택배`, `매장 픽업`
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [deliveryAddress]

- slot: `Content`
- visibleRole: 휴대폰 배송지 입력
- visibleStructure: checkbox, recipient/contact/address fields, address-search action
- copyEvidence: `배송지`, `가입자 정보와 동일`, `받으시는 분`, `조현호`, `연락처`, `010-1234-5678`, `주소`, `01155`, `주소 찾기`, `서울 강북구 오현로 45,`, `107동 203호(미아동, 꿈의숲해링턴플레이스)`
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [instantCompensation]

- slot: `Content`
- visibleRole: 바로 보상 안내 및 신청
- visibleStructure: info title, model field, search button, help text, summary row, secondary button, callout
- copyEvidence: `바로 보상 안내`, `보상 폰 반납하면 최대금액 당일 보상`, `휴대폰 모델명`, `등급산정기준 보기`, `아이폰14 256GB`, `검색`, `예시 : 갤럭시 S10, 갤럭시 노트9`, `A등급 기준 최대 보상금액`, `295,000원`, `바로보상 신청`, `바로보상이란?`
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [tGiftDelivery]

- slot: `Content`
- visibleRole: T기프트 배송 정보 입력
- visibleStructure: title with badge, checkbox, recipient/contact/address fields, address-search action
- copyEvidence: `T기프트 배송 정보`, `배송`, `가입자 정보와 동일`, `받으시는 분`, `조현호`, `연락처`, `010-1234-5678`, `주소`, `01155`, `주소 찾기`, `서울 강북구 오현로 45,`, `107동 203호(미아동, 꿈의숲해링턴플레이스)`
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [primaryAction]

- slot: `Bottom`
- visibleRole: 다음 단계 진행
- visibleStructure: full-width primary CTA
- copyEvidence: `다음`
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

## Policy / OGN Matrix

### [stickyDeviceSummary]

- policySource: `unknown-from-figma-only/TBD`
- OGNSource: `unknown-from-figma-only/TBD`
- implementationNote: preserve the sticky-looking local sheet immediately under the app bar with thumbnail, price, and plus affordance

### [bundleDiscount]

- policySource: `unknown-from-figma-only/TBD`
- OGNSource: `unknown-from-figma-only/TBD`
- implementationNote: Figma shows selected `온가족 할인 (월 -26,700원)` and unselected `적용하지 않음`; do not infer eligibility rules

### [usimEsim]

- policySource: `unknown-from-figma-only/TBD`
- OGNSource: `unknown-from-figma-only/TBD`
- implementationNote: Figma shows three radio choices and a dim notice box; exact long notice copy remains `TBD/illegible-from-screenshot`

### [phoneDeliveryMethod]

- policySource: `unknown-from-figma-only/TBD`
- OGNSource: `unknown-from-figma-only/TBD`
- implementationNote: `택배` is selected in the SOT; do not infer delivery constraints from selection state alone

### [deliveryAddress]

- policySource: `unknown-from-figma-only/TBD`
- OGNSource: `unknown-from-figma-only/TBD`
- implementationNote: address field group appears inside the delivery-method section below a checked same-as-subscriber row

### [instantCompensation]

- policySource: `unknown-from-figma-only/TBD`
- OGNSource: `unknown-from-figma-only/TBD`
- implementationNote: keep the model search, price summary, 신청 button, and explanatory callout as separate visual units

### [tGiftDelivery]

- policySource: `unknown-from-figma-only/TBD`
- OGNSource: `unknown-from-figma-only/TBD`
- implementationNote: title includes a small `배송` badge; address fields mirror the earlier delivery-address group

### [primaryAction]

- policySource: `unknown-from-figma-only/TBD`
- OGNSource: `unknown-from-figma-only/TBD`
- implementationNote: CTA remains fixed in `Bottom(preset="primary-cta")`, not terminal scroll content

## Distortion Gates

- This file is a Screen Wire reference only. Do not create or imply a route, registry entry, policy id, or OGN id from this diagram alone.
- Figma SOT is exact node `14243:28474` named `상세_정보 체크`; do not reuse older frame-02 assumptions from node `14243:28433`.
- Keep AppScreen slot ownership as `Header`, `Content`, `Bottom`; `Content` is the scroll owner and `Bottom(preset="primary-cta")` owns `다음`.
- Keep visible section divider bands as real section breaks. In diagrams they must appear as `├══Divider 4px / bg-alt...┤`.
- Preserve the visible order: local device summary -> 결합 할인 -> USIMㆍ이심(eSIM) -> 휴대폰 배송 방법/배송지 -> 바로 보상 안내 -> T기프트 배송 정보 -> 다음 CTA.
- Do not collapse radio groups, field groups, notice boxes, summary rows, secondary action, or callout into component-tree notation.
- Do not invent policy constraints, validation rules, shipping eligibility, USIM/eSIM eligibility, compensation rules, or OGN names from this visual reference.
- Use `TBD/illegible-from-screenshot` for long helper/callout sentences where the screenshot/design context does not provide stable exact copy.
