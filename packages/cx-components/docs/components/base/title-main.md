# TitleMain

## Overview

Purpose: define the Phase 5 high-level title compound that sits close to screen composition while preserving the smaller CX component vocabulary.

Figma SOT: [SKT_SDUI_Test_0512 / base section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

Component node checked in Figma: [TitleMain](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9740-49516&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 예정 |
| Implementation Target | cx-components |
| Figma Source | title-main |
| Dependencies | Image, Indicator, Text, TitleSection |
| Variants | Type: Complete/Search |
| Properties | `data-figma-property-show-title-sub-text`: boolean; `data-figma-property-show-title-sub-text-image`: boolean; `data-figma-property-indicator`: boolean |

### Implementation Files

Planned in `@pxds/cx-components`:

- `packages/cx-components/src/components/title-main/TitleMain.tsx`
- `packages/cx-components/src/components/title-main/TitleMain.types.ts`
- `packages/cx-components/src/components/title-main/title-main.variants.ts`
- `packages/cx-components/src/components/title-main/title-main.css`
- `packages/cx-components/src/components/title-main/title-main.readme.md`
- `packages/cx-components/src/components/title-main/index.ts`

### Styling Contract

- Component CSS must not define component-local `--cx-*` custom properties.
- Consume theme-neutral aliases from `@pxds/cx-tokens/style.css` directly: prefer `--semantic-*` and `--component-*` tokens.
- Do not add route or screen-level margin/padding to compensate for this component. `TitleMain` owns only its internal title stack and optional media/indicator regions.

## Structure

Purpose: define the target structure and clarify which Figma dependencies become component consumption versus slots.

### Target Structure

```txt
TitleMain
├─ title-sub-text row?                 showTitleSubText
│  ├─ image/media slot?                showTitleSubTextImage
│  └─ Text(titleSubText)
├─ TitleSection
│  ├─ title
│  └─ subTitle?                        showTitleSubText
└─ Indicator?                          indicator
```

`TitleMain` should compose existing foundations instead of creating title-specific text, media, or dot primitives.

### Component Consumption

| Consumed component | Used for | Requirement |
| --- | --- | --- |
| `TitleSection` | Main title block and optional subtitle/body line | Use the existing title/subTitle contract. Do not duplicate `TitleSection` typography in `TitleMain`. |
| `Text` | Eyebrow or supporting text outside the `TitleSection` title block | Use shared text vocabulary or the nearest tokenized text branch. |
| `Indicator` | Optional dot indicator for carousel/search style title content | Consume `Indicator`; do not recreate dot ellipses locally. |
| `Image` | Figma leading visual asset/media in the top supporting row | Treat as a media slot or plain image input until `Image` is promoted to a CX component. Do not list it as a public CX component dependency by implementation import unless that component exists. |

### Figma Source / Normalization

Figma exposes `TitleMain` as a component set under the base section:

```txt
TitleMain
├─ Type=Complete   node 9726:26536, 393 x 141
└─ Type=Search     node 10035:61715, 393 x 100
```

The checked source frame is `9740:49516`. The `Complete` variant shows a small leading image/media mark with top supporting text, a large two-line completion title, and a supporting subtitle. The `Search` variant shows a two-line search/topic title and a dot indicator underneath.

Normalize these source variants into one public component with a `type` prop and presence booleans for optional regions. The Figma `Image` dependency is not evidence of a reusable CX `Image` component by itself; it should be implemented as an `image`/`media` slot or structured image props at this layer.

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `TitleMain` component set | `TitleMain` | yes |
| `Type=Complete` | `type="complete"` | variant value |
| `Type=Search` | `type="search"` | variant value |
| Top supporting text row | `titleSubText` region | no, conditional region |
| Figma `Image` layer/instance | `media` slot or image props | no, unless a CX `Image` component is later introduced |
| Main title/subtitle block | `TitleSection` composition | `TitleSection` yes |
| Dot group | `Indicator` | `Indicator` yes |

## Props

Purpose: define the public API and Figma bridge contract expected for implementation.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"complete" \| "search"` | `"complete"` | Visual variant mapped from Figma `Type`. |
| `title` | `ReactNode` | required | Main title content. |
| `subTitle` | `ReactNode` | - | Optional supporting text in the title block. Presence maps to `show-title-sub-text`. |
| `titleSubText` | `ReactNode` | - | Optional top supporting text row. |
| `media` | `ReactNode` | - | Optional leading media slot for the Figma image dependency. |
| `indicator` | `boolean \| Indicator props` | `false` | Enables the `Indicator` region. Object form configures count/activeIndex. |
| `className` | `string` | - | Additional class name on root. |

If implementation chooses structured image props instead of `media`, keep the API constrained to asset data such as `src`, `alt`, and sizing tokens. Do not expose raw Figma image IDs as public API.

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| `type="complete"` | `data-figma-property-type` | `complete` |
| `type="search"` | `data-figma-property-type` | `search` |
| `subTitle` or `titleSubText` presence | `data-figma-property-show-title-sub-text` | `true` / `false` |
| `media` presence | `data-figma-property-show-title-sub-text-image` | `true` / `false` |
| `indicator` presence | `data-figma-property-indicator` | `true` / `false` |

Recommended root identity:

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| root render identity | `data-figma-render` | `component` |
| component id | `data-figma-component-id` | `title-main` |

### State / Variant Rules

- `type="complete"` is the completion/title confirmation layout. It may show `titleSubText`, `media`, and `subTitle`; it normally does not show `Indicator`.
- `type="search"` is the search/topic carousel layout. It may show `Indicator`; it should not require a media image.
- `media` presence must drive `data-figma-property-show-title-sub-text-image`. A missing `media` must not leave empty spacing.
- `indicator` presence must drive `data-figma-property-indicator`. When enabled, render the shared `Indicator` component with its default six-dot behavior unless configured.
- Normalize Figma display values `Complete` and `Search` to lowercase code values `complete` and `search`.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { TitleMain } from "@pxds/cx-components";
```

### Examples

```tsx
<TitleMain
  type="complete"
  media={<img src={deviceImageUrl} alt="" />}
  titleSubText="갤럭시 S29 · SM-S942NV"
  title={
    <>
      축하드려요 은지님,
      <br />
      개통이 완료되었어요
    </>
  }
  subTitle="지금부터 새로운 휴대폰 사용이 가능해요."
/>

<TitleMain
  type="search"
  title={
    <>
      두립 찬스 T우주
      <br />
      꿀팁 보고 쿠폰픽
    </>
  }
  indicator
/>
```

Parent routes should pass finalized copy and media data. Do not make `TitleMain` fetch product images, search topics, or campaign data.

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep styling wired to `--semantic-*` / `--component-*` aliases and do not reintroduce component-local `--cx-*` CSS variables.
- Implement one public `TitleMain` component with `type="complete" | "search"`.
- Compose `TitleSection` for the main title block.
- Consume `Indicator` for the dot indicator instead of recreating ellipses.
- Treat the Figma `Image` dependency as a media slot/plain image input unless a real CX `Image` component is introduced and documented.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="title-main"`.
- Preserve `data-figma-property-type`, `data-figma-property-show-title-sub-text`, `data-figma-property-show-title-sub-text-image`, and `data-figma-property-indicator`.
- Keep variant spacing tokenized and stable so optional media/subtitle/indicator regions do not cause route-local compensation.

### Don't

- Implement code as part of this documentation task.
- Create separate public `TitleMainComplete` or `TitleMainSearch` components.
- Promote the Figma `Image` layer to CX component vocabulary from this source alone.
- Recreate `Indicator` dots or `TitleSection` title typography inside `TitleMain`.
- Add new SVG or icon assets for the media mark shown in the `Complete` variant.
- Add route/screen-local margin, padding, or raw font-size overrides to match this source.

### Normalization Notes

- `TitleMain` is Phase 5 because it depends on already-stabilized smaller pieces: `Image`, `Indicator`, `Text`, and `TitleSection`.
- Inventory status remains `제작 예정`.
- The source variants are `Type=Complete` and `Type=Search`; code should use lowercase values.
- `data-figma-property-show-title-sub-text` is a presence bridge for supporting text, not a separate typography variant.
- `data-figma-property-show-title-sub-text-image` should be driven by actual media presence.
- `Image` is currently an external/lower-level dependency in `component-inventory.md`. For implementation, treat it as an asset/media slot and keep it out of the CX component vocabulary until a dedicated `Image` component contract exists.

### SVG Assets

SVG asset: not required.

The checked Figma source shows a small image/media dependency in the `Complete` variant and an `Indicator` in the `Search` variant. The media dependency should be handled as image/slot content, while the indicator dots should be rendered by the existing `Indicator` component. No new registered SVG icon asset is implied by `TitleMain`.

### Validation

Documentation-only changes do not require app build checks.

When implementation changes are made, validate through the consuming app:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify the root DOM node includes:

- `data-figma-render="component"`
- `data-figma-component-id="title-main"`
- `data-figma-property-type="complete"` or `data-figma-property-type="search"`
- `data-figma-property-show-title-sub-text`
- `data-figma-property-show-title-sub-text-image`
- `data-figma-property-indicator`

Verify rendered composition:

- `Complete` can render media, top supporting text, main title, and subtitle without introducing local spacing overrides.
- `Search` can render the main title and shared `Indicator` without local dot primitives.
- Missing optional regions collapse cleanly without preserving empty image or indicator space.
