# Button

## Overview

Purpose: identify ownership, source, implementation files, and production status.

Figma SOT: [SKT_SDUI_Test_0512 / Button component node](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=10095-100382&t=wZRehc2DOVV8corW-1)

Figma section reference: [SKT_SDUI_Test_0512 / base section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 완료 |
| Implementation Target | cx-components |
| Figma Source | button |
| Dependencies | 없음 |
| Internal Parts | 없음 |
| Variants | variant: primary/secondary/disabled; size: small/medium/large/xlarge |
| Properties | `data-figma-property-variant`: primary/secondary/disabled; `data-figma-property-size`: small/medium/large/xlarge |

### Implementation Files

- `packages/cx-components/src/components/button/Button.tsx`
- `packages/cx-components/src/components/button/Button.types.ts`
- `packages/cx-components/src/components/button/button.variants.ts`
- `packages/cx-components/src/components/button/button.css`
- `packages/cx-components/src/components/button/index.ts`

## Structure

Purpose: define the target component structure and how Figma-only nodes normalize into code.

### Target Structure

```txt
Button
└─ children
```

`Button` is a visual action primitive. It renders a native `button` by default and can render a Radix Slot child when `asChild=true`.

### Component Consumption

| Consumed component | Used for | Current implementation |
| --- | --- | --- |
| 없음 | - | `Button.tsx` renders a native `button` or `Slot.Root`; it does not consume another design-system component. |

Runtime dependencies such as `radix-ui` `Slot.Root`, `class-variance-authority`, and token CSS are implementation dependencies, not component vocabulary dependencies.

### Figma Source Difference

Figma models `Button` as a component set with 12 variants:

```txt
Button
└─ Size={Small|Medium|Large|XLarge}, Type={Primary|Secondary|Disabled}
   ├─ Text("버튼")
   └─ LeftItem? (boolean property, hidden in inspected XLarge Primary instance)
```

Figma exposes `LeftItem#10150:15` as a boolean component property. Current code does not render a `leftItem` slot and `ButtonFigmaBridgeProps` does not include `data-figma-property-left-item`. Treat `LeftItem` as a Figma-only source detail for now, not as a current code dependency on `ActionButton.LeftItem`.

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `Button` | `Button` | yes |
| `Size` variant | `size` prop and `data-figma-property-size` | yes |
| `Type` variant | `variant` / `disabled` props and `data-figma-property-variant` | yes |
| text layer | `children` | no, content region |
| `LeftItem` | not rendered by current Button code | no, Figma-only detail |

## Props

Purpose: define the public API and the `data-figma-property-*` bridge contract.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"primary" \| "secondary" \| "disabled"` | `"primary"` | Visual variant. |
| `size` | `"small" \| "medium" \| "large" \| "xlarge"` | `"medium"` | Button size. |
| `disabled` | `boolean` | `false` | Native disabled state. Overrides `variant` to `disabled`. |
| `fullWidth` | `boolean` | `false` | Adds full-width styling. |
| `asChild` | `boolean` | `false` | Renders Radix `Slot.Root` instead of a native `button`. |
| `type` | native button `type` | `"button"` | Applied only when `asChild=false`. |
| `children` | `ReactNode` | - | Button label or child content. |
| `className` | `string` | - | Additional class name on root. |

Native `button` attributes are forwarded except `disabled`, which is controlled by this API.

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| resolved `variant` after disabled resolution | `data-figma-property-variant` | `primary` / `secondary` / `disabled` |
| `size` prop | `data-figma-property-size` | `small` / `medium` / `large` / `xlarge` |

The Figma source names these axes `Type` and `Size` with capitalized option values. Code normalizes them into lowercase bridge values:

| Figma property | Figma value | Code prop / bridge value |
| --- | --- | --- |
| `Type` | `Primary` | `primary` |
| `Type` | `Secondary` | `secondary` |
| `Type` | `Disabled` | `disabled` |
| `Size` | `Small` | `small` |
| `Size` | `Medium` | `medium` |
| `Size` | `Large` | `large` |
| `Size` | `XLarge` | `xlarge` |

### State Rules

- `disabled=true` overrides the visual variant and resolves `data-figma-property-variant` to `disabled`.
- `variant="disabled"` also resolves the root as disabled.
- When `asChild=false`, the root receives native `disabled`.
- When `asChild=true`, native `disabled` is omitted and disabled state is expressed with `aria-disabled=true`.
- `data-figma-property-variant` and `data-figma-property-size` can be passed explicitly, but default to the resolved code values.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { Button } from "@pxds/cx-components";
```

### Examples

```tsx
<Button>확인</Button>
<Button variant="secondary" size="large">다음</Button>
<Button disabled>비활성</Button>
<Button fullWidth size="xlarge">계속</Button>
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep one public `Button` component.
- Keep `variant` values limited to `primary`, `secondary`, and `disabled`.
- Keep `size` values limited to `small`, `medium`, `large`, and `xlarge`.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="button"`.
- Preserve `data-figma-property-variant` and `data-figma-property-size`.
- Use token CSS for color, radius, spacing, typography, and focus treatment.
- Use `disabled` resolution before writing `data-variant`, `data-disabled`, and Figma bridge attributes.

### Don't

- Add a public `LeftItem` or `leftItem` slot to Button solely because the Figma source exposes `LeftItem#10150:15`.
- Mark `ActionButton.LeftItem` as a current Button dependency unless code starts rendering it.
- Add ad hoc size, padding, radius, or font values outside the existing token/CVA contract.
- Add route/screen-local styling to compensate for Button spacing or state differences.

### Normalization Notes

- Figma `Type` normalizes to code `variant`.
- Figma `Size` normalizes to code `size`.
- Figma `LeftItem#10150:15` is currently outside the Button code contract. It may inform a future icon/compound button task, but it is not part of the implemented dependency graph.
- Current CSS defines size through `min-height`, horizontal padding tokens, and typography tokens.
- Current CSS defines disabled treatment through `.cx-button--disabled`, native `:disabled`, `aria-disabled`, and `data-disabled`.
- Current CSS includes pressed treatments for primary and secondary through `:active`.

### Validation

`@pxds/cx-components` currently has no package-local `lint` or `build` scripts. Validate through consuming app checks.

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify the root DOM node includes:

- `data-figma-render="component"`
- `data-figma-component-id="button"`
- `data-figma-property-variant`
- `data-figma-property-size`

Verify `disabled=true` forces:

- `data-figma-property-variant="disabled"`
- `data-variant="disabled"`
- `data-disabled`
