# PageStackList

## Overview

Purpose: document the planned list-page stack layout contract before implementation, preserving the Figma source while keeping `cx-layout` free of visual component imports.

Figma SOT: [SKT_SDUI_Test_0512 / base section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

Primary Figma component node: [PageStackList](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=10036-46324&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 예정 |
| Implementation Target | cx-layout |
| Figma Source | page-stack-list |
| Dependencies | Icon, TitleSection.LeftItem, TitleSection.RightItem, SectionItem_이친구를복붙하세요, TitleSection/Default, Slot, VStack |
| Variants | 없음 |
| Properties | `data-figma-property-contents-slot`: slot; `data-figma-property-contents-title`: boolean |

### Implementation Files

Not implemented as a named layout component yet.

Planned target in `@pxds/cx-layout` if the repeated list-page structure graduates from documentation to code:

- `packages/cx-layout/src/components/compositions/page-stack-list/PageStackList.tsx`
- `packages/cx-layout/src/components/compositions/page-stack-list/PageStackList.types.ts`
- `packages/cx-layout/src/components/compositions/page-stack-list/page-stack-list.variants.ts`
- `packages/cx-layout/src/components/compositions/page-stack-list/page-stack-list.css`
- `packages/cx-layout/src/components/compositions/page-stack-list/index.ts`

### Styling Contract

- `PageStackList` belongs in `@pxds/cx-layout`, not `@pxds/cx-components`.
- Layout CSS must not define component-local `--cx-*` custom properties.
- Consume spacing aliases from `@pxds/cx-tokens/style.css`; do not introduce route-local padding or fixed spacing to compensate for page composition.
- The layout component may own outer stack rails and slot wrappers. It must not own text, icon, title, or section-item visual styling.

## Structure

Purpose: define the target layout structure and how Figma-only example nodes normalize into code.

### Target Structure

```txt
PageStackList
├─ Slot(name="title")? / VStack title region
│  └─ title ReactNode
└─ Slot(name="content")
   └─ children ReactNode
```

`PageStackList` is a planned `cx-layout` compound for list-page stacking. It should own vertical list composition, title-region presence, root Figma bridge metadata, and named slot wrappers. It should not own the visual semantics of `TitleSection`, `Icon`, or `SectionItem` payloads.

### Component Consumption

| Consumed component | Used for | Expected implementation |
| --- | --- | --- |
| `Slot` | Named `title` and `content` layout wrappers | Import from `@pxds/cx-layout` primitives. The content slot is always rendered; the title slot is conditional. |
| `VStack` | Vertical stacking behavior | Treat as a layout dependency only if the local `cx-layout` primitive exists or the package standardizes on it. Do not replace it with app-local spacing. |
| `TitleSection/Default` | Example title payload in Figma | Consumer-provided `title` ReactNode. Do not import `TitleSection` into `cx-layout`. |
| `TitleSection.LeftItem` / `TitleSection.RightItem` / `Icon` | Possible nested title affordances | Owned by the title component passed by the consumer, not by `PageStackList`. |
| `SectionItem_이친구를복붙하세요` | Example content payloads in Figma | Consumer-provided `children`. Do not import or recreate the Figma copy helper inside layout code. |

### Figma Source Difference

Figma models `PageStackList` as a 393px-wide vertical auto-layout component:

```txt
PageStackList
├─ ContentsTitle?                         (contents-title=true)
│  └─ TitleSection/Default                (RightItem=false, LeftItem=false, SubTitle=false)
└─ contents slot_복사금지                  (contents-slot)
   ├─ SectionItem_이친구를복붙하세요        (Type=Default 20)
   └─ SectionItem_이친구를복붙하세요        (Type=Card 0)
```

Figma source measurements checked on node `10036:46324`:

| Node | Size | Layout | Padding / gap | Notes |
| --- | --- | --- | --- | --- |
| `PageStackList` | 393 x 130 | vertical auto layout, fixed width, hug height | padding `12`, gap `0` | No fill or stroke. |
| `ContentsTitle` | 369 x 37 | horizontal auto layout, fill width, hug height | horizontal padding `20`, gap `12` | Hidden when `contents-title=false`. |
| `TitleSection/Default` | 329 x 37 | nested instance | bottom padding `16` | Instance properties set `RightItem=false`, `LeftItem=false`, `SubTitle=false`. |
| `contents slot_복사금지` | 369 x 69 | vertical slot, fill width, hug height | gap `0` | Figma slot property. |
| `SectionItem / Type=Default 20` | 369 x 41 | vertical instance | horizontal padding `20` | Example content only. |
| `SectionItem / Type=Card 0` | 369 x 28 | horizontal instance | gap `8` | Example content only. |

Code should keep only the layout contract:

```txt
PageStackList
├─ Slot(title)?
└─ Slot(content)
```

### Node Mapping

| Figma node/property | Code structure | Public vocabulary? |
| --- | --- | --- |
| `PageStackList` | Planned `PageStackList` root layout | yes, layout compound |
| `ContentsTitle` | Optional `Slot name="title"` or title region inside `VStack` | no, normalized slot region |
| `TitleSection/Default` | Consumer-provided `title` ReactNode | no dependency from `cx-layout` |
| `TitleSection.LeftItem` / `TitleSection.RightItem` / `Icon` | Nested inside consumer title content when needed | no dependency from `cx-layout` |
| `contents slot_복사금지` | `Slot name="content"` wrapping `children` | normalized to `Slot` |
| `SectionItem_이친구를복붙하세요` | Consumer-provided `children` examples | no dependency from `cx-layout` |
| `contents-slot` | Always-rendered content slot bridge | yes, slot bridge metadata |
| `contents-title` | `showTitle ?? Boolean(title)` | yes, bridge boolean |

## Props

Purpose: define the planned public API and the `data-figma-property-*` bridge contract.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` | - | Optional title slot content, typically a `TitleSection`. |
| `children` | `ReactNode` | - | Content slot children, typically one or more section/list items. |
| `showTitle` | `boolean` | `Boolean(title)` | Controls whether the title slot is rendered. |
| `className` | `string` | - | Additional root class name for composition needs. |
| native `section` attrs | `ComponentPropsWithoutRef<"section">` except native `children`/`title` | - | Forwarded to the root layout element when implemented. |

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| root layout identity | `data-figma-render` | `"layout"` |
| root component identity | `data-figma-component-id` | `"page-stack-list"` by default |
| `showTitle ?? Boolean(title)` | `data-figma-property-contents-title` | `"true"` / `"false"` |
| `Slot name="title"` | `data-figma-render`, `data-figma-property-name` | `"slot"`, `"title"` |
| `Slot name="content"` | `data-figma-render`, `data-figma-property-name` | `"slot"`, `"content"` |
| content slot presence | `data-figma-property-contents-slot` | slot metadata on the content slot bridge |

`data-figma-property-contents-title` should be derived from the resolved title visibility when the caller does not pass an explicit bridge value. `data-figma-property-contents-slot` represents the Figma authoring slot, not a visual child component.

### State Rules

- Variants: 없음.
- `contents-title=true` renders the title slot region.
- `contents-title=false` removes the title slot region and keeps the content slot as the first rendered child.
- Slot content should not change the root component identity or introduce new layout variants.
- Interaction, disabled, selected, loading, and error states belong to the child components placed in the slots.

## Usage

Purpose: show expected consumer usage after implementation.

### Import

```tsx
import { PageStackList } from "@pxds/cx-layout/components/compositions";
```

### Examples

```tsx
<PageStackList title={<TitleSection title="타이틀" />}>
  <SectionItem>{content}</SectionItem>
  <SectionItem>{secondaryContent}</SectionItem>
</PageStackList>
```

```tsx
<PageStackList showTitle={false}>
  <SectionItem>{content}</SectionItem>
</PageStackList>
```

```tsx
<PageStackList
  title={
    <TitleSection
      title="혜택 목록"
      rightItem={{ type: "icon", ariaLabel: "혜택 목록 더보기" }}
    />
  }
>
  {items.map((item) => (
    <SectionItem key={item.id}>{item.content}</SectionItem>
  ))}
</PageStackList>
```

## Implementation Guide

Purpose: constrain implementation decisions and validation for the planned `cx-layout` component.

### Do

- Keep `PageStackList` in `@pxds/cx-layout` as a layout compound.
- Preserve the implementation target from inventory: `cx-layout`.
- Keep the implementation dependency surface centered on `Slot` and, if standardized locally, `VStack`.
- Preserve root `data-figma-render="layout"`.
- Preserve root `data-figma-component-id="page-stack-list"` as the default bridge id.
- Preserve `data-figma-property-contents-title` as the bridge boolean for title slot presence.
- Preserve a content slot bridge for Figma's `contents-slot` authoring property.
- Let consumers pass visual title and list content components into slots.
- Use tokenized spacing for root padding, title inset, and vertical stack rhythm.

### Don't

- Do not implement this in `@pxds/cx-components`.
- Do not import `TitleSection`, `TitleSection.LeftItem`, `TitleSection.RightItem`, `Icon`, or `SectionItem_이친구를복붙하세요` inside `cx-layout`.
- Do not promote `ContentsTitle` or `contents slot_복사금지` into visual public components.
- Do not recreate Figma copy-helper names such as `SectionItem_이친구를복붙하세요` as runtime API names.
- Do not add page-route margin, padding, or raw font sizing to make list pages align.
- Do not treat hidden nested title affordances as PageStackList-owned icon requirements.

### Normalization Notes

- `../../component-inventory.md` lists `PageStackList` as `제작 예정`; keep this doc aligned until implementation lands.
- Figma's title region is a layout slot. The nested `TitleSection/Default` is sample payload with `RightItem`, `LeftItem`, and `SubTitle` all disabled in the checked source.
- Figma's `SectionItem_이친구를복붙하세요` instances are sample content payloads and should normalize to `children`.
- `Slot` is the required bridge/runtime concept for `contents-slot`. `VStack` is a layout dependency signal, not permission to add a new visual component vocabulary item.
- The checked source has root padding `12` and title/content inner width `369`. Implementation should map these through existing spacing/layout tokens instead of hard-coding screen-specific correction styles.
- `PageStackList` is close to `PageStackContents`, but this source carries list-specific example content and the explicit `VStack` dependency in inventory. Keep the contracts adjacent without merging them until the layout package decides the repeated structure is truly the same component.

### SVG Assets

SVG asset: not required for `PageStackList`.

The Figma inspection surfaced a hidden nested `TitleSection.RightItem` icon vector under the title instance, but the `PageStackList` source configures `TitleSection/Default` with `RightItem=false`. If a consumer passes a title with an icon affordance, that icon must come from the existing `Icon` vocabulary owned by the title/right-item component, not from a new PageStackList SVG asset.

### Validation

Documentation-only changes do not require app build checks.

When implementation changes are made, validate through consuming app checks:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify the root DOM node includes:

- `data-figma-render="layout"`
- `data-figma-component-id="page-stack-list"`
- `data-figma-property-contents-title`

Verify slot wrappers include:

- `data-figma-render="slot"`
- `data-figma-property-name="title"` when the title slot is rendered
- `data-figma-property-name="content"` always
- content slot bridge metadata for Figma's `contents-slot` property
