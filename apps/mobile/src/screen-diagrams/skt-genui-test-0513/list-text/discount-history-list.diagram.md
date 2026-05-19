# Frame 03 — 리스트_할인내역

## Screen Contract

- reference pack: `SKT GenUI Test 0513 / node 12172:5881 / frame index 03`
- figma source: `SKT GenUI Test 0513` / exact frame `리스트_할인내역` (`12172:5926`, `393×852`)
- figma verification: metadata pack inspection provided for `12172:5926`; name `리스트_할인내역`, bounds `393×852`; Header `y=0 h=107`, Content `y=107 h=664`
- route: `reference-only/not-an-implementation-route`
- screen title: `할인 내역`
- pattern: `list`
- source confidence: `figma-metadata-summary`
- policy refs: `unknown-from-figma-only/TBD`
- OGN refs: `unknown-from-figma-only/TBD`
- AppScreen slots: `Header`, `Content`
- bottom: `none-visible-in-figma`
- visible content sections: `summary`, `historyHeader`, `filters`, `monthGroup`, `discountRows`
- frame geometry:
  - Summary: `Content y=0 h=150`; child card `x=12 y=16 w=369 h=102`
  - ContentsTitle: `y=150 h=37`
  - Chip: `y=187 h=57`
  - TextListGroup: `y=244 h=420`; title `y=12`; Local_ListInfo contains five Local_Info rows with `1px` dividers
- wireReference:
  - source: `apps/mobile/src/screen-diagrams/skt-genui-test-0512/list-text/discount-history-list.diagram.md`
  - matchedParts: summary card, period selector, chip filters, month grouping, five dated transaction rows, 1px row dividers
  - intentionalDifferences: source pack, node ids, frame bounds, and AppScreen rail updated to `SKT GenUI Test 0513` `393×852`; summary/content heights follow 0513 metadata
  - limitation: reference-only visual structure; policy/copy/OGN ids are `unknown-from-figma-only/TBD`

## Screen Wire

