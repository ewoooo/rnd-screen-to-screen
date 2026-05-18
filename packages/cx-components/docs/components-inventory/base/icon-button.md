# IconButton

## Overview

Purpose: identify ownership, source, implementation files, and production status.

Figma SOT: [SKT_SDUI_Test_0512 / Component base](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 완료 |
| Implementation Target | cx-components |
| Figma Source | icon-button |
| Dependencies | Icon as required `children`; IconButton does not import or create Icon by itself |
| Internal Parts | 없음 |
| Variants | size: small/medium; variant: plain |
| Properties | `data-figma-property-size`: small/medium; `data-figma-property-variant`: plain; `data-figma-property-disabled`: true/false |

### Implementation Files

- `packages/cx-components/src/components/icon-button/IconButton.tsx`
- `packages/cx-components/src/components/icon-button/IconButton.types.ts`
- `packages/cx-components/src/components/icon-button/icon-button.variants.ts`
- `packages/cx-components/src/components/icon-button/icon-button.css`
- `packages/cx-components/src/components/icon-button/index.ts`

## Structure

Purpose: define the target component structure and how Figma-only nodes normalize into code.

### Target Structure

```txt
IconButton
└─ Icon children
```

`IconButton` is a clickable button primitive for icon-only actions. It owns the native `<button>`, accessibility label, visual state, and Figma bridge attributes. The icon graphic is supplied by the consumer through `children`.

### Component Consumption

| Consumed component | Used for | Current implementation |
| --- | --- | --- |
| `Icon` | Visual icon glyph inside the button | Not imported by `IconButton`. Consumers pass `<Icon ... />` as `children`. |

`children` is typed as required `ReactNode`, but the system contract expects an `Icon` child. The CSS only sizes direct `svg` or `img` children to `24px`; it does not inspect, clone, or normalize nested icon components.

### Figma Source Difference

The checked Figma base section does not expose a standalone node named `IconButton`. Icon-only actions appear inside components such as AppBar as `btn` frames containing an `Icon` node. Code normalizes that repeated pattern into one public `IconButton` wrapper plus an explicit `Icon` child.

Compressed Figma source pattern:

```txt
AppBar / other parent
└─ btn
   └─ Icon
```

Normalized code structure:

```txt
IconButton
└─ Icon
```

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `btn` | `IconButton` root button | yes |
| `Icon` | `children`, usually `<Icon />` | yes |
| Icon vector/union layers | Icon implementation detail | no |

## Props

Purpose: define the public API and the `data-figma-property-*` bridge contract.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | required | Icon content. Use the shared `Icon` component unless a call site has a documented exception. |
| `size` | `"small" \| "medium"` | `"medium"` | Button size variant. Current CSS gives both sizes a `32px` minimum target. |
| `variant` | `"plain"` | `"plain"` | Visual variant. `plain` is the only implemented variant. |
| `disabled` | `boolean` | `false` | Native disabled state and disabled visual state. |
| `aria-label` | `string` | required | Accessible action label for the icon-only button. |
| `onClick` | `() => void` | - | Click handler. |
| `className` | `string` | - | Additional class name on the root button. |

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| `size` prop | `data-figma-property-size` | `small` / `medium` |
| `variant` prop | `data-figma-property-variant` | `plain` |
| `disabled` prop | `data-figma-property-disabled` | `true` / `false` |

Bridge attributes can be overridden directly through `IconButtonFigmaBridgeProps`. When an override is not provided, `IconButton.tsx` falls back to the resolved public prop value.

### State Rules

- `disabled=true` sets the native `disabled` attribute.
- `disabled=true` also sets `data-disabled=""` for styling.
- `data-figma-property-disabled` resolves to `"true"` when disabled and `"false"` otherwise.
- `size` and `variant` feed both class variance and Figma bridge attributes.
- The root always defaults to `data-figma-render="component"` and `data-figma-component-id="icon-button"`.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { Icon, IconButton } from "@pxds/cx-components";
```

### Examples

```tsx
<IconButton aria-label="뒤로가기">
  <Icon type="arrow-left" size={24} />
</IconButton>
```

```tsx
<IconButton aria-label="닫기" disabled>
  <Icon type="close" size={24} />
</IconButton>
```

```tsx
<IconButton aria-label="검색" size="small">
  <Icon type="search" size={24} />
</IconButton>
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep one public `IconButton` component.
- Keep icon graphics as required `children`; the caller composes `IconButton` with `Icon`.
- Preserve native `<button type="button">` semantics.
- Require `aria-label` for every icon-only action.
- Use `iconButtonVariants` for `size` and `variant`.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="icon-button"`.
- Preserve the `data-figma-property-*` bridge attributes listed above.

### Don't

- Make IconButton choose icon type internally.
- Add a separate public `btn` component from the Figma layer name.
- Add route/screen-local margin or padding to compensate for IconButton spacing.
- Add unregistered sizes or visual variants without first updating the component vocabulary and Figma bridge contract.
- Treat raw vector/union layers from Figma as public component vocabulary.

### Normalization Notes

- Figma currently shows the icon action pattern as `btn` wrappers with nested `Icon` nodes in parent components such as AppBar.
- Code gives that pattern a named public component, `IconButton`, so parent components can compose action slots consistently.
- `IconButton` does not own the `Icon` dependency by import. The dependency is a composition contract: consumers pass the icon as `children`.
- Direct `svg` and `img` children are sized to `24px` by `icon-button.css`.
- Both `small` and `medium` currently map to a `32px` minimum button box. Do not document a visual size difference unless the CSS changes.
- `plain` is the only implemented visual variant.

### Validation

`@pxds/cx-components` currently has no package-local `lint` or `build` scripts. Validate through consuming app checks.

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify the root DOM node includes:

- `data-figma-render="component"`
- `data-figma-component-id="icon-button"`
- `data-figma-property-size`
- `data-figma-property-variant`
- `data-figma-property-disabled`

Verify `disabled=true` sets both the native `disabled` attribute and `data-figma-property-disabled="true"`.
