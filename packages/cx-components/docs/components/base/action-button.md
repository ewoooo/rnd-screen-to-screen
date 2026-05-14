# ActionButton

## Overview

Purpose: define an implementation-ready contract for the Phase 5 high-level action area that combines contextual text, tooltip guidance, and one or two CTA buttons.

Figma SOT: [SKT_SDUI_Test_0512 / Component node](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9598-34265&t=wZRehc2DOVV8corW-1)

Figma checked node: `ActionButton` (`9598:34265`) under `Component / base`.

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 예정 |
| Implementation Target | cx-components candidate |
| Figma Source | action-button |
| Dependencies | Button, ActionButton.LeftItem, Tooltip, Icon, Text |
| Variants | Type: Default/Ai/Gift; Button: 1/2 |
| Properties | `data-figma-property-show-text`: boolean; `data-figma-property-show-tooltip`: boolean |

### Implementation Files

Not implemented yet. Expected in `@pxds/cx-components` if promoted from candidate to implementation:

- `packages/cx-components/src/components/action-button/ActionButton.tsx`
- `packages/cx-components/src/components/action-button/ActionButton.types.ts`
- `packages/cx-components/src/components/action-button/action-button.variants.ts`
- `packages/cx-components/src/components/action-button/action-button.css`
- `packages/cx-components/src/components/action-button/action-button.readme.md`
- `packages/cx-components/src/components/action-button/index.ts`

Existing dependency implementation to reuse:

- `packages/cx-components/src/components/action-button-left-item/ActionButtonLeftItem.tsx`
- `packages/cx-components/src/components/button/Button.tsx`
- `packages/cx-components/src/components/tooltip/Tooltip.tsx` when implemented

### Styling Contract

- Component CSS must not define component-local `--cx-*` custom properties.
- Consume theme-neutral aliases from `@pxds/cx-tokens/style.css` directly: prefer `--semantic-*` and `--component-*` tokens.
- Keep action-area padding, text-to-button gap, tooltip placement, and button-group gap owned by `ActionButton`.
- Route or screen styles must not compensate for the Figma `ActionButton` spacing.

## Structure

Purpose: normalize the Figma high-level CTA area while preserving the smaller component vocabulary.

### Target Structure

```txt
ActionButton
├─ Text/supporting content?       showText=true
├─ Tooltip?                       showTooltip=true
└─ action area
   ├─ Button / action[0]
   │  └─ ActionButton.LeftItem?   type=ai/gift
   └─ Button / action[1]?         buttonCount=2
```

Figma checked component set:

```txt
ActionButton (component set, 433 x 851)
├─ Type=Ai, Button=2
│  ├─ txt
│  └─ btn
├─ Type=Ai, Button=1
│  ├─ Tooltip
│  └─ Button + LeftItem(Type=Ai)
├─ Type=Gift, Button=1
│  ├─ Tooltip
│  └─ Button + LeftItem(Type=Ai+Gift)
├─ Type=Default, Button=1
│  ├─ Button
│  └─ Tooltip(hidden)
└─ Type=Default, Button=2
   ├─ Text
   └─ Buttons
      ├─ Button(secondary)
      └─ Button(primary)
```

### Layout Contract

| Field | Figma value | Token / implementation note |
| --- | --- | --- |
| Component set layout | vertical auto-layout, gap `32px`, padding `44px 20px` | Figma canvas arrangement only, not runtime root styling |
| Variant frame width | `393px` | source mobile viewport width; code should fill parent |
| Variant frame padding | left/right/top `12px`, bottom `40px` | action-area padding token contract |
| Variant content gap | `12px` | text/tooltip-to-button vertical gap |
| Single button width | `369px` | full-width inside 393px sample with 12px side padding |
| Button height | `56px` | use `Button size="xlarge"` |
| Two-button gap | `8px` | use approved spacing token equivalent |
| Tooltip height | `39px` sample | delegated to `Tooltip` |

### Component Consumption

