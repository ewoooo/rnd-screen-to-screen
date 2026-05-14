# Indicator

Dot-style page/slide indicator primitive.

## Import

```tsx
import { Indicator } from "@pxds/cx-components";
```

## Usage

```tsx
<Indicator />
<Indicator count={3} activeIndex={1} ariaLabel="배너 위치" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `count` | `number` | `6` | Number of dots to render. Clamped to at least `1`. |
| `activeIndex` | `number` | `0` | Zero-based active dot index. Clamped to the rendered dot range. |
| `ariaLabel` | `string` | `"페이지 위치"` | Accessible label for the indicator group. |
| `className` | `string` | - | Additional class name on root. |

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="indicator"`
