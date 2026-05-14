# TitleSection.RightItem

## Overview

Purpose: document the private right-side item set used by `TitleSection`, without promoting it to public component vocabulary.

Figma SOT: [SKT_SDUI_Test_0512 / RightItem node](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9743-33852&t=wZRehc2DOVV8corW-1)

Parent context checked in Figma: [SKT_SDUI_Test_0512 / base section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 예정 in inventory; current code has scoped preset support inside `TitleSection` |
| Implementation Target | cx-components private |
| Figma Source | title-section-right-item |
| Dependencies | ButtonListOrder, Icon, IconButton, Button, Text |
| Variants | Type: Icon/TextButton/TextItemButton/ButtonListOrder |
| Properties | 없음 |

### Implementation Files

No dedicated `TitleSection.RightItem` implementation file exists.

Current implementation lives inside:

- `packages/cx-components/src/components/title-section/TitleSection.tsx`
- `packages/cx-components/src/components/title-section/TitleSection.types.ts`
- `packages/cx-components/src/components/title-section/title-section.css`

## Structure

Purpose: define how the Figma-only item set normalizes into the `TitleSection.rightItem` preset contract.

### Target Structure

```txt
TitleSection.RightItem (private preset set)
├─ Icon
├─ TextButton
├─ TextItemButton
│  ├─ Text(label)
│  ├─ Text(value)
│  └─ Icon?
└─ ButtonListOrder
   ├─ Text(label)
   └─ Icon
```

This is not a standalone public React component. It is represented by the `rightItem` prop on `TitleSection`.

### Component Consumption

| Dependency | Contract type | Current implementation |
| --- | --- | --- |
| `ButtonListOrder` | Figma/source preset contract | `rightItem.type="buttonListOrder"` renders a local text-plus-icon button branch. No public `ButtonListOrder` import is used here. |
| `Icon` | Slot/preset input contract | Presets accept `ReactNode` icon content. `TitleSection` does not import `Icon`. |
| `IconButton` | Implementation-style contract | `rightItem.type="icon"` renders a native `<button>` using `cx-icon-button` classes, but does not import the `IconButton` component. |
| `Button` | Interaction semantics contract | Text and order variants render local native `<button>` elements. No public `Button` import is used here. |
| `Text` | Typography/source vocabulary contract | Text is rendered as spans/button text using typography tokens. No public `Text` import is used here. |

### Figma Source Difference

Figma exposes `RightItem` as a private component set under the `Title` area:

```txt
RightItem
├─ Type=Icon
├─ Type=TextButton
├─ Type=TextItemButton
└─ Type=ButtonListOrder
```

Code folds these variants into `TitleSectionRightItem` union objects and renders them through `renderRightItem()` inside `TitleSection.tsx`.

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `RightItem / Type=Icon` | `rightItem={{ type: "icon" }}` | no |
| `RightItem / Type=TextButton` | `rightItem={{ type: "textButton" }}` | no |
| `RightItem / Type=TextItemButton` | `rightItem={{ type: "textItemButton" }}` | no |
| `RightItem / Type=ButtonListOrder` | `rightItem={{ type: "buttonListOrder" }}` | no |
| Nested `Icon` | caller-supplied icon node | `Icon` yes, this item set no |
| Nested text | local text spans/button text | `Text` vocabulary contract only |

## Props

Purpose: document the private preset shapes and internal Figma markers.

### Props

`TitleSection.RightItem` is represented by `TitleSection`'s `rightItem` prop:

| Preset | Shape | Internal type marker |
| --- | --- | --- |
| Icon | `{ type: "icon"; icon: ReactNode; label?: string; onClick?: () => void }` | `data-figma-property-right-item-type="icon"` |
| TextButton | `{ type: "textButton"; text: string; onClick?: () => void }` | `data-figma-property-right-item-type="text-button"` |
| TextItemButton | `{ type: "textItemButton"; label: string; value: string; icon?: ReactNode; onClick?: () => void }` | `data-figma-property-right-item-type="text-item-button"` |
| ButtonListOrder | `{ type: "buttonListOrder"; label: string; icon?: ReactNode; onClick?: () => void }` | `data-figma-property-right-item-type="button-list-order"` |

Plain `ReactNode` right-item content is also allowed by `TitleSectionRightItem`, but it is treated as slot content and does not receive an internal item type marker.

### Figma Mapping Props

The parent `TitleSection` root owns the presence bridge:

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| `rightItem` presence | `data-figma-property-right-item` | `true` / `false` |

The right slot wrapper uses:

| Slot | Attribute |
| --- | --- |
| right-item | `data-figma-render="slot"` + `data-figma-property-name="right-item"` |

Preset-rendered right items use:

| Preset | Attribute |
| --- | --- |
| Icon | `data-figma-render="primitive"` + `data-figma-property-right-item-type="icon"` |
| TextButton | `data-figma-render="primitive"` + `data-figma-property-right-item-type="text-button"` |
| TextItemButton | `data-figma-render="primitive"` + `data-figma-property-right-item-type="text-item-button"` |
| ButtonListOrder | `data-figma-render="primitive"` + `data-figma-property-right-item-type="button-list-order"` |

### State Rules

Not applicable as an independent state model. `TitleSection.RightItem` is a private preset set rendered inside `TitleSection`; interaction state follows the local native button branches and the parent `TitleSection` contract.

## Usage

Purpose: show current consumer usage through `TitleSection`.

### Import

```tsx
import { TitleSection } from "@pxds/cx-components";
```

### Examples

```tsx
<TitleSection
  title="타이틀"
  rightItem={{
    type: "textButton",
    text: "Text",
    onClick: handleClick,
  }}
/>

<TitleSection
  title="타이틀"
  rightItem={{
    type: "textItemButton",
    label: "선택한 휴대폰 번호",
    value: "3개",
    icon: <Icon type="arrow-right" size={16} />,
  }}
/>

<TitleSection
  title="타이틀"
  rightItem={{
    type: "buttonListOrder",
    label: "인기순",
    icon: <Icon type="dropdown" size={16} />,
  }}
/>
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep `TitleSection.RightItem` private while Phase 2 treats it as a scoped item set.
- Document current behavior from `TitleSection` code when the dedicated file does not exist.
- Keep the four Figma variants normalized to `icon`, `textButton`, `textItemButton`, and `buttonListOrder`.
- Preserve the right slot bridge and the internal `data-figma-property-right-item-type` markers.
- Use existing component contracts before introducing new vocabulary.

### Don't

- Export `TitleSection.RightItem` as a public component from the current implementation.
- Create a dedicated file unless the component vocabulary explicitly changes.
- Treat `ButtonListOrder`, `IconButton`, `Button`, or `Text` as actual imports in current `TitleSection` implementation.
- Add custom spacing, font sizes, or screen-local compensation for this item set.

### Normalization Notes

- Inventory lists this as `제작 예정`, but `TitleSection` already has private scoped preset branches for all four Figma variants.
- `Icon` and `Text` are source/component vocabulary contracts in this context.
- `IconButton` and `Button` describe interaction semantics; current code renders native buttons and class hooks locally.
- `ButtonListOrder` is a source preset contract here. A standalone implementation is tracked separately and is not consumed by current `TitleSection`.
- Figma `Type=TextButton`, `Type=TextItemButton`, and `Type=ButtonListOrder` normalize to kebab-case internal markers: `text-button`, `text-item-button`, and `button-list-order`.
- Figma text samples checked: `Text`, `선택한 휴대폰 번호`, `3개`, and `인기순`.

### SVG Assets

SVG asset: not required.

The Figma variants use existing Icon vocabulary for arrow/dropdown-style glyphs. No new icon asset is implied by this item set.

### Validation

Documentation-only changes do not require app build checks.

When implementation changes are made, validate through the consuming app:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify preset-rendered item nodes include the applicable marker:

- `data-figma-property-right-item-type="icon"`
- `data-figma-property-right-item-type="text-button"`
- `data-figma-property-right-item-type="text-item-button"`
- `data-figma-property-right-item-type="button-list-order"`
