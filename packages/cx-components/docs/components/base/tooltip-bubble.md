# TooltipBubble

## Overview

Purpose: document the visual-only tooltip bubble primitive and keep its Figma bridge contract aligned with the implementation.

Figma SOT: [SKT_SDUI_Test_0512 / Component base](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

Component node: [Tooltip](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9503-26998&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 완료 |
| Implementation Target | cx-components |
| Figma Source | tooltip-bubble / Tooltip visual component |
| Dependencies | 없음 |
| Internal Parts | bubble slot, tail slot |
| Variants | `direction`: left/center/right |
| Properties | `data-figma-property-direction`: left/center/right |

### Implementation Files

- `packages/cx-components/src/components/tooltip-bubble/TooltipBubble.tsx`
- `packages/cx-components/src/components/tooltip-bubble/TooltipBubble.types.ts`
- `packages/cx-components/src/components/tooltip-bubble/tooltip-bubble.variants.ts`
- `packages/cx-components/src/components/tooltip-bubble/tooltip-bubble.css`
- `packages/cx-components/src/components/tooltip-bubble/index.ts`

## Structure

Purpose: define the DOM and Figma slot structure for this visual component.

`TooltipBubble` is a behaviorless visual bubble. It does not own trigger wiring, open/close state, positioning, delay, focus management, escape handling, or accessibility tooltip semantics. A future `Tooltip` behavior component may compose it, but this component only renders the bubble body and the tail.

### Target Structure

```txt
TooltipBubble
├─ bubble slot
│  └─ children
└─ tail slot
   └─ decorative tail
```

### Current DOM Structure

```txt
div.cx-tooltip-bubble.cx-tooltip-bubble--{direction}
├─ div.cx-tooltip-bubble__bubble
│  └─ children
└─ div.cx-tooltip-bubble__tail-wrap
   └─ span.cx-tooltip-bubble__tail[aria-hidden="true"]
```

### Figma Source Difference

Figma names the component group `Tooltip` and exposes three direction variants:

```txt
Tooltip
├─ Direction=Left
│  ├─ Bubble
│  └─ Tail
├─ Direction=Center
│  ├─ Bubble
│  └─ Tail
└─ Direction=Right
   ├─ Bubble
   └─ Tail
```

Code keeps this as `TooltipBubble` to make the boundary explicit: the Figma visual layer maps to a bubble primitive, not to a full tooltip behavior contract.

### Node Mapping

| Figma node | Code structure | Notes |
| --- | --- | --- |
| `Tooltip / Direction=Left` | `TooltipBubble direction="left"` | Default direction. |
| `Tooltip / Direction=Center` | `TooltipBubble direction="center"` | Centers the tail slot. |
| `Tooltip / Direction=Right` | `TooltipBubble direction="right"` | Right-aligns the tail slot. |
| `Bubble` | `cx-tooltip-bubble__bubble` | Rounded text container. |
| `Tail` | `cx-tooltip-bubble__tail-wrap` | Slot wrapper that controls tail alignment. |
| `Union` tail shape | `cx-tooltip-bubble__tail` | CSS triangle, decorative and `aria-hidden`. |

## Props

Purpose: document the public React API and bridge-only attributes.

### Public Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | required | Bubble content. Current usage expects short, single-line text. |
| `direction` | `"left" \| "center" \| "right"` | `"left"` | Controls tail alignment under the bubble. |
| `className` | `string` | undefined | Appends classes to the root element. |
| native `div` props | `ComponentPropsWithoutRef<"div">` except `children` | undefined | Passed to the root element. |

### Bridge Attributes

| Attribute | Default | Description |
| --- | --- | --- |
| `data-figma-render` | `"component"` | Marks the root as a Figma-renderable component. |
| `data-figma-component-id` | `"tooltip-bubble"` | Stable component id for the Figma bridge. |
| `data-figma-property-direction` | resolved `direction` | Direction bridge property. Explicit values override the generated value. |
| `data-direction` | resolved `direction` | Runtime/debug attribute mirroring the selected direction. |

### Slot Attributes

| Element | Attributes | Description |
| --- | --- | --- |
| `cx-tooltip-bubble__bubble` | `data-figma-render="slot"`, `data-figma-property-name="bubble"` | Bridge slot for the visible bubble content. |
| `cx-tooltip-bubble__tail-wrap` | `data-figma-render="slot"`, `data-figma-property-name="tail"` | Bridge slot for the tail alignment region. |
| `cx-tooltip-bubble__tail` | `aria-hidden="true"` | Decorative CSS triangle. |

## Usage

Purpose: show accepted composition patterns without adding behavior.

```tsx
import { TooltipBubble } from "@pxds/cx-components";

export function Example() {
	return (
		<>
			<TooltipBubble>선물가 14,900원</TooltipBubble>
			<TooltipBubble direction="center">선물가 14,900원</TooltipBubble>
			<TooltipBubble direction="right">선물가 14,900원</TooltipBubble>
		</>
	);
}
```

Use `TooltipBubble` when a screen already knows that the bubble should be visible. Do not add trigger, portal, hover, click, focus, or positioning behavior here.

## Implementation Guide

Purpose: keep future changes inside the current token and component contract.

- Keep the component visual-only. Tooltip interaction belongs in a separate component or screen-level behavior.
- Preserve the root bridge defaults: `data-figma-render="component"` and `data-figma-component-id="tooltip-bubble"`.
- Keep `direction` as the only visual variant unless the Figma SOT adds another explicit property.
- Use the existing slot names, `bubble` and `tail`, because Figma bridge tooling depends on those names.
- Keep tail alignment in `cx-tooltip-bubble__tail-wrap`: left uses `flex-start`, center uses `center`, and right uses `flex-end`.
- Keep color, radius, typography, shadow, and spacing tied to existing tokens in `tooltip-bubble.css`; do not introduce raw route-level spacing overrides.
- The tail is decorative. Keep it hidden from assistive technology unless it becomes meaningful content.
