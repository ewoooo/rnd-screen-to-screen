# SKT GenUI Test 0513 — List/Text References

Figma mockup reference pack for list-style Screen Diagram generation.

- Figma file: `SKT GenUI Test 0513`
- Figma fileKey: `wLwyHV2L5wUz0fotXmN5dK`
- Figma node: `12172:5881`
- Figma section name: `리스트_텍스트`
- Figma section bounds: `2365×1052`
- reference pack path: `apps/mobile/src/screen-diagrams/skt-genui-test-0513/list-text`
- Source type: screen design mockup SOT
- Scope: mobile mockup frames from the `리스트_텍스트` section
- Status: reference diagrams only; not route implementation contracts

## Frames

### Usage History Overview

- diagram: `usage-history-overview.diagram.md`
- source frame index: `01`
- Figma frame: `리스트_이용내역` (`12172:5882`)
- referenceRole: usage overview list with shortcut summary and two preview sections separated by divider

### T Plus Point History List

- diagram: `t-plus-point-history-list.diagram.md`
- source frame index: `02`
- Figma frame: `리스트_T플러스포인트 내역` (`12172:5904`)
- referenceRole: T plus point history list with point summary, gift action, filter chips, dated rows

### Discount History List

- diagram: `discount-history-list.diagram.md`
- source frame index: `03`
- Figma frame: `리스트_할인내역` (`12172:5926`)
- referenceRole: discount history list with summary card, filter chips, dated transaction rows

### Usage Guide List

- diagram: `usage-guide-list.diagram.md`
- source frame index: `04`
- Figma frame: `리스트_이용안내` (`12172:5969`)
- referenceRole: guide/FAQ list with tabs, chips, search, accordion rows, dividers

### Notice List

- diagram: `notice-list.diagram.md`
- source frame index: `05`
- Figma frame: `리스트_공지사항` (`12172:5947`)
- referenceRole: notice list with repeated announcement rows, metadata, and contents dividers

## Usage

- Use these files as Phase 3 wire references when creating or reviewing `Screen.diagram.md`.
- Preserve visible screen structure first: AppScreen rail, section order, summary/list/search/filter zones, divider rows, and visible copy.
- Component names marked `unknown/unregistered-from-figma` mean the visual contract is recorded before registry/component finalization.
- Do not treat `policy` or `OGN` values here as authoritative when they are marked `unknown-from-figma-only`.
- Map these reference sections to real route `Screen.config.ts`, policy refs, and OGN ids only during implementation-specific diagram work.
- When selected, record this file or a specific semantic `*.diagram.md` file in the target screen's `Screen Contract.wireReference`.
- Use the wire only for visual structure and density. Policy-required information, copy, errors, CTA meaning, policy refs, and OGN ids must come from `Screen.map.md`, `policy-core`, and the target `Screen.config.ts`.

## Required Wire Syntax

```txt
┌─AppScreen───────────────────────────────┐
├─Header──────────────────────────────────┤
├─Content─────────────────────────────────┤
├══Divider════════════════════════════════┤
├─Bottom──────────────────────────────────┤
└─────────────────────────────────────────┘
```

- `Header`, `Content`, and `Bottom` are AppScreen physical slot rails.
- Visible section divider bands are written as `├══Divider══...┤`.
- These frames do not show a fixed bottom CTA; `Bottom` is omitted unless a real bottom action appears in the exact frame.
