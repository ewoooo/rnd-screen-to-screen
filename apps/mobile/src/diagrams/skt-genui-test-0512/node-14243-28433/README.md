# SKT GenUI Test 0512 - Node 14243:28433

Figma mockup reference pack for Screen Diagram generation.

- Figma file: `SKT GenUI Test 0512`
- Figma node: `14243:28433`
- Source type: screen design mockup SOT
- Scope: four mobile mockup frames, read left to right
- Status: reference diagrams only; not route implementation contracts

## Frames

### Frame 01

- diagram: `frame-01.diagram.md`
- referenceRole: 가입자 정보 입력 short form

### Frame 02

- diagram: `frame-02.diagram.md`
- referenceRole: 가입자 정보 입력 long form with 가입/납부/생활지역 details

### Frame 03

- diagram: `frame-03.diagram.md`
- referenceRole: 주문 상세 요약 with product/plan/price sections

### Frame 04

- diagram: `frame-04.diagram.md`
- referenceRole: 주문 상세 full checkout with agreements and notices

## Usage

- Use these files as Figma SOT interpretation references when creating or reviewing `Screen.diagram.md`.
- Preserve visible screen structure first: AppScreen rail, section order, divider bands, field/list/card/CTA copy.
- Do not treat `policy` or `OGN` values here as authoritative when they are marked `unknown-from-figma-only`.
- Map these reference sections to real route `Screen.config.ts`, policy refs, and OGN ids only during implementation-specific diagram work.

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
- Bottom CTAs are represented as `Bottom(preset="...")`, not the legacy bottom-slot alias.
