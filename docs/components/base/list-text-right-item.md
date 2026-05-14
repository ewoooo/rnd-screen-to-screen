# ListText.RightItem

## Overview

Purpose: document the private right-side item set used by `ListText`.

Figma SOT: [SKT_SDUI_Test_0512 / Component node](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=10013-115199&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 예정 |
| Implementation Target | cx-components private |
| Figma Source | list-text-right-item |
| Dependencies | Icon, Text, IconButton, Badge |
| Variants | Type: Text/BadgeLevel/TextButton/Icon |
| Properties | 없음 |

### Implementation Files

No implementation files currently exist for `ListText` or `ListText.RightItem` in `packages/cx-components/src/components`.

`ListText.RightItem` is a Phase 2 private scoped item set. Keep it as an implementation detail of `ListText` unless the component vocabulary explicitly promotes it.

## Structure

Purpose: define the target component structure and how Figma-only nodes normalize into code.

### Target Structure

```txt
ListText
└─ rightItem?
   ├─ Text                                Type=Text
   ├─ level badges V/G/S                  Type=BadgeLevel
   ├─ Text + Icon(arrow-right, 16)         Type=TextButton
   └─ IconButton + Icon(arrow-right, 16)   Type=Icon
```

`ListText.RightItem` should be represented as a private preset union on `ListText`, not as a public exported component.

### Component Consumption

| Consumed component | Used for | Contract |
| --- | --- | --- |
| `Text` | `Text` and `TextButton` labels | Use the existing text component with the equivalent of Figma `14 med`; color follows `color/text/secondary`. |
| `Icon` | Arrow affordance in `TextButton` and `Icon` variants | Use `type="arrow-right"` and `size={16}`. The Figma stroke is low-emphasis; use the closest supported secondary/tertiary icon color token. |
| `IconButton` | Clickable icon-only right item | Wrap the `Icon` variant when it is interactive. Require `aria-label`. If the parent row owns the whole click target, render a decorative `Icon` instead. |
| `Badge` | Level badge vocabulary for `BadgeLevel` | Existing `Badge` is `gray/blue/black`; `BadgeLevel` needs a scoped level treatment for `V/G/S`. Prefer extending or composing through the Badge text contract rather than adding ad hoc inline circles in `ListText`. |

### Figma Source Difference

Figma exposes a component set named `RightItem` with one variant property:

```txt
RightItem
├─ Type=Text
│  └─ Text "-3,000원"
├─ Type=TextButton
│  ├─ Text "-3,000원"
│  └─ Icon Size=16, Type=ArrowRight
├─ Type=Icon
│  └─ Icon Size=16, Type=ArrowRight
└─ Type=BadgeLevel
   ├─ Badge V
   ├─ Badge G
   └─ Badge S
```

Figma measurements checked on the source node:

| Type | Size | Layout | Gap | Notes |
| --- | --- | --- | --- | --- |
| `Text` | 53 x 18 | horizontal hug | 2 | Text style `14 med`, semantic `color/text/secondary`. |
| `TextButton` | 71 x 18 | horizontal hug | 2 | Same text plus 16px `ArrowRight`. |
| `Icon` | 16 x 16 | horizontal hug | 2 | 16px `ArrowRight` only. |
| `BadgeLevel` | 50 x 16 | horizontal hug | 4 | Three 14px circular badges: `V`, `G`, `S`. |

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `RightItem / Type=Text` | `rightItem={{ type: "text", text }}` | no |
| `RightItem / Type=BadgeLevel` | `rightItem={{ type: "badgeLevel", levels }}` | no |
| `RightItem / Type=TextButton` | `rightItem={{ type: "textButton", text, ariaLabel }}` | no |
| `RightItem / Type=Icon` | `rightItem={{ type: "icon", ariaLabel }}` | no |
| Nested `Text` | `Text` component contract or equivalent tokenized text branch | `Text` yes, this item set no |
| Nested `Icon / ArrowRight` | `Icon type="arrow-right" size={16}` | `Icon` yes, this item set no |
| Nested badge letters `V/G/S` | Badge-owned level text content | `Badge` yes, SVG asset no |

## Props

Purpose: define the private preset API and Figma bridge contract.

### Props

```ts
type ListTextRightItem =
  | { type: "text"; text: string }
  | { type: "badgeLevel"; levels?: Array<"v" | "g" | "s"> }
  | { type: "textButton"; text: string; onClick?: () => void; ariaLabel?: string }
  | { type: "icon"; icon?: "arrow-right"; onClick?: () => void; ariaLabel?: string };
```

### Figma Mapping Props

| Figma Type | Suggested preset | Required values |
| --- | --- | --- |
| `Text` | `{ type: "text", text }` | Text only. |
| `BadgeLevel` | `{ type: "badgeLevel", levels }` | Default levels are `["v", "g", "s"]`. |
| `TextButton` | `{ type: "textButton", text, onClick, ariaLabel }` | Text plus trailing `arrow-right` icon. |
| `Icon` | `{ type: "icon", icon, onClick, ariaLabel }` | Default icon is `arrow-right`. |

There are no component-level Figma properties beyond the `Type` variant. `ListText` should expose right-item presence through its own `data-figma-property-right-item` bridge attribute.

### State Rules

- `Text` is display-only unless the parent `ListText` row owns interaction.
- `BadgeLevel` is display-only and defaults to `["v", "g", "s"]` when levels are omitted.
- `TextButton` becomes interactive only when `onClick` is provided; provide `ariaLabel` when the visible text does not fully describe the action.
- `Icon` renders as a decorative disclosure icon when the parent row is clickable; render through `IconButton` and require `ariaLabel` when the icon itself owns the click target.

## Usage

Purpose: show expected consumer usage through `ListText`.

### Import

```tsx
import { ListText } from "@pxds/cx-components";
```

### Examples

```tsx
<ListText title="이용 요금" rightItem={{ type: "text", text: "-3,000원" }} />

<ListText
  title="등급"
  rightItem={{ type: "badgeLevel", levels: ["v", "g", "s"] }}
/>

<ListText
  title="상세 내역"
  rightItem={{
    type: "textButton",
    text: "-3,000원",
    ariaLabel: "상세 내역 보기",
  }}
/>

<ListText
  title="다음"
  rightItem={{ type: "icon", ariaLabel: "다음으로 이동" }}
/>
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep `ListText.RightItem` private to `ListText`.
- Normalize Figma `Type` values to a private preset union.
- Use `Text` for text-bearing variants.
- Use `Icon type="arrow-right" size={16}` for both arrow variants.
- Use `IconButton` only when the icon itself is the action target.
- Route `BadgeLevel` through the Badge vocabulary or a Badge-owned level extension instead of route-local inline badge styling.
- Preserve `ListText` root bridge attributes, especially `data-figma-property-right-item`, when the parent component is implemented.

### Don't

- Export `ListText.RightItem` as public API from `@pxds/cx-components`.
- Create a new public `TextButton` dependency from this private Figma variant alone.
- Add raw screen-level margin, padding, or font-size overrides to make right items fit.
- Treat the nested vector letters inside `BadgeLevel` as icon assets.

### Normalization Notes

- Inventory lists this as a private `ListText` dependency; keep the contract attached to `ListText.rightItem`.
- Figma `RightItem` variants normalize to camel-case preset types: `text`, `badgeLevel`, `textButton`, and `icon`.
- `BadgeLevel` is a text contract, not an SVG/icon asset contract. The visible `V`, `G`, and `S` values should be rendered as badge text inside a Badge-owned level treatment.
- The checked Figma sizes are source measurements for parity, not permission to add route-local fixed sizing or spacing overrides.

### SVG Assets

SVG asset: not required.

Figma uses the existing `Icon / Size=16, Type=ArrowRight` component for arrow affordances. `BadgeLevel` shows vector letter shapes in Figma, but implementation should render `V`, `G`, and `S` as badge text inside the Badge-level contract rather than adding new SVG icon assets.

### Validation

Documentation-only changes do not require app build checks.

When implemented, validate through the consuming app checks:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify:

- `Text`, `TextButton`, `Icon`, and `BadgeLevel` render within the parent `ListText` row without shifting row spacing.
- `TextButton` and `Icon` use the registered `arrow-right` icon at 16px.
- Icon-only interactive usage has an accessible label.
- `BadgeLevel` does not introduce unregistered SVG assets or route-local badge styles.
