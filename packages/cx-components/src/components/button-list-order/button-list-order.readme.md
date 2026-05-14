# ButtonListOrder

Compact inline action for choosing list ordering. It renders a label with the
shared dropdown icon and is intended for scoped use in `FilterSorting` and
`TitleSection.RightItem`, not as a generic button replacement.

The visual contract uses existing tokens for Figma's 14px bold / 130%
typography and `--spacing-2` for the 2px label-icon gap.

## Import

```tsx
import { ButtonListOrder } from "@pxds/cx-components";
```

## Usage

```tsx
<ButtonListOrder label="인기순" onClick={openSortSheet} />
<ButtonListOrder label="최신순" onClick={openSortSheet} />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `"인기순"` | Visible order label. |
| `icon` | `IconType` | `"dropdown"` | Trailing order affordance. Keep this as `dropdown` unless the design system adds another contract. |
| `onClick` | `() => void` | - | Opens an order menu or changes order state. |
| `disabled` | `boolean` | `false` | Disables the action. |
| `className` | `string` | - | Additional root class name. |

Native `button` attributes are supported except `children`, because the visual
structure is fixed to `label + Icon(type="dropdown", size=16)`.

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="button-list-order"`

No `data-figma-property-*` attributes are emitted because Figma has no variant
or component property axis for this source.
