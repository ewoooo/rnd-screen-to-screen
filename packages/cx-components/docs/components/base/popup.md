# Popup

## Overview

Purpose: define the implementation-ready contract for the planned CX `Popup` component.

Figma SOT: [SKT_SDUI_Test_0512 / base section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

Component node checked in Figma: [Popup](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9741-62047&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 예정 |
| Implementation Target | cx-components |
| Figma Source | popup |
| Dependencies | Button, PopupActionButton, Text, IconButton |
| Variants | 없음 |
| Properties | `data-figma-property-contents`: slot; `data-figma-property-show-contents`: boolean; `data-figma-property-show-sub-text`: boolean |

### Implementation Files

Not implemented yet. Target files when implemented in `@pxds/cx-components`:

- `packages/cx-components/src/components/popup/Popup.tsx`
- `packages/cx-components/src/components/popup/Popup.types.ts`
- `packages/cx-components/src/components/popup/popup.variants.ts`
- `packages/cx-components/src/components/popup/popup.css`
- `packages/cx-components/src/components/popup/popup.readme.md`
- `packages/cx-components/src/components/popup/index.ts`

### Styling Contract

- Component CSS must not define component-local `--cx-*` custom properties.
- Consume theme-neutral aliases from `@pxds/cx-tokens/style.css` directly: prefer `--semantic-*` and `--component-*` tokens.
- Popup spacing, radius, text styles, and action spacing must be owned by `Popup` and `PopupActionButton`, not by route-level margin or padding.

## Structure

Purpose: preserve the Figma structure while normalizing the public API around title, optional sub text, optional content slot, and popup-scoped actions.

### Target Structure

```txt
Popup
├─ Text(title)
├─ Text(subText)?                 showSubText=true
├─ contents slot?                 showContents=true
├─ PopupActionButton
│  ├─ Button(secondary, large)
│  └─ Button(primary, large)?      actionOptions=2Buttons
└─ IconButton?                     only if close/dismiss affordance is confirmed
```

`Popup` owns the dialog surface and content order. Overlay dimming, page scroll lock, focus trap, portal target, and modal open state are app/runtime concerns unless the implementation explicitly introduces a higher-level modal wrapper.

### Component Consumption

| Consumed component | Used for | Contract |
| --- | --- | --- |
| `Text` | Title and sub text | Use the shared Text component for the two text layers. Do not create popup-local typography primitives. |
| `PopupActionButton` | Bottom action area | Keep action layout private/scoped to Popup and route all button rendering through `PopupActionButton`. |
| `Button` | Nested actions | Consumed through `PopupActionButton`. Popup should not duplicate Button styling. |
| `IconButton` | Optional close/dismiss affordance | Listed in inventory, but the checked Figma Popup node does not contain an IconButton layer or close icon. Do not render it by default unless the product contract requires a close affordance. |

### Figma Source Difference

Figma models `Popup` as one non-variant component:

```txt
Popup
├─ Title
│  └─ Text("타이틀")
├─ SubText
│  └─ Text("텍스트")
├─ Contents (slot)
└─ PopupActionButton
   ├─ Button(Size=Large, Type=Secondary)
   └─ Button(Size=Large, Type=Primary)
```

Figma component property definitions checked on node `9741:62047`:

| Figma property | Type | Default |
| --- | --- | --- |
| `Contents#9741:5` | Slot | - |
| `Show Contents#9741:6` | Boolean | `true` |
| `Show SubText#9741:7` | Boolean | `true` |

Figma measurements checked on the source node:

| Layer | Size | Layout | Spacing notes |
| --- | --- | --- | --- |
| `Popup` | 361 x 273 | vertical auto layout, fixed width | padding top/bottom `32`, radius `24`, white fill |
| `Title` | 361 x 26 | vertical auto layout | padding inline `32`, gap `4` |
| `SubText` | 361 x 49 | horizontal auto layout | padding left/right `32`, top `16`, bottom `12`, gap `4` |
| `Contents` | 361 x 74 | slot, vertical auto layout | padding inline `32`, top/bottom `16` |
| `PopupActionButton` | 361 x 60 | horizontal auto layout | padding inline `24`, top `12`, gap `8` for `2Buttons` |

Text styling from Figma:

| Layer | Text | Typography | Color |
| --- | --- | --- | --- |
| Title text | `타이틀` | Pretendard Variable Medium, `20`, line-height `130%`, letter-spacing `-5%` | `#05001A` |
| Sub text | `텍스트` | Pretendard Variable Medium, `16`, line-height `130%`, letter-spacing `-4%` | `#05001A` |

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `Popup` component | `Popup` | yes |
| `Title` frame | title text region | no |
| Title text layer | `Text` content | `Text` yes |
| `SubText` frame | optional sub text region | no |
| Sub text layer | `Text` content | `Text` yes |
| `Contents` slot | `children` / `contents` slot | slot only |
| `PopupActionButton` instance | private action area | no |
| nested `Button` instances | Popup actions | `Button` yes |

## Props

Purpose: define the public API and Figma bridge contract expected for implementation.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` | - | Required popup title. |
| `subText` | `ReactNode` | - | Optional supporting text below title. |
| `showSubText` | `boolean` | `Boolean(subText)` | Controls the sub text region and maps to Figma `Show SubText`. |
| `children` | `ReactNode` | - | Optional custom contents slot. |
| `showContents` | `boolean` | `Boolean(children)` | Controls the contents slot and maps to Figma `Show Contents`. |
| `actionOptions` | `"2Buttons" \| "1Button"` | `"2Buttons"` | Passed to `PopupActionButton`. |
| `primaryAction` | `{ label: string; onClick?: () => void; disabled?: boolean }` | - | Primary action. Required for `actionOptions="2Buttons"`. |
| `secondaryAction` | `{ label: string; onClick?: () => void; disabled?: boolean }` | - | Secondary action or single action. |
| `onClose` | `() => void` | - | Optional close handler only if an IconButton close affordance is added. |
| `className` | `string` | - | Additional class name on the popup surface. |

Native dialog/container attributes should be supported by the root surface when useful. Accessibility attributes such as `role`, `aria-modal`, `aria-labelledby`, and `aria-describedby` should be decided together with the overlay/runtime boundary.

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| default render metadata | `data-figma-render` | `component` |
| resolved component id | `data-figma-component-id` | `popup` |
| contents slot presence/name | `data-figma-property-contents` | slot marker or stable slot id |
| resolved `showContents` | `data-figma-property-show-contents` | `true` / `false` |
| resolved `showSubText` | `data-figma-property-show-sub-text` | `true` / `false` |
| action options | `data-figma-property-options` on `PopupActionButton` | `2Buttons` / `1Button` |

Normalize Figma property names to kebab-case bridge attributes. Figma uses `Show SubText`; DOM metadata should use `data-figma-property-show-sub-text`.

### State Rules

- Popup has no Figma variant axis.
- `Show SubText=false` removes the sub text region and should not leave route-local spacing compensation.
- `Show Contents=false` removes the contents slot and should not leave a blank content band.
- `actionOptions="2Buttons"` renders secondary then primary action through `PopupActionButton`.
- `actionOptions="1Button"` renders one full-width secondary action through `PopupActionButton`.
- Close/dismiss is not a Figma property on the checked Popup node. If added, treat it as an optional product/runtime affordance and use `IconButton` with an accessible label.

## Usage

Purpose: show expected consumer usage once Popup is implemented.

### Import

```tsx
import { Popup } from "@pxds/cx-components";
```

### Examples

```tsx
<Popup
  title="타이틀"
  subText="텍스트"
  secondaryAction={{ label: "취소" }}
  primaryAction={{ label: "확인" }}
/>
```

```tsx
<Popup
  title="타이틀"
  showSubText={false}
  actionOptions="1Button"
  secondaryAction={{ label: "확인" }}
>
  <Text>콘텐츠</Text>
</Popup>
```

```tsx
<Popup
  title="타이틀"
  subText="텍스트"
  showContents={false}
  secondaryAction={{ label: "나중에" }}
  primaryAction={{ label: "계속" }}
/>
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep styling wired to `--semantic-*` / `--component-*` aliases and do not reintroduce component-local `--cx-*` CSS variables.
- Implement one public `Popup` component.
- Consume `Text` for title and sub text.
- Consume `PopupActionButton` for the action area and let it consume `Button`.
- Preserve Figma property bridge attributes for contents, show-contents, and show-sub-text.
- Normalize boolean inputs before rendering children so hidden Figma regions do not leave extra spacing.
- Keep the surface layout tokenized: width, radius, padding, text spacing, and action spacing should come from the component contract.
- Decide overlay, portal, focus management, and escape/backdrop dismissal as an explicit runtime boundary before implementation.

### Don't

- Implement Popup by composing route-local divs, raw button markup, or screen-level padding fixes.
- Add separate public components for Popup title, sub text, contents, or action rows.
- Duplicate Button colors, shadows, radius, typography, or disabled states inside Popup CSS.
- Render an IconButton close control by default from inventory alone; the checked Figma node does not include one.
- Treat the `Contents` slot as an SVG or image asset.

### Normalization Notes

- `../../component-inventory.md` lists Popup as `제작 예정`; keep this document as a contract until implementation lands.
- Figma `Contents` is a slot property. Code should expose this as `children` or a named `contents` slot, with `children` preferred for React ergonomics.
- Figma `Show Contents` and `Show SubText` normalize to `showContents` and `showSubText`.
- The Figma source is a 361px surface with fixed width. Implementation may use responsive constraints, but it must preserve the same internal spacing relationships.
- Inventory lists `IconButton` as a dependency, but Figma node `9741:62047` has no icon, close, or vector layer. Treat IconButton as optional until a close affordance is confirmed.
- `PopupActionButton` is already documented as a private Popup action area; Popup should consume that contract instead of inventing a second action layout.

### SVG Assets

SVG asset: not required.

The checked Figma Popup node contains no vector, icon, or close asset layers. It uses text layers, a `Contents` slot, and a `PopupActionButton` instance. If a close affordance is added later, use the existing Icon/IconButton registry and only add an SVG asset if the required icon is missing from the registry.

### Validation

Documentation-only changes do not require app build checks.

When implementation changes are made, validate through the consuming app:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify the root DOM node includes:

- `data-figma-render="component"`
- `data-figma-component-id="popup"`
- `data-figma-property-show-contents`
- `data-figma-property-show-sub-text`

Verify:

- Title, sub text, contents, and action regions preserve the documented order.
- Hidden sub text or contents regions do not leave unused spacing bands.
- Action rendering is delegated to `PopupActionButton`.
- No new SVG asset is introduced for the checked Figma source.
