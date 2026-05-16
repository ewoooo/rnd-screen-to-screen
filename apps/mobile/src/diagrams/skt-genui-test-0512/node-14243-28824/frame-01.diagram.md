# Frame 01 — 리스트_할인내역

## Screen Contract

- reference pack: `SKT GenUI Test 0512 / node 14243:28824 / frame index 01`
- figma source: `SKT GenUI Test 0512` / exact frame `리스트_할인내역` (`14243:28863`, `393×1062`)
- figma verification: screenshot from exact node + shallow geometry inspection from exact node
- route: `reference-only/not-an-implementation-route`
- screen title: `할인 내역`
- pattern: `list`
- source confidence: `figma-screenshot + exact-node-geometry-inspection`
- policy refs: `unknown-from-figma-only/TBD`
- OGN refs: `unknown-from-figma-only/TBD`
- AppScreen slots: `Header`, `Content`
- bottom: `none-visible-in-figma`
- visible content sections: `summary`, `historyHeader`, `filters`, `monthGroup`, `discountRows`

## Screen Wire

```txt
┌─AppScreen 393×1062────────────────────────────────────┐
├─Header────────────────────────────────────────────────┤
│ 9:41                                      ▮▮▮  wifi ▰ │
│                                                        │
│   ‹   할인 내역                                       │
├─Content(scroll)───────────────────────────────────────┤
│                                                        │
│ [summary]                                             │
│   ┌────────────────────────────────────────────────┐   │
│   │ 연간 누적 할인 금액                            │   │
│   │ 99,999원                                       │   │
│   └────────────────────────────── rounded summary ─┘   │
│                                                        │
│ [historyHeader]                                       │
│   할인 이용내역                          최근 3개월 ▾ │
│                                                        │
│ [filters]                                             │
│   ┌──────┐  ┌────────┐  ┌──────┐                      │
│   │ 전체 │  │ T멤버십 │  │ T우주 │                      │
│   └─sel──┘  └────────┘  └──────┘                      │
│                                                        │
│ [monthGroup]                                          │
│   2026.01                                             │
│                                                        │
│ [discountRows]                                        │
│   파리바게뜨                              -700원      │
│   제휴사 구매 할인  │  2026.01.30                     │
│   ────────────────────────────────────────────────     │
│   파리바게뜨                              -700원      │
│   제휴사 구매 할인  │  2026.01.30                     │
│   ────────────────────────────────────────────────     │
│   파리바게뜨                              -700원      │
│   제휴사 구매 할인  │  2026.01.30                     │
│   ────────────────────────────────────────────────     │
│   파리바게뜨                              -700원      │
│   제휴사 구매 할인  │  2026.01.30                     │
│   ────────────────────────────────────────────────     │
│   파리바게뜨                              -700원      │
│   제휴사 구매 할인  │  2026.01.30                     │
│                                                        │
└────────────────────────────────────────────────────────┘
```

## Section Contracts

### [summary]

- slot: `Content`
- visibleTitle: `연간 누적 할인 금액`
- visibleContent: `99,999원`
- vocabularyDecision: reuse `Local_Summary` or equivalent summary card; component may be unregistered
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [historyHeader]

- slot: `Content`
- visibleTitle: `할인 이용내역`
- visibleContent: right aligned period selector `최근 3개월`
- vocabularyDecision: reuse `TitleSection` plus inline select/dropdown affordance
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [filters]

- slot: `Content`
- visibleContent: chip group `전체`, `T멤버십`, `T우주`; `전체` selected
- vocabularyDecision: reuse `Chips`
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [monthGroup]

- slot: `Content`
- visibleContent: month label `2026.01`
- vocabularyDecision: list group header text
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [discountRows]

- slot: `Content`
- visibleContent: repeated transaction row with merchant, category/date metadata, negative amount
- vocabularyDecision: reuse `PageStackList`, `SectionItem`, `Local_ListInfo`; component may be unregistered
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

## Policy / OGN Matrix

### [summary]

- visibleEvidence: `연간 누적 할인 금액`, `99,999원`
- policyInterpretation: annual accumulated discount is visible; calculation policy is not visible in Figma
- OGNInterpretation: `unknown-from-figma-only/TBD`
- decision: preserve as one summary card above list controls

### [historyHeader] / [filters]

- visibleEvidence: `할인 이용내역`, `최근 3개월`, chips `전체`, `T멤버십`, `T우주`
- policyInterpretation: date range and discount category filtering are available; filter semantics are not visible
- OGNInterpretation: `unknown-from-figma-only/TBD`
- decision: keep period selector and chip row before month header

### [discountRows]

- visibleEvidence: repeated `파리바게뜨`, `제휴사 구매 할인`, `2026.01.30`, `-700원`
- policyInterpretation: transaction list shows negative discount amount; row tap behavior and pagination are not visible
- OGNInterpretation: `unknown-from-figma-only/TBD`
- decision: preserve blue negative amount on the right and row dividers between repeated items

## Distortion Gates

- Use exact Figma frame `14243:28863`; do not infer from sibling list frames.
- Keep `summary` above title/filter controls.
- Preserve `최근 3개월` as right-aligned period control in the same visual row as `할인 이용내역`.
- Preserve selected chip state on `전체`.
- Do not convert row dividers into large section divider bands.
- Do not invent bottom CTA, empty state, pagination, transaction detail route, or policy IDs.