| Consumed component | Used for | Notes |
| --- | --- | --- |
| `Button` | Primary/secondary CTA rendering | Use existing `Button`, normally `size="xlarge"`. |
| `ActionButton.LeftItem` | AI/Gift leading icon cluster | Use private scoped item for `type="ai"` and `type="gift"`. |
| `Tooltip` | Optional guidance above CTA | Pass content and direction through; do not duplicate bubble styling. |
| `Icon` | Indirectly through `ActionButton.LeftItem` and any future icon slot | `ActionButton` should not inline Figma vectors. |
| `Text` | Optional supporting text or price/summary row | Use existing text vocabulary or a constrained internal text layout. |

### Figma Source / Normalization

Figma exposes these component properties:

| Figma property | Type | Values / default |
| --- | --- | --- |
| `Type` | variant | `Default`, `Ai`, `Gift`; default `Ai` |
| `Button` | variant | `1`, `2`; default `2` |
| `ShowText#9598:13` | boolean | default `true` |
| `ShowTooltip#9719:0` | boolean | default `true` |

Code should normalize them to lowercase/public API values:

| Figma source | Code value |
| --- | --- |
| `Type=Default` | `type="default"` |
| `Type=Ai` | `type="ai"` |
| `Type=Gift` | `type="gift"` |
| `Button=1` | `buttonCount={1}` |
| `Button=2` | `buttonCount={2}` |
| `ShowText` | `showText` or derived from text presence |
| `ShowTooltip` | `showTooltip` or derived from tooltip presence |

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `ActionButton` component set | `ActionButton` root | yes, candidate |
| `txt` / `Text` frames | supporting text slot or structured summary row | no standalone public component |
| `Tooltip` instance | `Tooltip` | yes |
| `Button` instances | `Button` | yes |
| `Buttons` frame | internal button group | no |
| `LeftItem` instance | private `ActionButtonLeftItem` | no |
| `Button/AI`, `Button/Gift`, `Div` | owned by `ActionButton.LeftItem` | no |

## Props

Purpose: define the minimal public API and Figma bridge expectations.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"default" \| "ai" \| "gift"` | `"default"` | Maps to Figma `Type`. Controls whether the leading action item is rendered. |
| `actions` | `ActionButtonAction[]` | - | One or two CTA definitions rendered as `Button` components. |
| `buttonCount` | `1 \| 2` | derived from `actions.length` | Maps to Figma `Button`. Clamp to the supported range. |
| `text` | `ReactNode` | - | Optional supporting text region mapped from `ShowText`. |
| `showText` | `boolean` | derived from `text` presence | Forces the supporting text region on/off. |
| `tooltip` | `ReactNode` | - | Optional tooltip content mapped from `ShowTooltip`. |
| `showTooltip` | `boolean` | derived from `tooltip` presence | Forces the tooltip region on/off. |
| `tooltipDirection` | `"left" \| "center" \| "right"` | `"center"` | Passed to `Tooltip` when tooltip is shown. |
| `className` | `string` | - | Additional root class. |

`ActionButtonAction` should carry only button data:

| Field | Type | Description |
| --- | --- | --- |
| `label` | `ReactNode` | Button label. |
| `variant` | `"primary" \| "secondary" \| "disabled"` | Passed to `Button`. |
| `disabled` | `boolean` | Passed to `Button`. |
| `onClick` | `() => void` | Button click handler. |
| `leftItem` | `"ai" \| "ai-gift" \| false` | Optional private leading item override. |

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| component root | `data-figma-render` | `component` |
| component root | `data-figma-component-id` | `action-button` |
| `type` | `data-figma-property-type` | `default` / `ai` / `gift` |
| `buttonCount` | `data-figma-property-button` | `1` / `2` |
| resolved text visibility | `data-figma-property-show-text` | `true` / `false` |
| resolved tooltip visibility | `data-figma-property-show-tooltip` | `true` / `false` |

Figma uses display values `Default`, `Ai`, `Gift`; code emits lowercase bridge values.

### State Rules

- `actions.length` must be one or two. Extra actions should be rejected or ignored with a documented warning path during implementation.
- `buttonCount` is derived from `actions.length` unless explicitly provided for bridge capture.
- `type="default"` should not render `ActionButton.LeftItem` unless an action explicitly provides a `leftItem`.
- `type="ai"` defaults the primary action left item to `ActionButton.LeftItem type="ai"`.
- `type="gift"` defaults the primary action left item to `ActionButton.LeftItem type="ai-gift"`.
- `showTooltip=false` must hide tooltip content even when `tooltip` is provided.
- Empty text/tooltip regions should not reserve space unless Figma capture explicitly requires hidden-node parity.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { ActionButton } from "@pxds/cx-components";
```

