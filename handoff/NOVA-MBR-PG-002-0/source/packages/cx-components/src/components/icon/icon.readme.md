# Icon

`@pxds/cx-icons`를 `@pxds/cx-components`에서 재노출하는 icon component입니다.

## Import

```tsx
import { Icon } from "@pxds/cx-components";
```

## Usage

```tsx
<Icon type="arrow-left" size={24} />
<Icon type="close" size={24} aria-label="닫기" />
<Icon type="arrow-left" size={24} color="primary" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `IconType` | required | Registry icon key. |
| `size` | `12 \| 16 \| 20 \| 24 \| 32 \| 40` | required | Icon asset size. |
| `color` | `IconColor` | - | Token color for recolorable icons. |
| `alt` | `string` | `""` | Image alt text. |
| `aria-label` | `string` | - | Accessible name. |
| `className` | `string` | - | Additional class name. |

Unsupported `type`/`size` combinations render `null`.
