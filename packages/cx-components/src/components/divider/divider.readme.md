# Divider

CX foundation divider component for separating content, forms, lists, and sections.

## Import

```tsx
import { Divider } from "@pxds/cx-components";
```

## API

```tsx
<Divider type="contents" />
<Divider type="section" />
```

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"contents" \| "section"` | `"contents"` | Visual divider scale. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Divider direction. |
| `className` | `string` | - | Extra classes merged after the variant classes. |

Native `div` props are also supported. `Divider` does not accept children.

## Type Intent

| Type | Intent |
| --- | --- |
| `contents` | Thin separator for content-internal boundaries such as list rows, form groups, or compact item breaks. |
| `section` | Thicker separator for section-level boundaries between larger content blocks. |

## Examples

```tsx
<Divider type="contents" />
```

```tsx
<Divider type="section" />
```

```tsx
<Divider type="contents" orientation="vertical" className="custom-divider" />
```
