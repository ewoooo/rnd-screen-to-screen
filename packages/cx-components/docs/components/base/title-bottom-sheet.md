# TitleBottomSheet

## Overview

Purpose: define the bottom-sheet title/header content as an implementation-ready Phase 1 candidate.

Figma SOT: [SKT_SDUI_Test_0512 / Component base](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

Component node: [TitleBottomSheet](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9412-12082&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 완료 |
| Implementation Target | cx-components candidate |
| Figma Source | title-bottom-sheet |
| Dependencies | Icon |
| Used by | Bottomsheet |
| Variants | 없음 |
| Properties | `data-figma-property-show-title-text`: boolean; `data-figma-property-show-title-button`: boolean; `data-figma-property-show-sub-text`: boolean; `data-figma-property-show-sub-text-2`: boolean; `data-figma-property-show-title`: boolean |

### Implementation Files

Implemented in `@pxds/cx-components`:

- `packages/cx-components/src/components/title-bottom-sheet/TitleBottomSheet.tsx`
- `packages/cx-components/src/components/title-bottom-sheet/TitleBottomSheet.types.ts`
- `packages/cx-components/src/components/title-bottom-sheet/title-bottom-sheet.variants.ts`
- `packages/cx-components/src/components/title-bottom-sheet/title-bottom-sheet.css`
- `packages/cx-components/src/components/title-bottom-sheet/title-bottom-sheet.readme.md`
- `packages/cx-components/src/components/title-bottom-sheet/index.ts`

### Styling Contract

- Component CSS must not define component-local `--cx-*` custom properties.
- Consume theme-neutral aliases from `@pxds/cx-tokens/style.css` directly: prefer `--semantic-*` and `--component-*` tokens.

## Structure

Purpose: keep the component as a bottom-sheet header content part, not a full sheet runtime.

### Target Structure

```txt
TitleBottomSheet
├─ Title?                         showTitle
│  ├─ title text?                 showTitleText
│  └─ IconButton / Icon(close)?   showTitleButton
└─ SubText?                       showSubText
   ├─ sub text
   └─ emphasized sub text?        showSubText2
```

### Figma Source

Figma places `TitleBottomSheet` in the `base` section as a single component sized `393 x 68`.

```txt
TitleBottomSheet
├─ Title (horizontal, gap 16, height 26)
│  ├─ Text
│  │  └─ 타이틀
│  └─ Icon (Size=24, Type=Close)
└─ SubText (horizontal, gap 4, padding-top 16, height 34)
   ├─ 텍스트
   └─ 텍스트
```

The root is a vertical auto-layout frame with `padding-bottom: 8`. `Title` is the header row. `SubText` is supporting header content below the title row.

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `TitleBottomSheet` | `TitleBottomSheet` | yes |
| `Title` | Header row | no, internal region |
| `Text` / `타이틀` | Title text slot | no, prop-driven content |
| `Icon` / `Size=24, Type=Close` | Close/action icon | yes, consume `Icon` |
| `SubText` | Supporting text row | no, internal region |
| second `텍스트` | Emphasized supporting text | no, prop-driven content |

### Dependencies

| Consumed component | Used for | Notes |
| --- | --- | --- |
| `Icon` | Close/action affordance in the title row | Figma uses `Size=24, Type=Close`; map to `Icon type="close" size={24}`. |

`TitleBottomSheet` should not own the bottom-sheet surface, handle, scrim, motion, dismissal lifecycle, or content body. Those stay in `Bottomsheet` / `BottomSheet`. This component owns only the optional title row, close/action affordance, and supporting header text.

## Props

Purpose: define the public API and the `data-figma-property-*` bridge contract.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `"타이틀"` | Main title text. |
| `subText` | `string` | - | First supporting text segment. |
| `subText2` | `string` | - | Optional emphasized supporting text segment. |
| `showTitle` | `boolean` | `true` | Controls the entire title row. |
| `showTitleText` | `boolean` | derived from `title` | Controls only the title text region. |
| `showTitleButton` | `boolean` | `true` | Controls the title-row action icon/button. |
| `showSubText` | `boolean` | derived from `subText` | Controls the supporting text row. |
| `showSubText2` | `boolean` | derived from `subText2` | Controls the emphasized supporting text segment. |
| `onClose` | `() => void` | - | Optional action handler for the close icon. |
| `closeLabel` | `string` | `"닫기"` | Accessible label when the icon is interactive. |
| `className` | `string` | - | Additional class name on root. |

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| `showTitleText` / `title` presence | `data-figma-property-show-title-text` | `true` / `false` |
| `showTitleButton` | `data-figma-property-show-title-button` | `true` / `false` |
| `showSubText` / `subText` presence | `data-figma-property-show-sub-text` | `true` / `false` |
| `showSubText2` / `subText2` presence | `data-figma-property-show-sub-text-2` | `true` / `false` |
| `showTitle` | `data-figma-property-show-title` | `true` / `false` |

### Property Contract

- `showTitle=false` hides the full title row, including title text and title button.
- `showTitleText=false` hides only the text block inside `Title`; the title button may remain visible when `showTitle=true`.
- `showTitleButton=false` hides the close/action affordance. Figma exposes this property, but the inspected node does not show a direct descendant visibility reference for it; implementation should still honor the inventory contract.
- `showSubText=false` hides the full supporting text row, including `subText2`.
- `showSubText2=false` hides only the emphasized second supporting text segment.
- Boolean bridge attributes should reflect the resolved render state after content-presence defaults are applied.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { TitleBottomSheet } from "@pxds/cx-components";
```

### Examples

```tsx
<TitleBottomSheet title="타이틀" onClose={closeSheet} />

<TitleBottomSheet
  title="요금제 선택"
  subText="총"
  subText2="3개"
  onClose={closeSheet}
/>

<TitleBottomSheet title="알림" showTitleButton={false} />
```

Inside `Bottomsheet`, render `TitleBottomSheet` in the header/content-title area when `data-figma-property-show-title-bottom-sheet=true`.

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep styling wired to `--semantic-*` / `--component-*` aliases and do not reintroduce component-local `--cx-*` CSS variables.
- Implement as a small header content component for `Bottomsheet`.
- Consume `Icon` for the close/action affordance instead of embedding raw vectors.
- Use existing typography and color tokens for the title and supporting text.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="title-bottom-sheet"`.
- Preserve all `data-figma-property-*` bridge attributes listed above.
- Keep the root compatible with mobile sheet width; Figma source is `393px` wide.
- Treat this as a Phase 1 independent base candidate because `Bottomsheet` depends on it and it depends only on `Icon`.

### Don't

- Create a separate public `Title` or `SubText` component from this source.
- Add bottom-sheet open/close state, drag logic, overlay, or body content layout here.
- Add screen-local margin or padding to align this header inside a route.
- Inline the close SVG in the component if the `Icon` registry can provide it.

### Token Notes

- Figma root: vertical auto-layout, `padding-bottom: 8`.
- Title row: horizontal auto-layout, `gap: 16`.
- Text block: vertical auto-layout, `gap: 4`.
- SubText row: horizontal auto-layout, `gap: 4`, `padding-top: 16`.
- Title text: Pretendard Variable Medium 20, line-height 130%, text primary.
- Sub text: Pretendard Variable Medium 14, line-height 130%, text tertiary.
- Emphasized sub text: Pretendard Variable SemiBold 14, line-height 130%, text brand.

### SVG Asset

SVG asset: not required. Figma uses `Icon` `Size=24, Type=Close`, and the current icon registries include a close icon (`@pxds/cx-icons` `type="close"` and `@pxds/pxds-icons` `IconClose`).

### Validation

When implementation is added, validate through the consuming app checks:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify the root DOM node includes:

- `data-figma-render="component"`
- `data-figma-component-id="title-bottom-sheet"`
- `data-figma-property-show-title-text`
- `data-figma-property-show-title-button`
- `data-figma-property-show-sub-text`
- `data-figma-property-show-sub-text-2`
- `data-figma-property-show-title`
