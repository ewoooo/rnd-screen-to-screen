# Frame 03 — 리스트_이용내역

## Screen Contract

- reference pack: `SKT GenUI Test 0512 / node 14243:28824 / frame index 03`
- figma source: `SKT GenUI Test 0512` / exact frame `리스트_이용내역` (`14243:28825`, `393×1062`)
- figma verification: Figma tool exact-node inspection succeeded for `14243:28825`; name `리스트_이용내역`, type `FRAME`, bounds `393×1062`
- route: `reference-only/not-an-implementation-route`
- screen title: `이용내역`
- pattern: `list`
- source confidence: `figma-screenshot + exact-node-geometry-inspection`
- policy refs: `unknown-from-figma-only/TBD`
- OGN refs: `unknown-from-figma-only/TBD`
- AppScreen slots: `Header`, `Content`
- bottom: `none-visible-in-figma`
- visible content sections: `summaryShortcuts`, `pointPreview`, `discountPreview`
- wireReference:
  - source: `apps/mobile/src/screen-diagrams/skt-genui-test-0512/list-text/usage-history-overview.diagram.md`
  - matchedParts: exact reference frame for shortcut card, preview list sections, section-level drill-in chevrons, dated preview rows, row dividers, section divider band
  - intentionalDifferences: none; this file is the reference-only source diagram
  - limitation: reference-only visual structure; policy/copy/OGN ids are `unknown-from-figma-only/TBD`

## Screen Wire

