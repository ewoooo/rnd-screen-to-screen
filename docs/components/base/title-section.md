# TitleSection

## Overview

Purpose: identify ownership, source, implementation files, and production status.

Figma SOT: [SKT_SDUI_Test_0512 / base section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

Component node checked in Figma: [TitleSection/Default](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=10095-64950&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 완료 |
| Implementation Target | cx-components |
| Figma Source | title-section |
| Dependencies | Actual import: `Badge`; slot/preset contract: `Icon`, `Text`, `ButtonListOrder` |
| Internal Parts | `LeftItem` and `RightItem` are private Figma preset/component-set contracts, not public React components. |
| Variants | 없음 |
| Properties | `data-figma-property-sub-title`: boolean; `data-figma-property-left-item`: boolean; `data-figma-property-right-item`: boolean |

### Implementation Files

- `packages/cx-components/src/components/title-section/TitleSection.tsx`
- `packages/cx-components/src/components/title-section/TitleSection.types.ts`
- `packages/cx-components/src/components/title-section/title-section.variants.ts`
- `packages/cx-components/src/components/title-section/title-section.css`
- `packages/cx-components/src/components/title-section/index.ts`

## Structure

Purpose: define the target component structure and how Figma-only nodes normalize into code.

### Target Structure

```txt
TitleSection
├─ title-row
│  ├─ title-area
│  │  ├─ left-item slot?  -> private preset or caller ReactNode
│  │  └─ title slot
│  └─ right-item slot?   -> private preset or caller ReactNode
└─ sub-title slot?
```

`leftItem`, `rightItem`, and `subTitle` are presence-based regions. The root component owns the boolean bridge properties; the item type markers are emitted only when the local preset renderer handles an item.

### Component Consumption

| Dependency | Contract type | Current implementation |
| --- | --- | --- |
| `Badge` | Actual code import | `TitleSection.tsx` imports and renders `Badge` for `leftItem={{ type: "badge" }}`. |
| `Icon` | Slot/preset input contract | Code accepts `ReactNode` icons in `leftItem.type="icon"`, `rightItem.type="icon"`, `textItemButton.icon`, and `buttonListOrder.icon`; it does not import an Icon component. |
| `Text` | Figma/source vocabulary and text styling contract | Code renders native text elements/spans using typography tokens; it does not import `Text`. |
| `ButtonListOrder` | Figma/source preset contract | `rightItem.type="buttonListOrder"` is rendered locally as a button-shaped preset; code does not import `ButtonListOrder`. |

### Figma Source Difference

Figma keeps `TitleSection/Default` as a single component with boolean component properties:

```txt
TitleSection/Default
├─ SubTitle?                       SubTitle=true/false
└─ Title
   ├─ Title
   │  ├─ Title text
   │  └─ LeftItem?                 LeftItem=true/false, Type=Text/Icon/Badge
   └─ RightItem?                   RightItem=true/false, Type=Icon/TextButton/TextItemButton/ButtonListOrder
```

The `base` section also contains the private component sets `LeftItem` and `RightItem`. They are Figma presets that inform the `leftItem` and `rightItem` prop unions. They should not be documented or exported as public React components.

Code normalizes this into named slots. In current JSX, `leftItem` is rendered before the `title` slot inside `title-area`, while the Figma component shows the default `LeftItem` instance after the title text. This is an implementation difference to keep visible during visual QA; it is not a separate public vocabulary item.

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `TitleSection/Default` | `TitleSection` | yes |
| `SubTitle` | `subTitle` slot | no, conditional region |
| `Title` text | `title` slot | no, required content region |
| `LeftItem` component set | `leftItem` private preset or caller slot | no |
| `RightItem` component set | `rightItem` private preset or caller slot | no |
| `LeftItem / Type=Badge` | `Badge` import inside private preset renderer | `Badge` yes, `LeftItem` no |
| `RightItem / Type=ButtonListOrder` | local `buttonListOrder` preset renderer | no direct code import |

## Props

Purpose: define the public API and the `data-figma-property-*` bridge contract.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` | required | Main title content. |
| `subTitle` | `ReactNode` | - | Optional tertiary subtitle region. Presence drives `sub-title` bridge state. |
| `leftItem` | `ReactNode \| TitleSectionLeftItem preset` | - | Optional left slot or private preset contract. |
| `rightItem` | `ReactNode \| TitleSectionRightItem preset` | - | Optional right slot or private preset contract. |
| `className` | `string` | - | Additional class name on root. |

Native `section` attributes are supported except the native `title` attribute.

### Preset Contracts

`LeftItem` is not a public component. It is represented by the `leftItem` prop and the following private preset objects:

| Preset | Shape | Internal type marker |
| --- | --- | --- |
| Text | `{ type: "text"; text: string }` | `data-figma-property-left-item-type="text"` |
| Icon | `{ type: "icon"; icon: ReactNode; label?: string }` | `data-figma-property-left-item-type="icon"` |
| Badge | `{ type: "badge"; text: string }` | `data-figma-property-left-item-type="badge"` |

`RightItem` is not a public component. It is represented by the `rightItem` prop and the following private preset objects:

| Preset | Shape | Internal type marker |
| --- | --- | --- |
| Icon | `{ type: "icon"; icon: ReactNode; label?: string; onClick?: () => void }` | `data-figma-property-right-item-type="icon"` |
| TextButton | `{ type: "textButton"; text: string; onClick?: () => void }` | `data-figma-property-right-item-type="text-button"` |
| TextItemButton | `{ type: "textItemButton"; label: string; value: string; icon?: ReactNode; onClick?: () => void }` | `data-figma-property-right-item-type="text-item-button"` |
| ButtonListOrder | `{ type: "buttonListOrder"; label: string; icon?: ReactNode; onClick?: () => void }` | `data-figma-property-right-item-type="button-list-order"` |

When `leftItem` or `rightItem` is a plain `ReactNode`, the component renders it as slot content and does not add an internal item type marker.

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| `subTitle` presence | `data-figma-property-sub-title` | `true` / `false` |
| `leftItem` presence | `data-figma-property-left-item` | `true` / `false` |
| `rightItem` presence | `data-figma-property-right-item` | `true` / `false` |

The same booleans are also mirrored as implementation state attributes:

| Code source | Internal state attribute | Value |
| --- | --- | --- |
| `subTitle` presence | `data-sub-title` | `true` / `false` |
| `leftItem` presence | `data-left-item` | `true` / `false` |
| `rightItem` presence | `data-right-item` | `true` / `false` |

### Slot Bridge Attributes

| Slot | Attribute |
| --- | --- |
| title | `data-figma-render="slot"` + `data-figma-property-name="title"` |
| sub-title | `data-figma-render="slot"` + `data-figma-property-name="sub-title"` |
| left-item | `data-figma-render="slot"` + `data-figma-property-name="left-item"` |
| right-item | `data-figma-render="slot"` + `data-figma-property-name="right-item"` |

The exported `TitleSectionFigmaBridgeProps` type currently includes only the root component bridge attributes: `data-figma-render`, `data-figma-component-id`, `data-figma-property-sub-title`, `data-figma-property-left-item`, and `data-figma-property-right-item`.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { TitleSection } from "@pxds/cx-components";
```

### Examples

```tsx
<TitleSection title="타이틀" />

<TitleSection
  title="타이틀"
  subTitle="타이틀"
  leftItem={{ type: "text", text: "2" }}
/>

<TitleSection
  title="타이틀"
  leftItem={{ type: "badge", text: "Badge" }}
/>

<TitleSection
  title="타이틀"
  rightItem={{
    type: "icon",
    icon: <Icon type="arrow-up" size={16} />,
    label: "접기",
  }}
/>

<TitleSection
  title="타이틀"
  rightItem={{
    type: "buttonListOrder",
    label: "인기순",
    icon: <Icon type="dropdown" size={16} />,
  }}
/>
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep one public `TitleSection` component.
- Keep `LeftItem` and `RightItem` as private preset/slot contracts.
- Use `Badge` for the left badge preset because it is an actual code import.
- Accept icon-shaped content through slots/presets without making `TitleSection` import `Icon`.
- Treat `Text` and `ButtonListOrder` as Figma/source vocabulary or preset contracts unless code starts consuming their public components directly.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="title-section"`.
- Preserve the root `data-figma-property-sub-title`, `data-figma-property-left-item`, and `data-figma-property-right-item` bridge attributes.
- Preserve slot bridge names `title`, `sub-title`, `left-item`, and `right-item`.
- Preserve internal item type markers for preset-rendered items.

### Don't

- Export `TitleSection.LeftItem` or `TitleSection.RightItem` as public components from the current implementation.
- Confuse inventory dependencies with actual imports: only `Badge` is imported by `TitleSection.tsx`.
- Add separate public components for Figma `LeftItem` or `RightItem` unless the component vocabulary explicitly changes.
- Add route/screen-local margin or padding to compensate for TitleSection spacing.
- Add new spacing or typography values outside the token system.

### Normalization Notes

- Figma `SubTitle`, `LeftItem`, and `RightItem` component properties normalize to presence-based React props.
- Figma `LeftItem Type=Text/Icon/Badge` normalizes to `leftItem` preset object types `text`, `icon`, and `badge`.
- Figma `RightItem Type=Icon/TextButton/TextItemButton/ButtonListOrder` normalizes to `rightItem` preset object types `icon`, `textButton`, `textItemButton`, and `buttonListOrder`.
- Internal item type markers use code-facing kebab-case values for right item presets: `text-button`, `text-item-button`, and `button-list-order`.
- `data-figma-property-left-item-type` and `data-figma-property-right-item-type` are emitted on preset-rendered internal elements, not declared on `TitleSectionFigmaBridgeProps`.
- Plain `ReactNode` slot content is allowed for `leftItem` and `rightItem`, but it bypasses the internal preset type markers.
- CSS uses tokenized spacing and typography: root column gap `spacing-4`, bottom padding `spacing-16`, title-row gap `spacing-8`, title-area gap `spacing-4`, subtitle `14-med`, and title `16-semi`.

### Validation

`@pxds/cx-components` currently has no package-local `lint` or `build` scripts. Validate through consuming app checks when implementation changes are made.

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify the root DOM node includes:

- `data-figma-render="component"`
- `data-figma-component-id="title-section"`
- `data-figma-property-sub-title`
- `data-figma-property-left-item`
- `data-figma-property-right-item`

Verify preset-rendered item nodes include the applicable marker:

- `data-figma-property-left-item-type="text" | "icon" | "badge"`
- `data-figma-property-right-item-type="icon" | "text-button" | "text-item-button" | "button-list-order"`
