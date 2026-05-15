# TitleContents.RightItem

Private right-side preset renderer for `TitleContents`.

This component preserves the Figma private component-set variants while
normalizing runtime rendering to existing component vocabulary. It is scoped for
`TitleContents` composition and should not be promoted to the package root
public export unless the component vocabulary explicitly changes.

## Private Import

```tsx
import { TitleContentsRightItem } from "./title-contents-right-item";
```

## Usage

```tsx
<TitleContentsRightItem type="icon" label="접기" />
<TitleContentsRightItem type="type3" label="접기" />
<TitleContentsRightItem type="button" label="버튼" />
```

Interactive icon presets render through `IconButton`:

```tsx
<TitleContentsRightItem type="icon" label="접기" onClick={handleClick} />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"icon" \| "button" \| "type3"` | `"icon"` | Normalized private preset value. |
| `icon` | `"arrowUp"` | `"arrowUp"` | Icon preset for `icon` and `type3`. Maps to `Icon type="arrow-up" size={16}`. |
| `label` | `string` | `"버튼"` for button only | Accessible icon label or visible button label. |
| `onClick` | `() => void` | - | Makes icon presets render through `IconButton`; passed to `Button` for button presets. |
| `disabled` | `boolean` | `false` | Button preset disabled state only. |
| `className` | `string` | - | Additional root class name. |

Native `span` attributes are supported except `children` and native `type`,
because the visual structure is fixed by the private preset.

## Figma Mapping

| Code value | Figma variant |
| --- | --- |
| `type="icon"` | `Type=Icon` |
| `type="button"` | `Type=Button` |
| `type="type3"` | `Type=Type3` |

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="title-contents-right-item"`
- `data-figma-property-type="Icon" | "Button" | "Type3"`

Child rendering uses existing components:

- `Icon` for non-interactive `icon` and `type3`
- `IconButton` for interactive `icon` and `type3`
- `Button` with `size="small"` and `variant="secondary"` for `button`
