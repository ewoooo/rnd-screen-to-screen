# SKT GenUI Test 0512 - Node 14243:28824

Figma mockup reference pack for list-style Screen Diagram generation.

- Figma file: `SKT GenUI Test 0512`
- Figma node: `14243:28824`
- Figma section name: `page-list_text`
- Source type: screen design mockup SOT
- Scope: five mobile mockup frames, read left to right
- Status: reference diagrams only; not route implementation contracts

## Frames

### Frame 01

- diagram: `frame-01.diagram.md`
- Figma frame: `리스트_할인내역` (`14243:28863`)
- referenceRole: discount history list with summary card, filter chips, dated transaction rows

### Frame 02

- diagram: `frame-02.diagram.md`
- Figma frame: `리스트_T플러스포인트 내역` (`14243:28846`)
- referenceRole: T plus point history list with point summary, gift badge, filter chips, dated rows

### Frame 03

- diagram: `frame-03.diagram.md`
- Figma frame: `리스트_이용내역` (`14243:28825`)
- referenceRole: usage overview list with shortcut summary and two preview sections separated by divider

### Frame 04

- diagram: `frame-04.diagram.md`
- Figma frame: `리스트_이용안내` (`14243:28891`)
- referenceRole: guide/FAQ list with tabs, chips, search, accordion rows, dividers

### Frame 05

- diagram: `frame-05.diagram.md`
- Figma frame: `리스트_공지사항` (`14243:28880`)
- referenceRole: notice list with repeated announcement rows and `NEW` badge

## Usage

- Use these files as Phase 3 wire references when creating or reviewing `Screen.diagram.md`.
- Preserve visible screen structure first: AppScreen rail, section order, summary/list/search/filter zones, divider rows, and visible copy.
- Component names marked `unknown/unregistered-from-figma` mean the visual contract is recorded before registry/component finalization.
- Do not treat `policy` or `OGN` values here as authoritative when they are marked `unknown-from-figma-only`.
- Map these reference sections to real route `Screen.config.ts`, policy refs, and OGN ids only during implementation-specific diagram work.
- When selected, record this file or a specific `frame-xx.diagram.md` in the target screen's `Screen Contract.wireReference`.
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
