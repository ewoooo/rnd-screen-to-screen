# TooltipBubble

Figma `Tooltip` visual component에 대응하는 표시용 bubble입니다. Trigger, open state, delay 같은 동작은 포함하지 않습니다.

## Import

```tsx
import { TooltipBubble } from "@pxds/cx-components";
```

## Usage

```tsx
<TooltipBubble>선물가 14,900원</TooltipBubble>
<TooltipBubble direction="center">선물가 14,900원</TooltipBubble>
<TooltipBubble direction="right">선물가 14,900원</TooltipBubble>
```

## Figma Mapping

| Figma property | React prop |
| --- | --- |
| `Direction=Left` | `direction="left"` |
| `Direction=Center` | `direction="center"` |
| `Direction=Right` | `direction="right"` |

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="tooltip-bubble"`
- `data-figma-property-direction`
