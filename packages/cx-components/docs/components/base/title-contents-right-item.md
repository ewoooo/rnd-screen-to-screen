# TitleContents.RightItem

## Overview

Purpose: define the private right-side item set used by `TitleContents`.

Figma SOT: [SKT_SDUI_Test_0512 / Component node](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=10063-40303&t=wZRehc2DOVV8corW-1)

This is a Phase 2 private scoped item set. It should stay an implementation detail of `TitleContents` unless the component vocabulary explicitly promotes it.

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 완료 |
| Implementation Target | cx-components private |
| Figma Source | title-contents-right-item |
| Dependencies | Button, Icon, IconButton |
| Variants | Type: Icon/Button/Type3 |
| Properties | 없음 |

### Implementation Files

Implemented in `@pxds/cx-components`:

- `packages/cx-components/src/components/title-contents-right-item/TitleContentsRightItem.tsx`
- `packages/cx-components/src/components/title-contents-right-item/TitleContentsRightItem.types.ts`
- `packages/cx-components/src/components/title-contents-right-item/title-contents-right-item.variants.ts`
- `packages/cx-components/src/components/title-contents-right-item/title-contents-right-item.css`
- `packages/cx-components/src/components/title-contents-right-item/title-contents-right-item.readme.md`
- `packages/cx-components/src/components/title-contents-right-item/index.ts`

### Styling Contract

- Component CSS must not define component-local `--cx-*` custom properties.
- Consume theme-neutral aliases from `@pxds/cx-tokens/style.css` directly: prefer `--semantic-*` and `--component-*` tokens.

## Structure

Purpose: preserve the Figma structure while normalizing it into existing component vocabulary.

### Target Structure

```txt
TitleContents.RightItem (private preset set)
├─ Icon
├─ Type3
└─ Button
```

This is implemented as a scoped CX component. It should still be treated as `TitleContents`-owned vocabulary when the parent compound is added.

### Component Consumption

| Consumed component | Used for | Contract |
| --- | --- | --- |
| `Icon` | `Type=Icon` and `Type=Type3` visual | Use existing `Size=16, Type=ArrowUp` mapping. Do not inline SVG. |
| `IconButton` | Actionable icon variants | If the icon right item is clickable, wrap the icon with the shared `IconButton` contract and provide an accessible label. |
| `Button` | `Type=Button` visual | Use `Button` size `small`, type/variant `secondary`, label default `"버튼"`. |

### Figma Source Difference

Figma exposes `RightItem` as a private component set under `TitleContents`:

```txt
RightItem
├─ Type=Icon    16 x 16
│  └─ Icon / Size=16, Type=ArrowUp
├─ Type=Type3   16 x 16
│  └─ Icon / Size=16, Type=ArrowUp
└─ Type=Button  45 x 32
   └─ Button / Size=Small, Type=Secondary
      └─ "버튼"
```

The outer `RightItem` frame is a Figma component-set canvas with vertical spacing. Runtime code should not copy that canvas spacing; only the selected variant is rendered inside `TitleContents`.

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `RightItem` | private `TitleContents` right item preset | no |
| `Type=Icon` | icon preset, usually `Icon` or `IconButton` | no separate export |
| `Type=Type3` | separate private preset preserving Figma variant identity | no separate export |
| `Type=Button` | `Button` preset | no separate export |

## Props

Purpose: define the private preset shape and Figma bridge values.

### Props

Recommended private type:

```ts
type TitleContentsRightItem =
  | { type: "icon"; icon?: "arrowUp"; label: string; onClick?: () => void }
  | { type: "type3"; icon?: "arrowUp"; label: string; onClick?: () => void }
  | { type: "button"; label: string; onClick?: () => void; disabled?: boolean };
```

`TitleContents.RightItem` does not need a public prop surface. `TitleContents` should expose this as a private preset or as a `rightItem` slot, depending on the final `TitleContents` API.

### Figma Mapping Props

| Code value | Figma variant | Notes |
| --- | --- | --- |
| `type: "icon"` | `Type=Icon` | 16px `ArrowUp` icon. |
| `type: "button"` | `Type=Button` | Small secondary button. |
| `type: "type3"` | `Type=Type3` | Currently visually matches `Type=Icon`; keep separate to preserve Figma identity. |

### State Rules

- `type: "icon"` and `type: "type3"` render the shared `ArrowUp` icon at 16px.
- If an icon variant has `onClick`, render through the `IconButton` contract and require an accessible `label`.
- If an icon variant is non-interactive, render `Icon` directly and keep any accessibility semantics on the parent.
- `type: "button"` renders the shared `Button` contract with size `small`, secondary treatment, and the provided label.
- `disabled` only applies to the button preset unless the final parent API defines a disabled contract for icon actions.

## Usage

Purpose: show expected consumer usage through `TitleContents`, not direct export.

### Import

```tsx
import { TitleContents } from "@pxds/cx-components";
```

### Examples

```tsx
<TitleContents
  title="타이틀"
  rightItem={{ type: "icon", label: "접기" }}
/>

<TitleContents
  title="타이틀"
  rightItem={{ type: "type3", label: "접기" }}
/>

<TitleContents
  title="타이틀"
  rightItem={{ type: "button", label: "버튼" }}
/>
```

If the icon item is interactive, render the icon through `IconButton`. If it is purely informational, render `Icon` directly and keep the accessibility contract on the parent.

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep styling wired to `--semantic-*` / `--component-*` aliases and do not reintroduce component-local `--cx-*` CSS variables.
- Keep `TitleContents.RightItem` private to `TitleContents`.
- Use existing `Icon`, `IconButton`, and `Button` components.
- Preserve Figma bridge value `Type3` even though its current visual structure matches `Icon`.
- Keep the button variant aligned to `Button` size `small` and secondary visual treatment.
- Use tokenized spacing from the parent `TitleContents` layout; do not copy the Figma component-set canvas gap as runtime spacing.

### Don't

- Export `TitleContents.RightItem` as a standalone public React component.
- Inline the `ArrowUp` vector or add a new icon asset for this item.
- Create custom button or icon styling in the route/screen layer.
- Collapse `Type3` into `Icon` in Figma metadata, even if they render the same today.

### Normalization Notes

- Preserve the Figma variant values as `Icon`, `Button`, and `Type3` in bridge metadata.
- Normalize code values to lower camel/lowercase strings: `icon`, `button`, `type3`.
- Do not rename `Type3` to a semantic public name until the design source clarifies its meaning.
- Treat `Type3` as a private variant, not evidence for a new public component or icon asset.

### SVG Assets

SVG asset: not required.

Figma uses existing `Icon / Size=16, Type=ArrowUp` for both icon variants. No new SVG or icon source asset should be added for this component.

### Validation

Documentation-only changes do not require app build checks.

When implementation changes are made, validate through the consuming app:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Manual checks:

- `rightItem.type="icon"` maps to Figma `Type=Icon`.
- `rightItem.type="type3"` maps to Figma `Type=Type3`.
- `rightItem.type="button"` maps to Figma `Type=Button`.
- Icon variants consume the shared `Icon`/`IconButton` contract.
- Button variant consumes the shared `Button` contract.