```txt
┌─AppScreen 393×1062────────────────────────────────────┐
├─Header────────────────────────────────────────────────┤
│ 9:41                                      ▮▮▮  wifi ▰ │
│                                                        │
│   ‹   이용내역                                        │
├─Content(scroll)───────────────────────────────────────┤
│                                                        │
│ [summaryShortcuts | shortcut-summary-grid | card]     │
│   ┌────────────────────────────────────────────────┐   │
│   │      P          %          ₩          ✣        │   │
│   │  포인트 내역   할인 내역   결제 내역  참여 이벤트 │   │
│   └────────────────────────── rounded shortcut card ┘   │
│                                                        │
│ [pointPreview | preview-list-section | drill-in rows] │
│   포인트 이용내역                                  ›   │
│   룰렛이벤트 당첨                          +500P      │
│   쿠폰 적립  │  2026.01.30                           │
│   ────────────────────────────────────────────────     │
│   룰렛이벤트 당첨                          +500P      │
│   쿠폰 적립  │  2026.01.30                           │
│                                                        │
├══Divider 4px / bg-alt══════════════════════════════════┤
│                                                        │
│ [discountPreview | preview-list-section | drill-in]   │
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

- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- patternEvidence:
  - wireSemanticTag: `[summaryShortcuts | shortcut-summary-grid | card]`
  - sectionBoundary: `cardBoundary`
  - fieldGrouping: `four-item-grid`
  - rowSeparators: `none`
  - actionPlacement: `Content`
  - typography: compact shortcut labels under small icons; four equal visual columns
- patternDecision:
  - patternFamily: `card-shortcut-grid`
  - decision: preserve four equal shortcuts inside one rounded card
  - reason: Figma presents category navigation as a contained shortcut surface, not tabs, chips, or a row list
- layoutStrategy: top-of-content shortcut card with four evenly distributed icon/label items
- layoutContract:
  - role: provide category entry points for usage history
  - structure: one rounded card containing four icon-over-label shortcut cells
  - alignment: each shortcut is centered in its cell; cells share equal width across the card
  - density: compact card with enough height for icon and label, followed by preview sections
  - wrapping: labels should remain readable within equal cells; long labels must not overlap adjacent cells
  - distortionRisk: converting shortcuts to tabs or chips would change both hierarchy and navigation semantics
- componentCandidates:
  - candidate: `shortcut grid card composition`
    fit: `strong`
    source: `reference capability`
    reason: directly supports card surface, four equal cells, icon/label vertical layout, and content actions
    risk: icon assets must be sourced from available icon vocabulary or represented consistently in the reference pack
  - candidate: `quick menu organism`
    fit: `medium`
    source: `reference capability`
    reason: may support shortcut navigation, but must prove equal-column card behavior and compact density
    risk: could introduce section title or row dividers not visible here
  - candidate: `tabs`
    fit: `reject`
    source: `reference capability`
    reason: tabs do not match cardBoundary or icon-over-label shortcut cells
    risk: violates top summary shortcut pattern

### [pointPreview]

- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- patternEvidence:
  - wireSemanticTag: `[pointPreview | preview-list-section | drill-in rows]`
  - sectionBoundary: `none`
  - fieldGrouping: `preview-row-list`
  - rowSeparators: `Divider(type="contents")`
  - actionPlacement: `Content`
  - typography: section title with trailing chevron; two dated rows with right-aligned positive point amount
- patternDecision:
  - patternFamily: `preview-list-section`
  - decision: preserve short preview list with section-level drill-in affordance
  - reason: chevron belongs to the preview section header, while rows remain dense non-card dated previews
- layoutStrategy: section header with trailing chevron followed by two visible point preview rows
- layoutContract:
  - role: preview recent point usage and link to the full point history
  - structure: title/chevron header plus two dated rows and one thin contents divider between rows
  - alignment: section chevron is trailing in header; row amount column is right aligned; metadata stays under title
  - density: short preview, not full filterable list; no month label or chips
  - wrapping: row titles may wrap within leading column; point amount stays intact
  - distortionRisk: adding filters or month grouping would turn the overview preview into the full point-history screen
- componentCandidates:
  - candidate: `preview transaction list composition`
    fit: `strong`
    source: `reference capability`
    reason: supports section-level drill-in, limited row count, dated rows, and contents divider
    risk: must keep chevron at section header only
  - candidate: `generic list section with trailing action`
    fit: `medium`
    source: `reference capability`
    reason: can satisfy header and rows if row metadata/trailing amount slots exist
    risk: may render every row as tappable with chevrons unless constrained
  - candidate: `full transaction list pattern`
    fit: `weak`
    source: `reference capability`
    reason: row structure is similar, but full list controls are intentionally absent
    risk: may introduce filters, month label, or pagination

### [discountPreview]

- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- patternEvidence:
  - wireSemanticTag: `[discountPreview | preview-list-section | drill-in]`
  - sectionBoundary: `SectionDivider`
  - fieldGrouping: `preview-row-list`
  - rowSeparators: `Divider(type="contents")`
  - actionPlacement: `Content`
  - typography: section title with trailing chevron; two dated rows with right-aligned negative amount
- patternDecision:
  - patternFamily: `preview-list-section-with-section-divider`
  - decision: preserve preview section after one visible 4px divider band
  - reason: Figma separates discount preview from point preview with a section divider while keeping the same preview row grammar
- layoutStrategy: 4px section band, then title/chevron header and two discount preview rows
- layoutContract:
  - role: preview recent discount usage and link to full discount history
  - structure: section divider band, title/chevron header, two dated rows, and one thin contents divider
  - alignment: section chevron is trailing in header; discount amount column is right aligned
  - density: same preview density as point section, with section-level separation
  - wrapping: merchant/category may wrap in leading column; negative amount remains intact
  - distortionRisk: dropping the section divider or adding row-level chevrons changes the overview scan pattern
- componentCandidates:
  - candidate: `preview transaction list composition`
    fit: `strong`
    source: `reference capability`
    reason: supports limited preview rows, section header drill-in, trailing amount, metadata, and row divider
    risk: section divider must be provided by layout, not by turning the section into a card
  - candidate: `generic list section with trailing action`
    fit: `medium`
    source: `reference capability`
    reason: can support title and rows if divider and amount slots are available
    risk: could omit the 4px section divider or add row chevrons
  - candidate: `card list`
    fit: `reject`
    source: `reference capability`
    reason: visible preview rows are not card-contained
    risk: violates section divider and row divider contract

## Policy / OGN Matrix

### [summaryShortcuts]

- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- visibleEvidence: shortcut labels `포인트 내역`, `할인 내역`, `결제 내역`, `참여 이벤트`
- policyInterpretation: usage history landing offers category navigation; destination and permission rules are not visible
- OGNInterpretation: `unknown-from-figma-only/TBD`
- decision: preserve as four equal shortcut affordances inside one summary card

### [pointPreview]

- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- visibleEvidence: title `포인트 이용내역`, section chevron, two `룰렛이벤트 당첨` rows with `+500P`
- policyInterpretation: preview section links to full point history; exact row count rule and row tap behavior are not visible
- OGNInterpretation: `unknown-from-figma-only/TBD`
- decision: keep as preview list, not full filterable list

### [discountPreview]

- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- visibleEvidence: title `할인 내역`, section chevron, section divider, two `파리바게뜨` rows with `-700원`
- policyInterpretation: preview section links to full discount history; exact row count rule and row tap behavior are not visible
- OGNInterpretation: `unknown-from-figma-only/TBD`
- decision: preserve section divider before this preview and keep rows visually parallel to point rows

## Distortion Gates

- Use exact Figma frame `14243:28825` (`리스트_이용내역`, `393×1062`).
- Preserve the single visible 4px divider between point preview and discount preview.
- Keep shortcut card at the top; do not turn shortcuts into tabs, chips, or a row list.
- Keep preview sections short; do not add filters, month header, search, pagination, or bottom CTA.
- Chevron means section-level drill-in affordance; do not draw it on each row unless implementation SOT says so.
- Preserve dated preview row grammar: title, category/date metadata, right-aligned signed amount, and thin row dividers.
- Do not invent destination route names, policy IDs, or OGN IDs.
