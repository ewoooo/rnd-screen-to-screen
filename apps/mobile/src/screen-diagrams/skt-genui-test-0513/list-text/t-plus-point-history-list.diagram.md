# Frame 02 — 리스트_T플러스포인트 내역

## Screen Contract

- reference pack: `SKT GenUI Test 0513 / node 12172:5881 / frame index 02`
- figma source: `SKT GenUI Test 0513` / exact frame `리스트_T플러스포인트 내역` (`12172:5904`, `393×852`)
- figma verification: metadata pack inspection provided for `12172:5904`; name `리스트_T플러스포인트 내역`, bounds `393×852`; Header `y=0 h=107`, Content `y=107 h=732`
- route: `reference-only/not-an-implementation-route`
- screen title: `T 플러스포인트 내역`
- pattern: `list`
- source confidence: `figma-metadata-summary`
- policy refs: `unknown-from-figma-only/TBD`
- OGN refs: `unknown-from-figma-only/TBD`
- AppScreen slots: `Header`, `Content`
- bottom: `none-visible-in-figma`
- visible content sections: `summary`, `historyHeader`, `filters`, `monthGroup`, `pointRows`
- frame geometry:
  - Summary: `Content y=0 h=218`; child card `x=12 y=16 w=369 h=170`
  - ContentsTitle: `y=218 h=37`
  - Chip: `y=255 h=57`
  - TextListGroup: `y=312 h=420`; title `x=32 y=12 h=37`; Local_ListInfo `x=32 y=49 w=329 h=359`
  - Local_Info rows: `5 × 71px` with `1px` dividers
- wireReference:
  - source: `apps/mobile/src/screen-diagrams/skt-genui-test-0512/list-text/t-plus-point-history-list.diagram.md`
  - matchedParts: point balance summary card, inline gift action, period selector, chip filters, month grouping, five point rows, 1px row dividers
  - intentionalDifferences: source pack, node ids, frame bounds, and AppScreen rail updated to `SKT GenUI Test 0513` `393×852`; visible list area preserves five-row stack from metadata
  - limitation: reference-only visual structure; policy/copy/OGN ids are `unknown-from-figma-only/TBD`

## Screen Wire

