# Frame 04 — 리스트_이용안내

## Screen Contract

- reference pack: `SKT GenUI Test 0512 / node 14243:28824 / frame index 04`
- figma source: `SKT GenUI Test 0512` / exact frame `리스트_이용안내` (`14243:28891`, `393×1062`)
- figma verification: screenshot from exact node + shallow geometry inspection from exact node
- route: `reference-only/not-an-implementation-route`
- screen title: `이용안내`
- pattern: `list`
- source confidence: `figma-screenshot + exact-node-geometry-inspection`
- policy refs: `unknown-from-figma-only/TBD`
- OGN refs: `unknown-from-figma-only/TBD`
- AppScreen slots: `Header`, `Content`
- bottom: `none-visible-in-figma`
- visible content sections: `tabs`, `topicFilters`, `search`, `faqList`

## Screen Wire

```txt
┌─AppScreen 393×1062────────────────────────────────────┐
├─Header────────────────────────────────────────────────┤
│ 9:41                                      ▮▮▮  wifi ▰ │
│                                                        │
│   ‹   이용안내                                        │
├─Content(scroll)───────────────────────────────────────┤
│ [tabs]                                                 │
│   자주 묻는 질문     멤버십 회원 안내     T멤버십 살펴보기 │
│   ━━━━━━━━━━━                                          │
│                                                        │
│ [topicFilters]                                         │
│   ┌──────┐ ┌──────┐ ┌────────┐ ┌────────┐ ┌────┐     │
│   │ BEST │ │회원가입│ │멤버십 혜택│ │멤버십 신청│ │통합│     │
│   └─sel──┘ └──────┘ └────────┘ └────────┘ └────┘     │
│                                                        │
│ [search]                                               │
│   ┌────────────────────────────────────────────────┐   │
│   │ 검색                                        ⌕  │   │
│   └────────────────────────────── rounded search ──┘   │
│                                                        │
│ [faqList]                                              │
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
│   ────────────────────────────────────────────────     │
│   Q. [T우주] 결제수단을 변경할 수 있나요?        ˅    │
│                                                        │
└────────────────────────────────────────────────────────┘
```

## Section Contracts

### [tabs]

- slot: `Content`
- visibleContent: tab bar `자주 묻는 질문`, `멤버십 회원 안내`, `T멤버십 살펴보기`; first tab selected
- vocabularyDecision: reuse `Tab`
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [topicFilters]

- slot: `Content`
- visibleContent: chip group `BEST`, `회원가입`, `멤버십 혜택`, `멤버십 신청`, `통합`; `BEST` selected
- vocabularyDecision: reuse `Chips`
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [search]

- slot: `Content`
- visibleContent: search field placeholder `검색` and search icon
- vocabularyDecision: reuse `SearchBar`
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

### [faqList]

- slot: `Content`
- visibleContent: accordion list; first item expanded with answer text, later items collapsed, row dividers between items
- vocabularyDecision: reuse `PageStackList`, `SectionItem`, `AccordionList`, `Accordion`, `Divider`
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

## Policy / OGN Matrix

### [tabs] / [topicFilters]

- visibleEvidence: selected tab `자주 묻는 질문`, selected chip `BEST`
- policyInterpretation: guide content is navigable by high-level tab and topic chip; actual taxonomy policy is not visible
- OGNInterpretation: `unknown-from-figma-only/TBD`
- decision: preserve tab row above chips; do not collapse the two controls into one segmented control

### [search]

- visibleEvidence: search field `검색`
- policyInterpretation: FAQ list supports text search; search behavior and no-result state are not visible
- OGNInterpretation: `unknown-from-figma-only/TBD`
- decision: keep search below chips and above FAQ rows

### [faqList]

- visibleEvidence: repeated `Q. [T우주] 결제수단을 변경할 수 있나요?`, first row expanded answer, divider rows
- policyInterpretation: FAQ answer text explains payment method behavior; exact official content source is not visible
- OGNInterpretation: `unknown-from-figma-only/TBD`
- decision: first item expanded, remaining items collapsed; keep row dividers and chevron state visible

## Distortion Gates

- Use exact Figma frame `14243:28891`.
- Preserve three-layer controls in order: tabs, chips, search.
- Keep first FAQ item expanded; do not show all accordions expanded.
- Row dividers inside the accordion list are thin row separators, not `├══Divider══┤` section bands.
- Do not invent no-result, loading, search keyword, bottom CTA, or FAQ detail route.
- Do not drop the repeated visible question copy just because rows are visually repetitive.
