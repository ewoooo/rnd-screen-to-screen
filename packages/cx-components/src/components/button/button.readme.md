# Button

CX action button입니다. ShadCN/Radix 스타일의 `asChild`와 cva variant mapping을 사용합니다.

## Import

```tsx
import { Button } from "@pxds/cx-components";
```

## Usage

```tsx
<Button>확인</Button>
<Button variant="secondary" size="large">다음</Button>
<Button disabled>비활성</Button>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"primary" \| "secondary" \| "disabled"` | `"primary"` | Visual variant. |
| `size` | `"small" \| "medium" \| "large" \| "xlarge"` | `"medium"` | Button size. |
| `disabled` | `boolean` | `false` | Native disabled state. |
| `fullWidth` | `boolean` | `false` | Expand to full width. |
| `asChild` | `boolean` | `false` | Render Radix Slot child instead of `button`. |
| `className` | `string` | - | Additional class name. |

Native `button` attributes are supported except `disabled`, which is controlled by this API.

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="button"`
- `data-figma-property-variant`
- `data-figma-property-size`
