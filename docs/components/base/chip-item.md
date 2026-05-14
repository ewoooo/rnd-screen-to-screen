# ChipItem

## Overview

Purpose: define the implementation-ready contract for the planned single chip item used by `Chips`.

Figma SOT: [SKT_SDUI_Test_0512 / base section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

Component node: [ChipItem](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9137-100675&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 예정 |
| Implementation Target | cx-components candidate |
| Figma Source | chip-item |
| Dependencies | Text |
| Variants | Selected: Off/On |
| Properties | 없음 |

### Implementation Files

No implementation file exists yet. A search for `ChipItem`, `chip-item`, and chip-named source files under `apps` and `packages` did not find a current implementation.

## Structure

Purpose: preserve the Figma structure while keeping the public vocabulary small.

### Target Structure

```txt
ChipItem
└─ Text(label)
```

### Component Consumption

| Consumed component | Used for | Requirement |
| --- | --- | --- |
| `Text` | Chip label | Use the shared Text component for typography. Do not create a chip-local text primitive. |

### Figma Source

```txt
ChipItem
├─ Selected=Off
│  └─ Text("단말기")
└─ Selected=On
   └─ Text("단말기")
```

Figma models `ChipItem` as a component set with one variant property: `Selected`. Each variant is an auto-layout pill containing only one text node.

### Visual Contract

| Selected | Container | Text |
| --- | --- | --- |
| `Off` | `57 x 41`, horizontal auto layout, padding `12`, radius `9999`, fill `#F4F5FA` | Pretendard Variable Medium, `13`, line-height `130%`, letter-spacing `-4%`, fill `#05001A` |
| `On` | `57 x 41`, horizontal auto layout, padding `12`, radius `9999`, fill `#3617CE` | Pretendard Variable SemiBold, `13`, line-height `130%`, letter-spacing `-4%`, fill `#FFFFFF` |

## Props

Purpose: define the public API and the Figma bridge contract.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | - | Chip label content. Prefer short text. |
| `selected` | `boolean` | `false` | Controls the selected visual state. |
| `onClick` | `() => void` | - | Optional press handler when used as an interactive chip. |
| `className` | `string` | - | Additional class name on the root, only for composition needs. |

### Figma Mapping Props

| Code source | Figma property | Bridge value |
| --- | --- | --- |
| `selected=false` | `Selected=Off` | `data-figma-property-selected="off"` |
| `selected=true` | `Selected=On` | `data-figma-property-selected="on"` |

Figma uses `Selected` values `Off` and `On`. Code should expose this as a boolean `selected` prop and normalize the bridge value to lowercase `off/on`.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { ChipItem } from "@pxds/cx-components";
```

### Examples

```tsx
<ChipItem>단말기</ChipItem>
<ChipItem selected>단말기</ChipItem>
<ChipItem selected={activeFilter === "device"} onClick={() => setActiveFilter("device")}>
  단말기
</ChipItem>
```

`Chips` should compose multiple `ChipItem` instances instead of recreating pill styling locally.

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Implement one public `ChipItem` component.
- Consume `Text` for the label.
- Keep `selected` as the only visual state axis.
- Use tokenized spacing, radius, color, and typography values instead of route-local padding or raw screen compensation.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="chip-item"`.
- Add `data-figma-property-selected="off|on"` on the root.

### Don't

- Create separate public `ChipItemOff` or `ChipItemOn` components.
- Add icon, badge, close button, or leading/trailing slots to this base component.
- Add a local typography primitive for the chip label.
- Let `Chips` reimplement the pill container styling.

### Normalization Notes

- `Selected=Off` is the default state.
- `Selected=On` changes the container fill and increases the label weight from medium to semibold.
- The Figma example text is `단말기`, but implementation must accept arbitrary short label content.
- The component has no child icons or vector layers, so no separate SVG asset is required.

### Validation

`ChipItem` is a Phase 1 independent base candidate. Validate through the consuming app once implemented:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify the root DOM node includes:

- `data-figma-render="component"`
- `data-figma-component-id="chip-item"`
- `data-figma-property-selected`
