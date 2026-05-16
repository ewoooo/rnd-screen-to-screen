# Frame 02 — 리스트_T플러스포인트 내역

## Screen Contract

- reference pack: `SKT GenUI Test 0512 / node 14243:28824 / frame index 02`
- figma source: `SKT GenUI Test 0512` / exact frame `리스트_T플러스포인트 내역` (`14243:28846`, `393×1062`)
- figma verification: screenshot from exact node + shallow geometry inspection from exact node
- route: `reference-only/not-an-implementation-route`
- screen title: `T 플러스포인트 내역`
- pattern: `list`
- source confidence: `figma-screenshot + exact-node-geometry-inspection`
- policy refs: `unknown-from-figma-only/TBD`
- OGN refs: `unknown-from-figma-only/TBD`
- AppScreen slots: `Header`, `Content`
- bottom: `none-visible-in-figma`
- visible content sections: `summary`, `historyHeader`, `filters`, `monthGroup`, `pointRows`

## Screen Wire

```txt
┌─AppScreen 393×1062────────────────────────────────────┐
├─Header────────────────────────────────────────────────┤
│ 9:41                                      ▮▮▮  wifi ▰ │
│                                                        │
│   ‹   T 플러스포인트 내역                             │
├─Content(scroll)───────────────────────────────────────┤
│                                                        │
│ [summary]                                             │
│   ┌────────────────────────────────────────────────┐   │
│   │ 사용가능 포인트                         ┌────┐ │   │
│   │ 990P                                    │선물│ │   │
│   │                                         └────┘ │   │
│   │ 보유 포인트                                  180P │ │
│   │ 적립예정 포인트                                0P │ │
│   └────────────────────────────── rounded summary ─┘   │
│                                                        │
│ [historyHeader]                                       │
│   포인트 이용내역                        최근 3개월 ▾ │
│                                                        │
│ [filters]                                             │
│   ┌──────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐               │
│   │ 전체 │ │적립│ │사용│ │선물│ │통합│               │
│   └─sel──┘ └────┘ └────┘ └────┘ └────┘               │
│                                                        │
│ [monthGroup]                                          │
│   2026.01                                             │
│                                                        │
│ [pointRows]                                           │
│   룰렛이벤트 당첨                          +500P      │
│   쿠폰 적립  │  2026.01.30                           │
│   ────────────────────────────────────────────────     │
│   룰렛이벤트 당첨                          +500P      │
│   쿠폰 적립  │  2026.01.30                           │
│   ────────────────────────────────────────────────     │
│   룰렛이벤트 당첨                          +500P      │
│   쿠폰 적립  │  2026.01.30                           │
│   ────────────────────────────────────────────────     │
│   룰렛이벤트 당첨                          +500P      │
│   쿠폰 적립  │  2026.01.30                           │
│   ────────────────────────────────────────────────     │
│   룰렛이벤트 당첨                          +500P      │
│   쿠폰 적립  │  2026.01.30                           │
│                                                        │
└────────────────────────────────────────────────────────┘
```

## Section Contracts

### [summary]

- slot: `Content`
- visibleTitle: `사용가능 포인트`
- visibleContent: `990P`, badge/action `선물`, rows `보유 포인트 180P`, `적립예정 포인트 0P`
- vocabularyDecision: reuse `Local_Summary`; component may be unregistered
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [historyHeader]

- slot: `Content`
- visibleTitle: `포인트 이용내역`
- visibleContent: right aligned period selector `최근 3개월`
- vocabularyDecision: reuse `TitleSection` plus inline select/dropdown affordance
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [filters]

- slot: `Content`
- visibleContent: chip group `전체`, `적립`, `사용`, `선물`, `통합`; `전체` selected
- vocabularyDecision: reuse `Chips`
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [monthGroup]

- slot: `Content`
- visibleContent: month label `2026.01`
- vocabularyDecision: list group header text
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [pointRows]

- slot: `Content`
- visibleContent: repeated point row with title, type/date metadata, positive point amount
- vocabularyDecision: reuse `PageStackList`, `SectionItem`, `Local_ListInfo`; component may be unregistered
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

## Policy / OGN Matrix

### [summary]

- visibleEvidence: `사용가능 포인트 990P`, `선물`, `보유 포인트 180P`, `적립예정 포인트 0P`
- policyInterpretation: point balances and gift entry are visible; exact balance calculation and gift eligibility policy are not visible
- OGNInterpretation: `unknown-from-figma-only/TBD`
- decision: preserve primary available point value and secondary balance rows inside one card

### [historyHeader] / [filters]

- visibleEvidence: `포인트 이용내역`, `최근 3개월`, chips `전체`, `적립`, `사용`, `선물`, `통합`
- policyInterpretation: list supports period and type filtering; filter rules are not visible
- OGNInterpretation: `unknown-from-figma-only/TBD`
- decision: keep filters directly above month grouping

### [pointRows]

- visibleEvidence: repeated `룰렛이벤트 당첨`, `쿠폰 적립`, `2026.01.30`, `+500P`
- policyInterpretation: positive point accrual row is visible; detail route and row state are not visible
- OGNInterpretation: `unknown-from-figma-only/TBD`
- decision: preserve blue positive amount on the right and row dividers between repeated items

## Distortion Gates

- Use exact Figma frame `14243:28846`.
- Keep `선물` as a compact badge/action inside the summary card, not as a bottom action.
- Preserve all five chips and selected `전체` state.
- Do not collapse `보유 포인트` and `적립예정 포인트` into body copy.
- Do not invent expiry, cancellation, empty, or disabled states.
