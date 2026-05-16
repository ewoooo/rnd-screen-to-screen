# Frame 05 — 리스트_공지사항

## Screen Contract

- artifact type: `Screen Wire reference diagram`
- reference pack: `SKT GenUI Test 0512 / node 14243:28824 / frame index 05`
- source: `Figma`
- source file: `SKT GenUI Test 0512`
- verified Figma SOT node: `14243:28880`
- verified Figma SOT node name: `리스트_공지사항`
- verified Figma frame: `393×1062`
- figma verification: tool screenshot from exact node `14243:28880` succeeded on 2026-05-17
- route: `reference-only/not-an-implementation-route`
- screen title: `공지사항`
- observed pattern: `list` + repeated announcement rows + row metadata + trailing NEW badge
- pattern: `list`
- source confidence: `figma-screenshot-from-exact-node`
- policy refs: `unknown-from-figma-only/TBD`
- OGN refs: `unknown-from-figma-only/TBD`
- AppScreen slots: `Header`, `Content`
- bottom: `none-visible-in-figma`
- visible content sections: `noticeList`
- wireReference:
  - source: `apps/mobile/src/screen-diagrams/skt-genui-test-0512/list-text/notice-list.diagram.md`
  - matchedParts: exact Figma reference frame `리스트_공지사항` (`14243:28880`) preserved as this reference-only pack entry
  - intentionalDifferences: none; this file describes the reference frame only
  - limitation: reference-only visual structure; policy/copy/OGN ids remain `unknown-from-figma-only/TBD`

This reference captures the visible wire only. It must not be treated as a route implementation contract until policy refs, domain module ids, and OGN ids are confirmed from the source policy package.

## Screen Wire

Wire Semantic Tags are embedded as `[sectionId | semantic-role | boundary/placement]`.

```txt
┌─AppScreen 393×1062────────────────────────────────────┐
├─Header────────────────────────────────────────────────┤
│ 9:41                                      ▮▮▮  wifi ▰ │
│                                                        │
│   ‹   공지사항                                        │
├─Content(scroll)───────────────────────────────────────┤
│                                                        │
│ [noticeList | announcement-list | full-width-list]     │
│   [noticeRows | repeated-announcement-row | list-item] │
│   T 멤버십 제휴 혜택 신규 및 변경 안내        [NEW]   │
│   혜택 공지  │  2026.01.30                            │
│   [contentDividers | row-separator | contents-divider] │
│   ────────────────────────────────────────────────     │
│   T 멤버십 제휴 혜택 신규 및 변경 안내        [NEW]   │
│   혜택 공지  │  2026.01.30                            │
│   ────────────────────────────────────────────────     │
│   T 멤버십 제휴 혜택 신규 및 변경 안내                │
│   혜택 공지  │  2026.01.30                            │
│   ────────────────────────────────────────────────     │
│   T 멤버십 제휴 혜택 신규 및 변경 안내                │
│   혜택 공지  │  2026.01.30                            │
│   ────────────────────────────────────────────────     │
│   T 멤버십 제휴 혜택 신규 및 변경 안내                │
│   혜택 공지  │  2026.01.30                            │
│   ────────────────────────────────────────────────     │
│   T 멤버십 제휴 혜택 신규 및 변경 안내                │
│   혜택 공지  │  2026.01.30                            │
│   ────────────────────────────────────────────────     │
│   T 멤버십 제휴 혜택 신규 및 변경 안내                │
│   혜택 공지  │  2026.01.30                            │
│   ────────────────────────────────────────────────     │
│   T 멤버십 제휴 혜택 신규 및 변경 안내                │
│   혜택 공지  │  2026.01.30                            │
│   ────────────────────────────────────────────────     │
│   T 멤버십 제휴 혜택 신규 및 변경 안내                │
│   혜택 공지  │  2026.01.30                            │
│                                                        │
└────────────────────────────────────────────────────────┘
```

## Section Contracts

### [noticeList]

