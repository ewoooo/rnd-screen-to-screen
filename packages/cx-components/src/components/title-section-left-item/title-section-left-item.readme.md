# TitleSection.LeftItem

Private scoped item set for the leading slot in `TitleSection`.

This directory mirrors the Figma `LeftItem` component set, but it is not a root
public component vocabulary entry. Consumers should continue to pass left item
presets through `TitleSection` unless a scoped implementation imports this
private module directly.

## Import

```tsx
import { TitleSectionLeftItem } from "./components/title-section-left-item";
```

The module is intentionally private-scoped. It is not exported from the package
root or package subpath map until the integration session wires it in.

## Usage

```tsx
<TitleSectionLeftItem type="text" text="2" />
<TitleSectionLeftItem type="icon" iconType="information" label="안내" />
<TitleSectionLeftItem type="badge" text="Badge" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"text" \| "icon" \| "badge"` | `"text"` | Figma `Type` variant normalized to lowercase code values. |
| `text` | `string` | required for text/badge | Text or badge label. |
| `iconType` | `IconType` | required for icon | Existing `Icon` registry key. |
| `iconSize` | `IconSize` | `20` | Existing `Icon` size token. |
| `iconColor` | `IconColor` | - | Existing `Icon` color token for recolorable icons. |
| `label` | `string` | - | Accessible label for the icon preset. |
| `badgeType` | `BadgeType` | - | Existing `Badge` type. |
| `className` | `string` | - | Additional class name. |

Native `span` attributes are supported except `children` and native `color`.

## Figma Mapping

| Figma variant | React props | Bridge marker |
| --- | --- | --- |
| `Type=Text` | `{ type: "text", text }` | `data-figma-property-left-item-type="text"` |
| `Type=Icon` | `{ type: "icon", iconType, label }` | `data-figma-property-left-item-type="icon"` |
| `Type=Badge` | `{ type: "badge", text }` | `data-figma-property-left-item-type="badge"` |

The root item defaults to `data-figma-render="primitive"` because the parent
`TitleSection` owns the `left-item` slot and presence attribute.

## Dependencies

- `Text` renders the text preset.
- `Icon` renders the icon preset.
- `Badge` renders the badge preset.
