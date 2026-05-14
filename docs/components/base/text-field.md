# TextField

## Overview

Purpose: identify ownership, source, implementation files, and production status.

Figma SOT: [SKT_SDUI_Test_0512 / Component node](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9595-45900&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 완료 |
| Implementation Target | cx-components |
| Figma Source | text-field |
| Dependencies | Text; Button |
| Internal Parts | TextFieldInput |
| Variants | state: default/focused/typing/typed/disabled; error: on/off; button: off/on |
| Properties | `data-figma-property-state`: default/focused/typing/typed/disabled; `data-figma-property-error`: true/false; `data-figma-property-label`: true/false; `data-figma-property-help-text`: true/false; `data-figma-property-button`: true/false |

### Implementation Files

- `packages/cx-components/src/components/text-field/TextField.tsx`
- `packages/cx-components/src/components/text-field/TextFieldInput.tsx`
- `packages/cx-components/src/components/text-field/TextField.types.ts`
- `packages/cx-components/src/components/text-field/text-field.variants.ts`
- `packages/cx-components/src/components/text-field/text-field.css`
- `packages/cx-components/src/components/text-field/index.ts`

## Structure

Purpose: define the target component structure and how Figma-only nodes normalize into code.

### Target Structure

```txt
TextField
├─ Text(label)?
├─ TextFieldInput
│  ├─ Text Field
│  │  └─ input text / placeholder
│  ├─ Caret? (state=typing)
│  └─ Button(action)? (button=true)
└─ Text(helper)?
```

`TextFieldInput` is an internal implementation part. It renders the native input field and optional action button region.

### Component Consumption

| Consumed component | Used for | Current implementation |
| --- | --- | --- |
| `Text` | Label and helper text | `TextField.tsx` renders `Text as="label"` and `Text as="p"`. |
| `Button` | Optional trailing action | `TextFieldInput.tsx` renders `Button variant="secondary" size="large"`. |
| `TextFieldInput` | Input body and action region | Local implementation component, not public vocabulary. |

### Figma Source Difference

Figma repeats this structure across state/error variants and names the input body as `TextFieldDefault`, `TextFieldFocused`, `TextFieldTyping`, `TextFieldTyped`, and `TextFieldDisabled`.

Code does not create those as public components. They normalize into `TextFieldInput` visual state.

Compressed Figma source:

```txt
TextField
└─ States={Default|Focused|Typing|Typed|Disabled}, Error={off|on}, Label=on, HelpText=on
   ├─ Label
   ├─ TextField{State}
   │  └─ Text Field
   │     ├─ text / placeholder
   │     └─ Caret (Typing only)
   └─ Help Text
```

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `TextField` | `TextField` | yes |
| `TextField{State}` | `TextFieldInput` visual state | no |
| `Label` | `Text as label` | no, conditional region |
| `Text Field` | native input field wrapper | no |
| `Caret` | typing-state visual artifact | no |
| `ActionButton` / `Button` | `Button` inside `TextFieldInput` | yes |
| `Help Text` | `Text as helper` | no, conditional region |

## Props

Purpose: define the public API and the `data-figma-property-*` bridge contract.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `state` | `"default" \| "focused" \| "typing" \| "typed" \| "disabled"` | `"default"` | Visual state. |
| `error` | `boolean` | `false` | Error visual state. |
| `label` | `string` | - | Field label. |
| `helperText` | `string` | - | Helper or error text. |
| `actionButton` | `{ label: string; onClick?: () => void; disabled?: boolean }` | - | Optional trailing action button. |
| `value` / `defaultValue` | input value props | - | Native input value. |
| `placeholder` | `string` | - | Native placeholder. |
| `disabled` | `boolean` | `false` | Native disabled state. |
| `readOnly` | `boolean` | `false` | Native readonly state. |
| `name`, `id`, `type`, `inputMode`, `maxLength` | native input props | - | Forwarded to input. |
| `onChange`, `onFocus`, `onBlur` | native handlers | - | Forwarded to input. |
| `className` | `string` | - | Additional class name on root. |

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| `state` prop, after disabled resolution | `data-figma-property-state` | `default` / `focused` / `typing` / `typed` / `disabled` |
| `error` prop | `data-figma-property-error` | `true` / `false` |
| `label` presence | `data-figma-property-label` | `true` / `false` |
| `helperText` presence | `data-figma-property-help-text` | `true` / `false` |
| `actionButton` presence | `data-figma-property-button` | `true` / `false` |

Figma `Error=on/off` and `Button=on/off` normalize to bridge values `true/false`. Figma has `Label=on` and `HelpText=on` variant axes, but because the source only exposes `on`, code treats label/help text as presence-based bridge properties instead of standalone public variants.

### State Rules

- `disabled=true` overrides the visual state and resolves `state` to `disabled`.
- `error=true` overlays the error visual treatment on the resolved state.
- `state=typing` is the only Figma state that shows `Caret`; code does not need a public `Caret` component.
- `actionButton` presence controls the `button` variant and renders the local action button inside `TextFieldInput`.
- `label` and `helperText` are conditional text regions. They should not become public component vocabulary.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { TextField } from "@pxds/cx-components";
```

### Examples

```tsx
<TextField label="이름" placeholder="이름 입력" />
<TextField label="인증번호" helperText="유효시간 3분" />
<TextField actionButton={{ label: "확인" }} />
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep one public `TextField` component.
- Keep `TextFieldInput` as a local implementation component.
- Use `Text` for label and helper text.
- Treat the trailing action as `Button` vocabulary when normalizing the component structure.
- Fold Figma state-specific sets into `TextField` variants.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="text-field"`.
- Preserve the `data-figma-property-*` bridge attributes listed above.

### Don't

- Create public `TextFieldDefault`, `TextFieldFocused`, `TextFieldTyping`, `TextFieldTyped`, or `TextFieldDisabled` components.
- Create a public `Caret` component from this Figma structure.
- Promote `Label` or `Help Text` to standalone public components.
- Add route/screen-local styling to compensate for TextField spacing or state differences.

### Normalization Notes

- Figma models visual state using separate nested component sets: `TextFieldDefault`, `TextFieldFocused`, `TextFieldTyping`, `TextFieldTyped`, and `TextFieldDisabled`.
- Code keeps those as `TextField` variants through `state`, `error`, and `button`.
- In normalized structure, `TextFieldDefault`, `TextFieldFocused`, `TextFieldTyping`, `TextFieldTyped`, and `TextFieldDisabled` are not separate nodes. They are translated into `TextFieldInput` visual state.
- `TextFieldInput` exists as a local implementation component in `packages/cx-components/src/components/text-field/TextFieldInput.tsx`; it is not a separate public component vocabulary item.
- `Label` and `Help Text` are conditional regions, not standalone public component vocabulary.
- Label and helper text should consume `Text`.
- The optional action region consumes `Button` inside `TextFieldInput`.
- `Caret` is a typing-state visual artifact inside `TextFieldInput`. It should not become a public component unless a reusable cursor primitive is explicitly needed later.

### Validation

`@pxds/cx-components` currently has no package-local `lint` or `build` scripts. Validate through consuming app checks.

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify the root DOM node includes:

- `data-figma-render="component"`
- `data-figma-component-id="text-field"`
- `data-figma-property-state`
- `data-figma-property-error`
- `data-figma-property-label`
- `data-figma-property-help-text`
- `data-figma-property-button`

Verify `disabled=true` forces `data-figma-property-state="disabled"`.
