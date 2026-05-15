# BadgeIcon

Compact icon-plus-badge compound for feature/category entry points.

## Import

```tsx
import { BadgeIcon } from "@pxds/cx-components";
```

## Usage

```tsx
<BadgeIcon icon={<Icon type="payment" size={40} />} badge={<Badge type="blue">NEW</Badge>} />

<BadgeIcon iconType="benefit" badgeText="혜택" badgeType="black" subtext="멤버십" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `ReactNode` | - | Main icon slot. |
| `iconType` | `IconType` | - | Convenience input for rendering `Icon` at 40px. |
| `badge` | `ReactNode` | - | Badge slot. |
| `badgeText` | `string` | - | Convenience text for rendering `Badge`. |
| `badgeType` | `BadgeType` | - | Existing `Badge` tone. |
| `subtext` | `ReactNode` | - | Optional supporting text below the icon group. |
| `showSubtext` | `boolean` | derived | Controls the Figma `Subtext` variant. |
| `className` | `string` | - | Additional class name. |

Native `span` attributes are also supported except `children` and `color`.

## Dependencies

- `Icon`
- `Badge`

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="badge-icon"`
- `data-figma-property-subtext="off|on"`
