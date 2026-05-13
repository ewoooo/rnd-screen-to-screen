# Checkbox

단일 checkbox control입니다. Group composition은 별도 레이어에서 다룹니다.

## Import

```tsx
import { Checkbox } from "@pxds/cx-components";
```

## Usage

```tsx
<Checkbox label="동의합니다" />
<Checkbox checked label="선택됨" />
<Checkbox disabled label="비활성" />
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
- `data-figma-component-id="checkbox"`
- `data-figma-property-checked`
- `data-figma-property-text`
- `data-figma-property-disabled`
