# TitleSection.LeftItem

## Overview

Purpose: document the private left-side item set used by `TitleSection`, without promoting it to public component vocabulary.

Figma SOT: [SKT_SDUI_Test_0512 / base section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

Component node checked in Figma: [LeftItem](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9510-25749&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 완료 |
| Implementation Target | cx-components private |
| Figma Source | title-section-left-item |
| Dependencies | Actual import: `Badge`; slot/preset input contract: `Icon`; text styling contract: `Text` |
| Variants | Type: Text/Icon/Badge |
| Properties | none on the standalone private set; root presence is owned by `TitleSection` via `data-figma-property-left-item` |

### Implementation Files

Implemented in `@pxds/cx-components`:

- `packages/cx-components/src/components/title-section-left-item/TitleSectionLeftItem.tsx`
- `packages/cx-components/src/components/title-section-left-item/TitleSectionLeftItem.types.ts`
- `packages/cx-components/src/components/title-section-left-item/title-section-left-item.variants.ts`
- `packages/cx-components/src/components/title-section-left-item/title-section-left-item.css`
- `packages/cx-components/src/components/title-section-left-item/title-section-left-item.readme.md`
- `packages/cx-components/src/components/title-section-left-item/index.ts`

### Styling Contract

- Component CSS must not define component-local `--cx-*` custom properties.
- Consume theme-neutral aliases from `@pxds/cx-tokens/style.css` directly: prefer `--semantic-*` and `--component-*` tokens.

## Structure

Purpose: define how the Figma-only private set normalizes into the `TitleSection.leftItem` preset contract.

### Target Structure

```txt
TitleSection.LeftItem (private preset set)
├─ Text
├─ Icon
└─ Badge
```

This is implemented as a scoped CX component and can also be consumed through the `leftItem` prop on `TitleSection`.

### Component Consumption

| Dependency | Contract type | Current implementation |
| --- | --- | --- |
| `Badge` | Actual code import | `TitleSection.tsx` imports and renders `Badge` for `leftItem.type="badge"`. |
| `Icon` | Slot/preset input contract | Presets accept `ReactNode` icon content. The scoped component consumes `Icon`; the legacy `TitleSection` preset renderer accepts icon nodes. |
| `Text` | Typography/source vocabulary contract | Text is rendered as a native `span` using `cx-title-section__left-text`; no public `Text` import is used here. |

### Figma Source Difference

Figma exposes `LeftItem` as a private component set with three children:

```txt
LeftItem
├─ Type=Text
│  └─ text node "2"
├─ Type=Icon
│  └─ Icon instance
└─ Type=Badge
   └─ Badge instance
```

The Figma node was checked directly. Its component set contains `Type=Text`, `Type=Icon`, and `Type=Badge`. Figma API access to variant property fields currently reports existing component-set errors, so the documented variant axis is based on node names and the existing `TitleSection` implementation contract.

Code folds these variants into `TitleSectionLeftItem` union objects and renders them through `renderLeftItem()` inside `TitleSection.tsx`.

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `LeftItem` component set | `leftItem` private preset or caller slot | no |
| `LeftItem / Type=Text` | `leftItem={{ type: "text" }}` | no |
| `LeftItem / Type=Icon` | `leftItem={{ type: "icon" }}` | no |
| `LeftItem / Type=Badge` | `leftItem={{ type: "badge" }}` rendered through `Badge` | `Badge` yes, `LeftItem` no |
| Nested `Icon` | caller-supplied icon node | `Icon` yes, this item set no |
| Nested text | local text span | `Text` vocabulary contract only |

## Props

Purpose: document the private preset shapes and internal Figma markers.

### Props

`TitleSection.LeftItem` is represented by `TitleSection`'s `leftItem` prop:

| Preset | Shape | Internal type marker |
| --- | --- | --- |
| Text | `{ type: "text"; text: string }` | `data-figma-property-left-item-type="text"` |
| Icon | `{ type: "icon"; icon: ReactNode; label?: string }` | `data-figma-property-left-item-type="icon"` |
| Badge | `{ type: "badge"; text: string }` | `data-figma-property-left-item-type="badge"` |

Plain `ReactNode` left-item content is also allowed by `TitleSectionLeftItem`, but it is treated as slot content and does not receive an internal item type marker.

### Figma Mapping Props

The parent `TitleSection` root owns the presence bridge:

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| `leftItem` presence | `data-figma-property-left-item` | `true` / `false` |

The left slot wrapper uses:

| Slot | Attribute |
| --- | --- |
| left-item | `data-figma-render="slot"` + `data-figma-property-name="left-item"` |

Preset-rendered left items use:

| Preset | Attribute |
| --- | --- |
| Text | `data-figma-render="primitive"` + `data-figma-property-left-item-type="text"` |
| Icon | `data-figma-render="primitive"` + `data-figma-property-left-item-type="icon"` |
| Badge | `data-figma-render="primitive"` + `data-figma-property-left-item-type="badge"` |

`data-figma-property-left-item-type` is an internal marker emitted by preset-rendered children. It is not declared on `TitleSectionFigmaBridgeProps`, which only types the root bridge attributes.

### State Rules

Not applicable as a standalone state surface: `TitleSection.LeftItem` has no independent disabled, selected, pressed, loading, or error state. Parent `TitleSection` owns left-item presence, and any interaction state belongs to the caller-supplied custom slot.

## Usage

Purpose: show current consumer usage through `TitleSection`.

### Import

```tsx
import { TitleSection } from "@pxds/cx-components";
```

### Examples

```tsx
<TitleSection title="타이틀" leftItem={{ type: "text", text: "2" }} />

<TitleSection
  title="타이틀"
  leftItem={{
    type: "icon",
    icon: <Icon type="information" size={20} />,
    label: "안내",
  }}
/>

<TitleSection title="타이틀" leftItem={{ type: "badge", text: "Badge" }} />
```

## Implementation Guide

Purpose: constrain implementation decisions and validation for this private scoped item set.

### Do

- Keep styling wired to `--semantic-*` / `--component-*` aliases and do not reintroduce component-local `--cx-*` CSS variables.
- Keep `TitleSection.LeftItem` private while Phase 2 treats it as a scoped item set.
- Document current behavior from `TitleSection` code when the dedicated file does not exist.
- Treat the existing `renderLeftItem()` branches in `TitleSection.tsx` as the current implementation SOT.
- Keep the three Figma variants normalized to `text`, `icon`, and `badge`.
- Use `Badge` for the badge preset because it is an actual code import.
- Accept icon-shaped content through the preset without making `TitleSection` import `Icon`.
- Preserve the left slot bridge and the internal `data-figma-property-left-item-type` markers.

### Don't

- Export `TitleSection.LeftItem` as a public component from the current implementation.
- Create a dedicated file unless the component vocabulary explicitly changes.
- Treat `Icon` or `Text` as actual imports in current `TitleSection` implementation.
- Add new spacing, typography, or icon assets for this preset without first validating against the existing `TitleSection` and dependency vocabulary.
- Add route or parent-level spacing to correct this item set.

### Normalization Notes

- `docs/component-inventory.md` lists this as a Phase 2 private scoped item set depending on `Badge`, `Icon`, and `Text`.
- Inventory now lists this as `제작 완료`; keep the scoped component and the legacy `TitleSection.leftItem` preset behavior aligned.
- In code, this Phase 2 item is covered by `TitleSection`'s private preset renderer rather than by a dedicated component file.
- `Icon` and `Text` are source/component vocabulary contracts in this context.
- Plain `ReactNode` left item content is allowed, but it bypasses the internal type marker.
- CSS uses existing `TitleSection` tokenized styles: left text uses `16-semi`, tertiary text color, and no standalone spacing token outside the parent `title-area` gap.

### SVG Assets

SVG asset: not required.

The Figma icon variant consumes existing Icon vocabulary through caller-supplied `ReactNode` content. No new icon asset is implied by this item set.

### Validation

Documentation-only changes do not require app build checks.

When implementation changes are made, validate through the consuming app:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify preset-rendered item nodes include the applicable marker:

- `data-figma-property-left-item-type="text"`
- `data-figma-property-left-item-type="icon"`
- `data-figma-property-left-item-type="badge"`
