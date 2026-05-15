# Tooltip

## Overview

Purpose: define the wrapper and positioning compound that composes `TooltipBubble` without duplicating the bubble visual styling.

Figma SOT: [SKT_SDUI_Test_0512 / Tooltip node](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9503-26998&t=wZRehc2DOVV8corW-1)

Verified component set id: `9503:26998`

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 예정 |
| Implementation Target | cx-components candidate |
| Figma Source | tooltip |
| Dependencies | TooltipBubble |
| Variants | Direction: Left/Center/Right |
| Properties | 없음 |

### Implementation Files

Expected implementation in `@pxds/cx-components`:

- `packages/cx-components/src/components/tooltip/Tooltip.tsx`
- `packages/cx-components/src/components/tooltip/Tooltip.types.ts`
- `packages/cx-components/src/components/tooltip/tooltip.variants.ts`
- `packages/cx-components/src/components/tooltip/tooltip.css`
- `packages/cx-components/src/components/tooltip/tooltip.readme.md`
- `packages/cx-components/src/components/tooltip/index.ts`

### Styling Contract

- Component CSS must not define component-local `--cx-*` custom properties.
- Consume theme-neutral aliases from `@pxds/cx-tokens/style.css` directly: prefer `--semantic-*` and `--component-*` tokens.
- Do not duplicate `TooltipBubble` color, typography, radius, bubble padding, or tail drawing styles in `tooltip.css`.
- Keep wrapper styling limited to placement, visibility state hooks, anchor alignment, and interaction affordance when needed by the compound.

## Structure

Purpose: define how the Figma visual source normalizes into a wrapper component over `TooltipBubble`.

### Target Structure

```txt
Tooltip
├─ trigger slot
└─ TooltipBubble(direction)
   ├─ Bubble
   │  └─ text
   └─ Tail
      └─ Union tail
```

`Tooltip` owns composition and positioning. `TooltipBubble` owns the visual bubble body and tail.

### Figma Structure

```txt
Tooltip (116 x 39)
├─ Direction=Left
│  ├─ Bubble frame (116 x 34)
│  │  └─ text "선물가 14,900원"
│  └─ Tail frame (116 x 5)
│     └─ Union tail
├─ Direction=Center
│  ├─ Bubble frame (116 x 34)
│  └─ Tail frame (116 x 5)
└─ Direction=Right
   ├─ Bubble frame (116 x 34)
   └─ Tail frame (116 x 5)
```

Bubble padding is 12px horizontal and 8px vertical in the Figma SOT. That padding belongs to `TooltipBubble`; `Tooltip` must not restate it as wrapper padding.

### Component Consumption

| Consumed component | Used for | Notes |
| --- | --- | --- |
| `TooltipBubble` | Visible bubble and decorative tail | Pass the normalized `direction` value through. Do not copy bubble internals. |

### Node Mapping

| Figma node | Code structure | Notes |
| --- | --- | --- |
| `Tooltip / Direction=Left` | `Tooltip direction="left"` | Tail aligns to the left through `TooltipBubble`. |
| `Tooltip / Direction=Center` | `Tooltip direction="center"` | Tail aligns to the center through `TooltipBubble`. |
| `Tooltip / Direction=Right` | `Tooltip direction="right"` | Tail aligns to the right through `TooltipBubble`. |
| `Bubble` | `TooltipBubble` bubble slot | 116 x 34 in Figma source. |
| `Tail` | `TooltipBubble` tail slot | 116 x 5 in Figma source. |
| `Union` tail shape | `TooltipBubble` decorative tail | No extra asset is required in `Tooltip`. |

## Props

Purpose: define the planned public API and bridge expectations for the compound.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | required | Tooltip content passed to `TooltipBubble`. Current Figma text is `선물가 14,900원`. |
| `direction` | `"left" \| "center" \| "right"` | `"left"` | Maps to Figma `Direction` and is forwarded to `TooltipBubble`. |
| `trigger` | `ReactNode` | undefined | Optional anchor/trigger slot for interactive usage. |
| `open` | `boolean` | undefined | Optional controlled visibility state when behavior is included. |
| `defaultOpen` | `boolean` | `false` | Optional uncontrolled initial state when behavior is included. |
| `className` | `string` | undefined | Additional root class. |
| native `div` props | `ComponentPropsWithoutRef<"div">` except conflicting props | undefined | Passed to the root element. |

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| component root | `data-figma-render` | `component` |
| component root | `data-figma-component-id` | `tooltip` |
| direction variant | `data-figma-property-direction` | `left` / `center` / `right` |

Do not invent additional `data-figma-property-*` attributes until the Figma source adds properties beyond `Direction`.

## Usage

Purpose: show the expected composition while preserving the TooltipBubble boundary.

### Import

```tsx
import { Tooltip } from "@pxds/cx-components";
```

### Examples

```tsx
<Tooltip direction="left">선물가 14,900원</Tooltip>
<Tooltip direction="center">선물가 14,900원</Tooltip>
<Tooltip direction="right">선물가 14,900원</Tooltip>
```

With a trigger slot:

```tsx
<Tooltip trigger={<button type="button">혜택 보기</button>} direction="center">
	선물가 14,900원
</Tooltip>
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Implement `Tooltip` as a wrapper/positioning compound over `TooltipBubble`.
- Forward the `direction` variant to `TooltipBubble` instead of introducing separate bubble or tail variants.
- Keep `TooltipBubble` as the only dependency from the inventory contract.
- Keep root bridge identity as `data-figma-component-id="tooltip"` and expose only the documented direction property.
- Keep wrapper CSS focused on placement and state selectors; visual bubble styling remains in `tooltip-bubble.css`.
- Use `--semantic-*` / `--component-*` aliases for any wrapper-level color, shadow, size, or motion token that becomes necessary.
- Record any missing positioning or motion token as a token gap instead of adding component-local `--cx-*` variables.

### Don't

- Do not duplicate `TooltipBubble` padding, text style, background, border radius, tail shape, or tail alignment rules.
- Do not add new variants beyond `Direction=Left/Center/Right`.
- Do not add route-level margin, padding, or raw style corrections for tooltip alignment.
- Do not introduce another tail asset; the Figma `Union` tail is represented by `TooltipBubble`.
- Do not turn `Tooltip` into a general popover API unless a separate pattern contract is added.

### Normalization Notes

- The verified Figma SOT is component set `9503:26998`.
- Each Figma component variant is 116 x 39.
- The bubble frame is 116 x 34 and the tail frame is 116 x 5.
- The Figma sample content is `선물가 14,900원`.
- `Direction=Left/Center/Right` normalizes to code values `left`, `center`, and `right`.
- The inventory lists `TooltipBubble` as the only dependency, so implementation should compose the existing bubble primitive rather than rebuild it.

### Validation

Documentation-only changes do not require app build checks.

When implementation changes are made, validate through the consuming app:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify:

- The root emits only the documented Figma bridge attributes.
- The selected `direction` reaches `TooltipBubble`.
- Tooltip wrapper CSS contains no component-local `--cx-*` variable definitions.
- Bubble padding and tail styling still come from `TooltipBubble`.
