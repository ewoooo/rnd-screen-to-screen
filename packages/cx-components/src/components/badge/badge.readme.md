# Badge

작은 상태/분류 라벨을 표현하는 CX badge 컴포넌트입니다.

## Import

```tsx
import { Badge } from "@pxds/cx-components";
```

## Usage

```tsx
<Badge text="필수" />
<Badge type="blue">혜택</Badge>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"gray" \| "black" \| "blue"` | `"gray"` | Visual tone. |
| `text` | `string` | `"Badge"` | Text fallback when `children` is absent. |
| `children` | `ReactNode` | - | Badge content. |
| `className` | `string` | - | Additional class name. |

Native `span` attributes are also supported except `children` and `color`.

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="badge"`
- `data-figma-property-type`
