# Frame 04 — 리스트_이용안내

## Screen Contract

- artifact type: `Screen Wire reference diagram`
- reference pack: `SKT GenUI Test 0513 / node 12172:5881 / frame 리스트_텍스트`
- source: `Figma`
- source file: `SKT GenUI Test 0513`
- source fileKey: `wLwyHV2L5wUz0fotXmN5dK`
- section node: `12172:5881`
- section node name: `리스트_텍스트`
- verified Figma SOT node: `12172:5969`
- verified Figma SOT node name: `리스트_이용안내`
- verified Figma frame: `393×852`
- observed frame bounds: Header node `12172:5997` y=0 h=107; Content y=107 h=796; Tab y=0 h=47; Chip y=47 h=57; SearchBar y=104 h=61; AccordionList x=32 y=165 w=329 h=631
- figma verification: metadata supplied for exact node `12172:5969` on 2026-05-17
- route: `reference-only/not-an-implementation-route`
- screen title: `이용안내`
- observed pattern: `list` + tab navigation + chip filters + search + FAQ accordion list
- pattern: `list`
- source confidence: `figma-metadata-from-exact-node`
- policy refs: `unknown-from-figma-only/TBD`
- OGN refs: `unknown-from-figma-only/TBD`
- AppScreen slots: `Header`, `Content`
- bottom: `none-visible-in-figma`
- visible content sections: `tabs`, `topicFilters`, `search`, `faqList`
- wireReference:
  - source: `apps/mobile/src/screen-diagrams/skt-genui-test-0512/list-text/usage-guide-list.diagram.md`
  - matchedParts: usage-guide reference pattern with top tabs, chip filters, standalone search, and an accordion FAQ list
  - intentionalDifferences: 0513 frame is `393×852`; exact Figma node is `12172:5969`; content begins at y=107 with Tab h=47, Chip h=57, SearchBar h=61, and AccordionList x=32 y=165 w=329 h=631
  - limitation: reference-only visual structure; policy/copy/OGN ids remain `unknown-from-figma-only/TBD`

This reference captures the visible wire only. It must not be treated as a route implementation contract until policy refs, domain module ids, and OGN ids are confirmed from the source policy package.

## Screen Wire

Wire Semantic Tags are embedded as `[sectionId | semantic-role | boundary/placement]`.

```txt
┌─AppScreen 393×852─────────────────────────────────────┐
├─Header node 12172:5997 y=0 h=107─────────────────────┤
│ 9:41                                      ▮▮▮  wifi ▰ │
│                                                        │
│   ‹   이용안내                                        │
├─Content(scroll) y=107 h=796───────────────────────────┤
│ [tabs | tab-navigation | top-content] y=0 h=47         │
│   자주 묻는 질문     멤버십 회원 안내     T멤버십 살펴보기 │
│   ━━━━━━━━━━━                                          │
│ [topicFilters | chip-filter-row | horizontal-scroll] y=47 h=57 │
│   ┌──────┐ ┌──────┐ ┌────────┐ ┌────────┐ ┌────┐     │
│   │ BEST │ │회원가입│ │멤버십 혜택│ │멤버십 신청│ │통합│     │
│   └─sel──┘ └──────┘ └────────┘ └────────┘ └────┘     │
│ [search | list-search-control | field] y=104 h=61     │
│   ┌────────────────────────────────────────────────┐   │
│   │ 검색                                        ⌕  │   │
│   └────────────────────────────── rounded search ──┘   │
│ [faqList | faq-accordion-list | contents-divider]      │
│   AccordionList x=32 y=165 w=329 h=631                 │
│   Q. [T우주] 결제수단을 변경할 수 있나요?        ˄    │
│   T 멤버십 제휴사 중 결제 가능 제휴사에서 결제바코드를 │
│   이용해 결제할 경우, 결제바코드 하나로 고객님의       │
│   회원등급에 맞는 T멤버십 혜택이 자동 적용됩니다.      │
│   ────────────────────────────────────────────────     │
│   Q. [T우주] 결제수단을 변경할 수 있나요?        ˅    │
│   ────────────────────────────────────────────────     │
│   Q. [T우주] 결제수단을 변경할 수 있나요?        ˅    │
│   ────────────────────────────────────────────────     │
│   Q. [T우주] 결제수단을 변경할 수 있나요?        ˅    │
│   ────────────────────────────────────────────────     │
│   Q. [T우주] 결제수단을 변경할 수 있나요?        ˅    │
│   ────────────────────────────────────────────────     │
│   Q. [T우주] 결제수단을 변경할 수 있나요?        ˅    │
│   ────────────────────────────────────────────────     │
│   Q. [T우주] 결제수단을 변경할 수 있나요?        ˅    │
│   ────────────────────────────────────────────────     │
│   Q. [T우주] 결제수단을 변경할 수 있나요?        ˅    │
│                                                        │
└────────────────────────────────────────────────────────┘
```

## Section Contracts

### [tabs]

