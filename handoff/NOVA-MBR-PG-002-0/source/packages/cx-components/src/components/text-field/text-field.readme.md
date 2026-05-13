# TextField

Label, input, helper text, optional action button을 포함하는 text field compound입니다.

## Import

```tsx
import { TextField } from "@pxds/cx-components";
```

## Usage

```tsx
<TextField label="이름" placeholder="이름 입력" />
<TextField label="인증번호" helperText="유효시간 3분" />
<TextField actionButton={{ label: "확인" }} />
```

## Props

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

## Bridge Attributes

- `data-node-kind="component"`
- `data-component-id="text-field"`
- `data-figma-component="TextField"`
- `data-figma-state`
- `data-figma-error`
- `data-figma-label`
- `data-figma-help-text`
- `data-figma-button`
