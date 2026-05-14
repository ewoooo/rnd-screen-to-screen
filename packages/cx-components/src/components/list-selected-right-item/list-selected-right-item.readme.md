# ListSelectedRightItem

Private right-side affordance slot for `ListSelected`. It mirrors the Figma
`ListSelectedRightItem` component set and should stay scoped to the
`ListSelected` pattern.

## Import

Scoped/internal consumption:

```tsx
import { ListSelectedRightItem } from "@pxds/cx-components/components/list-selected-right-item";
```

Public screen code should prefer the parent `ListSelected` right-item preset
instead of importing this item directly.

## Usage

```tsx
<ListSelectedRightItem
	type="buttonXsmallSolid"
	label="받기"
	onClick={handleReceive}
/>
```

```tsx
<ListSelectedRightItem
	type="icon"
	iconType="arrow-right"
	ariaLabel="상세 보기"
	onClick={openDetail}
/>
```

```tsx
<ListSelectedRightItem type="textButton" label="Text" onClick={openAction} />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"buttonXsmallSolid" \| "icon" \| "textButton"` | `"buttonXsmallSolid"` | Selects the Figma `Type` variant. |
| `label` | `string` | `"받기"` for pill, `"Text"` for text button | Visible label for button/text variants. Used as an accessible fallback for an interactive icon. |
| `iconType` | `IconType` | `"arrow-right"` | Icon rendered by the `icon` variant. |
| `disabled` | `boolean` | `false` | Passed to interactive affordances. |
| `onClick` | `() => void` | - | Makes the affordance interactive. |
| `ariaLabel` | `string` | derived from `label` | Accessible label for icon-only interaction. |

Native `span` attributes are supported. `children` is not supported.

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="list-selected-right-item"`
- `data-figma-property-type="button-xsmall-solid" | "icon" | "text-button"`

## Visual Contract

- `buttonXsmallSolid`: delegates compact pill rendering to `ButtonXsmallSolid`.
- `icon`: renders `Icon type="arrow-right" size={16}` by default. With
  `onClick`, the icon is wrapped by `IconButton`; without `onClick`, it remains
  a decorative disclosure icon.
- `textButton`: delegates the text action to `TitleSectionRightItem`'s
  `textButton` vocabulary and keeps `Text` as the local typography reference.

`ListSelected` owns row padding, vertical rhythm, selected-control placement,
and right-item presence.