- slot: `Content`
- patternEvidence:
  - wireSemanticTag: `[noticeList | announcement-list | full-width-list]`
  - nestedSemanticTags: `[noticeRows | repeated-announcement-row | list-item]`, `[contentDividers | row-separator | contents-divider]`
  - visibleContent: repeated notice row with title, category/date metadata, row dividers, first two rows showing trailing `NEW` badge
  - sectionBoundary: `none`
  - fieldGrouping: `FieldStackWithDividers`
  - rowSeparators: `Divider(type="contents")`
  - actionPlacement: `Content`
  - typography: row title as primary text; category/date metadata as secondary text; `NEW` badge is a compact trailing status indicator
- patternDecision:
  - patternFamily: `announcement-row-list`
  - decision: existing composition candidate
  - reason: Figma shows rows immediately below header, each with title, metadata, optional status badge, and thin contents separators
- layoutStrategy: preserve a simple full-screen scrolling list with no pre-list title, filters, search, summary, or bottom action
- layoutContract:
  - role: presents service announcements for scanning and opening individual notice rows
  - structure: repeated two-line rows with title, metadata line, optional trailing `NEW` badge on first two visible rows, and thin contents dividers
  - alignment: title and metadata lead; badge is trailing and aligned to the row title area without stealing metadata width
  - density: compact list-row density; rows are separated by contents dividers, not section bands or card surfaces
  - wrapping: long notice title may wrap within the title area but must not overlap the trailing `NEW` badge; metadata remains readable as category/date pair
  - distortionRisk: adding a title block, search/filter controls, cards, or thick section dividers would change the observed list-only reference
- componentCandidates:
  - name: `PageStackList` + `SectionItem` composition
    fit: `medium`
    source: `@pxds/cx-components` candidate vocabulary
    reason: can provide repeated full-width list rows and contents dividers if row slots support title, metadata, and trailing accessory
    risk: must verify that title wrapping does not collide with the trailing `NEW` badge
  - name: `Local_ListInfo` or domain list-row organism
    fit: `medium`
    source: `reference capability candidate; component may be unregistered`
    reason: row information pattern can fit title + category/date metadata + optional badge capability
    risk: may require a new row variant if existing local row cannot place a compact trailing status badge
  - name: `Badge` / status-label candidate
    fit: `medium`
    source: `@pxds/cx-components` or cx token-based status vocabulary candidate
    reason: needed for compact `NEW` indicator on only the first two visible rows
    risk: badge color, radius, and label scale must remain subordinate to the row title
  - name: `Divider`
    fit: `strong`
    source: `@pxds/cx-components` candidate vocabulary
    reason: directly supports thin contents separators between repeated rows
    risk: must be configured as contents divider, not a section divider band
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

## Policy / OGN Matrix

### [noticeList]

- visibleEvidence: repeated `T 멤버십 제휴 혜택 신규 및 변경 안내`, metadata `혜택 공지 | 2026.01.30`, `NEW` badge on first two visible rows, thin contents dividers between rows
- policyInterpretation: announcement list includes category/date metadata and a newness indicator; badge duration, ordering rules, unread semantics, and row tap behavior are not visible in Figma
- policyRef: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- allowedAssertion: simple repeated notice list exists; first two visible rows carry `NEW`
- decision: preserve simple full-screen list without filter, search, summary, pagination, or bottom action

## Distortion Gates

- Use exact Figma frame `14243:28880` named `리스트_공지사항`; do not infer from sibling list frames.
- Do not add title section above the list; Figma shows rows immediately below header chrome.
- Preserve `NEW` badge on the first two visible rows only.
- Keep row metadata as `혜택 공지 | 2026.01.30`.
- Row dividers are thin contents separators, not section divider bands.
- Preserve repeated row structure as title + metadata + optional trailing badge; do not convert notices into cards.
- Do not invent unread state, pinned notice, category filters, search, pagination, notice detail route, bottom CTA, policy ids, use case ids, domain module ids, or OGN ids.
