# Icon

`@pxds/cx-components` does not implement Icon directly. It re-exports the Icon wrapper, types, color list, and registry helpers from `@pxds/cx-icons`.

## Import

```tsx
import { Icon } from "@pxds/cx-components";
```

## Usage

```tsx
<Icon type="arrow-left" size={24} />
<Icon type="close" size={24} aria-label="닫기" />
<Icon type="arrow-left" size={24} color="primary" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `IconType` | required | Normalized registry icon key from `@pxds/cx-icons`. |
| `size` | `40 \| 24 \| 20 \| 16 \| 12` | required | Public icon size in current code. |
| `color` | `IconColor` | - | Token color for recolorable icons only. |
| `alt` | `string` | - | Image alt text. Used in accessibility-name resolution. |
| `aria-label` | `string` | - | Accessible name. Takes precedence over `alt`. |
| `className` | `string` | - | Additional class name. |

If neither `aria-label` nor `alt` is provided, Icon is treated as decorative and defaults to `aria-hidden=true`.

The current Figma source includes `Size=32, Type=Logo`, but current public `IconSize` does not include `32`. Unsupported runtime lookups render `null` if a registry file cannot be resolved.

Icon does not emit Icon-specific `data-figma-*` bridge attributes.
