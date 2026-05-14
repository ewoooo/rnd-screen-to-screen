# Handle

## Overview

Purpose: define the bottom-sheet drag handle primitive as an implementation-ready candidate.

Figma SOT: [SKT_SDUI_Test_0512 / Component base](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

Component node: [Handle](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9672-26921&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 예정 |
| Implementation Target | cx-components candidate |
| Figma Source | handle |
| Dependencies | 없음 |
| Used by | Bottomsheet |
| Variants | state: Default/off |
| Properties | `data-figma-property-show-handle`: boolean |

### Implementation Files

No implementation file exists yet. Repository search found only this documentation file for `Handle`.

## Structure

Purpose: keep `Handle` as a small primitive with no child component dependency.

### Target Structure

```txt
Handle
└─ handle? (rounded visual bar)
```

### Figma Source

Figma places `Handle` in the `base` section as a component frame with two variants:

```txt
Handle (433 x 72 documentation frame)
├─ state=Default (393 x 32)
│  └─ handle (44 x 3 rounded bar)
└─ state=off (393 x 32)
```

The `Default` variant renders a centered visual bar. The `off` variant keeps the bottom-sheet top surface/radius context but does not render the bar.

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `Handle` | `Handle` | yes |
| `state=Default` | `state="default"` | yes, visual state |
| `state=off` | `state="off"` or `showHandle=false` | yes, hidden-handle state |
| `handle` | CSS-rendered rounded rect | no |

## Props

Purpose: define the public API and Figma bridge contract.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `showHandle` | `boolean` | `true` | Controls whether the visual bar is rendered. Maps to Figma `show-handle`. |
| `state` | `"default" \| "off"` | derived | Optional explicit visual state. Prefer deriving from `showHandle` unless Figma parity requires the named state. |
| `className` | `string` | - | Additional class name on root. |

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| `showHandle` | `data-figma-property-show-handle` | `true` / `false` |
| resolved visual state | `data-figma-property-state` | `Default` / `off` |

### State Rules

- `showHandle=true` resolves to Figma `state=Default`.
- `showHandle=false` resolves to Figma `state=off`.
- If both `state` and `showHandle` are accepted, normalize them before rendering so `state="off"` and `showHandle=false` produce the same DOM.
- `Handle` should not own drag behavior. Gesture, dismissal, and sheet state remain in the `Bottomsheet` / `BottomSheet` runtime.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { Handle } from "@pxds/cx-components";
```

### Examples

```tsx
<Handle />
<Handle showHandle={false} />
```

Inside `Bottomsheet`, render `Handle` near the sheet top before title/content regions when the sheet spec enables the handle.

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Implement the visible handle as a CSS box, not as an imported SVG.
- Use tokenized size, color, radius, and spacing values where available.
- Keep the root width compatible with mobile sheet content width; Figma variant width is `393px`.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="handle"`.
- Preserve `data-figma-property-show-handle` for Figma export parity.
- Treat `Handle` as a Phase 1 independent base candidate because `Bottomsheet` depends on it.

### Don't

- Add screen-local margin or padding to align the handle inside a route.
- Add drag logic, gesture handlers, or bottom-sheet lifecycle state to `Handle`.
- Promote the internal `handle` rectangle to standalone component vocabulary.
- Create a separate SVG asset for the 44 x 3 rounded bar.

### Bottomsheet Dependency

`Bottomsheet` lists `Handle` as a dependency because Figma models the grabber as a separate base component. Code should keep that relationship: `Bottomsheet` decides whether the handle region is present, while `Handle` owns only the visual primitive and bridge attributes.

### Validation

When implementation is added, validate through the consuming app checks:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify the root DOM node includes:

- `data-figma-render="component"`
- `data-figma-component-id="handle"`
- `data-figma-property-show-handle`
- `data-figma-property-state`

Verify `showHandle=false` renders no visible bar and matches Figma `state=off`.
