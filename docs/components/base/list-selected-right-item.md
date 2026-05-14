# ListSelectedRightItem

## Overview

Figma SOT: [SKT_SDUI_Test_0512 / Component node](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=10068-48000&t=wZRehc2DOVV8corW-1)

`ListSelectedRightItem` is the private right-side affordance slot for `ListSelected`. It is a Phase 2 private scoped item set, not a public app-level component API. Keep it scoped to `ListSelected` unless another public component needs the same exact contract.

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 예정 |
| Implementation Target | cx-components private |
| Figma Source | list-selected-right-item |
| Dependencies | ButtonXsmallSolid, Icon, TitleSection.RightItem, IconButton, Text |
| Variants | Type: ButtonXsmallSolid/Icon/TextButton |
| Properties | 없음 |

### Implementation Files

No actual implementation file exists yet. Repository search only finds the inventory row and this document. Write the first implementation from the Figma component-set structure below.

## Structure

Purpose: define the target component structure and how Figma-only nodes normalize into code.

### Target Structure

```txt
ListSelected
└─ rightItem?
   ├─ ButtonXsmallSolid                 Type=ButtonXsmallSolid
   ├─ IconButton? + Icon(arrow-right)    Type=Icon
   └─ TextButton/Text action             Type=TextButton
```

`ListSelectedRightItem` should remain a private scoped item set for `ListSelected`. The parent row owns list layout, selected-control placement, row spacing, and presence rules.

Figma confirms one component set with three variants:

```txt
ListSelectedRightItem
├─ Type=ButtonXsmallSolid  45 x 21
├─ Type=Icon               16 x 20
└─ Type=TextButton         28 x 20
```

Recommended code structure:

```txt
ListSelectedRightItem
├─ ButtonXsmallSolid        type="buttonXsmallSolid"
├─ IconButton? / Icon       type="icon"
└─ TitleSection.RightItem? / Text action
                           type="textButton"
```

The root should own only the variant switch and the right-slot sizing/alignment needed inside `ListSelected`. Do not add list-row padding or vertical rhythm here; `ListSelected` owns row layout.

### Component Consumption

| Consumed component | Used for | Contract |
| --- | --- | --- |
| `ButtonXsmallSolid` | `Type=ButtonXsmallSolid` | Render the compact pill action. Default Figma label is `받기`. Pass label, disabled, and click semantics through rather than recreating pill styles. |
| `Icon` | `Type=Icon` | Render `ArrowRight` at size `16` through the shared icon registry, not a local SVG. |
| `TitleSection.RightItem` | Text-button normalization reference | Use the existing text-button vocabulary as the reference if its private API already exists. Avoid duplicating a second text-button grammar. |
| `IconButton` | Interactive icon-only action | Use only when the icon variant is the action target. It owns native button semantics and `aria-label`; for decorative disclosure icons, render `Icon` without an action wrapper. |
| `Text` | Text-button visible label | Use when a text-button primitive is not yet implemented. Match the Figma text treatment through tokenized text style, not raw route styles. |

### Figma Source Difference

Figma exposes `ListSelectedRightItem` as a standalone private component set with one variant axis:

```txt
ListSelectedRightItem
├─ Type=ButtonXsmallSolid
├─ Type=Icon
└─ Type=TextButton
```

Code should fold these variants into the `ListSelected` right-item contract instead of promoting this as a public app-level import.

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `ListSelectedRightItem` | private `ListSelected` right item preset | no |
| `Type=ButtonXsmallSolid` | `rightItem={{ type: "buttonXsmallSolid" }}` or private adapter prop | no |
| `Type=Icon` | `rightItem={{ type: "icon" }}` or private adapter prop | no |
| `Type=TextButton` | `rightItem={{ type: "textButton" }}` or private adapter prop | no |
| nested button label `받기` | `ButtonXsmallSolid` label | content only |
| nested `ArrowRight` icon | `Icon type="arrow-right" size={16}` | `Icon` yes, this item set no |
| nested text label `Text` | `Text` / text-button label | content only |

## Props

Purpose: define the private preset API and Figma bridge contract.

### Props

Keep the API small and close to the Figma variant axis if a private adapter is created:

```ts
type ListSelectedRightItemType =
  | "buttonXsmallSolid"
  | "icon"
  | "textButton";

type ListSelectedRightItemProps = {
  type?: ListSelectedRightItemType;
  label?: string;
  iconType?: IconType;
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
};
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"buttonXsmallSolid" \| "icon" \| "textButton"` | `"buttonXsmallSolid"` | Maps to Figma `Type`. |
| `label` | `string` | `받기` for pill, `Text` for text button | Visible text for button/text variants. Ignored by decorative icon variant. |
| `iconType` | `IconType` | `arrow-right` | Icon glyph for `type="icon"`. |
| `disabled` | `boolean` | `false` | Pass through to `ButtonXsmallSolid` or interactive `IconButton`; text action should use the same disabled affordance if supported. |
| `onClick` | `() => void` | - | Makes the rendered affordance interactive. |
| `ariaLabel` | `string` | derived from `label` when possible | Required when rendering an icon-only interactive action. |

