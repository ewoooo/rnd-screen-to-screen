# IconButton

아이콘 단독 액션 버튼입니다. AppBar 같은 chrome action slot에서 사용합니다.

## Import

```tsx
import { IconButton, Icon } from "@pxds/cx-components";
```

## Usage

```tsx
<IconButton aria-label="뒤로가기">
  <Icon type="arrow-left" size={24} />
</IconButton>
```

```tsx
<IconButton aria-label="닫기" disabled>
  <Icon type="close" size={24} />
</IconButton>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | required | Icon content. |
| `size` | `"small" \| "medium"` | `"medium"` | Touch target size. |
| `variant` | `"plain"` | `"plain"` | Visual variant. |
| `disabled` | `boolean` | `false` | Disabled state. |
| `aria-label` | `string` | required | Accessible action label. |
| `onClick` | `() => void` | - | Click handler. |
| `className` | `string` | - | Additional class name. |

## Bridge Attributes

- `data-node-kind="component"`
- `data-component-id="icon-button"`
