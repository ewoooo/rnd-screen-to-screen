# RadioButton

## Overview

Purpose: identify ownership, source, implementation files, and production status.

Figma SOT: [SKT_SDUI_Test_0512 / Component node](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9510-24484&t=wZRehc2DOVV8corW-1)

Provided review node: [SKT_SDUI_Test_0512 / base section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 완료 |
| Implementation Target | cx-components |
| Figma Source | radio-button |
| Dependencies | Text |
| Internal Parts | native `input[type="radio"]`; visual control span |
| Variants | Checked: On/Off; Text: Off/On; Disabled: Off/On |
| Properties | `data-figma-property-checked`: true/false; `data-figma-property-text`: true/false; `data-figma-property-disabled`: true/false |

### Implementation Files

- `packages/cx-components/src/components/radio-button/RadioButton.tsx`
- `packages/cx-components/src/components/radio-button/RadioButton.types.ts`
- `packages/cx-components/src/components/radio-button/radio-button.variants.ts`
- `packages/cx-components/src/components/radio-button/radio-button.css`
- `packages/cx-components/src/components/radio-button/index.ts`

## Structure

Purpose: define the target component structure and how Figma-only nodes normalize into code.

### Target Structure

```txt
RadioButton
├─ input[type="radio"]
├─ control
│  └─ dot? (checked=true)
└─ Text(label)?
```

The public component is a single `RadioButton`. It renders a native radio input for form behavior, a visual control span for the Figma radio mark, and an optional `Text` label.

### Component Consumption

| Consumed component | Used for | Current implementation |
| --- | --- | --- |
| `Text` | Optional visible label | `RadioButton.tsx` renders `Text variant="label"` when `label` is present. |

### Figma Source Difference

Figma exposes `RadioButton` as a component set with three variant axes:

- `Checked`: `On` / `Off`
- `Text`: `Off` / `On`
- `Disabled`: `Off` / `On`

The `Text=Off` variants are 18 x 18 controls. The `Text=On` variants are horizontal components with an 18 x 18 nested `RadioButton` instance plus a text node named `text`; the gap between the control and label is 8px in Figma.

Code does not keep the text-on wrapper as a separate public component. It normalizes the wrapper into the same `RadioButton` root and renders the label through `Text`.

Compressed Figma source:

```txt
RadioButton
├─ Checked=Off, Text=Off, Disabled=Off
│  └─ Radio
├─ Checked=Off, Text=Off, Disabled=On
│  └─ RadioButton / Radio
├─ Checked=On, Text=Off, Disabled=Off
│  └─ Radio / Ellipse 2
├─ Checked=On, Text=Off, Disabled=On
│  └─ Radio / Ellipse 2
├─ Checked=Off, Text=On, Disabled=Off
│  ├─ RadioButton instance
│  └─ text
├─ Checked=Off, Text=On, Disabled=On
│  ├─ RadioButton instance
│  └─ text
├─ Checked=On, Text=On, Disabled=Off
│  ├─ RadioButton instance
│  └─ text
└─ Checked=On, Text=On, Disabled=On
   ├─ RadioButton instance
   └─ text
```

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `RadioButton` component set | `RadioButton` | yes |
| `Radio` / `RadioButton` frame | `.cx-radio-button__control` | no |
| `Ellipse 2` | `.cx-radio-button__control::after` checked dot | no |
| `text` | `Text variant="label"` | yes, consumed dependency |
| `Checked=..., Text=..., Disabled=...` variants | `checked`, `label` presence, `disabled` props | no, variant states only |

## Props

Purpose: define the public API and the `data-figma-property-*` bridge contract.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `checked` | `boolean` | `false` | Controlled checked state. |
| `disabled` | `boolean` | `false` | Disables the native radio input and applies disabled visual state. |
| `label` | `string` | - | Optional visible label. Presence maps to the Figma `Text` variant. |
| `value` | `string` | - | Native radio value. |
| `name` | `string` | - | Native radio group name. |
| `onCheckedChange` | `(checked: boolean) => void` | - | Change callback called from the native input change event. |
| `className` | `string` | - | Additional class name on the root label. |

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| `checked` prop | `data-figma-property-checked` | `true` / `false` |
| `label` presence | `data-figma-property-text` | `true` / `false` |
| `disabled` prop | `data-figma-property-disabled` | `true` / `false` |

Figma uses `On/Off` variant values. The React bridge uses string booleans, so `Checked=On`, `Text=On`, and `Disabled=On` map to `"true"`; `Off` maps to `"false"`.

The bridge attributes can be passed explicitly through `RadioButtonFigmaBridgeProps`. When omitted, the component derives them from `checked`, `label`, and `disabled`.

### State Rules

- `checked=true` applies the checked visual state and shows the dot.
- `disabled=true` disables the native input and applies disabled control and label colors.
- `label` presence controls the text variant. Empty or missing `label` resolves to `data-figma-property-text="false"`.
- The root is a `label` element connected to the hidden native input by `htmlFor`.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { RadioButton } from "@pxds/cx-components";
```

### Examples

```tsx
<RadioButton name="auth" value="phone" label="휴대폰 인증" />
<RadioButton checked name="auth" value="pass" label="PASS 인증" />
<RadioButton disabled name="auth" value="store" label="매장 인증" />
<RadioButton checked name="auth" value="simple" />
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep one public `RadioButton` component.
- Use the native `input[type="radio"]` for form semantics.
- Use `Text` for the optional label.
- Keep the checked mark as an internal visual control, not a public icon or shape component.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="radio-button"`.
- Preserve the `data-figma-property-*` bridge attributes listed above.

### Don't

- Create separate public components for `Checked=On`, `Checked=Off`, `Text=On`, or disabled variants.
- Promote `Radio`, `Ellipse 2`, or the visual control span into public component vocabulary.
- Add screen-local margin or padding to compensate for RadioButton spacing.
- Treat Figma `On/Off` values as bridge output values; the actual code bridge emits `true/false`.

### Normalization Notes

- Figma `Text=On` variants are wrapper components that contain a nested textless `RadioButton` instance and a `text` node.
- Code flattens that wrapper into the same root label and renders `Text` only when `label` exists.
- Figma `Checked=On` variants show `Ellipse 2`; code represents it with `.cx-radio-button__control::after`.
- CSS uses semantic color, radius, and gap tokens; the control is fixed at 18 x 18.
- `data-checked`, `data-text`, and `data-disabled` mirror the resolved boolean states for DOM inspection, while `data-figma-property-*` is the Figma bridge contract.

### Validation

`@pxds/cx-components` currently has no package-local `lint` or `build` scripts. Validate through consuming app checks.

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify the root DOM node includes:

- `data-figma-render="component"`
- `data-figma-component-id="radio-button"`
- `data-figma-property-checked`
- `data-figma-property-text`
- `data-figma-property-disabled`

Verify the bridge resolves as:

- `checked=true` -> `data-figma-property-checked="true"`
- `label` present -> `data-figma-property-text="true"`
- `disabled=true` -> `data-figma-property-disabled="true"`