### Examples

```tsx
<ActionButton
  type="default"
  text="이용 금액 1개월/7,900원"
  actions={[
    { label: "취소", variant: "secondary", onClick: handleCancel },
    { label: "구독하기", variant: "primary", onClick: handleSubmit },
  ]}
/>

<ActionButton
  type="ai"
  tooltip="56만원의 T 안심보상가 적용이 대기 중이에요!"
  actions={[
    { label: "맞춤 옵션 바로 선택하기", variant: "primary", onClick: handleSelect },
  ]}
/>

<ActionButton
  type="gift"
  tooltip="선물가 14,900원"
  actions={[
    { label: "구독하기", variant: "primary", onClick: handleSubscribe },
  ]}
/>
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Compose existing `Button`, `ActionButton.LeftItem`, `Tooltip`, and `Text` vocabulary.
- Keep one public `ActionButton` component with `type`, `buttonCount`, `showText`, and `showTooltip` resolved at the root.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="action-button"`.
- Preserve `data-figma-property-type`, `data-figma-property-button`, `data-figma-property-show-text`, and `data-figma-property-show-tooltip`.
- Keep button group layout inside this component so screens pass actions, not raw button rows.
- Use `Button size="xlarge"` for CTA buttons unless implementation confirms another approved size.
- Reuse `ActionButton.LeftItem` assets and variants for AI/Gift icon clusters.

### Don't

- Do not create separate public components for `ActionButtonDefault`, `ActionButtonAi`, or `ActionButtonGift`.
- Do not inline AI/Gift SVG vectors in `ActionButton`; use the existing scoped left-item component.
- Do not rebuild tooltip bubble visuals inside this component.
- Do not allow arbitrary button counts beyond the Figma `1` / `2` contract.
- Do not add route/screen-local padding, margin, or raw style to correct action-area placement.
- Do not make `Button` depend on `ActionButton`; dependency direction should remain from this compound to `Button`.

### Normalization Notes

- Inventory lists `ActionButton` as Phase 5 because it sits close to screen composition and depends on several stable smaller components.
- Figma node `9598:34265` is a component set with five visible variant components in the checked SOT.
- `ShowText#9598:13` and `ShowTooltip#9719:0` are boolean component properties; code should expose readable prop names without the Figma suffixes.
- The `Default, Button=2` source uses a summary text row and two button instances.
- The `Ai, Button=1` and `Gift, Button=1` sources use tooltip plus a primary xlarge button with a private left item.
- The `Ai, Button=2` source includes a custom `btn` layout in the Figma sample. Treat it as part of the same `buttonCount=2` action-area contract unless implementation reveals a separate reusable pattern.
- Exact typography for summary text and price fragments should be checked against `Text` tokens during implementation.

### SVG Assets

SVG asset: not required by `ActionButton` itself.

Use `ActionButton.LeftItem` for AI/Gift assets:

- `packages/cx-icons/src/action-button/ActionButton.LeftItem.AI.svg`
- `packages/cx-icons/src/action-button/ActionButton.LeftItem.Div.svg`
- `packages/cx-icons/src/action-button/ActionButton.LeftItem.Gift.svg`

### Validation

Documentation-only changes do not require app build checks.

When implementation changes are made, validate through the consuming app:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify:

- The root includes `data-figma-render="component"` and `data-figma-component-id="action-button"`.
- `type`, `buttonCount`, `showText`, and `showTooltip` map to documented bridge attributes.
- `actions.length=1` and `actions.length=2` both render without route-level layout fixes.
- `type="ai"` renders `ActionButton.LeftItem type="ai"` when a left item is needed.
- `type="gift"` renders `ActionButton.LeftItem type="ai-gift"` when a left item is needed.
- Tooltip visuals still come from `Tooltip` / `TooltipBubble`, not local action-button CSS.
