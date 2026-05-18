# Icon

## Overview

Purpose: identify ownership, source, implementation files, and production status.

Figma SOT: [SKT_SDUI_Test_0512 / Component node](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9677-26717&t=wZRehc2DOVV8corW-1)

Checked Figma base section: [SKT_SDUI_Test_0512 / base](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 완료 |
| Implementation Target | cx-components / cx-icons |
| Figma Source | icon |
| Dependencies | 없음 |
| Variants | Figma: Size 12/16/20/24/32/40; Type axis by icon glyph |
| Properties | 없음 |

### Implementation Files

- `packages/cx-components/src/components/icon/index.ts`
- `packages/cx-components/src/components/icon/icon.readme.md`
- `packages/cx-icons/src/components/Icon/Icon.tsx`
- `packages/cx-icons/src/components/Icon/index.ts`
- `packages/cx-icons/src/registry.ts`
- `packages/cx-icons/src/index.ts`
- `packages/cx-icons/src/originals/*.svg`

`Icon` is not implemented in `@pxds/cx-components`. `@pxds/cx-components` only re-exports the wrapper, types, color list, and registry helpers from `@pxds/cx-icons`.

## Structure

Purpose: define the target component structure and how Figma-only nodes normalize into code.

### Target Structure

```txt
Icon
└─ source SVG from @pxds/cx-icons registry
```

The source SVG originals live in `packages/cx-icons/src/originals`. The public React wrapper resolves the file through `getIconFile(type, size)`.

### Component Consumption

| Consumed component | Used for | Current implementation |
| --- | --- | --- |
| none | Icon is the leaf visual primitive | `@pxds/cx-icons` renders either `<img>` or a masked `<span>`. |

### Figma Source Difference

Figma models Icon as a component set with `Size` and `Type` variant axes. The checked Icon component set has 47 symbol children.

Compressed Figma source:

```txt
Icon
├─ Size=40, Type=Family/Data/Bill/Content/Device/Point
├─ Size=32, Type=Logo
├─ Size=24, Type=Close/Barcode/Shop/Menu/Home/AiSearch/ArrowLeft/history
├─ Size=20, Type=FamilyData/DataShare/Payment/Calender/RatePlan/All/Info/Voice/search
├─ Size=16, Type=ArrowUp/ArrowDown/ArrowRight/ArrowLeft/Terminal/MobilePlan/Benefit/Subscribe/youtube/netflix/TU/TW/money/percent/data/point/call/Dropdown/Plus
└─ Size=12, Type=Download/Bubble/Heart
```

Code normalizes Figma `Type` names to kebab-case registry keys:

- `ArrowLeft` -> `arrow-left`
- `AiSearch` -> `ai-search`
- `FamilyData` -> `family-data`
- `DataShare` -> `data-share`
- `MobilePlan` -> `mobile-plan`
- `RatePlan` -> `rate-plan`
- `Shop-1` is a code registry key for the second Figma `Type=Shop` source.

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `Icon` component set | `Icon` | yes |
| `Size`, `Type` variants | `size`, `type` props | yes |
| nested vector/image/union layers | source SVG internals | no |

## Props

Purpose: define the public API and the accessibility/registry contract.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `IconType` | required | Normalized registry icon key from `packages/cx-icons/src/registry.ts`. |
| `size` | `40 \| 24 \| 20 \| 16 \| 12` | required | Public `IconSize` in current code. |
| `color` | `IconColor` | - | Optional token color for recolorable icon types only. |
| `alt` | `string` | - | Accessible text for image rendering. Also contributes to decorative detection. |
| `aria-label` | `string` | - | Accessible name. Takes precedence over `alt` for `accessibleName`. |
| `aria-hidden` | `boolean` | derived | Explicit override for decorative/accessibility state. |
| `className`, `style`, native HTML attributes | React HTML attributes | - | Forwarded to the rendered `<img>` or `<span>`. `children` and native `color` are omitted. |

Current `IconColor` values:

```txt
primary, secondary, tertiary, disabled, brand, critical, on-brand
```

### Type And Size Contract

The current public `IconSize` excludes `32`, even though Figma contains `Size=32, Type=Logo` and the source registry keeps `Logo.svg` as a source size. Consumers cannot pass `size={32}` through the typed public API unless the code changes.

The registry builds a file entry for every public size for each icon type by falling back to the closest available source SVG. Because of that, a code-valid `type`/`size` pair normally resolves to an SVG even when Figma only authored that glyph at one source size.

Current code-recognized `IconType` keys:

```txt
ai-search, all, arrow-down, arrow-left, arrow-right, arrow-up, barcode,
benefit, bill, bubble, calender, call, close, content, data, data-share,
device, download, dropdown, family, family-data, heart, history, home,
info, logo, menu, mobile-plan, money, netflix, payment, percent, plus,
point, rate-plan, search, shop, shop-1, subscribe, terminal, tu, tw,
voice, youtube
```

Current recolorable icon types:

```txt
ai-search, all, arrow-down, arrow-left, arrow-right, arrow-up, barcode,
bubble, calender, close, data-share, download, dropdown, family-data,
heart, history, home, info, menu, payment, plus, rate-plan, search,
shop, shop-1, voice
```

`color` is type-allowed only for recolorable icon types. For recolorable icons with `color`, `Icon` renders a masked `<span>` with `backgroundColor: var(--semantic-light-color-text-${color})`. Otherwise it renders an `<img>`.

### Unsupported Combinations

- Unknown `type` values are rejected by TypeScript because `type` is `IconType`.
- Unknown `size` values, including `32`, are rejected by TypeScript because `size` is current `IconSize`.
- Runtime `getIconFile(type, size)` still guards against a missing registry file. If no file resolves, `Icon` returns `null`.
- Non-recolorable icon types reject `color` at the type level. If an invalid runtime value is forced, the component falls back to `<img>` rendering because the mask branch also checks `isRecolorableIconType(type)`.

### Accessibility Rules

- `accessibleName` is `aria-label ?? alt`.
- If `aria-label` and `alt` are both missing or empty, the icon is treated as decorative and defaults to `aria-hidden=true`.
- If `aria-label` or `alt` is present, the rendered node gets an accessible name.
- `<img>` rendering receives `alt={alt ?? ariaLabel ?? ""}` and forwards `aria-label`.
- Masked `<span>` rendering receives `role="img"` and `aria-label={accessibleName}`.

### Figma Mapping Props

There is no implemented Icon-specific Figma bridge prop type and no default `data-figma-*` attributes emitted by `Icon`.

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| `type` | none | Not emitted. |
| `size` | none | Not emitted. |
| `color` | none | Not emitted. |

Because `IconProps` extends React HTML attributes, callers may pass arbitrary `data-*` attributes manually, but this is ordinary DOM forwarding, not a documented Icon bridge contract.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { Icon } from "@pxds/cx-components";
```

Use `@pxds/cx-components` at app/component call sites. That import is a re-export from `@pxds/cx-icons`.

### Examples

```tsx
<Icon type="arrow-left" size={24} />
<Icon type="close" size={24} aria-label="닫기" />
<Icon type="arrow-left" size={24} color="primary" />
<Icon type="shop-1" size={24} />
```

For icon-only controls, put the accessible action label on the owning control:

```tsx
<IconButton aria-label="뒤로가기">
  <Icon type="arrow-left" size={24} />
</IconButton>
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep Icon implementation ownership in `@pxds/cx-icons`.
- Keep `@pxds/cx-components/src/components/icon/index.ts` as a re-export layer.
- Add new glyphs through `packages/cx-icons/src/originals` and `packages/cx-icons/src/registry.ts`.
- Normalize Figma `Type` names to kebab-case public keys.
- Use `color` only with `recolorableIconTypes`.
- Use `aria-label` or `alt` only when the icon itself needs an accessible name.
- Let decorative icons remain decorative by omitting both `aria-label` and `alt`.

### Don't

- Implement a separate Icon component inside `@pxds/cx-components`.
- Add Icon-specific `data-figma-property-*` bridge attributes unless the actual wrapper starts emitting them.
- Treat Figma vector, union, image, or mask layers as public component vocabulary.
- Document `size={32}` as supported by the public React API until `supportedIconSizes` includes `32`.
- Add route/screen-local spacing or wrapper styles to compensate for icon dimensions.

### Normalization Notes

- Figma has a `Size=32, Type=Logo` variant. Current code keeps a `logo` registry entry sourced from `Logo.svg`, but public `IconSize` does not expose `32`.
- The registry currently expands each icon to all public sizes using nearest-source fallback. This means the code API is broader than the exact Figma-authored size/type matrix.
- Figma has two `Size=24, Type=Shop` children. Code differentiates them as `shop` and `shop-1`.
- Figma uses mixed case values such as `TU`, `TW`, `Point`, and lower-case `youtube`. Code registry keys are lower-case/kebab-case.
- `Icon` is a leaf primitive. Parents such as `IconButton`, `AppBar`, and `TitleSection` own interaction semantics and layout.

### Validation

`@pxds/cx-components` currently has no package-local `lint` or `build` scripts. Validate through consuming app checks when code changes accompany icon work.

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

For docs-only updates, verify against:

- Figma Icon component set `9677:26717`
- `packages/cx-icons/src/registry.ts`
- `packages/cx-icons/src/components/Icon/Icon.tsx`
- `packages/cx-components/src/components/icon/index.ts`

Verify that no Icon-specific bridge attributes are documented as implemented unless code emits them.
