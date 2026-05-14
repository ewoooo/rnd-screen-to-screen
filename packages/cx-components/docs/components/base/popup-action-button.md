# PopupActionButton

## Overview

Purpose: document the private Popup action area before implementation.

Figma SOT: [SKT_SDUI_Test_0512 / base section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

Figma component node: [SKT_SDUI_Test_0512 / PopupActionButton](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9741-63266&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 예정 |
| Implementation Target | cx-components private |
| Figma Source | popup-action-button |
| Dependencies | Button |
| Internal Parts | 없음 |
| Variants | options: 2Buttons/1Button |
| Properties | 없음 |

### Implementation Files

No implementation files exist yet. `PopupActionButton` currently appears only in documentation and inventory references, and should be implemented as a Popup-internal scoped/private action area rather than exported as broad public vocabulary.

## Structure

Purpose: define the target component structure and normalize the Figma variants into code.

### Target Structure

```txt
PopupActionButton
├─ Button(secondary, large, fullWidth)  // secondary or single action
└─ Button(primary, large)               // primary action, only for options=2Buttons
```

### Component Consumption

| Consumed component | Used for | Target implementation |
| --- | --- | --- |
| `Button` | Popup action buttons | Render large `Button` instances inside the private action area. |

`PopupActionButton` is not a standalone action primitive. It is a layout contract owned by `Popup` for arranging one or two `Button` children.

### Figma Source Difference

Figma models this as a component set:

```txt
PopupActionButton
├─ Options=2Buttons
│  ├─ Button(Size=Large, Type=Secondary)
│  └─ Button(Size=Large, Type=Primary)
└─ Options=1Button
   └─ Button(Size=Large, Type=Secondary)
```

The inspected Figma layout uses a 361px-wide action area with top padding `spacing/12`, horizontal padding `spacing/24`, and an `spacing/8` gap only in the two-button option.

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `PopupActionButton` | private Popup action area | no |
| `Options=2Buttons` | two-button layout variant | no, Popup-scoped option |
| `Options=1Button` | single-button layout variant | no, Popup-scoped option |
| nested `Button` | `Button` | yes |

## Props

Purpose: define the private API and bridge contract.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `"2Buttons" \| "1Button"` | `"2Buttons"` | Selects the Figma action layout. |
| `primaryAction` | `{ label: string; onClick?: () => void; disabled?: boolean }` | - | Primary action. Required when `options="2Buttons"`. |
| `secondaryAction` | `{ label: string; onClick?: () => void; disabled?: boolean }` | - | Secondary or single action. Required for both options. |
| `className` | `string` | - | Additional class name on the private root, if needed by `Popup`. |

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| `options` | `data-figma-property-options` | `2Buttons` / `1Button` |

Inventory currently lists no explicit Figma properties. Add `data-figma-property-options` only if the bridge needs to preserve the component-set axis in DOM captures.

### Layout Contract

| Option | Button order | Button contract |
| --- | --- | --- |
| `2Buttons` | secondary first, primary second | Root has `padding-top: spacing/12`, `padding-inline: spacing/24`, `gap: spacing/8`. Secondary button fills remaining width; primary button keeps Button intrinsic large width. |
| `1Button` | secondary only | Root has `padding-top: spacing/12`, `padding-inline: spacing/24`, no gap. The single secondary button fills the available width. |

The action area should not invent Popup-specific button styles. Button color, radius, typography, height, and pressed/disabled states must come from `Button`.

## Usage

Purpose: show expected internal consumption.

### Import

```tsx
// Private/internal path TBD when Popup is implemented.
import { PopupActionButton } from "./PopupActionButton";
```

### Examples

```tsx
<PopupActionButton
  options="2Buttons"
  secondaryAction={{ label: "취소" }}
  primaryAction={{ label: "확인" }}
/>

<PopupActionButton
  options="1Button"
  secondaryAction={{ label: "확인" }}
/>
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep `PopupActionButton` private/scoped to `Popup`.
- Consume `Button` for every action.
- Use `Button size="large"` for all nested actions.
- Use `Button variant="secondary"` for the single action and the left action in `2Buttons`.
- Use `Button variant="primary"` for the right action in `2Buttons`.
- Preserve the Figma layout contract: `spacing/12` top padding, `spacing/24` inline padding, and `spacing/8` gap for `2Buttons`.
- Let `Popup` own when this action area is rendered.

### Don't

- Export `PopupActionButton` as general public component vocabulary.
- Add raw button colors, radius, typography, shadows, or disabled styles inside this component.
- Add route/screen-local margin or padding to compensate for Popup action spacing.
- Create separate `PopupActionButton1Button` or `PopupActionButton2Buttons` components.

### Normalization Notes

- Figma `Options=2Buttons` and `Options=1Button` normalize to the `options` prop.
- The Figma single-button option uses the secondary Button treatment.
- The Figma two-button option uses a full-width secondary action followed by an intrinsic-width primary action.
- The primary button shadow seen in Figma belongs to the `Button` primary large variant and should not be reimplemented here.

### Validation

When implementation is added, validate through consuming app checks.

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify:

- `PopupActionButton` is only consumed by `Popup` or Popup-local implementation.
- Nested actions are `Button` instances, not local button markup.
- `options="2Buttons"` renders exactly two actions with the documented order and gap.
- `options="1Button"` renders exactly one full-width secondary action.
- No SVG asset is introduced for this component.
