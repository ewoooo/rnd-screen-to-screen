# StatusBar

## Overview

Purpose: identify ownership, source, implementation files, and production status.

Figma SOT: [SKT_SDUI_Test_0512 / Component node](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9343-20390&t=wZRehc2DOVV8corW-1)

Parent inventory section: [SKT_SDUI_Test_0512 / Component base](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 완료 |
| Implementation Target | cx-components |
| Figma Source | status-bar |
| Dependencies | `_StatusBar-time` |
| Internal Parts | system indicators SVGs; `rightSide` slot |
| Variants | `State=Default` |
| Properties | 없음 |

### Implementation Files

- `packages/cx-components/src/components/status-bar/StatusBar.tsx`
- `packages/cx-components/src/components/status-bar/StatusBar.types.ts`
- `packages/cx-components/src/components/status-bar/status-bar.variants.ts`
- `packages/cx-components/src/components/status-bar/status-bar.css`
- `packages/cx-components/src/components/status-bar/index.ts`

## Structure

Purpose: define the target component structure and how Figma-only nodes normalize into code.

### Target Structure

```txt
StatusBar
├─ time text
└─ rightSide slot
   └─ DefaultSystemIndicators
      ├─ cellular SVG
      ├─ wifi SVG
      └─ battery SVG
```

`StatusBar` is a static mobile status-bar visual for screen previews. It does not connect to an OS status bar API.

### Component Consumption

| Consumed component | Used for | Current implementation |
| --- | --- | --- |
| `_StatusBar-time` | Figma source for the left time display | Code renders plain text through `time`; there is no public React dependency. |
| system indicators | Right-side cellular, Wi-Fi, and battery graphics | Code renders internal inline SVGs in `DefaultSystemIndicators`. |

### Figma Source Difference

Figma exposes `StatusBar` as a component set with one variant, `State=Default`. The variant component is a horizontal auto-layout frame sized `393 x 61` with `padding-left/right=24` and `padding-top/bottom=20`.

Compressed Figma source:

```txt
StatusBar
└─ State=Default
   ├─ Left Side
   │  └─ _StatusBar-time
   │     └─ 9:41
   ├─ Notch
   └─ Right Side
      ├─ Battery
      ├─ Wifi
      └─ Icon / Mobile Signal
```

Code does not render the Figma `Notch` group. It normalizes the screen preview status bar to the left time and right system indicators only.

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `StatusBar` | `StatusBar` | yes |
| `State=Default` | only visual state currently implemented | no, no public state prop |
| `_StatusBar-time` | `time` text prop, default `"9:41"` | no, Figma-only dependency |
| `Left Side` | left text region | no |
| `Notch` | not rendered in current code | no |
| `Right Side` | `rightSide` slot | no, slot only |
| `Battery`, `Wifi`, `Icon / Mobile Signal` | internal inline SVGs in `DefaultSystemIndicators` | no |

## Props

Purpose: define the public API and the current `data-figma` bridge contract.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `time` | `string` | `"9:41"` | Left time text. |
| `rightSide` | `ReactNode` | default indicators | Optional custom right-side content. |
| `className` | `string` | - | Additional class name on root. |

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| root render marker | `data-figma-render` | `"component"` |
| root component identity | `data-figma-component-id` | `"status-bar"` |

Current bridge level is component identity only. The code does not emit `data-figma-property-state`, `data-figma-property-time`, or any slot/property bridge for `rightSide`. Figma's only variant axis is `State=Default`, so there is no meaningful state prop to bridge today.

### Dependency Rules

- `_StatusBar-time` is a Figma-only/private dependency. It should not become a public React component unless multiple components need a reusable status-bar time primitive.
- Battery, Wi-Fi, cellular signal, and notch are internal Figma structure. In code, battery/Wi-Fi/cellular are inline SVG implementation details; notch is not currently rendered.
- `rightSide` is a code-level escape slot for preview customization. It is not a Figma component dependency and is not represented by a `data-figma-property-*` attribute.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { StatusBar } from "@pxds/cx-components";
```

### Examples

```tsx
<StatusBar />
<StatusBar time="10:24" />
<StatusBar time="10:24" rightSide={<CustomSystemIndicators />} />
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep one public `StatusBar` component.
- Keep `_StatusBar-time` as a Figma-only dependency in documentation, not as public component vocabulary.
- Keep the default system indicators internal to `StatusBar` unless a broader reusable icon contract is defined.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="status-bar"`.
- Use existing spacing and typography tokens in CSS: `--spacing-24`, `--spacing-8`, `--15-bold-font-size`, and semantic background/text colors.

### Don't

- Add a public state prop for `State=Default`.
- Promote `Battery`, `Wifi`, `Icon / Mobile Signal`, or `Notch` to public components from this source alone.
- Add `data-figma-property-*` attributes unless a real Figma property or variant is intentionally bridged.
- Add route/screen-local margin or padding to compensate for StatusBar placement.

### Normalization Notes

- Figma's `StatusBar` component set has a single variant: `State=Default`.
- Figma's `_StatusBar-time` instance has its own internal variants (`Dark Mode=False`, `Type=Default`), but the current React API exposes only the resulting text string through `time`.
- The code root height is `44px`; the Figma variant frame is `61px` high with vertical padding. This is an implementation difference to treat as current behavior, not a new spacing token.
- The code uses `justify-content: space-between` and `padding-inline: var(--spacing-24)` to mirror the left/right distribution of the Figma auto-layout frame.
- The right-side default indicators are inline SVGs and inherit `currentColor`.
- Dark mode is handled by `[data-theme="dark"] .cx-status-bar` and `.cx-status-bar[data-theme="dark"]`, not by a StatusBar prop.

### Validation

`@pxds/cx-components` currently has no package-local `lint` or `build` scripts. Validate through consuming app checks when StatusBar behavior changes.

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify the root DOM node includes:

- `data-figma-render="component"`
- `data-figma-component-id="status-bar"`

Verify the root DOM node does not claim unsupported bridge properties such as:

- `data-figma-property-state`
- `data-figma-property-time`
- `data-figma-property-right-side`
