# Bottomsheet

## Overview

Purpose: document the planned Figma `Bottomsheet` compound while preserving the existing `@pxds/pxds-layout` `BottomSheet` runtime as the implementation target.

Figma SOT: [SKT_SDUI_Test_0512 / base section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

Component node checked in Figma: [Bottomsheet](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9717-37390&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 예정 |
| Implementation Target | pxds-layout |
| Figma Source | bottomsheet |
| Dependencies | ActionButton, Button, Handle, Icon, ActionButton.LeftItem, TitleBottomSheet, Tooltip, BottomSheet |
| Variants | ActionButton: on/off |
| Properties | `data-figma-property-con`: slot; `data-figma-property-show-title-bottom-sheet`: boolean |

### Implementation Files

Existing runtime target in `@pxds/pxds-layout`:

- `packages/pxds-layout/src/bottom-sheet/BottomSheet.tsx`
- `packages/pxds-layout/src/bottom-sheet/BottomSheetRoot.tsx`
- `packages/pxds-layout/src/bottom-sheet/BottomSheetContent.tsx`
- `packages/pxds-layout/src/bottom-sheet/BottomSheetBackdrop.tsx`
- `packages/pxds-layout/src/bottom-sheet/index.ts`

No new implementation file is required for this documentation task.

### Styling Contract

- `Bottomsheet` must normalize to the existing `BottomSheet` layout runtime unless the visual content wrapper is explicitly promoted later.
- Keep modal, dimmer, focus trap, scroll lock, and bottom placement inside `@pxds/pxds-layout`.
- Use tokenized spacing and radius from the layout/component layers. Do not correct sheet alignment from route-level margin, padding, or raw style.
- `@pxds/pxds-layout` may consume WDS bottom-sheet primitives directly at this boundary to avoid a circular dependency with component packages.

## Structure

Purpose: define how the Figma compound maps onto the layout runtime and consumed component vocabulary.

### Target Structure

```txt
BottomSheet
├─ Handle
├─ TitleBottomSheet?                 showTitleBottomSheet=true
├─ content slot                      con
└─ ActionButton?                     actionButton=on
   ├─ Button
   ├─ ActionButton.LeftItem?
   └─ Tooltip?
```

`Bottomsheet` is the Figma component-set spelling. Code should continue to expose the layout runtime as `BottomSheet`. If a separate presentational wrapper becomes necessary, keep it scoped to the bottom-sheet composition and avoid introducing a second public spelling that competes with `BottomSheet`.

### Component Consumption

| Consumed component | Used for | Contract |
| --- | --- | --- |
| `BottomSheet` | Modal/runtime shell | Existing `@pxds/pxds-layout` implementation owns open state, backdrop, focus trap, scroll lock, bottom placement, and content container. |
| `Handle` | Top drag affordance | Render as the visual handle only. Gesture and lifecycle behavior remain in `BottomSheet`. |
| `TitleBottomSheet` | Optional sheet header | Controlled by `showTitleBottomSheet`; owns title text, optional close button, and optional sub text. |
| `ActionButton` | Sticky action area | Present only when `actionButton="on"`. Use the existing action-button vocabulary instead of local button/footer styling. |
| `Button` | Primary CTA inside `ActionButton` | Figma uses `Size=XLarge, Type=Primary`. |
| `ActionButton.LeftItem` | Optional AI/gift leading treatment inside CTA | Use the scoped dependency already required by `ActionButton`. |
| `Tooltip` | Optional promotional tooltip above action CTA | Figma uses `Direction=Center` in the `ActionButton=on` source. |
| `Icon` | Close icon inside `TitleBottomSheet` and nested icon dependencies | Consume registered icon vocabulary; no Bottomsheet-owned icon set. |

### Figma Source Difference

Figma exposes `Bottomsheet` as a component set at node `9717:37390` with one variant axis and two component variants:

```txt
Bottomsheet
├─ ActionButton=on
│  ├─ Handle
│  ├─ Title
│  │  └─ TitleBottomSheet
│  ├─ Con
│  └─ ActionButton
└─ ActionButton=off
   ├─ Handle
   ├─ Title
   │  └─ TitleBottomSheet
   └─ Con
```

Figma component properties checked on the component set:

| Figma property | Type | Default | Code normalization |
| --- | --- | --- | --- |
| `ActionButton` | variant | `on` | `actionButton: "on" \| "off"` or boolean convenience normalized to the variant value. |
| `Con#9717:4` | slot | - | `children` / `content` slot. |
| `Show TitleBottomSheet#10037:0` | boolean | `true` | `showTitleBottomSheet` boolean. |

Source measurements checked in Figma:

| Variant | Size | Root layout | Radius | Notable spacing |
| --- | --- | --- | --- | --- |
| `ActionButton=on` | `393 x 429` | vertical auto layout | top `28`, bottom `0` | `Handle` 32px high; title wrapper horizontal padding `32`; `Con` source height `221`; action area padding `12 12 40`. |
| `ActionButton=off` | `393 x 409` | vertical auto layout | top `28`, bottom `0` | root bottom padding `34`; title wrapper horizontal padding `20`; `Con` source height `275`. |

Figma source includes a separate `BottomSheet` frame label in the base section. Treat that as the layout/runtime naming anchor, while `Bottomsheet` is the Figma compound that describes expected child composition.

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `Bottomsheet` component set | `BottomSheet` runtime plus scoped composition wrapper if needed | layout vocabulary |
| `ActionButton=on/off` | `actionButton="on" \| "off"` or derived action presence | variant value |
| `Handle` instance | `Handle` | yes |
| `TitleBottomSheet` instance | `TitleBottomSheet` | yes |
| `Con` slot | `children` / `content` | slot |
| `ActionButton` instance | `ActionButton` | yes |
| Nested icons and left items | owned by `Icon`, `TitleBottomSheet`, and `ActionButton.LeftItem` | dependency-owned |

## Props

Purpose: define the public API shape and Figma bridge contract expected when this compound is normalized through `BottomSheet`.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | - | Controlled open state from `BottomSheetRoot`. |
| `defaultOpen` | `boolean` | - | Uncontrolled initial open state from `BottomSheetRoot`. |
| `onOpenChange` | `(open: boolean) => void` | - | Sheet lifecycle callback. |
| `children` | `ReactNode` | - | Main `Con` slot content. |
| `showTitleBottomSheet` | `boolean` | `true` | Controls whether `TitleBottomSheet` is rendered. |
| `title` | `ReactNode` | - | Header title content passed to `TitleBottomSheet`. |
| `titleBottomSheet` | `ReactNode` | - | Optional explicit header slot when consumers need a fully composed `TitleBottomSheet`. |
| `actionButton` | `"on" \| "off"` | `"on"` | Figma variant axis for the bottom action area. |
| `action` | `ReactNode` | - | Optional `ActionButton` slot/content when `actionButton="on"`. |
| `handle` | `boolean` | `true` | Existing `BottomSheetContent` handle switch. Prefer rendering the `Handle` visual through the runtime contract. |
| `backdrop` | `ReactNode` | `BottomSheetBackdrop` | Existing layout runtime backdrop override. |
| `peekHeight` | `number` | - | Existing WDS bottom-sheet peek height passthrough. |
| `gap` | `CSSProperties["gap"]` | `var(--spacing-20)` | Existing content gap passthrough. |

The exact exported prop shape may remain the current `BottomSheet` composition API. The important normalization is that Figma `Bottomsheet` does not create an unrelated runtime component outside `pxds-layout`.

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| resolved component id | `data-figma-component-id` | `bottomsheet` for the Figma compound identity, or `bottom-sheet` only when exporting the bare runtime shell. |
| `children` / `content` slot | `data-figma-property-con` | slot marker for the `Con` content area. |
| `showTitleBottomSheet` | `data-figma-property-show-title-bottom-sheet` | `true` / `false`. |
| `actionButton` | `data-figma-property-action-button` | `on` / `off`. |

### State Rules

- `ActionButton=on` renders the bottom action area after the `Con` slot.
- `ActionButton=off` omits the action area and uses the sheet's bottom padding to preserve the source bottom spacing.
- `showTitleBottomSheet=false` hides only the `TitleBottomSheet` header. It must not remove the handle or change modal lifecycle behavior.
- `Handle` visibility and drag behavior are separate concerns: `Handle` is visual; `BottomSheet` owns modal/runtime state.
- The content slot must be layout-stable. Screen routes should not add compensating outer spacing to make the sheet match a specific variant.

## Usage

Purpose: show expected consumer usage while preserving `pxds-layout` ownership.

### Import

```tsx
import { BottomSheet } from "@pxds/pxds-layout/bottom-sheet";
```

### Examples

```tsx
<BottomSheet open onOpenChange={setOpen}>
  {sheetContent}
</BottomSheet>
```

```tsx
<BottomSheet open handle gap="var(--spacing-20)">
  <TitleBottomSheet title="타이틀" onClose={() => setOpen(false)} />
  {sheetContent}
  {actionButton}
</BottomSheet>
```

When the Figma compound contract is represented in a higher-level composition, normalize variant-like inputs before rendering:

```tsx
const actionButton = hasAction ? "on" : "off";

<BottomSheet
  open={open}
  data-figma-render="component"
  data-figma-component-id="bottomsheet"
  data-figma-property-action-button={actionButton}
  data-figma-property-show-title-bottom-sheet={showTitle}
>
  {showTitle ? <TitleBottomSheet title="타이틀" /> : null}
  <div data-figma-render="slot" data-figma-property-con>
    {children}
  </div>
  {actionButton === "on" ? action : null}
</BottomSheet>;
```

## Implementation Guide

Purpose: constrain future implementation decisions and validation.

### Do

- Keep `BottomSheet` in `@pxds/pxds-layout` as the implementation target.
- Preserve the naming normalization: Figma `Bottomsheet` maps to code `BottomSheet` unless a scoped visual wrapper is explicitly justified.
- Compose existing dependencies: `Handle`, `TitleBottomSheet`, `ActionButton`, `Button`, `Tooltip`, and registered `Icon` variants.
- Keep root radius and bottom placement in the layout runtime, not in screen routes.
- Preserve `data-figma-property-con`, `data-figma-property-show-title-bottom-sheet`, and the `ActionButton` variant bridge when exporting this compound.
- Let route organisms provide sheet content through the `Con` slot instead of hardcoding domain content in the base component.

### Don't

- Implement a second public `Bottomsheet` component that duplicates the existing `BottomSheet` runtime.
- Move WDS modal, dimmer, focus trap, scroll lock, or portal behavior into `cx-components`.
- Add route-level padding or margins to compensate for the `ActionButton=on/off` variants.
- Recreate `ActionButton`, `TitleBottomSheet`, `Handle`, or `Tooltip` styles locally inside the sheet.
- Treat nested vector layers from consumed icon/button components as new Bottomsheet-owned SVG assets.

### Normalization Notes

- Inventory status remains `제작 예정`; this document defines the contract only.
- Inventory also has `BottomSheet` with status `없음` and source `bottom-sheet`; that row represents the existing layout runtime anchor, not this Figma compound.
- Figma property names include generated IDs (`Con#9717:4`, `Show TitleBottomSheet#10037:0`). Code should expose stable, lowercase bridge names.
- `ActionButton=on` source uses title padding `32`; `ActionButton=off` source uses title padding `20`. Treat these as source measurements to reconcile in the layout/component contract, not permission for route-local overrides.
- The checked Figma source currently reports existing component-set errors when reading some nested icon variant properties. The main `Bottomsheet` component-set definitions and child structure were still readable.

### SVG Assets

SVG asset: not required for `Bottomsheet` itself.

Figma contains vector layers inside consumed dependencies such as `Icon / Size=24, Type=Close`, `ActionButton.LeftItem` AI/gift artwork, and `Tooltip` tail geometry. Those assets belong to their source components (`Icon`, `ActionButton.LeftItem`, `Tooltip`) and should not be added as Bottomsheet-owned SVG files.

### Validation

Documentation-only changes do not require app build checks.

When implementation changes are made, validate through the consuming app:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify:

- Figma `ActionButton=on/off` maps to a stable runtime composition without changing modal behavior.
- The root export uses the normalized component identity and bridge attributes for `bottomsheet`.
- `Con` slot content does not require route-level spacing compensation.
- `TitleBottomSheet` can be toggled independently from the sheet handle and action area.
- No new Bottomsheet-owned SVG asset is introduced.
