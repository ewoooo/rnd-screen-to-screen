# RadioButton

단일 radio control입니다. RadioGroup composition은 별도 레이어에서 다룹니다.

## Import

```tsx
import { RadioButton } from "@pxds/cx-components";
```

## Usage

```tsx
<RadioButton name="auth" value="phone" label="휴대폰 인증" />
<RadioButton checked name="auth" value="pass" label="PASS 인증" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `checked` | `boolean` | `false` | Checked state. |
| `disabled` | `boolean` | `false` | Disabled state. |
| `label` | `string` | - | Optional visible label. |
| `value` | `string` | - | Input value. |
| `name` | `string` | - | Input name. |
| `onCheckedChange` | `(checked: boolean) => void` | - | Change callback. |
| `className` | `string` | - | Additional class name. |

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="radio-button"`
- `data-figma-property-checked`
- `data-figma-property-text`
- `data-figma-property-disabled`
