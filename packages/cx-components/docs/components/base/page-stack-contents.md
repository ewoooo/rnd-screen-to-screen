# PageStackContents

## Overview

Purpose: identify ownership, source, implementation files, and production status.

Figma SOT: [SKT_SDUI_Test_0512 / base section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

Primary Figma component node: [PageStackContents](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9945-46762&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 완료 |
| Implementation Target | pxds-layout |
| Figma Source | page-stack-contents |
| Code dependencies | `Slot` primitive |
| Figma source dependencies | Icon, TitleSection.LeftItem, TitleSection.RightItem, SectionItem_이친구를복붙하세요, TitleSection/Default, Slot |
| Variants | 없음 |
| Properties | `data-figma-property-contents-title`: boolean; Figma source also exposes `contents-slot`, `title-swap`, and `title-type` as slot/instance-swap authoring controls |

### Implementation Files

- `packages/pxds-layout/src/components/compositions/page-stack-contents/PageStackContents.tsx`
- `packages/pxds-layout/src/components/compositions/page-stack-contents/PageStackContents.types.ts`
- `packages/pxds-layout/src/components/compositions/page-stack-contents/page-stack-contents.variants.ts`
- `packages/pxds-layout/src/components/compositions/page-stack-contents/page-stack-contents.css`
- `packages/pxds-layout/src/components/compositions/page-stack-contents/index.ts`

## Structure

Purpose: define the target component structure and how Figma-only nodes normalize into code.

### Target Structure

```txt
PageStackContents
├─ Slot(name="title")?
│  └─ title ReactNode
└─ Slot(name="content")
   └─ children ReactNode
```

`PageStackContents` is a `pxds-layout` layout compound. It owns vertical section stacking, optional title slot presence, root Figma bridge metadata, and named slot wrappers. It does not own visual semantics for the title or content children.

### Rendered DOM Contract

```tsx
<section
  data-figma-render="layout"
  data-figma-component-id="page-stack-contents"
  data-figma-property-contents-title="true|false"
  data-contents-title="true|false"
>
  <Slot name="title">...</Slot>
  <Slot name="content">...</Slot>
</section>
```

The `title` slot is rendered only when `showTitle` resolves to `true`. The `content` slot is always rendered.

The `Slot` primitive adds slot-level bridge metadata:

```txt
data-figma-render="slot"
data-figma-property-name="title" | "content"
data-slot="title" | "content"
data-layout-slot="true"
```

### Component Consumption

| Consumed component | Used for | Current implementation |
| --- | --- | --- |
| `Slot` | Named `title` and `content` layout wrappers | Imported from `../../primitives`. |

`PageStackContents` must not import `@pxds/cx-components` or any CX visual component. Consumers may pass CX/PXDS visual components into `title` or `children`, but this layout compound should only see them as React nodes.

### Figma Source Difference

Figma models `PageStackContents` as a 393px-wide stack with optional `ContentsTitle`, a swappable `TitleSection/Default`, and example `SectionItem_이친구를복붙하세요` children inside a content slot.

Compressed Figma source:

```txt
PageStackContents
├─ ContentsTitle?                         (contents-title=true)
│  └─ TitleSection/Default                (title-swap/title-type authoring)
└─ ContentsSlot_복사금지                   (contents-slot)
   ├─ SectionItem_이친구를복붙하세요        (example content)
   └─ SectionItem_이친구를복붙하세요        (example content)
```

Code keeps only the layout contract:

```txt
PageStackContents
├─ Slot(title)?
└─ Slot(content)
```

### Node Mapping

| Figma node/property | Code structure | Public vocabulary? |
| --- | --- | --- |
| `PageStackContents` | `PageStackContents` root `section` | yes, layout compound |
| `ContentsTitle` | Optional `Slot name="title"` | no, normalized slot region |
| `TitleSection/Default` | Consumer-provided `title` ReactNode | no dependency from `pxds-layout` |
| `TitleSection.LeftItem` / `TitleSection.RightItem` / `Icon` | Inside consumer-provided title component | no dependency from `pxds-layout` |
| `ContentsSlot_복사금지` / `contents-slot` | `Slot name="content"` wrapping `children` | normalized to `Slot` |
| `SectionItem_이친구를복붙하세요` | Consumer-provided `children` examples | no dependency from `pxds-layout` |
| `contents-title` | `showTitle ?? Boolean(title)` | yes, bridge boolean |
| `title-swap` / `title-type` | `title` ReactNode composition | no root bridge attribute in current code |

## Props

Purpose: define the public API and the `data-figma-property-*` bridge contract.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` | - | Optional title slot content. |
| `children` | `ReactNode` | - | Content slot children. |
| `showTitle` | `boolean` | `Boolean(title)` | Controls whether the `title` slot is rendered. |
| `className` | `string` | - | Additional root class name. |
| native `section` attrs | `ComponentPropsWithoutRef<"section">` except native `children`/`title` | - | Forwarded to the root `section`. |

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| root layout identity | `data-figma-render` | `"layout"` |
| root component identity | `data-figma-component-id` | `"page-stack-contents"` by default |
| `showTitle ?? Boolean(title)` | `data-figma-property-contents-title` | `"true"` / `"false"` |
| `Slot name="title"` | `data-figma-render`, `data-figma-property-name` | `"slot"`, `"title"` |
| `Slot name="content"` | `data-figma-render`, `data-figma-property-name` | `"slot"`, `"content"` |

`data-figma-render`, `data-figma-component-id`, and `data-figma-property-contents-title` can be passed explicitly for bridge use. When `data-figma-property-contents-title` is not passed, code derives it from the resolved title visibility.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { PageStackContents } from "@pxds/pxds-layout/components/compositions";
```

### Examples

```tsx
<PageStackContents title={<TitleSection title="타이틀" />}>
  <TextField label="이름" />
</PageStackContents>
```

```tsx
<PageStackContents showTitle={false}>
  <SectionItem />
</PageStackContents>
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep `PageStackContents` in `@pxds/pxds-layout` as a layout compound.
- Keep the implementation dependency surface centered on the `Slot` primitive.
- Preserve root `data-figma-render="layout"`.
- Preserve root `data-figma-component-id="page-stack-contents"` as the default bridge id.
- Preserve `data-figma-property-contents-title` as the bridge boolean for title slot presence.
- Preserve the actual code slot structure: optional `Slot name="title"` and always-present `Slot name="content"`.
- Let consumers pass visual title/content components into slots.

### Don't

- Do not import `@pxds/cx-components` from `PageStackContents`.
- Do not import or recreate `TitleSection`, `TitleSection.LeftItem`, `TitleSection.RightItem`, `Icon`, or `SectionItem_이친구를복붙하세요` inside `pxds-layout`.
- Do not promote Figma-only `ContentsTitle`, `ContentsSlot_복사금지`, `title-swap`, or `title-type` nodes into layout-owned visual APIs.
- Do not add route/screen-local margin or padding to compensate for this component's stack spacing.

### Normalization Notes

- Figma's `TitleSection/Default` is an example/default title payload. In code it normalizes to the `title` ReactNode passed by the consumer.
- Figma's `SectionItem_이친구를복붙하세요` nodes are example content payloads. In code they normalize to `children`.
- Figma's `contents-slot` authoring property is represented by the always-rendered `Slot name="content"` wrapper and its slot bridge attributes.
- Figma's `title-swap` and `title-type` authoring controls are not root props in current code. Consumers choose the title component before passing it into `title`.
- Figma shows horizontal padding on the component example and nested content examples. Current code only owns `padding-block: var(--spacing-32)` on the root and full-width slot wrappers; horizontal rails/insets belong to the surrounding layout or child content vocabulary.

### Validation

Validate through consuming app checks when this layout component changes:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify the root DOM node includes:

- `data-figma-render="layout"`
- `data-figma-component-id="page-stack-contents"`
- `data-figma-property-contents-title`

Verify slot wrappers include:

- `data-figma-render="slot"`
- `data-figma-property-name="title"` when the title slot is rendered
- `data-figma-property-name="content"` always