### Figma Mapping Props

No `data-figma-property-*` props are currently listed for this component. If implemented for capture, emit a root component id and a normalized type property:

```txt
data-figma-render="component"
data-figma-component-id="list-selected-right-item"
data-figma-property-type="button-xsmall-solid|icon|text-button"
```

When represented through `ListSelected`, the parent should own the right-item presence bridge rather than requiring screens to render this private item directly.

### State Rules

- Figma names the axis `Type` with values `ButtonXsmallSolid`, `Icon`, and `TextButton`; code should normalize to `buttonXsmallSolid`, `icon`, and `textButton`.
- `disabled=true` passes through to `ButtonXsmallSolid` or interactive `IconButton`.
- `type="icon"` with `onClick` must render an accessible icon-only action and require or derive `ariaLabel`.
- `type="icon"` without `onClick` may render a decorative disclosure `Icon` if the parent row owns the click target.
- `type="textButton"` should follow the same text-action disabled and click behavior used by the normalized text-button vocabulary.

## Usage

Purpose: show expected consumer usage through `ListSelected` or the private scoped item.

### Import

Preferred public consumption is through `ListSelected`:

```tsx
import { ListSelected } from "@pxds/cx-components";
```

Private adapter only if the implementation needs a dedicated scoped file:

```tsx
import { ListSelectedRightItem } from "@pxds/cx-components";
```

### Examples

Preferred parent preset shape:

```tsx
<ListSelected
  label="혜택 받기"
  rightItem={{ type: "buttonXsmallSolid", label: "받기", onClick: handleReceive }}
/>
```

Private adapter examples:

```tsx
<ListSelectedRightItem type="buttonXsmallSolid" label="받기" onClick={handleReceive} />
```

```tsx
<ListSelectedRightItem type="icon" iconType="arrow-right" ariaLabel="상세 보기" onClick={openDetail} />
```

```tsx
<ListSelectedRightItem type="textButton" label="Text" onClick={openTextAction} />
```

`ListSelected` should expose this through a higher-level slot or preset, not by forcing screen routes to import `ListSelectedRightItem` directly.

## Implementation Guide

### Do

- Keep this component private to the list-selected pattern.
- Implement the Figma `Type` axis exactly: `ButtonXsmallSolid`, `Icon`, `TextButton`.
- Reuse `ButtonXsmallSolid`, `Icon`, `IconButton`, `Text`, and the `TitleSection.RightItem` text-button contract.
- Let `ListSelected` own row spacing, min-height, left control placement, and sub-text layout.
- Require `ariaLabel` when the icon variant is clickable.
- Prefer existing tokens for the Figma dimensions: `spacing/8`, `spacing/4`, `spacing/2`, `radius/full`, text/on-brand, bg/inverse, and secondary text color.

### Don't

- Promote this as a public import unless another component needs the same scoped item set.
- Recreate `ButtonXsmallSolid` styles inline in `ListSelectedRightItem`.
- Add route-local margin/padding to correct row alignment.
- Add a new icon asset for the arrow-right glyph.
- Merge this with `TitleSection.RightItem`; use that component as a vocabulary reference, but keep list-row sizing separate.

### Normalization Notes

- Inventory marks this as `제작 예정`; no implementation file exists yet.
- `ListSelectedRightItem` is a Phase 2 private scoped item set, not a public app-level component API.
- The Figma `Type` values normalize as `ButtonXsmallSolid` -> `buttonXsmallSolid`, `Icon` -> `icon`, and `TextButton` -> `textButton`.
- `ButtonXsmallSolid` should consume the component contract tracked in `button-xsmall-solid.md`; do not copy its pill styling here.
- The `Icon` variant uses `ArrowRight` at size `16`.
- The `TextButton` variant should align with existing text-button vocabulary, including `TitleSection.RightItem` where applicable, before adding a new component grammar.
- `ListSelected` owns row layout, spacing, min-height, selected control placement, and right-item presence.

### SVG Assets

SVG asset: not required.

Figma generated asset URLs for the preview, but the visible icon requirement maps to existing `Icon type="arrow-right"` vocabulary. The `ButtonXsmallSolid` variant should consume its own component contract; if that component later discovers a missing inner glyph, track it in `button-xsmall-solid.md`, not here.

### Validation

When implemented, validate through the consuming app because this is a private scoped item:

```txt
npm run lint -w @screen/mobile
npm run build -w @screen/mobile
```

Also verify the `ListSelected` combinations:

- `type=Radio` and `type=Checkbox`
- `show-list-selected-right-item=true/false`
- each right item `Type`: `ButtonXsmallSolid`, `Icon`, `TextButton`
