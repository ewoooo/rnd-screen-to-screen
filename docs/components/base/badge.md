# Badge

## Overview

Purpose: identify ownership, source, implementation files, and production status.

Figma SOT: [SKT_SDUI_Test_0512 / base section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

Component node: [Badge](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9411-9454&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 완료 |
| Implementation Target | cx-components |
| Figma Source | badge |
| Dependencies | 없음 |
| Internal Parts | 없음 |
| Variants | type: gray/blue/black |
| Properties | `data-figma-property-type`: gray/blue/black |

### Implementation Files

- `packages/cx-components/src/components/badge/Badge.tsx`
- `packages/cx-components/src/components/badge/Badge.types.ts`
- `packages/cx-components/src/components/badge/badge.variants.ts`
- `packages/cx-components/src/components/badge/badge.css`
- `packages/cx-components/src/components/badge/index.ts`

## Structure

Purpose: define the target component structure and how Figma-only nodes normalize into code.

### Target Structure

```txt
Badge
└─ text content
```

`Badge` is a compact inline label primitive. It renders one `span` root and does not consume another public component.

### Component Consumption

| Consumed component | Used for | Current implementation |
| --- | --- | --- |
| 없음 | - | `Badge.tsx` renders a native `span`. |

### Figma Source Difference

Figma models Badge as a component set with three `Type` variants and one text component property.

Compressed Figma source:

```txt
Badge
├─ Type=Gray
│  └─ Badge text
├─ Type=Black
│  └─ Badge text
└─ Type=Blue
   └─ Badge text
```

The Figma component set exposes:

- `Type`: `Gray` / `Blue` / `Black`
- `Text#9638:3`: text property, default `Badge`

Code normalizes `Type` to lowercase `type` values. Text is represented by `children` or the `text` prop, not by a current `data-figma-property-text` attribute.

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `Badge` component set | `Badge` | yes |
| `Type=Gray` | `type="gray"` | variant value |
| `Type=Black` | `type="black"` | variant value |
| `Type=Blue` | `type="blue"` | variant value |
| `Badge` text layer | `children ?? text` | no, content only |

## Props

Purpose: define the public API and the `data-figma-property-*` bridge contract.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"gray" \| "black" \| "blue"` | `"gray"` | Visual tone mapped from Figma `Type`. |
| `text` | `string` | `"Badge"` | Text fallback when `children` is absent. |
| `children` | `ReactNode` | - | Badge content. Overrides `text` when present. |
| `className` | `string` | - | Additional class name on root. |

Native `span` attributes are supported except `children` and `color`.

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| `data-figma-render` prop default | `data-figma-render` | `component` |
| resolved component id | `data-figma-component-id` | `badge` when `data-figma-render="component"` |
| `type` prop | `data-figma-property-type` | `gray` / `black` / `blue` |

Code also writes `data-type` with the resolved lowercase type for styling/debugging.

### Bridge Notes

- Figma variant values are `Gray`, `Blue`, and `Black`; code values are lowercase `gray`, `blue`, and `black`.
- Figma text property is named `Text#9638:3`, default `Badge`.
- Current code does not emit `data-figma-property-text`. Text is carried as DOM content through `children ?? text`.
- `docs/component-inventory.md` currently lists `data-figma-property-text`: text for Badge, but the implemented bridge attribute is `data-figma-property-type`.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { Badge } from "@pxds/cx-components";
```

### Examples

```tsx
<Badge text="필수" />
<Badge type="blue">혜택</Badge>
<Badge type="black" text="NEW" />
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep one public `Badge` component.
- Render as a native `span`.
- Use the existing `type` vocabulary: `gray`, `black`, `blue`.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="badge"`.
- Preserve `data-figma-property-type` with the resolved lowercase type.
- Use token-backed CSS variables from `badge.css` for color, radius, typography, and spacing.

### Don't

- Add dependencies on `Text` or other public components unless the implementation actually consumes them.
- Add route/screen-local styling to compensate for Badge spacing or color.
- Introduce new type values without first updating Figma mapping and `badge.variants.ts`.
- Document `data-figma-property-text` as implemented until code emits it.

### Normalization Notes

- Figma auto-layout uses horizontal hug sizing, center alignment, 8px left/right padding, 2px top/bottom padding, and 4px corner radius.
- Code mirrors the compact label shape with `inline-flex`, `width: fit-content`, token padding, token radius, and 10 medium typography tokens.
- Figma's `Type=Gray` fill maps to the gray CSS variant.
- Figma's `Type=Black` and `Type=Blue` use on-color text; code maps both to `--cx-badge-fg-on-color`.
- Dark theme values are handled through `[data-theme="dark"] .cx-badge` and `.cx-badge[data-theme="dark"]` CSS variable overrides.

### Validation

`@pxds/cx-components` currently has no package-local `lint` or `build` scripts. Validate through consuming app checks.

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify the root DOM node includes:

- `data-figma-render="component"`
- `data-figma-component-id="badge"`
- `data-figma-property-type`
- `data-type`
