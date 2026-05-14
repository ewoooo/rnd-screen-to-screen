# ListText

## Overview

Purpose: define the implementation-ready contract for the planned list text row that can render either a normal text row with a right item or a table-style two-column row.

Figma SOT: [SKT_SDUI_Test_0512 / base section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

Component node checked in Figma: [ListText](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=10013-114672&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 예정 |
| Implementation Target | cx-components candidate |
| Figma Source | list-text |
| Dependencies | Icon, ListText.RightItem, Text, Divider |
| Variants | Table: off/on |
| Properties | `data-figma-property-right-item`: boolean |

### Implementation Files

Planned in `@pxds/cx-components`:

- `packages/cx-components/src/components/list-text/ListText.tsx`
- `packages/cx-components/src/components/list-text/ListText.types.ts`
- `packages/cx-components/src/components/list-text/list-text.variants.ts`
- `packages/cx-components/src/components/list-text/list-text.css`
- `packages/cx-components/src/components/list-text/list-text.readme.md`
- `packages/cx-components/src/components/list-text/index.ts`

Existing scoped dependency:

- `packages/cx-components/src/components/list-text-right-item/ListTextRightItem.tsx`
- `packages/cx-components/src/components/list-text-right-item/ListTextRightItem.types.ts`
- `packages/cx-components/src/components/list-text-right-item/list-text-right-item.variants.ts`
- `packages/cx-components/src/components/list-text-right-item/list-text-right-item.css`
- `packages/cx-components/src/components/list-text-right-item/index.ts`

### Styling Contract

- Component CSS must not define component-local `--cx-*` custom properties.
- Consume theme-neutral aliases from `@pxds/cx-tokens/style.css` directly: prefer `--semantic-*` and `--component-*` tokens.
- `ListText` owns row layout, table mode, right-item presence, and optional divider placement.
- `ListText.RightItem` owns right-side text, badge, text-button, and icon affordance rendering.

## Structure

Purpose: preserve the Figma row contract while normalizing right-side affordances into the private `ListText.RightItem` dependency.

### Target Structure

```txt
ListText
├─ main text
├─ secondary/table text?       (table=true)
├─ ListText.RightItem?         (table=false, rightItem=true)
└─ Divider?                    (when parent list needs row separation)
```

`ListText` is a public row compound. It should keep text-row spacing, table-column behavior, right-item presence, and divider usage in one component contract instead of forcing screens to compose local inline rows.

### Component Consumption

| Consumed component | Used for | Contract |
| --- | --- | --- |
| `Text` | Main row text and table text | Use the shared text vocabulary or equivalent tokenized text branch for Figma `14 med`, `color/text/primary`. |
| `ListText.RightItem` | Optional trailing affordance in non-table rows | Use the existing private scoped component/preset. Default Figma source shape is `Type=Icon` with ArrowRight. |
| `Icon` | Nested right-item arrow | Consume through `ListText.RightItem`; use registered `Icon / Size=16, Type=ArrowRight`. Do not inline the vector. |
| `Divider` | Optional row separation in list contexts | Use existing `Divider` when list composition needs a divider. Do not recreate a border in the screen route. |

### Figma Source Difference

Figma models `ListText` as a component set with one visible variant axis:

```txt
ListText
├─ Table=off
│  ├─ LeftItem
│  │  └─ text "본문"
│  └─ RightItem / Type=Icon
│     └─ Icon / Size=16, Type=ArrowRight
└─ Table=on
   ├─ text "일이삼사오육칠"
   └─ Text "본문"
```

Figma measurements checked on node `10013:114672`:

| Variant | Size | Layout | Gap | Padding | Notes |
| --- | --- | --- | --- | --- | --- |
| `Table=off` | `393 x 22` | horizontal auto layout, fixed width, hug height | `16` | bottom `4` | Main text fills width; right item is `16 x 16` ArrowRight icon. |
| `Table=on` | `393 x 22` | horizontal auto layout, fixed width, hug height | `8` | bottom `4` | Two text columns: first `85 x 18`, second `24 x 18`. |

Text visual notes checked in Figma:

| Node | Text | Typography | Color |
| --- | --- | --- | --- |
| `Table=off / LeftItem / text` | `본문` | Pretendard Variable Medium, `14`, line-height `130%`, letter-spacing `-4%` | `#05001A` |
| `Table=on / text` | `일이삼사오육칠` | Pretendard Variable Medium, `14`, line-height `130%`, letter-spacing `-4%` | `#05001A` |
| `Table=on / Text` | `본문` | Pretendard Variable Medium, `14`, line-height `130%`, letter-spacing `-4%` | `#05001A` |

Figma API access to component property fields currently reports existing component-set errors, so the documented `right-item` property is based on the inventory and child structure rather than a direct `componentProperties` read. The node names and hierarchy were checked directly in Figma.

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `ListText` component set | `ListText` | yes |
| `Table=off` | `table={false}` or `variant="default"` | variant value |
| `Table=on` | `table={true}` or `variant="table"` | variant value |
| `LeftItem / text` | primary text content | no separate left-item public component |
| second text in `Table=on` | table secondary text | no separate component |
| `RightItem / Type=Icon` | `rightItem={{ type: "icon", ariaLabel }}` | private preset |
| nested `Icon / ArrowRight` | `Icon type="arrow-right" size={16}` through `ListText.RightItem` | `Icon` yes |
| `Divider` dependency | optional divider below or between rows | `Divider` yes |

## Props

Purpose: define the public API and the Figma bridge contract.

### Props

```ts
type ListTextRightItem =
  | { type: "text"; text: string }
  | { type: "badgeLevel"; levels?: Array<"v" | "g" | "s"> }
  | { type: "textButton"; text: string; onClick?: () => void; ariaLabel?: string }
  | { type: "icon"; icon?: "arrow-right"; onClick?: () => void; ariaLabel?: string };
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | - | Primary row text. |
| `text` | `ReactNode` | `"본문"` | Primary row text fallback when `children` is absent. |
| `table` | `boolean` | `false` | Maps to Figma `Table=off/on`. |
| `tableText` | `ReactNode` | - | Secondary text used when `table=true`. |
| `rightItem` | `ListTextRightItem \| false` | `{ type: "icon" }` when `table=false` | Optional right-side item. Ignored when `table=true` unless Figma adds that combination. |
| `showRightItem` | `boolean` | resolved from `rightItem` | Presence bridge for `data-figma-property-right-item`. |
| `showDivider` | `boolean` | `false` | Renders a tokenized `Divider` for list composition when needed. |
| `className` | `string` | - | Additional class name on the root, only for composition needs. |

Native `div` or row attributes may be supported on the root. If the row is interactive, the whole row should own the click target and accessibility label unless a nested right item is explicitly interactive.

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| root render marker | `data-figma-render` | `component` |
| resolved component id | `data-figma-component-id` | `list-text` |
| `table=false` | `data-figma-property-table` | `off` |
| `table=true` | `data-figma-property-table` | `on` |
| resolved right-item presence | `data-figma-property-right-item` | `true` / `false` |
| nested right item type | `data-figma-property-type` on `ListText.RightItem` | `Text` / `BadgeLevel` / `TextButton` / `Icon` |

`data-figma-property-right-item` is a parent row presence property. It should not replace the nested `ListText.RightItem` type marker when a right item is rendered.

### State Rules

- `table=false` maps to Figma `Table=off`: one primary text region plus optional right item.
- `table=true` maps to Figma `Table=on`: two text regions with an 8px source gap and no right item in the checked SOT.
- `rightItem` defaults to the Figma source shape only for non-table rows: `type: "icon"` using ArrowRight.
- `showRightItem=false` removes the right item while preserving the row text contract.
- `table=true` should ignore or reject `rightItem` until Figma exposes a table-plus-right-item variant.
- `showDivider` is a list-composition convenience, not a Figma variant axis on the checked `ListText` component set.
- The component has no independent disabled, selected, pressed, loading, or error state in the checked SOT.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { ListText } from "@pxds/cx-components";
```

### Examples

```tsx
<ListText text="본문" />

<ListText
  text="상세 내역"
  rightItem={{ type: "icon", ariaLabel: "상세 내역 보기" }}
/>

<ListText
  text="이용 요금"
  rightItem={{ type: "text", text: "-3,000원" }}
/>

<ListText table text="일이삼사오육칠" tableText="본문" />

<ListText text="구분선이 있는 항목" showDivider />
```

Parent list sections should compose repeated `ListText` rows and let `ListText` own row-internal spacing. Do not recreate the row with route-local `display: flex`, raw padding, or inline font-size overrides.

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep styling wired to `--semantic-*` / `--component-*` aliases and do not reintroduce component-local `--cx-*` CSS variables.
- Implement one public `ListText` component.
- Consume the existing private `ListText.RightItem` dependency for trailing affordances.
- Use `Text` vocabulary or the established tokenized text branch for both text regions.
- Use registered `Icon type="arrow-right" size={16}` through `ListText.RightItem` for the default right item.
- Use `Divider` for divider rendering when the parent list needs row separation.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="list-text"`.
- Preserve `data-figma-property-table="off|on"` and `data-figma-property-right-item="true|false"` on the root.
- Keep row gap, bottom padding, typography, and color tokenized from the Figma source.

### Don't

- Create public `ListText.LeftItem`, `ListText.TableItem`, or `ListText.RightItem` exports from this parent component work.
- Inline the ArrowRight vector in `ListText`.
- Add route/screen-local margin, padding, or font-size overrides to align rows.
- Treat the fixed `393px` Figma width as a runtime fixed width; the parent layout should define available width.
- Allow table mode and right-item mode to combine silently unless the Figma SOT adds that variant.
- Recreate divider styling with a local border when `Divider` is the listed dependency.

### Normalization Notes

- `../../component-inventory.md` lists `ListText` as Phase 4 because it composes `ListText.RightItem`, `Text`, `Icon`, and `Divider`.
- Inventory status remains `제작 예정`; this document is an implementation contract, not a code implementation.
- Figma `Table=off/on` should normalize to a boolean `table` prop or a stable enum before styling and bridge attributes are emitted.
- The checked `Table=off` source contains a `LeftItem` frame, but code should normalize that to primary text content rather than adding a public left-item vocabulary.
- The checked `Table=on` source contains two sibling text nodes. Code should expose this as primary text plus `tableText` and keep both text treatments aligned with the shared row typography.
- Figma component property access currently reports existing errors for this component set; node names, hierarchy, measurements, text styling, and nested component identities were still inspected directly.

### SVG Assets

SVG asset: not required.

Figma uses the existing `Icon / Size=16, Type=ArrowRight` component inside `ListText.RightItem / Type=Icon`. The icon instance contains a vector layer in Figma, but implementation should consume the registered `Icon` dependency and should not add a new SVG asset for `ListText`.

### Validation

Documentation-only changes do not require app build checks.

When implementation changes are made, validate through the consuming app:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify:

- The root DOM node includes `data-figma-render="component"` and `data-figma-component-id="list-text"`.
- The root DOM node includes `data-figma-property-table="off"` or `"on"`.
- The root DOM node includes `data-figma-property-right-item="true"` or `"false"`.
- `table=false` renders primary text plus the normalized right item without row-height shift.
- `table=true` renders two text regions and does not render a right item under the current SOT.
- Any divider is rendered through `Divider`, not a route-local border.
- No unregistered SVG asset is introduced for the ArrowRight icon.
