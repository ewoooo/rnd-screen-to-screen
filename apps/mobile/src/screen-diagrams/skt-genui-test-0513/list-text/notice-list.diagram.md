# Frame 05 — 리스트_공지사항

## Screen Contract

- artifact type: `Screen Wire reference diagram`
- reference pack: `SKT GenUI Test 0513 / node 12172:5881 / frame 리스트_텍스트`
- source: `Figma`
- source file: `SKT GenUI Test 0513`
- source fileKey: `wLwyHV2L5wUz0fotXmN5dK`
- section node: `12172:5881`
- section node name: `리스트_텍스트`
- verified Figma SOT node: `12172:5947`
- verified Figma SOT node name: `리스트_공지사항`
- verified Figma frame: `393×852`
- observed frame bounds: Header `Statusbar+Header` node `12172:5966` y=0 h=107; Local_ListInfo x=32 y=131 w=329 h=647; 9 Local_Info rows of 71px with 1px dividers
- figma verification: metadata supplied for exact node `12172:5947` on 2026-05-17
- route: `reference-only/not-an-implementation-route`
- screen title: `공지사항`
- observed pattern: `list` + repeated announcement rows + row metadata + contents dividers
- pattern: `list`
- source confidence: `figma-metadata-from-exact-node`
- policy refs: `unknown-from-figma-only/TBD`
- OGN refs: `unknown-from-figma-only/TBD`
- AppScreen slots: `Header`, `Content`
- bottom: `none-visible-in-figma`
- visible content sections: `noticeList`
- wireReference:
  - source: `apps/mobile/src/screen-diagrams/skt-genui-test-0512/list-text/notice-list.diagram.md`
  - matchedParts: notice-list reference pattern with header chrome followed by a simple repeated notice row list and thin contents dividers
  - intentionalDifferences: 0513 frame is `393×852`; exact Figma node is `12172:5947`; list starts below header with Local_ListInfo at x=32 y=131 w=329 h=647 and shows 9 rows of 71px
  - limitation: reference-only visual structure; policy/copy/OGN ids remain `unknown-from-figma-only/TBD`

This reference captures the visible wire only. It must not be treated as a route implementation contract until policy refs, domain module ids, and OGN ids are confirmed from the source policy package.

## Screen Wire

Wire Semantic Tags are embedded as `[sectionId | semantic-role | boundary/placement]`.

```txt
┌─AppScreen 393×852─────────────────────────────────────┐
├─Header node 12172:5966 y=0 h=107─────────────────────┤
│ 9:41                                      ▮▮▮  wifi ▰ │
│                                                        │
│   ‹   공지사항                                        │
├─Content(scroll) y=107─────────────────────────────────┤
│                                                        │
│ [noticeList | announcement-list | content-rail-list]   │
│   Local_ListInfo x=32 y=131 w=329 h=647               │
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
  - wireSemanticTag: `[noticeList | announcement-list | content-rail-list]`
  - nestedSemanticTags: `[noticeRows | repeated-announcement-row | list-item]`, `[contentDividers | row-separator | contents-divider]`
  - visibleContent: Local_ListInfo at x=32 y=131 w=329 h=647; 9 repeated Local_Info rows of 71px, separated by 1px dividers; no summary, filter, or search before the list
  - sectionBoundary: `none`
  - fieldGrouping: `FieldStackWithDividers`
  - rowSeparators: `Divider(type="contents")`
  - actionPlacement: `Content`
  - typography: row title as primary text; category/date metadata as secondary text; optional `NEW` badge is a compact trailing status indicator when present
- patternDecision:
  - patternFamily: `announcement-row-list`
  - decision: existing composition candidate
  - reason: Figma shows rows directly below header chrome, with repeated title/metadata rows and thin contents separators inside one content-rail list
- layoutStrategy: preserve a simple 393×852 scrolling list with no pre-list title, filters, search, summary, or bottom action
- layoutContract:
  - role: presents service announcements for scanning and opening individual notice rows
  - structure: repeated two-line rows with title, metadata line, optional trailing `NEW` badge, and thin contents dividers
  - alignment: row content is leading within the 329px content rail; badge, when present, is trailing and aligned to the row title area without stealing metadata width
  - density: 71px row rhythm with 1px contents dividers; no cards or section bands
  - wrapping: long notice title may wrap within the title area but must not overlap the trailing status badge; metadata remains readable as category/date pair
  - distortionRisk: adding a title block, search/filter controls, cards, or thick section dividers would change the observed list-only reference
- componentCandidates:
  - name: `PageStackList` + `SectionItem` composition
    fit: `medium`
    source: `@pxds/cx-components` candidate vocabulary
    reason: can provide repeated content-rail list rows and contents dividers if row slots support title, metadata, and trailing accessory
    risk: must verify that 71px row density and title wrapping do not collide with the trailing `NEW` badge
  - name: `Local_ListInfo` or domain list-row organism
    fit: `medium`
    source: `reference capability candidate; component may be unregistered`
    reason: row information pattern can fit title + category/date metadata + optional badge capability observed in Figma
    risk: may require a new row variant if existing local row cannot place a compact trailing status badge
  - name: `Badge` / status-label candidate
    fit: `medium`
    source: `@pxds/cx-components` or cx token-based status vocabulary candidate
    reason: needed for compact `NEW` indicator when the policy-confirmed data requires it
    risk: badge color, radius, and label scale must remain subordinate to the row title
  - name: `Divider`
    fit: `strong`
    source: `@pxds/cx-components` candidate vocabulary
    reason: directly supports 1px contents separators between repeated rows
    risk: must be configured as contents divider, not a section divider band
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

## Policy / OGN Matrix

### [noticeList]

- visibleEvidence: Local_ListInfo starts below the 107px header at x=32 y=131 w=329 h=647; 9 Local_Info rows are 71px each and divided by 1px contents separators
- policyInterpretation: announcement list includes repeated notice rows with category/date metadata and possible status indication; badge duration, ordering rules, unread semantics, and row tap behavior are not visible in Figma
- policyRef: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- allowedAssertion: simple repeated notice list exists directly below the header; no summary/filter/search is visible
- decision: preserve simple full-screen list without filter, search, summary, pagination, or bottom action

## Distortion Gates

- Use exact Figma frame `12172:5947` named `리스트_공지사항`; do not infer from sibling list frames.
- Preserve AppScreen rail as `393×852` with Header node `12172:5966` y=0 h=107.
- Preserve Local_ListInfo bounds x=32 y=131 w=329 h=647 and 9 visible Local_Info rows of 71px.
- Do not add a title section, summary, filter, or search above the list; Figma shows rows directly below header chrome.
- Row dividers are 1px contents separators, not section divider bands.
- Preserve repeated row structure as title + metadata + optional trailing badge; do not convert notices into cards.
- Do not invent unread state, pinned notice, category filters, search, pagination, notice detail route, bottom CTA, policy ids, use case ids, domain module ids, or OGN ids.
