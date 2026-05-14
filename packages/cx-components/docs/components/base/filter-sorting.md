# FilterSorting

## Overview

Purpose: define the implementation-ready contract for the Phase 4 list sorting and filter control row.

Figma SOT: [SKT_SDUI_Test_0512 / base section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

Component node checked in Figma: [FilterSorting](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9638-92802&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 예정 |
| Implementation Target | cx-components candidate |
| Figma Source | filter-sorting |
| Dependencies | ButtonListOrder, Divider, Icon |
| Variants | 없음 |
| Properties | `data-figma-property-divider`: boolean |

### Implementation Files

Planned in `@pxds/cx-components`:

- `packages/cx-components/src/components/filter-sorting/FilterSorting.tsx`
- `packages/cx-components/src/components/filter-sorting/FilterSorting.types.ts`
- `packages/cx-components/src/components/filter-sorting/filter-sorting.variants.ts`
- `packages/cx-components/src/components/filter-sorting/filter-sorting.css`
- `packages/cx-components/src/components/filter-sorting/filter-sorting.readme.md`
- `packages/cx-components/src/components/filter-sorting/index.ts`

### Styling Contract

- Component CSS must not define component-local `--cx-*` custom properties.
- Consume theme-neutral aliases from `@pxds/cx-tokens/style.css` directly: prefer `--semantic-*` and `--component-*` tokens.

## Structure

Purpose: preserve the Figma composition while normalizing smaller controls to existing component vocabulary.

### Target Structure

```txt
FilterSorting
├─ Divider?                         divider=true
└─ content row
   ├─ count label                    "전체256개"
   └─ action group
      ├─ ButtonListOrder
      ├─ separator                   private 1px x 12px rule
      └─ filter action
         ├─ label "필터"
         └─ Icon(type="filter", size=16)
```

`FilterSorting` owns the row composition, content padding, and the optional top divider. It should not reimplement the `ButtonListOrder` text-plus-dropdown control.

### Component Consumption

| Consumed component | Used for | Requirement |
| --- | --- | --- |
| `ButtonListOrder` | Sorting action | Use the implemented `ButtonListOrder` component for the order label and dropdown icon. |
| `Divider` | Optional top content divider | Use the existing `Divider` component with the contents divider treatment when `divider=true`. |
| `Icon` | Filter action icon | Use a registered 16px filter icon once available. Do not inline the Figma vector in `FilterSorting` after the icon is registered. |

The vertical separator between sorting and filter is an internal rule, not a `Divider` component instance and not a public component vocabulary item.

### Figma Source / Normalization

Figma models `FilterSorting` as a single component with one boolean property:

```txt
FilterSorting (393 x 52)
├─ filter (393 x 50)
│  └─ con (329 x 18)
│     ├─ txt
│     │  ├─ "전체"
│     │  ├─ "256"
│     │  └─ "개"
│     └─ btn
│        ├─ ButtonListOrder
│        │  ├─ "인기순"
│        │  └─ Icon / Size=16, Type=Dropdown
│        ├─ div
│        └─ btn-txt-filter
│           ├─ "필터"
│           └─ ico-filter
└─ Divider                               visible bound to Divider boolean
```

Figma measurements checked on node `9638:92802`:

| Node | Size | Layout | Spacing |
| --- | --- | --- | --- |
| `FilterSorting` | 393 x 52 | fixed root | no root fill/stroke |
| `filter` | 393 x 50 | vertical auto layout | padding `32px` horizontal, `16px` vertical |
| `con` | 329 x 18 | horizontal fixed | gap `80px`, center aligned |
| `txt` | 63 x 18 | horizontal hug | no gap between text fragments |
| `btn` | 123 x 18 | horizontal hug | gap `12px` |
| `div` | 1 x 12 | rectangle | fill `#EBEEF6` |
| `btn-txt-filter` | 44 x 18 | horizontal hug | gap `4px` |
| `Divider` | 393 x 1 | `Divider / Type=Contents` instance | visible when `Divider=true` |

All visible text uses Pretendard Variable Bold, `14`, line-height `130%`, letter-spacing `-4%`, fill `#05001A`.

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `FilterSorting` component | `FilterSorting` | yes |
| `filter` frame | root content wrapper | no |
| `txt` text fragments | count label branch | no, text treatment should use shared typography tokens/classes |
| `ButtonListOrder` instance | `<ButtonListOrder />` | yes |
| `div` rectangle | private separator element or CSS pseudo-element | no |
| `btn-txt-filter` | filter action branch | no, scoped to `FilterSorting` |
| `ico-filter` vector frame | `Icon type="filter" size={16}` once registered | `Icon` yes, glyph asset yes |
| `Divider / Type=Contents` instance | `<Divider variant="contents" />` or equivalent existing API | yes |

## Props

Purpose: define the public API and the Figma bridge contract.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `totalCount` | `number` | `256` | Count rendered between `totalLabel` and `totalUnit`. |
| `totalLabel` | `string` | `"전체"` | Prefix for the count label. |
| `totalUnit` | `string` | `"개"` | Suffix for the count label. |
| `orderLabel` | `string` | `"인기순"` | Label passed to `ButtonListOrder`. |
| `filterLabel` | `string` | `"필터"` | Visible label for the filter action. |
| `divider` | `boolean` | `true` | Controls the optional top contents divider. |
| `onOrderClick` | `() => void` | - | Opens or changes sorting. Passed to `ButtonListOrder`. |
| `onFilterClick` | `() => void` | - | Opens filter controls. |
| `className` | `string` | - | Additional class name on the root. |

Prefer resolved display values at the component boundary. For example, screen-level data formatting can decide whether `256` should be grouped, abbreviated, or localized before passing it into this component.

### Figma Mapping Props

| Code source | Figma property | Bridge value |
| --- | --- | --- |
| `divider=false` | `Divider=false` | `data-figma-property-divider="false"` |
| `divider=true` | `Divider=true` | `data-figma-property-divider="true"` |

If implemented as a bridgeable component, use stable identity attributes:

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| component root | `data-figma-render` | `component` |
| component root | `data-figma-component-id` | `filter-sorting` |
| resolved `divider` | `data-figma-property-divider` | `true` / `false` |

Figma exposes no variant axis for this component. Do not invent extra `data-figma-property-*` attributes for count text, order label, or filter label unless Figma adds corresponding component properties.

### State Rules

- `divider=true` shows the top `Divider / Type=Contents` instance and keeps the root height at the Figma source height.
- `divider=false` hides that divider; content row layout remains unchanged.
- Sorting and filter interaction state belongs to parent flows or overlay components. `FilterSorting` only forwards `onOrderClick` and `onFilterClick`.
- If either action is rendered as a native button, keep the visible label as the accessible name unless an additional `aria-label` prop is introduced later.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { FilterSorting } from "@pxds/cx-components";
```

### Examples

```tsx
<FilterSorting totalCount={256} orderLabel="인기순" />

<FilterSorting
  totalCount={12}
  orderLabel="최신순"
  onOrderClick={openSortSheet}
  onFilterClick={openFilterSheet}
/>

<FilterSorting totalCount={0} divider={false} />
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep styling wired to `--semantic-*` / `--component-*` aliases and do not reintroduce component-local `--cx-*` CSS variables.
- Implement one public `FilterSorting` component.
- Consume `ButtonListOrder` for the sorting action.
- Consume `Divider` for the optional top divider instead of drawing a second component-like divider locally.
- Keep the 1px x 12px separator private to this component.
- Normalize the Figma `Divider` boolean to the lowercase `divider` prop and bridge value `"true"` / `"false"`.
- Use typography tokens/classes for the 14 bold count and filter labels; record a token gap if the exact Figma style is unavailable.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="filter-sorting"` when the component is implemented.
- Add `data-figma-property-divider` on the root.

### Don't

- Do not reimplement `ButtonListOrder` inside `FilterSorting`.
- Do not promote the internal separator to a public `Divider` variant.
- Do not add additional variants absent from Figma.
- Do not add route-level margin, padding, or raw style compensation to align the row.
- Do not inline the Figma filter vector after the glyph is added to the `Icon` registry.

### Normalization Notes

- `../../component-inventory.md` lists `FilterSorting` as Phase 4 because it composes existing smaller vocabulary: `ButtonListOrder`, `Divider`, and `Icon`.
- Figma property `Divider#9638:7` is a boolean visibility binding on the nested `Divider` instance; code should expose it as `divider`.
- Figma splits the count into three text nodes: `"전체"`, `"256"`, and `"개"`. Code should treat this as one count label branch rather than exposing three independent text slots by default.
- The source layout uses a fixed `80px` gap between count and actions inside a 329px row. Implementation should prefer a resilient row layout that preserves the left/right relationship without route-level width hacks.
- `ButtonListOrder` uses the existing `Icon / Size=16, Type=Dropdown`; the code registry key is `dropdown`.
- The filter glyph is not a nested Figma `Icon` instance in the checked source. It should be normalized into the icon registry before or during implementation.

### SVG Assets

SVG asset required: filter icon.

Figma's sorting dropdown uses the existing `Icon / Size=16, Type=Dropdown`, so no new dropdown asset is required. The filter action uses a local `ico-filter` vector frame (`9274:30517` / `9274:30519`) rather than an `Icon` component instance, and the current CX icon registry does not expose a `filter` icon. Add or map a 16px filter glyph in `@pxds/cx-icons` before implementing `Icon type="filter" size={16}`.

### Validation

Documentation-only changes do not require app build checks.

When implementation changes are made, validate through the consuming app:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify:

- The root DOM node includes `data-figma-render="component"`, `data-figma-component-id="filter-sorting"`, and `data-figma-property-divider`.
- `ButtonListOrder` renders as the sorting action and keeps its own `button-list-order` bridge identity.
- `divider=true` renders the existing contents `Divider`; `divider=false` hides it without changing the action row contract.
- The filter action uses a registered 16px filter icon asset, not an inline route-local SVG.
