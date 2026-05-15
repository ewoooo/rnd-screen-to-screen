# CheckBox

## Overview

Purpose: identify ownership, source, implementation files, and production status.

Figma SOT: [SKT_SDUI_Test_0512 / Component node](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9510-24752&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 완료 |
| Implementation Target | cx-components |
| Figma Source | checkbox |
| Dependencies | Text |
| Variants | checked: true/false; text: true/false; disabled: true/false |
| Properties | `data-figma-property-checked`: true/false; `data-figma-property-text`: true/false; `data-figma-property-disabled`: true/false |

### Implementation Files

- `packages/cx-components/src/components/checkbox/Checkbox.tsx`
- `packages/cx-components/src/components/checkbox/Checkbox.types.ts`
- `packages/cx-components/src/components/checkbox/checkbox.variants.ts`
- `packages/cx-components/src/components/checkbox/checkbox.css`
- `packages/cx-components/src/components/checkbox/index.ts`

Code component is `Checkbox`; Figma vocabulary keeps `CheckBox` spelling when discussing source designs.

## Structure

Purpose: define the target component structure and how Figma-only nodes normalize into code.

### Target Structure

```txt
Checkbox
├─ input[type="checkbox"]
├─ control
│  └─ check mark? (checked=true)
└─ Text(label)? (text=true)
```

The root element is a `<label>`. It owns the bridge attributes, visual variant classes, hidden native checkbox input, control box, and optional label text.

### Component Consumption

| Consumed component | Used for | Current implementation |
| --- | --- | --- |
| `Text` | Optional label text | `Checkbox.tsx` renders `Text variant="label"` when `label` exists. |

### Figma Source Difference

Figma exposes `CheckBox` as a component set with three variant axes: `Checked`, `Text`, and `Disabled`. Each axis uses `Off` / `On` values.

Code keeps the public API boolean-based. Figma `Off` / `On` values normalize to bridge values `false` / `true`.

Compressed Figma source:

```txt
CheckBox
└─ Checked={Off|On}, Text={Off|On}, Disabled={Off|On}
   ├─ CheckBox control
   │  └─ Vector check mark? (Checked=On)
   └─ text? (Text=On)
```

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `CheckBox` | `Checkbox` | yes |
| `CheckBox` control frame | `.cx-checkbox__control` | no |
| `Vector 27829` | CSS check mark pseudo-element | no |
| `text` | `Text variant="label"` | yes, consumed dependency |

## Props

Purpose: define the public API and the `data-figma-property-*` bridge contract.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `checked` | `boolean` | `false` | Controlled checked state. |
| `disabled` | `boolean` | `false` | Native disabled state and disabled visual treatment. |
| `label` | `string` | - | Optional label. Presence maps to the text variant. |
| `name` | `string` | - | Forwarded to the native checkbox input. |
| `value` | `string` | - | Forwarded to the native checkbox input. |
| `onCheckedChange` | `(checked: boolean) => void` | - | Called with the native input checked value on change. |
| `className` | `string` | - | Additional class name on root. |

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| `checked` prop | `data-figma-property-checked` | `true` / `false` |
| `label` presence | `data-figma-property-text` | `true` / `false` |
| `disabled` prop | `data-figma-property-disabled` | `true` / `false` |

The same resolved values are also mirrored as runtime/debug markers: `data-checked`, `data-text`, and `data-disabled`.

### State Rules

- `checked=true` renders the checked visual state and shows the CSS check mark.
- `label` presence sets `text=true`; empty or missing `label` sets `text=false`.
- `disabled=true` disables the native input, applies disabled styling, and keeps checked/unchecked state independent.
- Consumers may override bridge attributes through `data-figma-property-checked`, `data-figma-property-text`, and `data-figma-property-disabled`, but the default should stay derived from real props.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { Checkbox } from "@pxds/cx-components";
```

### Examples

```tsx
<Checkbox />
<Checkbox checked label="선택됨" />
<Checkbox disabled label="비활성" />
<Checkbox name="agreement" value="terms" onCheckedChange={setChecked} />
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep one public `Checkbox` component.
- Use the native `input[type="checkbox"]` for interaction and accessibility.
- Use `Text` for the optional label.
- Keep the visual control and check mark as implementation details.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="checkbox"`.
- Preserve the `data-figma-property-*` bridge attributes listed above.

### Don't

- Create separate public components for checked, unchecked, text, icon-only, enabled, or disabled variants.
- Promote the check mark vector to public `Icon` vocabulary.
- Add route/screen-local styling to compensate for Checkbox spacing or state differences.
- Convert Figma `On` / `Off` strings into public prop values.

### Normalization Notes

- Figma `Checked=On/Off`, `Text=On/Off`, and `Disabled=On/Off` normalize to code booleans.
- Code bridge values are `true` / `false`, matching `CheckboxFigmaBridgeProps`.
- The Figma text variant uses an 18px control and label row; code uses an 18px control and tokenized inline-flex gap.
- Figma text nodes named `text` are not standalone public nodes. They are rendered through `Text variant="label"`.
- Figma checked variants include a vector check mark. Code renders the mark with `.cx-checkbox__control::after`.

### Validation

`@pxds/cx-components` currently has no package-local `lint` or `build` scripts. Validate through consuming app checks.

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify the root DOM node includes:

- `data-figma-render="component"`
- `data-figma-component-id="checkbox"`
- `data-figma-property-checked`
- `data-figma-property-text`
- `data-figma-property-disabled`

Verify:

- `checked=true` produces `data-figma-property-checked="true"`.
- `label` presence produces `data-figma-property-text="true"`.
- `disabled=true` produces `data-figma-property-disabled="true"` and disables the native input.
