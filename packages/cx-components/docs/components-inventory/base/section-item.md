# SectionItem

## Overview

Purpose: document the planned section content wrapper currently named `SectionItem_이친구를복붙하세요` in Figma, and normalize it to the code-safe `SectionItem` candidate name before implementation.

Figma SOT: [SKT_SDUI_Test_0512 / base section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

Component node checked in Figma: [SectionItem_이친구를복붙하세요](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9945-48905&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 예정 |
| Implementation Target | cx-components candidate |
| Figma Source | section-item |
| Figma Component Name | `SectionItem_이친구를복붙하세요` |
| Normalized Code Name | `SectionItem` |
| Dependencies | TitleSection, Text, Badge as expected slot content; no fixed internal child dependency in the source component set |
| Variants | Type: Card 0/Default 20 |
| Properties | `data-figma-property-contents`: slot |

### Implementation Files

Planned in `@pxds/cx-components`:

- `packages/cx-components/src/components/section-item/SectionItem.tsx`
- `packages/cx-components/src/components/section-item/SectionItem.types.ts`
- `packages/cx-components/src/components/section-item/section-item.variants.ts`
- `packages/cx-components/src/components/section-item/section-item.css`
- `packages/cx-components/src/components/section-item/section-item.readme.md`
- `packages/cx-components/src/components/section-item/index.ts`

This is documentation-only. Do not create implementation files from this Phase 4 document alone.

### Styling Contract

- Component CSS must not define component-local `--cx-*` custom properties.
- Consume theme-neutral aliases from `@pxds/cx-tokens/style.css` directly: prefer `--semantic-*` and `--component-*` tokens.
- The component owns wrapper width, background, and horizontal inset only. Spacing inside `contents` belongs to the slotted content.

## Structure

Purpose: preserve the Figma wrapper contract while keeping the component vocabulary small.

### Target Structure

```txt
SectionItem
└─ contents slot
   └─ children
```

`SectionItem` is a section-level wrapper for arbitrary content. It should not recreate `TitleSection`, `Text`, or `Badge` internally unless a future spec introduces a concrete preset; those components are expected consumers inside the slot.

### Component Consumption

| Consumed component | Used for | Requirement |
| --- | --- | --- |
| `TitleSection` | Common slotted title/header content | Compose as `children`; do not bake it into every `SectionItem`. |
| `Text` | Common slotted body or row content | Use existing text vocabulary inside `children`; do not create section-local typography primitives. |
| `Badge` | Optional slotted status/label content | Render through the existing Badge component when content needs a badge. |

### Figma Source Difference

Figma models this as a component set named `SectionItem_이친구를복붙하세요` with a single variant property:

```txt
SectionItem_이친구를복붙하세요
├─ Type=Card 0
│  └─ contents_여기에 콘텐츠를 넣으세요 (slot)
└─ Type=Default 20
   └─ contents_여기에 콘텐츠를 넣으세요 (slot)
```

The Korean suffix is an authoring hint meaning this node is a copy source. Code should normalize the public candidate name to `SectionItem` while preserving the Figma source name in inventory and bridge documentation.

### Visual Contract

| Type | Size | Layout | Padding | Fill | Slot width |
| --- | --- | --- | --- | --- | --- |
| `Card 0` | `369 x 28` source example | horizontal auto layout, gap `8` | `0` | `#FFFFFF` | `369` |
| `Default 20` | `369 x 41` source example | vertical auto layout, gap `0` | left/right `20`, top/bottom `0` | `#FFFFFF` | `329` |

The source heights are example slot heights, not fixed content heights. Implementation should allow content-driven vertical sizing.

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `SectionItem_이친구를복붙하세요` component set | `SectionItem` | yes, normalized name |
| `Type=Card 0` | `variant="card"` or `type="card"` | variant value |
| `Type=Default 20` | `variant="default"` or `type="default"` | variant value |
| `contents_여기에 콘텐츠를 넣으세요` slot | `children` | yes |
| Slotted `TitleSection`, `Text`, `Badge` examples | consumer-provided children | yes, separate component vocabulary |

## Props

Purpose: define the public API and the Figma bridge contract.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | - | Section content. Usually composed from existing CX components such as `TitleSection`, `Text`, and `Badge`. |
| `variant` | `"default" \| "card"` | `"default"` | Normalized visual variant mapped from Figma `Type`. |
| `className` | `string` | - | Additional class name on the root, only for composition needs. |

If the implementation prefers `type`, keep it an alias for `variant` rather than introducing another independent state axis.

### Figma Mapping Props

| Code source | Figma property | Bridge value |
| --- | --- | --- |
| `variant="default"` | `Type=Default 20` | `data-figma-property-type="default-20"` |
| `variant="card"` | `Type=Card 0` | `data-figma-property-type="card-0"` |
| `children` | `contents_여기에 콘텐츠를 넣으세요` slot | `data-figma-property-contents="slot"` |

Figma uses display values with spacing numbers. Code should expose lowercase semantic values and keep the exact Figma names only in bridge/export mapping.

### State Rules

- `Default 20` is the default variant and applies the 20px horizontal section inset.
- `Card 0` removes the section inset so card-shaped or already-inset content can fill the 369px wrapper.
- Variant changes must not alter slotted content structure.
- There are no independent selected, disabled, pressed, loading, or error states in the source component set.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { SectionItem, TitleSection, Text, Badge } from "@pxds/cx-components";
```

### Examples

```tsx
<SectionItem>
  <TitleSection title="섹션 타이틀" />
  <Text>본문 콘텐츠</Text>
</SectionItem>

<SectionItem variant="card">
  <Badge type="blue" text="혜택" />
</SectionItem>
```

`PageStackContents` and `PageStackList` should treat `SectionItem` instances as child content payloads, not as layout primitives owned by `cx-layout`.

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep styling wired to `--semantic-*` / `--component-*` aliases and do not reintroduce component-local `--cx-*` CSS variables.
- Implement one public `SectionItem` component if this candidate is promoted.
- Normalize Figma `SectionItem_이친구를복붙하세요` to the code-safe `SectionItem` name.
- Normalize Figma `Type=Default 20` and `Type=Card 0` to lowercase code values.
- Render the Figma contents slot as `children`.
- Use the 20px inset only for the default wrapper variant; let slotted content own its internal spacing.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="section-item"` when bridge metadata is implemented.
- Preserve `data-figma-property-type` and `data-figma-property-contents` for export matching.

### Don't

- Keep the Korean authoring suffix in the public React API.
- Create separate public `SectionItemDefault20` or `SectionItemCard0` components.
- Bake `TitleSection`, `Text`, or `Badge` into the wrapper as fixed children.
- Add route/screen-local padding to compensate for the wrapper inset.
- Treat the source example heights as fixed CSS heights.

### Normalization Notes

- Inventory preserves the Korean Figma status value `제작 예정` and the source component name for traceability.
- `Default 20` describes a horizontal inset, not a typography or content preset.
- `Card 0` is the zero-inset wrapper for content that already carries card spacing or needs full available width.
- The Figma component set declares two slot properties with generated ids for the same visible slot name. Code should expose a single `children` contract and a single bridge concept: `contents`.
- The component set itself contains no text, badge, icon, or vector layers; dependency vocabulary appears through slot usage in consuming screens and page-stack examples.

### SVG Assets

SVG asset: not required.

The checked Figma source contains only auto-layout component variants and a contents slot. No vector or icon layer is part of the `SectionItem` component set.

### Validation

Documentation-only changes do not require app build checks.

When implementation changes are made, validate through the consuming app:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify the root DOM node includes:

- `data-figma-render="component"`
- `data-figma-component-id="section-item"`
- `data-figma-property-type="default-20"` or `data-figma-property-type="card-0"`
- `data-figma-property-contents="slot"`

Verify default/card switching changes only wrapper inset behavior and does not mutate or restyle slotted children.
