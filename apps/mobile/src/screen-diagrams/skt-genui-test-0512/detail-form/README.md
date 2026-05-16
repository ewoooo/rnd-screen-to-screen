# SKT GenUI Test 0512 — Detail/Form References

Figma mockup reference pack for Screen Diagram generation.

- Figma file: `SKT GenUI Test 0512`
- Figma node: `14243:28433`
- reference pack path: `apps/mobile/src/screen-diagrams/skt-genui-test-0512/detail-form`
- Source type: screen design mockup SOT
- Scope: four mobile mockup frames, read left to right
- Status: reference diagrams only; not route implementation contracts

## Frames

### Personal Info Input

- diagram: `personal-info-input.diagram.md`
- source frame index: `01`
- source Figma frame: `상세_정보 입력_인풋`
- referenceRole: 가입자 정보 입력 short form

### Additional Info Check

- diagram: `additional-info-check.diagram.md`
- source frame index: `02`
- source Figma frame: `상세_정보 체크`
- referenceRole: 가입자 정보 입력 long form with 가입/납부/생활지역 details

### Payment Cart Review

- diagram: `payment-cart-review.diagram.md`
- source frame index: `03`
- source Figma frame: `상세_결제_카트`
- referenceRole: 주문 상세 요약 with product/plan/price sections

### Payment Checkout

- diagram: `payment-checkout.diagram.md`
- source frame index: `04`
- source Figma frame: `상세_결제_결제하기`
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
