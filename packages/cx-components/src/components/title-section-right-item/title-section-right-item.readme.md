# TitleSectionRightItem

Private right-side item set for `TitleSection`. It mirrors the Figma
`TitleSection.RightItem` component set without promoting it to the package root
component vocabulary.

## Import

```tsx
import { TitleSectionRightItem } from "@pxds/cx-components/components/title-section-right-item";
```

The root `@pxds/cx-components` entry point is intentionally not the ownership
contract for this scoped item.

## Usage

```tsx
<TitleSectionRightItem
	type="icon"
	label="더보기"
	icon="more"
	onClick={handleClick}
/>

<TitleSectionRightItem
	type="textButton"
	text="Text"
	onClick={handleClick}
/>

<TitleSectionRightItem
	type="textItemButton"
	label="선택한 휴대폰 번호"
	value="3개"
	icon="arrow-right"
/>

<TitleSectionRightItem type="buttonListOrder" label="인기순" icon="dropdown" />
```

## Variants

| Figma Type | Prop `type` | Marker |
| --- | --- | --- |
| `Icon` | `"icon"` | `data-figma-property-right-item-type="icon"` |
| `TextButton` | `"textButton"` | `data-figma-property-right-item-type="text-button"` |
| `TextItemButton` | `"textItemButton"` | `data-figma-property-right-item-type="text-item-button"` |
| `ButtonListOrder` | `"buttonListOrder"` | `data-figma-property-right-item-type="button-list-order"` |

## Props

| Variant | Props |
| --- | --- |
| `icon` | `icon`, `label`, `onClick`, `disabled`, `className` |
| `textButton` | `text`, `onClick`, `disabled`, `className` |
| `textItemButton` | `label`, `value`, `icon`, `onClick`, `disabled`, `className` |
| `buttonListOrder` | `label`, `icon`, `onClick`, `disabled`, `className` |

`icon` accepts an `IconType` string or a prepared React icon element for the
`Icon` and `TextItemButton` variants. `ButtonListOrder` keeps the underlying
`ButtonListOrder` contract and accepts `IconType`.

## Bridge Attributes

The root item emits:

- `data-figma-render="primitive"`
- `data-figma-property-right-item-type`

Nested dependency components are rendered with `data-figma-render="ignore"` so
the private item set remains the Figma bridge boundary. The implementation
consumes `ButtonListOrder`, `Icon`, `IconButton`, `Button`, and `Text`.
