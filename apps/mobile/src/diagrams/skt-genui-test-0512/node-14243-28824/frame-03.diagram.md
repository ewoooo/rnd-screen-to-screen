# Frame 03 — 리스트_이용내역

## Screen Contract

- reference pack: `SKT GenUI Test 0512 / node 14243:28824 / frame index 03`
- figma source: `SKT GenUI Test 0512` / exact frame `리스트_이용내역` (`14243:28825`, `393×1062`)
- figma verification: screenshot from exact node + shallow geometry inspection from exact node
- route: `reference-only/not-an-implementation-route`
- screen title: `이용내역`
- pattern: `list`
- source confidence: `figma-screenshot + exact-node-geometry-inspection`
- policy refs: `unknown-from-figma-only/TBD`
- OGN refs: `unknown-from-figma-only/TBD`
- AppScreen slots: `Header`, `Content`
- bottom: `none-visible-in-figma`
- visible content sections: `summaryShortcuts`, `pointPreview`, `discountPreview`

## Screen Wire

```txt
┌─AppScreen 393×1062────────────────────────────────────┐
├─Header────────────────────────────────────────────────┤
│ 9:41                                      ▮▮▮  wifi ▰ │
│                                                        │
│   ‹   이용내역                                        │
├─Content(scroll)───────────────────────────────────────┤
│                                                        │
│ [summaryShortcuts]                                    │
│   ┌────────────────────────────────────────────────┐   │
│   │      P          %          ₩          ✣        │   │
│   │  포인트 내역   할인 내역   결제 내역  참여 이벤트 │   │
│   └────────────────────────── rounded shortcut card ┘   │
│                                                        │
│ [pointPreview]                                        │
│   포인트 이용내역                                  ›   │
│   룰렛이벤트 당첨                          +500P      │
│   쿠폰 적립  │  2026.01.30                           │
│   ────────────────────────────────────────────────     │
│   룰렛이벤트 당첨                          +500P      │
│   쿠폰 적립  │  2026.01.30                           │
│                                                        │
├══Divider 4px / bg-alt══════════════════════════════════┤
│                                                        │
│ [discountPreview]                                     │
│   할인 내역                                        ›   │
│   파리바게뜨                              -700원      │
│   제휴사 구매 할인  │  2026.01.30                    │
│   ────────────────────────────────────────────────     │
│   파리바게뜨                              -700원      │
│   제휴사 구매 할인  │  2026.01.30                    │
│                                                        │
└────────────────────────────────────────────────────────┘
```

## Section Contracts

### [summaryShortcuts]

- slot: `Content`
- visibleContent: four shortcut items `포인트 내역`, `할인 내역`, `결제 내역`, `참여 이벤트` with small icons
- vocabularyDecision: reuse `Local_Summary` or shortcut grid; component may be unregistered
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [pointPreview]

- slot: `Content`
- visibleTitle: `포인트 이용내역`
- visibleContent: trailing chevron, two visible point rows with `+500P`
- vocabularyDecision: reuse `PageStackContents`, `SectionItem`, `Local_ListInfo`
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [discountPreview]

- slot: `Content`
- visibleTitle: `할인 내역`
- visibleContent: trailing chevron, two visible discount rows with `-700원`
- vocabularyDecision: reuse `PageStackContents`, `SectionItem`, `Local_ListInfo`
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

## Policy / OGN Matrix

### [summaryShortcuts]

- visibleEvidence: shortcut labels `포인트 내역`, `할인 내역`, `결제 내역`, `참여 이벤트`
- policyInterpretation: usage history landing offers category navigation; destination and permission rules are not visible
- OGNInterpretation: `unknown-from-figma-only/TBD`
- decision: preserve as four equal shortcut affordances inside one summary card

### [pointPreview]

- visibleEvidence: title `포인트 이용내역`, chevron, two `룰렛이벤트 당첨` rows with `+500P`
- policyInterpretation: preview section links to full point history; exact row count rule is not visible
- OGNInterpretation: `unknown-from-figma-only/TBD`
- decision: keep as preview list, not full filterable list

### [discountPreview]

- visibleEvidence: title `할인 내역`, chevron, two `파리바게뜨` rows with `-700원`
- policyInterpretation: preview section links to full discount history; exact row count rule is not visible
- OGNInterpretation: `unknown-from-figma-only/TBD`
- decision: preserve section divider before this preview and keep rows visually parallel to point rows

## Distortion Gates

- Use exact Figma frame `14243:28825`.
- Preserve the single visible 4px divider between point preview and discount preview.
- Keep shortcut card at the top; do not turn shortcuts into tabs or chips.
- Keep preview sections short; do not add filters, month header, or bottom CTA.
- Chevron means section-level drill-in affordance; do not draw it on each row unless implementation SOT says so.
