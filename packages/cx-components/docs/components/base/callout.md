# Callout

## Overview

Purpose: define an implementation-ready contract for the planned CX base callout candidate.

Figma SOT: [SKT_SDUI_Test_0512 / Component node](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9677-26757&t=wZRehc2DOVV8corW-1)

Also checked the broader base section: [SKT_SDUI_Test_0512 / base section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 예정 |
| Implementation Target | cx-components candidate |
| Figma Source | callout |
| Dependencies | Text, Icon |
| Variants | Property 1: Default |
| Properties | `data-figma-property-title`: boolean |

### Implementation Files

Not implemented yet. Expected in `@pxds/cx-components`:

- `packages/cx-components/src/components/callout/Callout.tsx`
- `packages/cx-components/src/components/callout/Callout.types.ts`
- `packages/cx-components/src/components/callout/callout.variants.ts`
- `packages/cx-components/src/components/callout/callout.css`
- `packages/cx-components/src/components/callout/callout.readme.md`
- `packages/cx-components/src/components/callout/index.ts`

### Styling Contract

- Component CSS must not define component-local `--cx-*` custom properties.
- Consume theme-neutral aliases from `@pxds/cx-tokens/style.css` directly: prefer `--semantic-*` and `--component-*` tokens.
- Keep the callout container, icon, title, and body spacing tokenized through existing aliases; do not patch spacing at the route level.

## Structure

Purpose: define the normalized code shape for a simple informational callout.

### Target Structure

```txt
Callout
├─ Icon?
└─ text column
   ├─ Text(title)?
   └─ Text(description)
```

`Callout` is a public candidate compound for non-interactive informational content. Current inventory only documents a default variant and title presence.

### Component Consumption

| Consumed component | Used for | Notes |
| --- | --- | --- |
| `Icon` | Optional leading informational affordance | Use existing icon registry if Figma includes the icon region. |
| `Text` | Optional title and body text | Use CX typography vocabulary for both regions. |

### Figma Source / Normalization

Figma exposes `Callout` with:

- `Property 1: Default`
- `title` as a boolean property

Code should normalize this to one component with optional `title` and required or caller-provided body content. `Property 1: Default` does not need a public variant until more variants exist.

## Props

Purpose: define the minimal public API and Figma bridge expectations.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` | - | Optional title region mapped from Figma `title`. |
| `children` | `ReactNode` | - | Main callout body content. |
| `icon` | `IconType \| ReactNode` | type-derived if confirmed | Optional leading icon. Prefer registry `IconType` when possible. |
| `className` | `string` | - | Additional root class. |

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| component root | `data-figma-render` | `component` |
| component root | `data-figma-component-id` | `callout` |
| `title` presence | `data-figma-property-title` | `true` / `false` |

No additional bridge attributes are documented for `Property 1: Default`; keep it as the default implementation variant unless Figma adds another axis.

### State Rules

- `title` presence controls `data-figma-property-title`.
- `Callout` has no documented disabled, selected, pressed, loading, or error state.
- Interaction belongs to parent content; do not add click behavior to the callout root unless a future spec defines it.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { Callout } from "@pxds/cx-components";
```

### Examples

```tsx
<Callout>가입 전 꼭 확인해 주세요.</Callout>

<Callout title="안내">
  선택한 조건에 따라 제공 가능한 혜택이 달라질 수 있습니다.
</Callout>
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep one public `Callout` candidate component with a default visual treatment.
- Use `Text` for title and body regions.
- Use `Icon` vocabulary if the Figma node includes a leading icon.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="callout"` if bridge metadata is emitted.
- Preserve `data-figma-property-title` as a presence bridge.
- Add registry metadata if this becomes a public `cx-components` candidate export.

### Don't

- Do not create variants from `Property 1: Default`; it is the only documented value.
- Do not add alert/severity APIs such as `info`, `warning`, or `error` until Figma defines those variants.
- Do not embed custom SVG for the icon region.
- Do not make the callout root interactive without an explicit spec.
- Do not add route or parent-level spacing to correct callout layout.

### Normalization Notes

- Inventory lists `Callout` as a Phase 3 simple public compound candidate depending on `Text` and `Icon`.
- The current source is not implemented in `@pxds/cx-components`; this document is the implementation contract.
- Existing notes describe it as a simple informational callout.
- The exact default icon type, container color, and text styles must be confirmed from Figma during implementation before hardcoding them.
- If title/body typography does not map cleanly to existing aliases, record the token gap instead of adding local one-off values silently.

### SVG Assets

SVG asset: not required at this stage.

Use the existing `Icon` registry for the leading icon. If Figma resolves to a missing icon type during implementation, record the icon gap before adding a new asset.

### Validation

Documentation-only changes do not require app build checks.

When implementation changes are made, validate through the consuming app:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify:

- The root includes stable component identity metadata if bridge metadata is emitted.
- `title` presence maps to `data-figma-property-title`.
- No undocumented severity, interaction, or state variants are emitted.
- The component consumes `Text` and `Icon` vocabulary instead of local inline UI.
