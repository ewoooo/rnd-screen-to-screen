# ListTextRightItem

Private right-side item preset set for `ListText`. This component mirrors the
Figma `RightItem` component set but stays scoped to the future `ListText`
implementation.

## Import

```tsx
import { ListTextRightItem } from "./ListTextRightItem";
```

The folder index is available for scoped/internal consumption:

```tsx
import { ListTextRightItem } from "@pxds/cx-components/components/list-text-right-item";
```

Do not promote this component through the root package export unless the
component vocabulary explicitly makes `ListText.RightItem` public.

## Usage

```tsx
<ListTextRightItem type="text" text="-3,000원" />
<ListTextRightItem type="badgeLevel" levels={["v", "g", "s"]} />
<ListTextRightItem type="textButton" text="-3,000원" />
<ListTextRightItem
	type="icon"
	ariaLabel="다음으로 이동"
	onClick={() => undefined}
/>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"text" \| "badgeLevel" \| "textButton" \| "icon"` | `"text"` | Normalized private preset type. |
| `text` | `string` | - | Label for `text` and `textButton`. |
| `levels` | `Array<"v" \| "g" \| "s">` | `["v", "g", "s"]` | Level badge order for `badgeLevel`. |
| `icon` | `"arrow-right"` | `"arrow-right"` | Icon preset for `icon`. |
| `onClick` | `() => void` | - | Makes `textButton` or `icon` own the action target. |
| `ariaLabel` | `string` | - | Required by type when interactive `icon` owns the action target. |
| `className` | `string` | - | Root element class name. |

Native `span` attributes are supported. `children` is not supported.

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="list-text-right-item"`
- `data-figma-property-type="Text" | "BadgeLevel" | "TextButton" | "Icon"`

`ListText` should own `data-figma-property-right-item` on the parent row.

## Visual Contract

- `Text`: text only, `14 med`, secondary text color.
- `TextButton`: text plus `Icon type="arrow-right" size={16}` with 2px gap.
- `Icon`: decorative arrow by default, or `IconButton` when `onClick` is present.
- `BadgeLevel`: Badge-composed circular `V/G/S` items, 14 x 14 with 4px gap.
