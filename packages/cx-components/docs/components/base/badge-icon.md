# BadgeIcon

## Overview

Purpose: define the compact icon-plus-badge compound for feature/category entry points, keeping badge placement and optional subtext consistent across screens.

Figma SOT: [SKT_SDUI_Test_0512 / BadgeIcon component node](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9740-53037&t=wZRehc2DOVV8corW-1)

Figma section reference: [SKT_SDUI_Test_0512 / Component base](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 예정 |
| Implementation Target | cx-components candidate |
| Figma Source | badge-icon |
| Dependencies | Icon, Badge |
| Internal Parts | subtext label |
| Variants | Subtext: Off/On |
| Properties | 없음 |

### Implementation Files

Not implemented yet. Expected files if this remains a standalone `@pxds/cx-components` candidate:

- `packages/cx-components/src/components/badge-icon/BadgeIcon.tsx`
- `packages/cx-components/src/components/badge-icon/BadgeIcon.types.ts`
- `packages/cx-components/src/components/badge-icon/badge-icon.variants.ts`
- `packages/cx-components/src/components/badge-icon/badge-icon.css`
- `packages/cx-components/src/components/badge-icon/badge-icon.readme.md`
- `packages/cx-components/src/components/badge-icon/index.ts`

### Styling Contract

- Component CSS must not define component-local `--cx-*` custom properties.
- Consume theme-neutral aliases from `@pxds/cx-tokens/style.css` directly: prefer `--semantic-*` and `--component-*` tokens.
- Icon size, badge offset, optional subtext typography, and gaps must be token-backed or recorded as token gaps before implementation.

## Structure

Purpose: define the target component structure and keep Figma-specific badge/icon placement out of screen code.

### Target Structure

```txt
BadgeIcon
├─ icon area
│  ├─ Icon
│  └─ Badge
└─ subtext?       Subtext=On
```

`BadgeIcon` owns the composition of a single icon and badge with optional supporting text. It should not own grid/list placement, navigation behavior, or page-level section spacing.

### Component Consumption

| Consumed component | Used for | Expected implementation |
| --- | --- | --- |
| `Icon` | Main pictogram | Use the existing icon registry and public icon size vocabulary. |
| `Badge` | Small label/status marker attached to the icon | Use existing `Badge` type/text vocabulary; do not duplicate badge styling. |

### Figma Source / Normalization

Figma exposes `BadgeIcon` as a component set with `Subtext: Off/On`.

```txt
BadgeIcon
├─ Subtext=Off
│  ├─ Icon
│  └─ Badge
└─ Subtext=On
   ├─ Icon
   ├─ Badge
   └─ subtext
```

Normalize the Figma axis to a boolean-style code prop: `showSubtext` or a derived `subtext` presence. Preserve the bridge value as `on` / `off` or `true` / `false` only after the Figma bridge convention for variant axes is chosen.

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `BadgeIcon` component set | `BadgeIcon` | yes |
| `Subtext=Off` | `showSubtext=false` | variant value |
| `Subtext=On` | `showSubtext=true` | variant value |
| nested icon instance | `Icon` | yes |
| nested badge instance | `Badge` | yes |
| subtext text layer | internal text label | no standalone component |

## Props

Purpose: define the public API and Figma bridge contract expected for implementation.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `ReactNode` | - | Main icon slot. Prefer passing `Icon` from `@pxds/cx-components` / `@pxds/cx-icons` vocabulary. |
| `iconType` | `IconType` | - | Convenience input for rendering a default `Icon`. Use only if the local icon typing is available. |
| `badge` | `ReactNode` | - | Badge slot. Prefer passing `Badge` or use `badgeText`/`badgeType`. |
| `badgeText` | `string` | - | Convenience text for rendering a default `Badge`. |
| `badgeType` | `BadgeType` | - | Convenience badge type mapped to the existing `Badge` component. |
| `subtext` | `ReactNode` | - | Optional supporting text below the icon/badge group. |
| `showSubtext` | `boolean` | derived from `subtext` presence | Figma `Subtext` variant resolver. |
| `className` | `string` | - | Additional class name on root. |

Prefer the explicit `icon` and `badge` slots for implementation flexibility. Convenience props should still render the same underlying `Icon` and `Badge` components.

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| `data-figma-render` prop default | `data-figma-render` | `component` |
| resolved component id | `data-figma-component-id` | `badge-icon` when `data-figma-render="component"` |
| resolved subtext state | `data-figma-property-subtext` | `off` / `on` |

The inventory lists no explicit properties, but `Subtext: Off/On` is a Figma variant axis. Emit the resolved subtext value if Figma export needs stable variant matching.

### State Rules

- `showSubtext=false` hides the subtext label and resolves to `Subtext=Off`.
- `showSubtext=true` renders the subtext label and resolves to `Subtext=On`.
- `subtext` presence may derive `showSubtext=true`; an explicit `showSubtext=false` must hide the region.
- Badge color/type state belongs to `Badge`; icon color/type state belongs to `Icon`.
- Interaction state belongs to the parent clickable item, not to `BadgeIcon` unless this component is later promoted to an interactive control.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { Badge, BadgeIcon, Icon } from "@pxds/cx-components";
```

### Examples

```tsx
<BadgeIcon
  icon={<Icon type="payment" size={40} />}
  badge={<Badge type="blue">NEW</Badge>}
/>

<BadgeIcon
  icon={<Icon type="benefit" size={40} />}
  badgeText="혜택"
  badgeType="black"
  subtext="멤버십"
/>
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep styling wired to `--semantic-*` / `--component-*` aliases and do not reintroduce component-local `--cx-*` CSS variables.
- Consume existing `Icon` and `Badge` components.
- Keep `BadgeIcon` as a presentational compound unless product requirements explicitly require a clickable root.
- Normalize Figma `Subtext=Off/On` to a boolean or lowercase code value.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="badge-icon"` if the bridge consumes component metadata.
- Keep badge placement internal to this component so screen code does not position the badge manually.

### Don't

- Inline badge visuals or create a second badge implementation.
- Add new icon assets unless the required icon is missing from the registry and documented through the icon process.
- Use route-local absolute positioning to align the badge.
- Promote the subtext layer to a new standalone typography component.
- Invent exact badge offsets or icon dimensions from memory; check Figma and token coverage during implementation.

### Normalization Notes

- Inventory places `BadgeIcon` in Phase 3 because it depends only on existing `Icon` and `Badge` foundations.
- `Subtext` is a composition variant, not a semantic state like selected or disabled.
- The optional subtext should not change the icon/badge internal alignment; it only adds the supporting label region.
- If later used inside navigation, keep navigation selection/press state in the parent item and pass only icon/badge/subtext content into `BadgeIcon`.

### SVG Assets

SVG asset: not required by the compound itself.

Use the existing `Icon` registry for the main icon and the existing `Badge` component for the badge. Add an SVG only when the requested `iconType` is absent from `@pxds/cx-icons` / `@pxds/pxds-icons` and the gap is documented separately.

### Validation

Documentation-only changes do not require app build checks.

When implementation is added, validate through the consuming app checks:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify the root DOM node includes, if bridge metadata is implemented:

- `data-figma-render="component"`
- `data-figma-component-id="badge-icon"`
- `data-figma-property-subtext="off"` or `data-figma-property-subtext="on"`
