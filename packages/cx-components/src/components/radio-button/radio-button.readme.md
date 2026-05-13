# RadioButton

CX RadioButton component based on the Figma `RadioButton` master component.

## Import

```tsx
import { RadioButton } from "@pxds/cx-components";
```

## API

```tsx
<RadioButton checked />
```

```tsx
<RadioButton
  label="텍스트"
  checked={false}
  onCheckedChange={setChecked}
/>
```

```tsx
<RadioButton label="텍스트" checked disabled />
```

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `checked` | `boolean` | `false` | Controls selected state. |
| `disabled` | `boolean` | `false` | Disables the native radio input and visual state. |
| `label` | `string` | - | Optional text label. When present, the label and input are clickable together. |
| `value` | `string` | - | Native radio value. |
| `name` | `string` | - | Native radio group name. |
| `onCheckedChange` | `(checked: boolean) => void` | - | Called from the native input change event. |
| `className` | `string` | - | Extra classes merged after variant classes. |

## Figma Mapping

| Figma variant/property | React prop |
| --- | --- |
| `Checked=On` | `checked={true}` |
| `Checked=Off` | `checked={false}` |
| `Text=On` | `label` is present |
| `Text=Off` | `label` is absent |
| `Disabled=On` | `disabled={true}` |
| `Disabled=Off` | `disabled={false}` |

## Notes

- Uses native `input type="radio"` for accessibility.
- Uses CSS for the selected indicator; no image asset is required.
- Implements only a single RadioButton. RadioGroup and SelectableList composition are separate components.
