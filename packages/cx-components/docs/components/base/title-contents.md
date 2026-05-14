# TitleContents

## Overview

Purpose: define the implementation-ready contract for the planned title row used inside content sections.

Figma SOT: [SKT_SDUI_Test_0512 / base section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

Component node checked in Figma: [TitleContents](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=10009-151423&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 예정 |
| Implementation Target | cx-components candidate |
| Figma Source | title-contents |
| Dependencies | Icon, TitleContents.RightItem |
| Variants | 없음 |
| Properties | `data-figma-property-show-button`: boolean |

### Implementation Files

Planned in `@pxds/cx-components`:

- `packages/cx-components/src/components/title-contents/TitleContents.tsx`
- `packages/cx-components/src/components/title-contents/TitleContents.types.ts`
- `packages/cx-components/src/components/title-contents/title-contents.variants.ts`
- `packages/cx-components/src/components/title-contents/title-contents.css`
- `packages/cx-components/src/components/title-contents/title-contents.readme.md`
- `packages/cx-components/src/components/title-contents/index.ts`

Existing scoped dependency:

- `packages/cx-components/src/components/title-contents-right-item/TitleContentsRightItem.tsx`
- `packages/cx-components/src/components/title-contents-right-item/TitleContentsRightItem.types.ts`
- `packages/cx-components/src/components/title-contents-right-item/title-contents-right-item.variants.ts`
- `packages/cx-components/src/components/title-contents-right-item/title-contents-right-item.css`
- `packages/cx-components/src/components/title-contents-right-item/index.ts`

### Styling Contract

- Component CSS must not define component-local `--cx-*` custom properties.
- Consume theme-neutral aliases from `@pxds/cx-tokens/style.css` directly: prefer `--semantic-*` and `--component-*` tokens.
- Use tokenized spacing and typography from the Figma source: `spacing/12`, `spacing/4`, and `14 semi`.

## Structure

Purpose: preserve the Figma row contract while normalizing the right-side control into the private `TitleContents.RightItem` dependency.

### Target Structure

```txt
TitleContents
├─ title text
└─ TitleContents.RightItem? (showButton=true)
```

`TitleContents` owns the title-row layout and right-item presence. The right-side affordance is not a new public slot vocabulary item; it should compose the scoped `TitleContents.RightItem` preset set.

### Component Consumption

| Consumed component | Used for | Contract |
| --- | --- | --- |
| `TitleContents.RightItem` | Optional trailing affordance | Use the existing private right-item component/preset. Default Figma state is `Type=Icon`. |
| `Icon` | Nested right-item icon | Use existing `Icon` mapping through `TitleContents.RightItem`: `Size=16, Type=ArrowUp`. Do not inline SVG. |

### Figma Source Difference

Figma models `TitleContents` as a single component with one boolean property:

```txt
TitleContents
├─ Title text "타이틀"
└─ RightItem / Type=Icon
   └─ Icon / Size=16, Type=ArrowUp
```

Figma measurements checked on node `10009:151423`:

| Node | Size | Layout | Spacing | Notes |
| --- | --- | --- | --- | --- |
| `TitleContents` | 329 x 22 | horizontal auto layout, fixed width, hug height | gap `12`, bottom padding `4` | Aligns children center. |
| `Title` | 301 x 18 | fills remaining width | - | Text `타이틀`, `14 semi`, `color/text/primary`. |
| `RightItem` | 16 x 16 | horizontal hug | source gap `12` | Instance of `TitleContents.RightItem`, `Type=Icon`. |
| nested `Icon` | 16 x 16 | horizontal hug | gap `2` | Main component `Icon / Size=16, Type=ArrowUp`. |

The Figma component property is named `Show Button` with default `true`. Code should normalize that to `showButton?: boolean` and expose lowercase boolean bridge metadata through `data-figma-property-show-button`.

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `TitleContents` component | `TitleContents` | yes |
| `Title` text layer | `title` prop or `children` title content | no separate text component required |
| `Show Button` property | `showButton` boolean | prop only |
| `RightItem / Type=Icon` | `rightItem={{ type: "icon", label }}` when shown | private preset |
| nested `Icon / ArrowUp` | `Icon type="arrow-up" size={16}` through `TitleContents.RightItem` | `Icon` yes |

## Props

Purpose: define the public API and the Figma bridge contract.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` | `"타이틀"` | Primary title content. Prefer a short single-line label. |
| `children` | `ReactNode` | - | Optional title content alternative when `title` is not provided. |
| `showButton` | `boolean` | `true` | Controls whether the right item is rendered. Maps from Figma `Show Button`. |
| `rightItem` | `TitleContentsRightItemPreset` | `{ type: "icon", label: "접기" }` | Optional private right-item preset. Only used when `showButton` is true. |
| `className` | `string` | - | Additional class name on the root, only for composition needs. |

`TitleContents` may support native `div` attributes on the root. Do not use native attributes to encode variant state; normalize state into typed props before rendering bridge metadata.

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| root render marker | `data-figma-render` | `component` |
| resolved component id | `data-figma-component-id` | `title-contents` |
| `showButton=false` | `data-figma-property-show-button` | `false` |
| `showButton=true` | `data-figma-property-show-button` | `true` |
| `rightItem.type="icon"` | nested `data-figma-property-type` on `TitleContents.RightItem` | `Icon` |
| `rightItem.type="type3"` | nested `data-figma-property-type` on `TitleContents.RightItem` | `Type3` |
| `rightItem.type="button"` | nested `data-figma-property-type` on `TitleContents.RightItem` | `Button` |

### State Rules

- `showButton=true` renders the right item and preserves the 12px title-to-action gap.
- `showButton=false` omits the right item; the title still uses the same typography and root bottom padding.
- `rightItem` defaults to the Figma source shape: `type: "icon"` with the existing 16px ArrowUp icon.
- `TitleContents` has no independent disabled, selected, pressed, loading, or error state. Interaction state belongs to the nested right item when it is actionable.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { TitleContents } from "@pxds/cx-components";
```

### Examples

```tsx
<TitleContents title="타이틀" />

<TitleContents title="상세 정보" showButton={false} />

<TitleContents
  title="혜택 안내"
  rightItem={{ type: "icon", label: "혜택 안내 접기" }}
/>

<TitleContents
  title="필터"
  rightItem={{ type: "button", label: "버튼" }}
/>
```

Parent sections should compose `TitleContents` instead of recreating title text plus a local arrow/button row.

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep styling wired to `--semantic-*` / `--component-*` aliases and do not reintroduce component-local `--cx-*` CSS variables.
- Implement one public `TitleContents` component.
- Consume the existing private `TitleContents.RightItem` dependency for the trailing affordance.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="title-contents"`.
- Preserve `data-figma-property-show-button="true|false"` on the root.
- Use tokenized typography equivalent to Figma `14 semi` and `color/text/primary` for the title.
- Keep the root row gap and bottom padding tokenized from the source values.
- Let `TitleContents.RightItem` own icon/button rendering, accessibility labels, and its nested Figma `Type` bridge value.

### Don't

- Add a separate public `TitleContentsButton`, `TitleContentsIcon`, or `TitleContentsRightItem` export from this parent component work.
- Inline the ArrowUp vector in `TitleContents`.
- Add route/screen-local margin, padding, or raw font-size overrides to align this row.
- Promote `Show Button` into a visual variant axis; it is a boolean presence property.
- Recreate `Button`, `IconButton`, or `Icon` styling inside the parent title row.

### Normalization Notes

- `../../component-inventory.md` lists `TitleContents` as Phase 4 because it composes the already implemented Phase 2 `TitleContents.RightItem`.
- Inventory status remains `제작 예정`; this document is an implementation contract, not a code implementation.
- Figma names the property `Show Button`; code should expose `showButton` and bridge it as `data-figma-property-show-button`.
- The source right item is visually an icon, but the public parent should keep room for the private right-item preset union already documented in `title-contents-right-item.md`.
- The checked Figma source includes an image asset in generated design context for the nested icon. Normalize that to the registered `Icon / Size=16, Type=ArrowUp` component instead of treating it as a new asset.

### SVG Assets

SVG asset: not required.

Figma's generated design context exposes the nested ArrowUp as an image asset, but the node hierarchy shows it is an instance of the existing `Icon / Size=16, Type=ArrowUp` component. Implementation should consume the registered `Icon` through `TitleContents.RightItem` and should not add a new SVG asset for `TitleContents`.

### Validation

Documentation-only changes do not require app build checks.

When implementation changes are made, validate through the consuming app:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Manual checks:

- The root DOM node includes `data-figma-render="component"`.
- The root DOM node includes `data-figma-component-id="title-contents"`.
- The root DOM node includes `data-figma-property-show-button="true"` or `"false"`.
- `showButton=true` renders `TitleContents.RightItem` with the expected nested `data-figma-property-type`.
- `showButton=false` removes the right item without introducing parent-level spacing overrides.
- No unregistered SVG asset is introduced for the ArrowUp icon.
