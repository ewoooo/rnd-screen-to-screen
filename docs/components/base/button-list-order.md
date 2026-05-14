# ButtonListOrder

## Overview

Purpose: define an implementation-ready contract for a planned base component.

Figma SOT: [SKT_SDUI_Test_0512 / Component node](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9740-36621&t=wZRehc2DOVV8corW-1)

Also checked the broader base section: [SKT_SDUI_Test_0512 / base section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 완료 |
| Implementation Target | cx-components candidate |
| Figma Source | button-list-order |
| Dependencies | Icon |
| Variants | 없음 |
| Properties | 없음 |

### Implementation Files

Implemented in `@pxds/cx-components`:

- `packages/cx-components/src/components/button-list-order/ButtonListOrder.tsx`
- `packages/cx-components/src/components/button-list-order/ButtonListOrder.types.ts`
- `packages/cx-components/src/components/button-list-order/button-list-order.variants.ts`
- `packages/cx-components/src/components/button-list-order/button-list-order.css`
- `packages/cx-components/src/components/button-list-order/button-list-order.readme.md`
- `packages/cx-components/src/components/button-list-order/index.ts`

### Styling Contract

- Component CSS must not define component-local `--cx-*` custom properties.
- Consume theme-neutral aliases from `@pxds/cx-tokens/style.css` directly: prefer `--semantic-*` and `--component-*` tokens.

## Structure

Purpose: define the Figma structure and normalized code shape.

### Target Structure

```txt
ButtonListOrder
├─ label
└─ Icon(type="dropdown", size=16)
```

The component is a compact inline action for choosing or changing list ordering. Figma renders the default label as `인기순`.

### Figma Structure

```txt
ButtonListOrder (54 x 18)
├─ text "인기순" (Pretendard Variable Bold, 14px, line-height 130%)
└─ Icon / Size=16, Type=Dropdown
   └─ ico-dropdown-default
```

Layout is horizontal auto-layout, hug contents, center aligned, with 2px gap and no padding.

### Component Consumption

| Consumed component | Used for | Notes |
| --- | --- | --- |
| `Icon` | Trailing dropdown affordance | Use `type="dropdown"` and `size={16}` from `@pxds/cx-components` / `@pxds/cx-icons`. |

`ButtonListOrder` is a scoped action used by `FilterSorting` and `TitleSection.RightItem`. It should remain a small base candidate rather than a general button replacement.

## Props

Purpose: define the minimal public API and Figma bridge expectations.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `"인기순"` | Visible order label. |
| `icon` | `IconType` | `"dropdown"` | Optional override only if the design system explicitly allows another order affordance later. |
| `onClick` | `() => void` | - | Click handler for opening an order menu or changing order state. |
| `disabled` | `boolean` | `false` | Disables the action when needed by a parent flow. |
| `className` | `string` | - | Additional root class. |

### Figma Mapping Props

Figma exposes no variants or component properties for this source.

If implemented as a bridgeable component, use stable identity attributes only:

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| component root | `data-figma-render` | `component` |
| component root | `data-figma-component-id` | `button-list-order` |

Do not invent `data-figma-property-*` attributes until Figma adds a property axis or the implementation needs a documented export contract.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { ButtonListOrder } from "@pxds/cx-components";
```

### Examples

```tsx
<ButtonListOrder label="인기순" onClick={openSortSheet} />
<ButtonListOrder label="최신순" onClick={openSortSheet} />
```

Scoped parent usage:

```tsx
<FilterSorting orderAction={<ButtonListOrder label="인기순" />} />

<TitleSection
  title="추천 상품"
  rightItem={{ type: "buttonListOrder", label: "인기순", onClick: openSortSheet }}
/>
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep styling wired to `--semantic-*` / `--component-*` aliases and do not reintroduce component-local `--cx-*` CSS variables.
- Implement as a compact inline action with text plus `Icon type="dropdown" size={16}`.
- Use the existing `Icon` wrapper and registry instead of embedding SVG inline.
- Keep spacing at the Figma-confirmed 2px gap using an existing token if available.
- Keep this component available for `FilterSorting` and `TitleSection.RightItem` scoped action composition.
- Preserve text style through existing typography tokens/classes where possible; if no token maps cleanly to Figma 14 bold / 130% line-height, record the token gap instead of adding an arbitrary one-off style silently.
- Add registry metadata if this becomes a public `cx-components` candidate export.

### Don't

- Do not create a new icon asset for the dropdown glyph; the current Icon registry already contains `dropdown`.
- Do not add variants that are absent from Figma.
- Do not make this a replacement for generic `Button`, `IconButton`, or text-button vocabulary.
- Do not add route or parent-level margin/padding to correct this component's inline alignment.

### Normalization Notes

- Figma node `9740:36621` is the individual component and was prioritized over the broader base section link.
- The broader base section confirms this component appears as a standalone `ButtonListOrder` and as `TitleSection.RightItem / Type=ButtonListOrder`.
- `FilterSorting` lists `ButtonListOrder` as a dependency; it should consume the component rather than reimplement the text-plus-dropdown pair.
- `TitleSection.RightItem` may keep an internal preset shape, but the visual vocabulary should normalize to this same component contract.
- The Figma icon instance resolves to `Icon / Size=16, Type=Dropdown`; code registry key is `dropdown`.

### Validation

When implemented, validate through consuming app checks:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify:

- The root renders text and a 16px dropdown icon with a 2px gap.
- Parent `FilterSorting` and `TitleSection.RightItem` do not duplicate this structure by hand.
- No extra `data-figma-property-*` attributes are emitted for undocumented variants.
