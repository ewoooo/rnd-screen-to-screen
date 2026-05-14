# ButtonTextUnderline

## Overview

Purpose: define the implementation-ready contract for the small text-only button candidate from Figma `Component / base`.

Figma SOT:

- [SKT_SDUI_Test_0512 / base section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)
- [SKT_SDUI_Test_0512 / ButtonTextUnderline node](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9861-77768&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 예정 |
| Implementation Target | cx-components candidate |
| Figma Source | button-text-underline |
| Dependencies | Text |
| Variants | 없음 |
| Properties | 없음 |

### Implementation Files

No implementation files currently exist for `ButtonTextUnderline`.

Expected files if this remains a standalone public component:

- `packages/cx-components/src/components/button-text-underline/ButtonTextUnderline.tsx`
- `packages/cx-components/src/components/button-text-underline/ButtonTextUnderline.types.ts`
- `packages/cx-components/src/components/button-text-underline/button-text-underline.css`
- `packages/cx-components/src/components/button-text-underline/index.ts`

## Structure

Purpose: normalize the Figma component into code vocabulary.

### Target Structure

```txt
ButtonTextUnderline
└─ Text
```

The Figma node is a component with horizontal auto layout and one text child:

- Root: `ButtonTextUnderline`, width `24`, height `17`, horizontal auto layout, center aligned, gap `12`, no padding.
- Child: `Text`, characters `Text`, Pretendard Variable Regular, `13px`, line-height `130%`, letter-spacing `-4%`, color `#05001a` / `semantic-light-color-text-secondary`.

### Component Consumption

| Consumed component | Used for | Notes |
| --- | --- | --- |
| `Text` | Visible label | Use the generated `text-13-reg` token class or add a named `Text` variant only if the typography vocabulary is being normalized. |

### Figma Source Difference

Although the component name says `Underline`, the inspected Figma text layer currently has `textDecoration: NONE` and there is no separate line/vector child. Treat this as a source gap to confirm before implementation.

If the product contract requires underline, implement it as CSS `text-decoration: underline` on the text label, not as an SVG or extra drawn line.

## Props

Purpose: define a minimal public API and Figma bridge contract.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | - | Button label. |
| `disabled` | `boolean` | `false` | Disables interaction and marks the control unavailable. |
| `asChild` | `boolean` | `false` | Optional composition escape hatch if matching the existing `Button` pattern. |
| `className` | `string` | - | Additional class name on root. |
| `onClick` | button handler | - | Native click handler. |

Native button props should be supported if this is implemented as a standalone button component.

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| root | `data-figma-render` | `component` |
| root | `data-figma-component-id` | `button-text-underline` |

Figma exposes no variant or property axes for this component, so no `data-figma-property-*` bridge attributes are required.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { ButtonTextUnderline } from "@pxds/cx-components";
```

### Examples

```tsx
<ButtonTextUnderline>Text</ButtonTextUnderline>
<ButtonTextUnderline onClick={handleClick}>자세히 보기</ButtonTextUnderline>
```

If absorbed into an existing primitive instead of becoming public API:

```tsx
<Button variant="textUnderline">자세히 보기</Button>
```

or:

```tsx
<Text as="button" variant="buttonTextUnderline">자세히 보기</Text>
```

## Implementation Guide

Purpose: constrain implementation decisions before adding a new public component.

### Do

- Confirm whether underline is visually required, because the current Figma text layer is not underlined.
- Preserve the compact intrinsic size: no root padding, no block-level width, no route-local spacing compensation.
- Render a semantic `button` by default if it performs an action.
- Use tokenized typography from `@pxds/cx-tokens`: `text-13-reg`.
- Use tokenized foreground color: `var(--semantic-light-color-text-secondary)` and dark-mode equivalent if CSS variables are needed.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="button-text-underline"` if a standalone component is added.

### Don't

- Add a new spacing token for this component.
- Add an SVG, icon, or separate underline asset.
- Recreate text styling with raw route/screen styles.
- Promote this to public API without comparing it against `TextButton` and `Button`.

### Relationship to Text and Button

Note: this component is text-only and action-like, so it sits between `Text`, `Button`, and the separate Figma `TextButton` candidate.

- As `Text`: feasible if the design system wants this to be a typography/action text variant. This would require a `Text` variant for `13-reg` action text, because current public `Text` variants do not expose `13-reg`.
- As `Button`: feasible if `Button` gains a text-only `textUnderline` variant. This keeps action semantics and native button behavior in the existing button API.
- As standalone `ButtonTextUnderline`: only justified if this exact treatment appears repeatedly as a named Figma component and should remain independently addressable in the Figma bridge.
- Compared with `TextButton`: `TextButton` is a larger `16px` semibold, on-brand text treatment with Default/Variant2 options. `ButtonTextUnderline` is a smaller `13px` regular secondary-text treatment. They should not be merged without a broader text-button taxonomy.

Recommended first implementation path: add a `Button` text-only variant or consolidate with the upcoming `TextButton` work, then keep `ButtonTextUnderline` as a Figma bridge alias only if export/import needs the exact component id.

### Validation

Validate through consuming app checks after implementation:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify the root DOM node includes:

- `data-figma-render="component"`
- `data-figma-component-id="button-text-underline"`

Confirm whether the final visual should include underline. If yes, verify the underline is CSS text decoration, not an added asset.