- slot: `Content`
- patternEvidence:
  - wireSemanticTag: `[tabs | tab-navigation | top-content]`
  - visibleContent: Tab section y=0 h=47; tab bar `자주 묻는 질문`, `멤버십 회원 안내`, `T멤버십 살펴보기`; first tab selected with underline
  - sectionBoundary: `none`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `Content`
  - typography: compact tab labels; selected label uses underline, not a filled segmented pill
- patternDecision:
  - patternFamily: `content-tab-navigation`
  - decision: existing composition candidate
  - reason: Figma shows a horizontal navigation control above filters, with selected state carried by underline and label position
- layoutStrategy: keep tabs as the first content control row; preserve horizontal label rhythm and selected underline before chip filters
- layoutContract:
  - role: switches high-level guide categories before topic-level filtering
  - structure: one horizontal tab row with text labels and selected underline
  - alignment: leading text flow with selected indicator anchored under the first tab
  - density: 47px top-control height; no card surface or section divider
  - wrapping: labels must remain single-line or horizontally scroll; they must not wrap into stacked rows
  - distortionRisk: converting this into chips or a segmented filled control would merge separate navigation/filter semantics
- componentCandidates:
  - name: `Tab` / tab-list composition
    fit: `strong`
    source: `@pxds/cx-components` candidate vocabulary
    reason: supports selected tab state and horizontal tab navigation capability
    risk: density and underline style must match the reference frame
  - name: `Chips`
    fit: `reject`
    source: `@pxds/cx-components` candidate vocabulary
    reason: chip semantics conflict with the underline tab-navigation role
    risk: would collapse tab and topic filter semantics into the same control type
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [topicFilters]

- slot: `Content`
- patternEvidence:
  - wireSemanticTag: `[topicFilters | chip-filter-row | horizontal-scroll]`
  - visibleContent: Chip section y=47 h=57; chip group `BEST`, `회원가입`, `멤버십 혜택`, `멤버십 신청`, `통합`; `BEST` selected
  - sectionBoundary: `none`
  - fieldGrouping: `single`
  - rowSeparators: `none`
  - actionPlacement: `Content`
  - typography: compact chip labels with selected-state emphasis limited to the selected chip
- patternDecision:
  - patternFamily: `horizontal-filter-chips`
  - decision: existing composition candidate
  - reason: Figma shows a row of rounded filter chips below tabs; topic filters are separate from the tab navigation row
- layoutStrategy: preserve as a horizontally scrolling chip row below tabs and above search
- layoutContract:
  - role: narrows the FAQ list by visible topic
  - structure: one row of rounded selectable chips with one selected state
  - alignment: leading row; chips keep intrinsic width and even inter-chip gaps
  - density: 57px filter-control height with no wrapping into a grid
  - wrapping: overflow should scroll horizontally; long labels must not squeeze neighboring chips
  - distortionRisk: wrapping chips into multiple rows would push the search and first FAQ below the observed layout rhythm
- componentCandidates:
  - name: `Chips`
    fit: `strong`
    source: `@pxds/cx-components` candidate vocabulary
    reason: directly matches selectable horizontal chip filter capability
    risk: selected-state visual treatment must be checked against the reference
  - name: `Tab`
    fit: `reject`
    source: `@pxds/cx-components` candidate vocabulary
    reason: tabs do not express the rounded topic-filter chips shown here
    risk: would erase the visual separation between category navigation and topic filters
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [search]

- slot: `Content`
- patternEvidence:
  - wireSemanticTag: `[search | list-search-control | field]`
  - visibleContent: SearchBar y=104 h=61; rounded search field with placeholder `검색` and trailing search icon
  - sectionBoundary: `none`
  - fieldGrouping: `single`
  - rowSeparators: `none`
  - actionPlacement: `inline field action`
  - typography: placeholder-scale field text; search icon is trailing affordance inside the field
- patternDecision:
  - patternFamily: `list-search-field`
  - decision: existing composition candidate
  - reason: Figma shows a standalone rounded search affordance between filters and FAQ rows
- layoutStrategy: keep the search field below chips and above the accordion list; do not move it into the header
- layoutContract:
  - role: enables text search within the visible FAQ list
  - structure: full-width rounded field surface with placeholder and trailing icon
  - alignment: placeholder leading, icon trailing, field width aligned to content rails
  - density: 61px control region with clear separation from chip filters and list rows
  - wrapping: placeholder stays single-line; icon remains fixed at trailing edge
  - distortionRisk: using a plain text row or header search would lose the observed standalone field boundary
- componentCandidates:
  - name: `SearchBar`
    fit: `strong`
    source: `@pxds/cx-components` candidate vocabulary
    reason: matches rounded search field with placeholder and trailing icon capability
    risk: field height and horizontal padding must preserve reference density
  - name: `TextField`
    fit: `medium`
    source: `@pxds/cx-components` candidate vocabulary
    reason: can represent an input surface if it supports search icon slot and placeholder behavior
    risk: generic field styling may introduce label/error space not visible in the reference
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [faqList]

