# Divider

콘텐츠 또는 섹션 경계를 표현하는 divider입니다.

## Import

```tsx
import { Divider } from "@pxds/cx-components";
```

## Usage

```tsx
<Divider />
<Divider type="section" />
<Divider orientation="vertical" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"contents" \| "section"` | `"contents"` | Divider thickness role. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Divider direction. |
| `className` | `string` | - | Additional class name. |

Native `div` attributes are supported. `children` is not supported.

## Bridge Attributes

- `data-node-kind="component"`
- `data-component-id="divider"`
- `data-figma-component="Divider"`
- `data-figma-variant`
