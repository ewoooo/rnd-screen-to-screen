# Frame 05 — 리스트_공지사항

## Screen Contract

- reference pack: `SKT GenUI Test 0512 / node 14243:28824 / frame index 05`
- figma source: `SKT GenUI Test 0512` / exact frame `리스트_공지사항` (`14243:28880`, `393×1062`)
- figma verification: screenshot from exact node + shallow geometry inspection from exact node
- route: `reference-only/not-an-implementation-route`
- screen title: `공지사항`
- pattern: `list`
- source confidence: `figma-screenshot + exact-node-geometry-inspection`
- policy refs: `unknown-from-figma-only/TBD`
- OGN refs: `unknown-from-figma-only/TBD`
- AppScreen slots: `Header`, `Content`
- bottom: `none-visible-in-figma`
- visible content sections: `noticeList`

## Screen Wire

```txt
┌─AppScreen 393×1062────────────────────────────────────┐
├─Header────────────────────────────────────────────────┤
│ 9:41                                      ▮▮▮  wifi ▰ │
│                                                        │
│   ‹   공지사항                                        │
├─Content(scroll)───────────────────────────────────────┤
│                                                        │
│ [noticeList]                                           │
│   T 멤버십 제휴 혜택 신규 및 변경 안내        ┌────┐ │
│   혜택 공지  │  2026.01.30                   │NEW │ │
│   ────────────────────────────────────────────────     │
│   T 멤버십 제휴 혜택 신규 및 변경 안내        ┌────┐ │
│   혜택 공지  │  2026.01.30                   │NEW │ │
│   ────────────────────────────────────────────────     │
│   T 멤버십 제휴 혜택 신규 및 변경 안내                │
│   혜택 공지  │  2026.01.30                           │
│   ────────────────────────────────────────────────     │
│   T 멤버십 제휴 혜택 신규 및 변경 안내                │
│   혜택 공지  │  2026.01.30                           │
│   ────────────────────────────────────────────────     │
│   T 멤버십 제휴 혜택 신규 및 변경 안내                │
│   혜택 공지  │  2026.01.30                           │
│   ────────────────────────────────────────────────     │
│   T 멤버십 제휴 혜택 신규 및 변경 안내                │
│   혜택 공지  │  2026.01.30                           │
│   ────────────────────────────────────────────────     │
│   T 멤버십 제휴 혜택 신규 및 변경 안내                │
│   혜택 공지  │  2026.01.30                           │
│   ────────────────────────────────────────────────     │
│   T 멤버십 제휴 혜택 신규 및 변경 안내                │
│   혜택 공지  │  2026.01.30                           │
│   ────────────────────────────────────────────────     │
│   T 멤버십 제휴 혜택 신규 및 변경 안내                │
│   혜택 공지  │  2026.01.30                           │
│                                                        │
└────────────────────────────────────────────────────────┘
```

## Section Contracts

### [noticeList]

- slot: `Content`
- visibleContent: repeated notice row with title, category/date metadata, row dividers, first two rows showing `NEW` badge
- vocabularyDecision: reuse `PageStackList`, `SectionItem`, `Local_ListInfo`; component may be unregistered
- policy: `unknown-from-figma-only/TBD`
- OGN: `unknown-from-figma-only/TBD`

## Policy / OGN Matrix

### [noticeList]

- visibleEvidence: repeated `T 멤버십 제휴 혜택 신규 및 변경 안내`, metadata `혜택 공지 | 2026.01.30`, `NEW` badge on first two rows
- policyInterpretation: announcement list includes category/date metadata and newness indicator; badge duration and ordering rules are not visible
- OGNInterpretation: `unknown-from-figma-only/TBD`
- decision: preserve simple full-screen list without filter, search, summary, or bottom action

## Distortion Gates

- Use exact Figma frame `14243:28880`.
- Do not add title section above the list; Figma shows rows immediately below header chrome.
- Preserve `NEW` badge on the first two visible rows only.
- Keep row metadata as `혜택 공지 | 2026.01.30`.
- Row dividers are thin separators, not section divider bands.
- Do not invent unread state, pinned notice, category filters, search, pagination, or bottom CTA.
