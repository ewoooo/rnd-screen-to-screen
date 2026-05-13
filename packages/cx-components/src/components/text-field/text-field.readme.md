# TextField

CX text input component based on the Figma TextField master variants.

## Import

```tsx
import { TextField } from "@pxds/cx-components";
```

## API

```tsx
<TextField
  label="레이블"
  placeholder="텍스트를 입력하세요"
  helperText="Help Text"
/>
```

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `state` | `"default" \| "focused" \| "typing" \| "typed" \| "disabled"` | `"default"` | Figma `States` variant. `disabled` prop overrides this to `disabled`. |
| `error` | `boolean` | `false` | Figma `Error=on/off`. Applies critical background and label/helper color. |
| `label` | `string` | - | Figma `Label=on/off`. Renders a `Text` label connected to the input id. |
| `helperText` | `string` | - | Figma `HelpText=on/off`. Renders a `Text` helper connected with `aria-describedby`. |
| `actionButton` | `{ label: string; onClick?: () => void; disabled?: boolean }` | - | Figma inner `Button=on/off`. Renders the right-side row button. |
| `className` | `string` | - | Extra classes merged after the variant classes on the root. |

Native input props are supported: `value`, `defaultValue`, `placeholder`, `disabled`, `readOnly`, `name`, `id`, `type`, `inputMode`, `maxLength`, `onChange`, `onFocus`, and `onBlur`.

## Figma Variant Mapping

| Figma variant | React prop |
| --- | --- |
| `States=Default` | `state="default"` |
| `States=Focused` | `state="focused"` |
| `States=Typing` | `state="typing"` |
| `States=Typed` | `state="typed"` |
| `States=Disabled` | `state="disabled"` or `disabled` |
| `Error=on` | `error` |
| `Label=on` | `label` |
| `HelpText=on` | `helperText` |
| `Button=on` | `actionButton` |

## Examples

```tsx
<TextField
  label="레이블"
  placeholder="텍스트를 입력하세요"
  helperText="Help Text"
/>
```

```tsx
<TextField
  label="레이블"
  placeholder="텍스트를 입력하세요"
  helperText="Help Text"
  error
/>
```

```tsx
<TextField
  label="데이터"
  placeholder="데이터 용량 입력"
  actionButton={{ label: "모두 사용", onClick: handleUseAll }}
/>
```

```tsx
<TextField
  label="레이블"
  value="텍스트를 입력하세요"
  state="typed"
  onChange={handleChange}
/>
```

```tsx
<TextField
  label="레이블"
  placeholder="텍스트를 입력하세요"
  disabled
/>
```