```txt
┌─AppScreen 393×852─────────────────────────────────────┐
├─Header 107────────────────────────────────────────────┤
│ 9:41                                      ▮▮▮  wifi ▰ │
│                                                        │
│   ‹   할인 내역                                       │
├─Content(scroll) y=107 h=664───────────────────────────┤
│                                                        │
│ [summary | amount-summary | card]                     │
│   ┌────────────────────────────────────────────────┐   │
│   │ 연간 누적 할인 금액                            │   │
│   │ 99,999원                                       │   │
│   └────────────────────────────── rounded summary ─┘   │
│                                                        │
│ [historyHeader | list-header-period-control | inline] │
│   할인 이용내역                          최근 3개월 ▾ │
│                                                        │
│ [filters | chip-filter-row | horizontal-scroll]       │
│   ┌──────┐  ┌────────┐  ┌──────┐                      │
│   │ 전체 │  │ T멤버십 │  │ T우주 │                      │
│   └─sel──┘  └────────┘  └──────┘                      │
│                                                        │
│ [monthGroup | date-group-label | text]                │
│   2026.01                                             │
│                                                        │
│ [discountRows | dated-transaction-list | dividers]    │
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

- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- patternEvidence:
  - wireSemanticTag: `[summary | amount-summary | card]`
  - sectionBoundary: `cardBoundary`
  - fieldGrouping: `single`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography: label above emphasized amount; amount is the only value emphasis inside the card
- patternDecision:
  - patternFamily: `card-amount-summary`
  - decision: preserve a single rounded summary card above all list controls
  - reason: 0513 metadata places the summary card at `x=12 y=16 w=369 h=102` within `Summary y=0 h=150`
- layoutStrategy: top-of-content summary card with compact vertical label/value stack
- layoutContract:
  - role: summarize annual accumulated discount before transaction browsing
  - structure: one card surface containing a small label and one large amount value
  - alignment: leading text inside card; no right-side value column or action slot
  - density: comfortable card padding inside a shorter `102px` card with whitespace before the list header
  - wrapping: label may wrap before disturbing amount; amount remains readable and leading aligned
  - distortionRisk: losing the card boundary would make the amount read as a section title instead of a summary
- componentCandidates:
  - candidate: `summary-card composition`
    fit: `strong`
    source: `reference capability`
    reason: directly owns surface, radius, padding, and label/value stack required by the contract
    risk: confirm amount typography can be emphasized without route-level overrides
  - candidate: `key-value summary organism`
    fit: `medium`
    source: `reference capability`
    reason: supports summary semantics, but a multi-row value layout may add unnecessary columns
    risk: could introduce label/value split alignment not present in this frame
  - candidate: `plain text section`
    fit: `reject`
    source: `reference capability`
    reason: does not preserve cardBoundary
    risk: violates the summary card visual hierarchy

### [historyHeader]

- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- patternEvidence:
  - wireSemanticTag: `[historyHeader | list-header-period-control | inline]`
  - sectionBoundary: `none`
  - fieldGrouping: `single`
  - rowSeparators: `none`
  - actionPlacement: `inline field action`
  - typography: section title on the left, compact period selector label on the right
- patternDecision:
  - patternFamily: `list-section-header-with-inline-filter`
  - decision: keep section title and period selector in one horizontal row
  - reason: metadata places `ContentsTitle y=150 h=37` immediately above chip filters
- layoutStrategy: split header row immediately above chip filters
- layoutContract:
  - role: introduce discount history list and expose visible period range control
  - structure: left title plus right aligned compact selector with dropdown affordance
  - alignment: title anchors leading edge; selector aligns to trailing edge on the same baseline
  - density: compact `37px` row with clear separation from summary above and filters below
  - wrapping: title should keep priority; selector label must remain intact as a control
  - distortionRisk: moving the period selector into the chip row changes the visible control hierarchy
- componentCandidates:
  - candidate: `title row with trailing select`
    fit: `strong`
    source: `reference capability`
    reason: matches split alignment and inline action placement
    risk: selector affordance must remain visibly interactive
  - candidate: `generic section header`
    fit: `medium`
    source: `reference capability`
    reason: can render the title, but needs a trailing-control slot to satisfy the contract
    risk: without the slot, teams may add ad hoc spacing
  - candidate: `chip group`
    fit: `reject`
    source: `reference capability`
    reason: period selector is not styled as a chip in the frame
    risk: collapses date range and category filtering into one pattern

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
  - decision: preserve category chips as a horizontal filter row under the period header
  - reason: metadata places Chip `y=187 h=57`, separate from `ContentsTitle`
- layoutStrategy: horizontally arranged chips with selected state on the first item
- layoutContract:
  - role: filter visible discount history by category
  - structure: one row of selectable chips: `전체`, `T멤버십`, `T우주`
  - alignment: starts at content leading edge; may scroll horizontally if labels grow
  - density: compact controls in a `57px` filter band with chip gaps, not tab underline spacing
  - wrapping: chip labels stay inside chip boundaries; row should scroll rather than wrap to multiple lines
  - distortionRisk: wrapping chips into two rows would push the month group away from the header/filter cluster
- componentCandidates:
  - candidate: `chip filter row`
    fit: `strong`
    source: `reference capability`
    reason: directly supports selectable chips, selected state, and horizontal overflow behavior
    risk: verify selected styling remains visually distinct
  - candidate: `segmented control`
    fit: `weak`
    source: `reference capability`
    reason: supports selection but imposes connected segments not visible in the frame
    risk: changes spacing and category affordance
  - candidate: `tabs`
    fit: `reject`
    source: `reference capability`
    reason: underline/tab navigation is not shown
    risk: misrepresents filters as page-level navigation

### [monthGroup]

- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- patternEvidence:
  - wireSemanticTag: `[monthGroup | date-group-label | text]`
  - sectionBoundary: `none`
  - fieldGrouping: `single`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography: compact month label, visually separate from row titles
- patternDecision:
  - patternFamily: `date-group-header`
  - decision: keep month as a simple list group label
  - reason: TextListGroup starts at `y=244 h=420`, with the title label at `y=12`
- layoutStrategy: leading month label between filters and the first transaction row
- layoutContract:
  - role: mark the date bucket for following transactions
  - structure: standalone text label
  - alignment: leading edge aligned with list content
  - density: small vertical pause before row stack; no divider band
  - wrapping: date label is atomic and should not wrap
  - distortionRisk: styling the month as a large title would overstate its hierarchy
- componentCandidates:
  - candidate: `list group label`
    fit: `strong`
    source: `reference capability`
    reason: preserves lightweight grouping without extra surface
    risk: ensure spacing does not become a section divider
  - candidate: `section header`
    fit: `weak`
    source: `reference capability`
    reason: title behavior is heavier than the visible month label
    risk: may compete with `할인 이용내역`

### [discountRows]

- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- patternEvidence:
  - wireSemanticTag: `[discountRows | dated-transaction-list | dividers]`
  - sectionBoundary: `none`
  - fieldGrouping: `repeated rows`
  - rowSeparators: `Divider(type="contents")`
  - actionPlacement: `none-visible-in-figma`
  - typography: row title leading, amount emphasized trailing, metadata caption below with category/date split
- patternDecision:
  - patternFamily: `dated-transaction-row-list`
  - decision: preserve repeated transaction rows with thin row dividers and right-aligned negative amounts
  - reason: metadata shows five Local_Info rows separated by `1px` dividers within TextListGroup `y=244 h=420`
- layoutStrategy: vertical row stack under one month group; each row has title/metadata column and trailing amount column
- layoutContract:
  - role: show individual discount transactions in chronological group
  - structure: repeated rows with merchant title, category/date metadata, right amount, and contents dividers between rows
  - alignment: trailing amount column is stable and right aligned; metadata stays under the title column
  - density: compact dated rows with `1px` contents dividers, not card-separated rows
  - wrapping: merchant/category may wrap within leading column; amount must not be squeezed or wrap before metadata
  - distortionRisk: turning each row into a card or using section dividers would break the dense transaction-list reference
- componentCandidates:
  - candidate: `transaction row list composition`
    fit: `strong`
    source: `reference capability`
    reason: directly supports leading content, trailing amount, metadata, and row dividers
    risk: negative amount color/emphasis must be handled by semantic value state, not hardcoded in route
  - candidate: `generic list item with trailing text`
    fit: `medium`
    source: `reference capability`
    reason: can support title and trailing amount if metadata and divider slots are available
    risk: may lack stable metadata split and amount column behavior
  - candidate: `card list`
    fit: `reject`
    source: `reference capability`
    reason: visible rows are separated by thin contents dividers, not card surfaces
    risk: violates row density and divider contract

## Policy / OGN Matrix

### [summary]

- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- visibleEvidence: `연간 누적 할인 금액`, `99,999원`
- policyInterpretation: annual accumulated discount is visible; calculation policy is not visible in Figma
- OGNInterpretation: `unknown-from-figma-only/TBD`
- decision: preserve as one summary card above list controls

### [historyHeader]

- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- visibleEvidence: `할인 이용내역`, `최근 3개월`
- policyInterpretation: date range selection is available; range rules are not visible
- OGNInterpretation: `unknown-from-figma-only/TBD`
- decision: keep period selector right-aligned in the same row as the list title

### [filters]

- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- visibleEvidence: chips `전체`, `T멤버십`, `T우주`; `전체` selected
- policyInterpretation: discount category filtering is available; category semantics are not visible
- OGNInterpretation: `unknown-from-figma-only/TBD`
- decision: keep chip filters separate from the period selector

### [monthGroup] / [discountRows]

- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- visibleEvidence: `2026.01`, repeated `파리바게뜨`, `제휴사 구매 할인`, `2026.01.30`, `-700원`
- policyInterpretation: transaction list shows dated discount rows with negative amounts; row tap behavior and pagination are not visible
- OGNInterpretation: `unknown-from-figma-only/TBD`
- decision: preserve month grouping, right-aligned blue negative amount, and thin row dividers

## Distortion Gates

- Use exact Figma frame `12172:5926` (`리스트_할인내역`, `393×852`) from `SKT GenUI Test 0513`; do not infer frame bounds from 0512.
- Preserve `Header y=0 h=107` and the `852px` AppScreen rail.
- Keep `Summary y=0 h=150` and card `x=12 y=16 w=369 h=102` as the top content cluster.
- Preserve `ContentsTitle y=150 h=37` and keep `최근 3개월` as right-aligned period control in the same visual row as `할인 이용내역`.
- Preserve `Chip y=187 h=57`, selected chip state on `전체`, and chips as category filters, not tabs.
- Preserve `TextListGroup y=244 h=420`, its lightweight title, five Local_Info rows, and `1px` dividers.
- Do not convert row dividers into large section divider bands or card gaps.
- Do not invent bottom CTA, empty state, pagination, transaction detail route, policy IDs, or OGN IDs.
