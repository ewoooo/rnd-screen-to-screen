# ActionButton.LeftItem

## Overview

Purpose: define an implementation-ready contract for a planned private item used inside `ActionButton`.

Figma SOT: [SKT_SDUI_Test_0512 / LeftItem component node](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=10150-108976&t=wZRehc2DOVV8corW-1)

Also checked the broader base section: [SKT_SDUI_Test_0512 / base section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 완료 |
| Implementation Target | cx-components private |
| Figma Source | action-button-left-item |
| Dependencies | Icon |
| Variants | Type: Ai+Gift/Ai |
| Properties | 없음 |

### Implementation Files

Implemented in `@pxds/cx-components`:

- `packages/cx-components/src/components/action-button-left-item/ActionButtonLeftItem.tsx`
- `packages/cx-components/src/components/action-button-left-item/ActionButtonLeftItem.types.ts`
- `packages/cx-components/src/components/action-button-left-item/action-button-left-item.variants.ts`
- `packages/cx-components/src/components/action-button-left-item/action-button-left-item.css`
- `packages/cx-components/src/components/action-button-left-item/action-button-left-item.readme.md`
- `packages/cx-components/src/components/action-button-left-item/index.ts`

### Styling Contract

- Component CSS must not define component-local `--cx-*` custom properties.
- Consume theme-neutral aliases from `@pxds/cx-tokens/style.css` directly: prefer `--semantic-*` and `--component-*` tokens.

## Structure

Purpose: define the Figma structure and normalized code shape.

### Target Structure

```txt
ActionButton.LeftItem
├─ Icon(type="action-ai", size=22)
├─ divider
└─ Icon(type="action-gift", size=22)? (type="ai-gift" only)
```

The Figma source is a compact leading icon cluster. It has no text and no interaction responsibility by itself; the owning `ActionButton` owns click behavior, label text, tooltip, and button count.

### Figma Structure

```txt
LeftItem
├─ Type=Ai+Gift (85 x 22)
│  ├─ Button/AI (22 x 22)
│  ├─ Div (1 x 8)
│  └─ Button/Gift (22 x 22)
└─ Type=Ai (43 x 22)
   ├─ Button/AI (22 x 22)
   └─ Div (1 x 8)
```

Layout is horizontal auto-layout, center aligned, with 20px gap. The divider is 1px wide and 8px tall.

### Component Consumption

| Consumed component | Used for | Notes |
| --- | --- | --- |
| `Icon` | AI and Gift glyph rendering | Consume through `@pxds/cx-components` / `@pxds/cx-icons`; do not inline Figma vectors in the component body. |

`ActionButton.LeftItem` is a private scoped item for `ActionButton`. Although Figma places the source near `Button` examples and `Bottomsheet` examples also reference `ActionButton`, this part should not become a `Button` dependency or public `Button` slot.

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `LeftItem` | private `ActionButtonLeftItem` implementation detail | no |
| `Type=Ai+Gift` | `type="ai-gift"` | private variant |
| `Type=Ai` | `type="ai"` | private variant |
| `Button/AI` | `packages/cx-icons/src/action-button/ActionButton.LeftItem.AI.svg` | private icon asset |
| `Button/Gift` | `packages/cx-icons/src/action-button/ActionButton.LeftItem.Gift.svg` | private icon asset |
| `Div` | `packages/cx-icons/src/action-button/ActionButton.LeftItem.Div.svg` or local divider element | private asset or local primitive |

## Props

Purpose: define the minimal private API and Figma bridge expectations.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"ai-gift" \| "ai"` | `"ai-gift"` | Selects Figma `Type=Ai+Gift` or `Type=Ai`. |
| `className` | `string` | - | Additional class for the private wrapper. |

No label, click handler, disabled state, tooltip, or button layout props should live here. Those belong to `ActionButton`.

### Figma Mapping Props

Figma exposes one variant axis and no additional component properties.

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| component root | `data-figma-render` | `component` |
| component root | `data-figma-component-id` | `action-button-left-item` |
| `type` prop | `data-figma-property-type` | `ai-gift` / `ai` |

Use lowercase bridge values in code even though Figma displays `Ai+Gift` and `Ai`.

## Usage

Purpose: show expected internal consumption.

### Import

Do not export this from the public package root initially. Keep it under the `ActionButton` implementation folder or a private module path.

```tsx
import { ActionButtonLeftItem } from "./ActionButtonLeftItem";
```

### Examples

```tsx
<ActionButtonLeftItem type="ai-gift" />
<ActionButtonLeftItem type="ai" />
```

Inside `ActionButton`:

```tsx
<ActionButtonRoot type="ai">
  <ActionButtonLeftItem type="ai" />
  <Button>AI 추천 받기</Button>
</ActionButtonRoot>
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep styling wired to `--semantic-*` / `--component-*` aliases and do not reintroduce component-local `--cx-*` CSS variables.
- Keep this as an `ActionButton` internal/scoped item.
- Use the action-button icon assets from `packages/cx-icons/src/action-button`.
- Keep the wrapper horizontal, center aligned, and 22px tall.
- Keep the divider local to this private item; it is not a reusable `Divider` component variant.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="action-button-left-item"` if bridge rendering is added.
- Preserve `data-figma-property-type` with `ai-gift` or `ai`.

### Don't

- Do not export public `ActionButton.LeftItem` until there is a cross-component API need.
- Do not make `Button` wait on this part. Current `Button` implementation does not render a left-item slot.
- Do not copy Figma asset URLs into production code.
- Do not add ad hoc 22px image assets outside `packages/cx-icons/src/action-button` or the Icon registry contract.
- Do not add route or parent-level spacing to correct this cluster.

### Normalization Notes

- Figma node `10150:108976` was prioritized over the broader base section because this document already linked the individual node.
- The broader base section confirms `LeftItem` sits near `ButtonXsmallSolid` and `TextButton`, under the same base area that contains `ActionButton`.
- `../../component-inventory.md` lists this as Phase 1 order 7 because it depends only on the already available `Icon` foundation and is needed by `ActionButton`.
- The Figma generated context exports `Button/AI`, `Div`, and `Button/Gift` as image assets.
- Dedicated source assets are now available in `packages/cx-icons/src/action-button`.

## SVG Assets

Use these source assets for implementation:

- `packages/cx-icons/src/action-button/ActionButton.LeftItem.AI.svg`
- `packages/cx-icons/src/action-button/ActionButton.LeftItem.Div.svg`
- `packages/cx-icons/src/action-button/ActionButton.LeftItem.Gift.svg`

SVG asset: available.

Implementation can either keep these as private action-button assets or register normalized icon keys later. Do not substitute `ai-search` for `ActionButton.LeftItem.AI.svg` unless design confirms they are visually identical.

## Validation

When implemented, validate through consuming app checks:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify:

- `type="ai-gift"` renders AI icon, divider, and Gift icon.
- `type="ai"` renders AI icon and divider only, matching the Figma 43px-wide source.
- Both icon visuals come from `packages/cx-icons/src/action-button` or a later normalized Icon registry entry, not inline vectors or copied Figma URLs.
- `ActionButton` consumes this internally without exposing it as a public `Button` dependency.
