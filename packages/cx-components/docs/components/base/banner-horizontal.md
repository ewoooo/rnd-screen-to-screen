# BannerHorizontal

## Overview

Purpose: define the implementation-ready contract for the horizontal banner compound used near screen composition.

Figma SOT: [SKT_SDUI_Test_0512 / base section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

Component node checked in Figma: [BannerHorizontal](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9738-66701&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 예정 |
| Implementation Target | cx-components candidate |
| Figma Source | banner-horizontal |
| Dependencies | Indicator, Text, Icon, Button |
| Variants | 없음 |
| Properties | `data-figma-property-indicator`: boolean |

### Implementation Files

Planned implementation in `@pxds/cx-components`:

- `packages/cx-components/src/components/banner-horizontal/BannerHorizontal.tsx`
- `packages/cx-components/src/components/banner-horizontal/BannerHorizontal.types.ts`
- `packages/cx-components/src/components/banner-horizontal/banner-horizontal.variants.ts`
- `packages/cx-components/src/components/banner-horizontal/banner-horizontal.css`
- `packages/cx-components/src/components/banner-horizontal/banner-horizontal.readme.md`
- `packages/cx-components/src/components/banner-horizontal/index.ts`

### Styling Contract

- Component CSS must not define component-local `--cx-*` custom properties.
- Consume theme-neutral aliases from `@pxds/cx-tokens/style.css` directly: prefer `--semantic-*` and `--component-*` tokens.
- Preserve the Figma spacing contract through tokens: outer vertical gap `12`, card horizontal padding `24`, card vertical padding `16`, text stack gap `4`, and card radius `24`.
- Treat the banner artwork as content supplied to the component. Do not convert one Figma sample image into a hardcoded implementation asset.

## Structure

Purpose: define the target component structure and how Figma-only sample content normalizes into code.

### Target Structure

```txt
BannerHorizontal
├─ banner surface
│  ├─ text stack
│  │  ├─ Text(title)
│  │  └─ Text(description)
│  └─ media slot
└─ Indicator?                              indicator=true
```

`BannerHorizontal` owns the banner surface and optional indicator placement. It should not own carousel state, slide data fetching, or screen-level placement.

### Component Consumption

| Consumed component | Used for | Contract |
| --- | --- | --- |
| `Text` | Title and description | Use shared Text typography. Title maps to the Figma 14 semibold treatment; description maps to 12 medium with secondary/low-emphasis treatment. |
| `Indicator` | Optional slide position dots | Render only when `indicator=true`. Default Figma source shows six dots with active index `0`. |
| `Icon` | Inventory dependency / future affordance | Do not render an icon unless a mapped banner content preset requires it. Any icon must use registered Icon vocabulary. |
| `Button` | Inventory dependency / future action | Do not embed an ad hoc button style. If a banner action is needed, compose through the existing Button vocabulary or keep the whole banner as the action target. |

### Figma Source Difference

Figma exposes `BannerHorizontal` as a component, not a component set:

```txt
BannerHorizontal
├─ BannerHorizontal
│  ├─ Text
│  │  ├─ "T우주 x 신한카드 결제 혜택"
│  │  └─ "우주패스 all, mini 무료 구독"
│  └─ ImageArea
│     └─ image 240945503
└─ Indicator
   ├─ dot active
   └─ dot inactive x5
```

Figma has one component property: `Indicator`, a boolean with default `true`. The checked source node is `393 x 88`, vertical auto layout, gap `12`. The banner surface is `393 x 72`, horizontal auto layout, `space-between`, padding `24/16`, radius `24`, fill `#FFF4F4`.

### Visual Contract

| Layer | Figma value | Implementation note |
| --- | --- | --- |
| Root | `393 x 88`, vertical auto layout, gap `12`, centered children | Width should fill parent by default while preserving mobile 393px parity in previews. |
| Surface | `393 x 72`, horizontal auto layout, `space-between`, padding `24 16`, radius `24`, fill `#FFF4F4` | Use token aliases for spacing, radius, and surface color where available. |
| Text stack | Vertical auto layout, gap `4`, hug contents | Keep title and description aligned start; text should not force route-local spacing fixes. |
| Title | Pretendard Variable SemiBold, `14`, line-height `120%`, letter-spacing `-4%`, `#05001A` | Map to the closest shared Text variant and semantic primary color. |
| Description | Pretendard Variable Medium, `12`, line-height `120%`, letter-spacing `-4%`, `#05001A` at `40%` opacity | Prefer a tokenized secondary/tertiary text color over raw opacity when the token exists. |
| ImageArea | `58 x 40`; sample image rectangle `38 x 23.94` | Treat as a media slot with stable dimensions. |
| Indicator | `32 x 4`, gap `8`, horizontal padding `2`, six `4 x 4` dots | Use `Indicator count={6} activeIndex={0}` by default when indicator is shown. |

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `BannerHorizontal` component | `BannerHorizontal` | yes |
| `Indicator` boolean property | `indicator` prop | variant-like bridge property |
| `BannerHorizontal` inner frame | banner surface element | no |
| `Text` frame | title/description stack | no |
| Title text layer | `Text` title | `Text` yes |
| Description text layer | `Text` description | `Text` yes |
| `ImageArea` | `image` / `media` slot | no |
| Nested `Indicator` instance | `Indicator` component | `Indicator` yes |

## Props

Purpose: define the public API and the Figma bridge contract expected for implementation.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` | - | Primary banner text. |
| `description` | `ReactNode` | - | Secondary banner text. |
| `image` | `ReactNode` | - | Right-side media content. Prefer an image element or registered asset wrapper supplied by the caller. |
| `indicator` | `boolean` | `true` | Shows the nested `Indicator`. Maps to Figma `Indicator`. |
| `indicatorCount` | `number` | `6` | Dot count passed to `Indicator` when `indicator=true`. |
| `activeIndex` | `number` | `0` | Active dot index passed to `Indicator` when `indicator=true`. |
| `href` | `string` | - | Optional link target when the entire banner is navigational. |
| `onClick` | `() => void` | - | Optional press handler when the entire banner is interactive. |
| `ariaLabel` | `string` | - | Required when interaction is not fully described by visible text. |
| `className` | `string` | - | Additional class name on the root, only for composition needs. |

If both `href` and `onClick` are absent, render as a non-interactive content banner. If a separate call-to-action is required, route it through the existing Button contract instead of adding one-off inline button styling.

### Figma Mapping Props

| Code source | Figma property | Bridge value |
| --- | --- | --- |
| `indicator=false` | `Indicator=false` | `data-figma-property-indicator="false"` |
| `indicator=true` | `Indicator=true` | `data-figma-property-indicator="true"` |

Figma uses the property name `Indicator` with default `true`. Code should expose this as a boolean `indicator` prop and serialize the bridge value as lowercase string boolean.

### State Rules

- `indicator=true` renders the nested `Indicator` below the banner surface and keeps the root vertical gap.
- `indicator=false` removes the nested `Indicator`; the banner surface remains `72px` in the Figma source and should not gain compensating bottom margin.
- Interactive state belongs to the root only when the whole banner is clickable. Do not add independent hover/pressed state to the nested image or text.
- Carousel state is external. `BannerHorizontal` receives `activeIndex` and `indicatorCount`; it does not manage slide transitions.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { BannerHorizontal } from "@pxds/cx-components";
```

### Examples

```tsx
<BannerHorizontal
  title="T우주 x 신한카드 결제 혜택"
  description="우주패스 all, mini 무료 구독"
  image={<img src={cardImageSrc} alt="" />}
/>

<BannerHorizontal
  title="이번 달 구독 혜택"
  description="혜택 자세히 보기"
  image={<img src={benefitImageSrc} alt="" />}
  indicator={false}
  href="/benefits/subscription"
  ariaLabel="이번 달 구독 혜택 자세히 보기"
/>

<BannerHorizontal
  title={item.title}
  description={item.description}
  image={item.image}
  indicator
  indicatorCount={items.length}
  activeIndex={activeIndex}
  onClick={openBanner}
/>
```

Parent carousel or screen code should own the list of banners and pass normalized `activeIndex`.

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep styling wired to `--semantic-*` / `--component-*` aliases and do not reintroduce component-local `--cx-*` CSS variables.
- Implement one public `BannerHorizontal` component.
- Use `Text` for title and description.
- Use the existing `Indicator` component for dots; do not recreate dot markup locally.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="banner-horizontal"`.
- Preserve `data-figma-property-indicator="true|false"` on the root.
- Keep the media area stable so image loading does not shift banner height.
- Support non-interactive, link, and button-like root usage without changing the visual contract.

### Don't

- Create separate public `BannerHorizontalWithIndicator` or `BannerHorizontalNoIndicator` components.
- Hardcode the Figma sample card artwork or sample copy into the component implementation.
- Add a local icon, button, indicator, or text primitive inside this component.
- Use route/screen-local margin or padding to repair banner spacing.
- Treat the inventory `Icon` and `Button` dependencies as permission to add always-visible controls that are not present in the checked Figma source.

### Normalization Notes

- `../../component-inventory.md` lists `BannerHorizontal` as Phase 5 with status `제작 예정`; keep this document implementation-facing but do not implement code in this task.
- Figma source has no variant axis. The only component property is the boolean `Indicator`.
- The source preview lives under the `Banner` category in the base section, but the reusable component name is `BannerHorizontal`.
- The Figma sample image is an image fill named `image 240945503`; code should accept a caller-supplied media node or registered asset reference.
- The nested `Indicator` component has six dots in the checked source. The current `Indicator` implementation also defaults to `count=6`, which matches the Figma sample.

### SVG Assets

SVG asset: not required for the checked `BannerHorizontal` component.

Figma uses one raster image fill for the sample card artwork and an existing `Indicator` instance for dots. No new icon SVG is implied by the source node. If product-specific banner artwork is needed, register it as a content/image asset outside the component's structural contract.

### Validation

Documentation-only changes do not require app build checks.

When implementation changes are made, validate through the consuming app:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify:

- Root DOM node includes `data-figma-render="component"`.
- Root DOM node includes `data-figma-component-id="banner-horizontal"`.
- Root DOM node includes `data-figma-property-indicator="true"` or `data-figma-property-indicator="false"`.
- `indicator=true` renders the shared `Indicator` component and does not recreate local dots.
- `indicator=false` removes the indicator without adding compensating route-level spacing.
- Media loading preserves the banner surface height and right-side image area alignment.