```txt
┌─AppScreen 393×852─────────────────────────────────────┐
├─Header 107────────────────────────────────────────────┤
│ 9:41                                      ▮▮▮  wifi ▰ │
│                                                        │
│   ‹   T 플러스포인트 내역                             │
├─Content(scroll) y=107 h=732───────────────────────────┤
│                                                        │
│ [summary | point-balance-summary | card action]       │
│   ┌────────────────────────────────────────────────┐   │
│   │ 사용가능 포인트                         ┌────┐ │   │
│   │ 990P                                    │선물│ │   │
│   │                                         └────┘ │   │
│   │ 보유 포인트                                  180P │ │
│   │ 적립예정 포인트                                0P │ │
│   └────────────────────────────── rounded summary ─┘   │
│                                                        │
│ [historyHeader | list-header-period-control | inline] │
│   포인트 이용내역                        최근 3개월 ▾ │
│                                                        │
│ [filters | chip-filter-row | horizontal-scroll]       │
│   ┌──────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐               │
│   │ 전체 │ │적립│ │사용│ │선물│ │통합│               │
│   └─sel──┘ └────┘ └────┘ └────┘ └────┘               │
│                                                        │
│ [monthGroup | date-group-label | text]                │
│   2026.01                                             │
│                                                        │
│ [pointRows | dated-point-list | dividers]             │
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

- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- patternEvidence:
  - wireSemanticTag: `[summary | point-balance-summary | card action]`
  - sectionBoundary: `cardBoundary`
  - fieldGrouping: `key-value-summary`
  - rowSeparators: `none`
  - actionPlacement: `Content`
  - typography: primary available point value emphasized; secondary balance rows use smaller label/value text; `선물` is compact
- patternDecision:
  - patternFamily: `card-key-value-summary-with-inline-action`
  - decision: preserve one rounded point balance card with a compact `선물` action inside the card
  - reason: 0513 metadata keeps the same summary region as the 0512 reference, with the card at `x=12 y=16 w=369 h=170`
- layoutStrategy: top summary card inside `Summary y=0 h=218`, with primary label/value, trailing compact action, and secondary label/value rows
- layoutContract:
  - role: summarize available, held, and pending point balances while exposing gift entry
  - structure: card surface with primary balance block, inline compact action, and two secondary balance rows
  - alignment: primary label/value leading; `선물` action right aligned near primary block; secondary labels and values form stable split rows
  - density: comfortable summary-card padding inside the `170px` card; secondary rows are compact and subordinate
  - wrapping: point values remain stable in the value position; labels may wrap without colliding with the action
  - distortionRisk: moving `선물` outside the card or making it a bottom CTA changes the visible action hierarchy
- componentCandidates:
  - candidate: `balance summary card composition`
    fit: `strong`
    source: `reference capability`
    reason: can own card surface, primary balance emphasis, secondary key/value rows, and inline compact action
    risk: needs verification that compact action does not expand the card width or alter row alignment
  - candidate: `generic key-value summary card`
    fit: `medium`
    source: `reference capability`
    reason: supports secondary rows and surface, but must provide a safe inline action slot
    risk: action may be forced below values if the component lacks a trailing action region
  - candidate: `bottom primary action`
    fit: `reject`
    source: `reference capability`
    reason: `선물` is visible inside the summary card, not in Bottom
    risk: violates action placement

### [historyHeader]

- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- patternEvidence:
  - wireSemanticTag: `[historyHeader | list-header-period-control | inline]`
  - sectionBoundary: `none`
  - fieldGrouping: `single`
  - rowSeparators: `none`
  - actionPlacement: `inline field action`
  - typography: section title left, compact period selector right
- patternDecision:
  - patternFamily: `list-section-header-with-inline-filter`
  - decision: keep title and `최근 3개월` selector in one row
  - reason: metadata places `ContentsTitle y=218 h=37` between summary and chip filters
- layoutStrategy: split row above chip filters
- layoutContract:
  - role: introduce point history and expose date range control
  - structure: left title plus right-aligned dropdown-like selector
  - alignment: same baseline split alignment
  - density: compact `37px` header row separated from summary and filters
  - wrapping: selector label stays intact; title keeps leading priority
  - distortionRisk: representing period as another chip would mix range and type filters
- componentCandidates:
  - candidate: `title row with trailing select`
    fit: `strong`
    source: `reference capability`
    reason: provides split title/control layout
    risk: dropdown affordance must remain compact
  - candidate: `generic section title`
    fit: `medium`
    source: `reference capability`
    reason: acceptable only if it supports a trailing control slot
    risk: otherwise invites route-level alignment patches

### [filters]

- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- patternEvidence:
  - wireSemanticTag: `[filters | chip-filter-row | horizontal-scroll]`
  - sectionBoundary: `none`
  - fieldGrouping: `single`
  - rowSeparators: `none`
  - actionPlacement: `Content`
  - typography: compact chip labels; `전체` selected state is visible
- patternDecision:
  - patternFamily: `chip-filter-row`
  - decision: preserve five type filters as a horizontal chip row
  - reason: metadata places Chip `y=255 h=57`, visually separate from the period selector
- layoutStrategy: horizontal row of chips under history header
- layoutContract:
  - role: filter point history by type
  - structure: selectable chips `전체`, `적립`, `사용`, `선물`, `통합`
  - alignment: leading aligned, horizontal overflow preferred
  - density: compact chip gaps in a `57px` filter band; no connected segmented surface
  - wrapping: chips stay one-line and should scroll if needed
  - distortionRisk: wrapping or converting to tabs changes the control stack height and semantic role
- componentCandidates:
  - candidate: `chip filter row`
    fit: `strong`
    source: `reference capability`
    reason: directly supports one selected chip and multiple filter options
    risk: long localized chip labels should not force multiline chips
  - candidate: `segmented control`
    fit: `weak`
    source: `reference capability`
    reason: selection capability exists but connected segments are not visible
    risk: changes filter affordance and density
  - candidate: `tabs`
    fit: `reject`
    source: `reference capability`
    reason: no underline or page navigation behavior is shown
    risk: misclassifies filters as navigation

### [monthGroup]

- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- patternEvidence:
  - wireSemanticTag: `[monthGroup | date-group-label | text]`
  - sectionBoundary: `none`
  - fieldGrouping: `single`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography: compact month label in TextListGroup title slot
- patternDecision:
  - patternFamily: `date-group-header`
  - decision: keep `2026.01` as a lightweight row-group label
  - reason: TextListGroup title sits at `x=32 y=12 h=37` above Local_ListInfo rows
- layoutStrategy: text label between filters and point rows
- layoutContract:
  - role: identify the month bucket for following rows
  - structure: single text label
  - alignment: leading aligned to list content
  - density: small pause before row stack
  - wrapping: atomic date string should not wrap
  - distortionRisk: section-title treatment would overstate hierarchy
- componentCandidates:
  - candidate: `list group label`
    fit: `strong`
    source: `reference capability`
    reason: preserves lightweight date grouping
    risk: spacing must remain distinct from section dividers
  - candidate: `section header`
    fit: `weak`
    source: `reference capability`
    reason: similar text placement but too much hierarchy
    risk: competes with `포인트 이용내역`

### [pointRows]

- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- patternEvidence:
  - wireSemanticTag: `[pointRows | dated-point-list | dividers]`
  - sectionBoundary: `none`
  - fieldGrouping: `repeated rows`
  - rowSeparators: `Divider(type="contents")`
  - actionPlacement: `none-visible-in-figma`
  - typography: event title leading, positive point amount trailing, type/date metadata caption below
- patternDecision:
  - patternFamily: `dated-transaction-row-list`
  - decision: preserve repeated point rows with thin dividers and right-aligned positive point amounts
  - reason: Local_ListInfo is `x=32 y=49 w=329 h=359` with five `71px` rows and `1px` dividers
- layoutStrategy: vertical row stack under the month group
- layoutContract:
  - role: show individual point events within a month
  - structure: repeated rows with leading title/metadata, trailing point amount, and contents dividers
  - alignment: stable trailing amount column; metadata remains below title in the leading column
  - density: compact list rows with thin separators
  - wrapping: title/type may wrap in leading column; point amount remains intact and right aligned
  - distortionRisk: cardifying rows or losing dividers would break the reference list density
- componentCandidates:
  - candidate: `transaction row list composition`
    fit: `strong`
    source: `reference capability`
    reason: supports leading content, trailing signed amount, metadata caption, and row separators
    risk: positive amount styling must be semantic and consistent with point value state
  - candidate: `generic list item with trailing text`
    fit: `medium`
    source: `reference capability`
    reason: viable if metadata and divider slots are supported
    risk: may not protect stable amount column under long titles
  - candidate: `card list`
    fit: `reject`
    source: `reference capability`
    reason: visible frame uses thin row dividers, not card surfaces
    risk: violates list density

## Policy / OGN Matrix

### [summary]

- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- visibleEvidence: `사용가능 포인트 990P`, `선물`, `보유 포인트 180P`, `적립예정 포인트 0P`
- policyInterpretation: point balances and gift entry are visible; exact balance calculation and gift eligibility policy are not visible
- OGNInterpretation: `unknown-from-figma-only/TBD`
- decision: preserve primary available point value, compact gift action, and secondary balance rows inside one card

### [historyHeader]

- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- visibleEvidence: `포인트 이용내역`, `최근 3개월`
- policyInterpretation: date range selection is available; range rules are not visible
- OGNInterpretation: `unknown-from-figma-only/TBD`
- decision: keep period selector in the history header row

### [filters]

- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- visibleEvidence: chips `전체`, `적립`, `사용`, `선물`, `통합`; `전체` selected
- policyInterpretation: list supports type filtering; filter rules are not visible
- OGNInterpretation: `unknown-from-figma-only/TBD`
- decision: preserve five chips and selected `전체` state

### [monthGroup] / [pointRows]

- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- visibleEvidence: `2026.01`, repeated `룰렛이벤트 당첨`, `쿠폰 적립`, `2026.01.30`, `+500P`
- policyInterpretation: point accrual rows are visible; detail route, cancellation, and row states are not visible
- OGNInterpretation: `unknown-from-figma-only/TBD`
- decision: preserve month grouping, right-aligned positive point amount, and row dividers

## Distortion Gates

- Use exact Figma frame `12172:5904` (`리스트_T플러스포인트 내역`, `393×852`) from `SKT GenUI Test 0513`; do not infer frame bounds from 0512.
- Preserve `Header y=0 h=107` and the `852px` AppScreen rail.
- Keep `Summary y=0 h=218` and card `x=12 y=16 w=369 h=170` as the top content cluster.
- Keep `선물` as a compact action inside the summary card, not as a bottom action.
- Preserve `ContentsTitle y=218 h=37` and keep `최근 3개월` as a period selector in the `포인트 이용내역` header row.
- Preserve `Chip y=255 h=57`, all five chips, and selected `전체` state.
- Preserve `TextListGroup y=312 h=420`, title `x=32 y=12 h=37`, and Local_ListInfo `x=32 y=49 w=329 h=359`.
- Preserve five `71px` rows separated by `1px` dividers.
- Do not collapse `보유 포인트` and `적립예정 포인트` into body copy.
- Do not convert point rows into cards or section divider bands.
- Do not invent expiry, cancellation, empty, disabled, pagination, policy IDs, or OGN IDs.