- slot: `Content`
- patternEvidence:
  - wireSemanticTag: `[faqList | faq-accordion-list | contents-divider]`
  - visibleContent: AccordionList x=32 y=165 w=329 h=631; first AccordionNoticeInfo row y=0 h=135 expanded; then 1px Divider; repeated collapsed AccordionNoticeInfo rows h=61 separated by dividers through y=570
  - sectionBoundary: `none`
  - fieldGrouping: `FieldStackWithDividers`
  - rowSeparators: `Divider(type="contents")`
  - actionPlacement: `Content`
  - typography: question row title begins with `Q.`; expanded answer uses smaller body copy; chevron state changes per row
- patternDecision:
  - patternFamily: `accordion-row-list`
  - decision: existing composition candidate
  - reason: Figma shows repeated FAQ rows with per-row expand/collapse state and contents dividers
- layoutStrategy: preserve first row expanded and all subsequent visible rows collapsed; dividers stay inside the list as contents separators
- layoutContract:
  - role: presents FAQ questions with inline answer reveal for the active row
  - structure: repeated rows with question text, trailing chevron, optional answer body, and thin contents dividers
  - alignment: question text leading inside the 329px rail, chevron trailing, expanded answer aligned under question text within the same row
  - density: first expanded row is 135px, collapsed rows are 61px, separated by 1px contents dividers
  - wrapping: question may wrap before colliding with the chevron; answer wraps across the content rail
  - distortionRisk: expanding every row, removing dividers, or turning rows into cards would break the reference list pattern
- componentCandidates:
  - name: `Accordion` / `AccordionList`
    fit: `strong`
    source: `@pxds/cx-components` candidate vocabulary
    reason: directly supports per-row expanded/collapsed state and chevron affordance
    risk: must support contents dividers and first-row-only expanded state without route-level CSS
  - name: `AccordionNoticeInfo` or domain FAQ row organism
    fit: `medium`
    source: `reference capability candidate; component may be unregistered`
    reason: observed Figma row name maps to question + answer + chevron capability
    risk: may require a reusable row variant if existing accordion cannot preserve the 135px expanded and 61px collapsed row rhythm
  - name: `PageStackList` + `SectionItem` composition
    fit: `medium`
    source: `@pxds/cx-components` candidate vocabulary
    reason: may provide repeated row and divider capability
    risk: needs verification for answer reveal, chevron state, and row-level expand/collapse semantics
  - name: `Divider`
    fit: `medium`
    source: `@pxds/cx-components` candidate vocabulary
    reason: can provide thin 1px contents separators inside the accordion list
    risk: must remain contents-level, not a section divider band
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

## Policy / OGN Matrix

### [tabs] / [topicFilters]

- visibleEvidence: selected tab `자주 묻는 질문`, selected chip `BEST`, additional topic chips `회원가입`, `멤버십 혜택`, `멤버십 신청`, `통합`; Tab y=0 h=47 and Chip y=47 h=57 inside content
- policyInterpretation: guide content appears navigable by high-level tab and topic chip; actual taxonomy policy is not visible in Figma
- policyRef: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- allowedAssertion: tab row and chip row both exist and must stay distinct
- decision: preserve tab row above chip filters; do not collapse the two controls into one segmented control

### [search]

- visibleEvidence: SearchBar y=104 h=61 with placeholder `검색` and trailing search icon
- policyInterpretation: FAQ list supports text search; query rules, no-result state, and debounce behavior are not visible in Figma
- policyRef: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- allowedAssertion: standalone search affordance exists between filters and FAQ rows
- decision: keep search below chips and above FAQ rows

### [faqList]

- visibleEvidence: AccordionList x=32 y=165 w=329 h=631; first row y=0 h=135 expanded; collapsed rows are h=61 and separated by 1px dividers through y=570
- policyInterpretation: FAQ answer text explains payment method behavior; exact official content source and row ordering rules are not visible in Figma
- policyRef: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`
- allowedAssertion: first item is expanded and remaining visible items are collapsed in this reference frame
- decision: keep row dividers and per-row chevron state visible

## Distortion Gates

- Use exact Figma frame `12172:5969` named `리스트_이용안내`; do not infer from sibling list frames.
- Preserve AppScreen rail as `393×852` with Header node `12172:5997` y=0 h=107 and Content y=107 h=796.
- Preserve three-layer controls in order and vertical bounds: Tab y=0 h=47, Chip y=47 h=57, SearchBar y=104 h=61.
- Preserve AccordionList bounds x=32 y=165 w=329 h=631.
- Keep tabs as underline navigation and chips as rounded topic filters; do not merge their semantics.
- Keep the search as a standalone rounded field below chips, not as a header control.
- Keep first FAQ item expanded at h=135; collapsed rows remain h=61 with 1px dividers.
- Row dividers inside the accordion list are thin contents separators, not `├══Divider══┤` section bands.
- Do not invent no-result, loading, search keyword, bottom CTA, FAQ detail route, policy ids, use case ids, domain module ids, or OGN ids.
- Do not drop the repeated visible question copy just because rows are visually repetitive.
