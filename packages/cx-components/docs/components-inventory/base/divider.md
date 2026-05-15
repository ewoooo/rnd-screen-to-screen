# Divider

## Overview

Purpose: identify ownership, source, implementation files, and production status.

Figma SOT: [SKT_SDUI_Test_0512 / base section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

Divider node: [Divider component set](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9510-26330&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 완료 |
| Implementation Target | cx-components |
| Figma Source | divider |
| Dependencies | 없음 |
| Internal Parts | 없음 |
| Variants | type: contents/section; orientation: horizontal/vertical |
| Properties | `data-figma-property-variant`: contents/section; `data-figma-property-orientation`: horizontal/vertical |

### Implementation Files

- `packages/cx-components/src/components/divider/Divider.tsx`
- `packages/cx-components/src/components/divider/Divider.types.ts`
- `packages/cx-components/src/components/divider/divider.variants.ts`
- `packages/cx-components/src/components/divider/divider.css`
- `packages/cx-components/src/components/divider/index.ts`

## Structure

Purpose: define the target component structure and how Figma-only nodes normalize into code.

### Target Structure

```txt
Divider
```

Divider is a leaf component. It renders a single `div` with no children.

### Component Consumption

| Consumed component | Used for | Current implementation |
| --- | --- | --- |
| 없음 | - | `Divider.tsx` renders only a native `div`. |

### Figma Source Difference

Figma models Divider as a component set with only one variant property, `Type`.

```txt
Divider
├─ Type=Contents 393x1
└─ Type=Section  393x4
```

Code keeps that thickness role as `type`, then adds `orientation` for runtime layout needs. The vertical orientation is code-owned; it is not a separate Figma variant in the current SOT.

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `Divider` component set | `Divider` | yes |
| `Type=Contents` | `type="contents"` | yes, variant value |
| `Type=Section` | `type="section"` | yes, variant value |
| inner `Divider` frame/rectangle | root `div` visual box | no |

## Props

Purpose: define the public API and the `data-figma-property-*` bridge contract.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"contents" \| "section"` | `"contents"` | Thickness role. `contents` renders 1px, `section` renders 4px. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout direction. Horizontal fills width; vertical fills height. |
| `role` | native `div` role | `"separator"` | Accessibility role for the divider element. |
| `className` | `string` | - | Additional class name on root. |
| native `div` props | `ComponentPropsWithoutRef<"div">` | - | Forwarded to the root `div`, except `children`. |

`children` is intentionally not supported.

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| `type` prop | `data-figma-property-variant` | `contents` / `section` |
| `orientation` prop | `data-figma-property-orientation` | `horizontal` / `vertical` |

The source Figma property is named `Type` with values `Contents` and `Section`. Current code emits lowercase bridge values from the React API: `contents` and `section`.

`data-figma-property-orientation` is emitted by code for runtime parity, even though the current Figma SOT does not expose an orientation variant.

### Variant Rules

- `type="contents"` maps to `cx-divider--contents` and sets thickness to 1px.
- `type="section"` maps to `cx-divider--section` and sets thickness to 4px.
- `orientation="horizontal"` maps to `cx-divider--horizontal`, `width: 100%`, and fixed height from thickness.
- `orientation="vertical"` maps to `cx-divider--vertical`, `height: 100%`, and fixed width from thickness.
- The root always sets `data-type` and `data-orientation` to the resolved values.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { Divider } from "@pxds/cx-components";
```

### Examples

```tsx
<Divider />
<Divider type="section" />
<Divider orientation="vertical" />
<Divider type="section" orientation="vertical" />
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep Divider as a leaf component with no children.
- Use the existing `type` values: `contents` and `section`.
- Use the existing `orientation` values: `horizontal` and `vertical`.
- Preserve root `role="separator"` by default.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="divider"`.
- Preserve `data-figma-property-variant` and `data-figma-property-orientation` with the resolved lowercase code values.
- Keep color sourced from divider CSS variables: `--component-light-list-cell-divider` and `--component-dark-list-cell-divider`.

### Don't

- Add child slots or content regions.
- Add route/screen-local margin, padding, or raw style to compensate for divider spacing.
- Create separate public components for `Contents` or `Section`.
- Add new thickness values without first recording the vocabulary expansion.
- Treat `orientation` as a Figma-authored variant until the SOT exposes it.

### Normalization Notes

- Figma has a `Type` variant axis only: `Contents` and `Section`.
- Code normalizes Figma `Type` into the public `type` prop.
- Code uses `data-figma-property-variant` for the normalized `type`, not `data-figma-property-type`.
- Code adds `orientation` because the same divider primitive must work in horizontal and vertical layouts.
- Visual thickness is tokenized in component CSS as local divider variables: 1px for contents and 4px for section.
- Divider has no component dependencies. Utilities such as `cn` and `class-variance-authority` are implementation helpers, not consumed components.

### Validation

`@pxds/cx-components` currently has no package-local `lint` or `build` scripts. Validate through consuming app checks when Divider changes affect runtime behavior.

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify the root DOM node includes:

- `role="separator"` by default
- `data-figma-render="component"`
- `data-figma-component-id="divider"`
- `data-figma-property-variant`
- `data-figma-property-orientation`
- `data-type`
- `data-orientation`
