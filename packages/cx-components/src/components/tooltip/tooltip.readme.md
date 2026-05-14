# Tooltip

Wrapper and positioning compound for `TooltipBubble`.

## Import

```tsx
import { Tooltip } from "@pxds/cx-components";
```

## Usage

```tsx
<Tooltip direction="left">선물가 14,900원</Tooltip>
<Tooltip direction="center" trigger={<button type="button">혜택 보기</button>}>
	선물가 14,900원
</Tooltip>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | required | Tooltip content passed to `TooltipBubble`. |
| `direction` | `"left" \| "center" \| "right"` | `"left"` | Direction variant forwarded to `TooltipBubble`. |
| `trigger` | `ReactNode` | - | Optional anchor slot for hover/focus visibility. |
| `open` | `boolean` | - | Controlled visibility when a trigger is provided. |
| `defaultOpen` | `boolean` | `false` | Initial uncontrolled visibility when a trigger is provided. |
| `className` | `string` | - | Additional root class name. |

Native `div` attributes are supported.

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="tooltip"`
- `data-figma-property-direction`
