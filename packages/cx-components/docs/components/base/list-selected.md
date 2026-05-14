# ListSelected

## Overview

Purpose: define the implementation-ready contract for the planned selected-list row pattern.

Figma SOT: [SKT_SDUI_Test_0512 / base section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

Component node checked in Figma: [ListSelected](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9598-30155&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 예정 |
| Implementation Target | cx-components candidate |
| Figma Source | list-selected |
| Dependencies | ButtonXsmallSolid, CheckBox, Icon, ListSelectedRightItem, RadioButton, Text |
| Variants | type: Radio/Checkbox |
| Properties | `data-figma-property-show-list-selected-right-item`: boolean; `data-figma-property-show-sub-text`: boolean |

### Implementation Files

Planned in `@pxds/cx-components`:

- `packages/cx-components/src/components/list-selected/ListSelected.tsx`
- `packages/cx-components/src/components/list-selected/ListSelected.types.ts`
- `packages/cx-components/src/components/list-selected/list-selected.variants.ts`
- `packages/cx-components/src/components/list-selected/list-selected.css`
- `packages/cx-components/src/components/list-selected/list-selected.readme.md`
- `packages/cx-components/src/components/list-selected/index.ts`

`ListSelectedRightItem` already exists as a scoped dependency under `packages/cx-components/src/components/list-selected-right-item`.

### Styling Contract

- Component CSS must not define component-local `--cx-*` custom properties.
- Consume theme-neutral aliases from `@pxds/cx-tokens/style.css` directly: prefer `--semantic-*` and `--component-*` tokens.
- Preserve the row spacing contract from Figma: horizontal row gap `8`, vertical padding `8`, and inner text/right-item gap `8`.

## Structure

Purpose: define the row structure and how Figma-only variant nodes normalize into code.

### Target Structure

```txt
ListSelected
├─ control + Text(label)                  type="radio" | "checkbox"
├─ Text(subText)?                         showSubText
└─ ListSelectedRightItem?                 showListSelectedRightItem
```

`ListSelected` owns the list-row layout, selected-control placement, optional sub text, and right-item presence. The control components, right-item affordance, and text styling must stay inside the shared component vocabulary.

### Component Consumption

| Consumed component | Used for | Contract |
| --- | --- | --- |
| `RadioButton` | `type="radio"` leading selected control | Use the existing checked radio state from the control vocabulary. Do not redraw the radio mark in `ListSelected`. |
| `CheckBox` | `type="checkbox"` leading selected control | Use the existing checked checkbox state from the control vocabulary. Do not redraw the check mark in `ListSelected`. |
| `Text` | Main label and optional sub text | Match Figma `14 med`, primary text for label, secondary/right-aligned treatment for sub text through tokens. |
| `ListSelectedRightItem` | Optional right affordance | Compose the private scoped item set; parent owns presence and row alignment. |
| `ButtonXsmallSolid` | Right-item `ButtonXsmallSolid` branch | Consumed through `ListSelectedRightItem`, not recreated in the row. |
| `Icon` | Right-item icon branches and nested button icon vocabulary | Use registered icons through dependencies. Do not import raw Figma asset URLs. |

### Figma Source / Normalization

Figma models `ListSelected` as a component set in the base section:

```txt
ListSelected
├─ type=Radio     393 x 37
│  ├─ Text frame
│  │  ├─ RadioButton checked/on + text "텍스트"
│  │  └─ SubText "-9,900원"
│  └─ ListSelectedRightItem Type=ButtonXsmallSolid
└─ type=Checkbox  393 x 37
   ├─ Text frame
   │  ├─ CheckBox checked/on + text "텍스트"
   │  └─ SubText "-9,900원"
   └─ ListSelectedRightItem Type=ButtonXsmallSolid
```

Figma source measurements checked on node `9598:30155`:

| Layer | Size | Layout | Spacing |
| --- | --- | --- | --- |
| `ListSelected` component set | `433 x 134` | vertical auto layout | padding `20`, gap `20` |
| `type=Radio` | `393 x 37` | horizontal, center aligned | padding top/bottom `8`, gap `8` |
| `type=Checkbox` | `393 x 37` | horizontal, center aligned | padding top/bottom `8`, gap `8` |
| `Text` frame | `340 x 18` radio, `340 x 20` checkbox | horizontal | gap `8` |
| `RadioButton` / `CheckBox` text group | `279 x 18` / `279 x 20` | horizontal | gap `8` |
| `ListSelectedRightItem` | `45 x 21` | private right item | Figma default is `Type=ButtonXsmallSolid` |

Both variants show selected controls in Figma. If an implementation later needs unselected or disabled rows, that should be expressed through the existing `RadioButton` / `CheckBox` props and validated as a new state axis before adding `ListSelected` variants.

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `ListSelected` component set | `ListSelected` | yes |
| `type=Radio` | `type="radio"` | variant value |
| `type=Checkbox` | `type="checkbox"` | variant value |
| nested `RadioButton` | `RadioButton checked` | `RadioButton` yes |
| nested `CheckBox` | `CheckBox checked` | `CheckBox` yes |
| text node `텍스트` | `Text` label content | `Text` yes |
| text node `SubText` | optional `Text` subText | `Text` yes |
| nested `ListSelectedRightItem` | `rightItem` preset/slot | scoped dependency |

## Props

Purpose: define the public API and the Figma bridge contract expected for implementation.

### Props

```ts
type ListSelectedType = "radio" | "checkbox";

type ListSelectedProps = {
  type?: ListSelectedType;
  label: React.ReactNode;
  subText?: React.ReactNode;
  showSubText?: boolean;
  checked?: boolean;
  disabled?: boolean;
  rightItem?: ListSelectedRightItemProps | null;
  showListSelectedRightItem?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
};
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"radio" \| "checkbox"` | `"radio"` | Maps to the Figma `type` variant axis. |
| `label` | `ReactNode` | - | Main row label. Figma sample text is `텍스트`. |
| `subText` | `ReactNode` | - | Optional trailing secondary text. Figma sample text is `-9,900원`. |
| `showSubText` | `boolean` | `Boolean(subText)` | Bridge-friendly visibility flag for the sub text slot. |
| `checked` | `boolean` | `true` | Selected-control state. Figma source shows checked controls only. |
| `disabled` | `boolean` | `false` | Passed to the nested `RadioButton` or `CheckBox` and right item when applicable. |
| `rightItem` | `ListSelectedRightItemProps \| null` | `{ type: "buttonXsmallSolid" }` when shown | Optional right affordance preset. |
| `showListSelectedRightItem` | `boolean` | `Boolean(rightItem)` | Bridge-friendly visibility flag for the right item. |
| `onChange` | `(checked: boolean) => void` | - | Row/control interaction callback when the component owns selection changes. |
| `className` | `string` | - | Additional class name on the root for composition needs. |

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| component root | `data-figma-render` | `component` |
| component root | `data-figma-component-id` | `list-selected` |
| `type="radio"` | `data-figma-property-type` | `radio` |
| `type="checkbox"` | `data-figma-property-type` | `checkbox` |
| `showListSelectedRightItem` | `data-figma-property-show-list-selected-right-item` | `true` / `false` |
| `showSubText` | `data-figma-property-show-sub-text` | `true` / `false` |

Use lowercase code values even though Figma displays `Radio` and `Checkbox`. The two boolean bridge attributes are listed in inventory and should be emitted from the root when the component is implemented.

### State / Variant Rules

- `type="radio"` renders a checked `RadioButton` plus the main label.
- `type="checkbox"` renders a checked `CheckBox` plus the main label.
- `checked=false` is a supported control pass-through only if the dependency components already support it; it is not represented as a separate Figma `ListSelected` variant.
- `showSubText=false` removes the sub text node and keeps row spacing owned by the row layout.
- `showListSelectedRightItem=false` removes the right item and lets the text frame consume available width.
- `rightItem` variants are delegated to `ListSelectedRightItem`; `ListSelected` should not duplicate its `ButtonXsmallSolid`, `Icon`, or `TextButton` branches.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { ListSelected } from "@pxds/cx-components";
```

### Examples

```tsx
<ListSelected
  type="radio"
  label="텍스트"
  subText="-9,900원"
  rightItem={{ type: "buttonXsmallSolid", label: "받기" }}
/>
```

```tsx
<ListSelected
  type="checkbox"
  label="텍스트"
  subText="-9,900원"
  rightItem={{ type: "buttonXsmallSolid", label: "받기" }}
/>
```

```tsx
<ListSelected
  type="radio"
  label="혜택 선택"
  showSubText={false}
  showListSelectedRightItem={false}
/>
```

When a parent list owns the selection model, derive `checked` and `onChange` at the parent and pass normalized values into each row.

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep styling wired to `--semantic-*` / `--component-*` aliases and do not reintroduce component-local `--cx-*` CSS variables.
- Implement one public `ListSelected` component with `type="radio" | "checkbox"`.
- Use `RadioButton` and `CheckBox` for the leading controls.
- Use `Text` for the main label and optional sub text.
- Compose `ListSelectedRightItem` for the optional right affordance.
- Keep row-level gap, padding, min width, and right-item alignment in `ListSelected`, not in screen routes.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="list-selected"`.
- Emit `data-figma-property-type`, `data-figma-property-show-list-selected-right-item`, and `data-figma-property-show-sub-text`.

### Don't

- Do not redraw radio, checkbox, check, download, or arrow glyphs inside `ListSelected`.
- Do not promote `ListSelectedRightItem` controls into top-level `ListSelected` visual branches.
- Do not add route-local margin, padding, or raw font-size overrides to align list rows.
- Do not create separate public `ListSelectedRadio` or `ListSelectedCheckbox` components.
- Do not copy Figma-generated asset URLs into production code.

### Normalization Notes

- `../../component-inventory.md` lists `ListSelected` as `제작 예정`; keep this document as an implementation contract until the component exists.
- The Figma source is a component set named `ListSelected` under the base section, with `type=Radio` and `type=Checkbox` children.
- Figma API access to component property fields can report existing component-set errors in this file, so variant identity is documented from the component child names and structural inspection.
- The source variants both show checked controls and a default `ListSelectedRightItem` of `Type=ButtonXsmallSolid`.
- The Figma sample `SubText` color resolves to `#05001A` in API output, but generated code labels it as `color/text/secondary`; implementation should follow the semantic secondary text token from the component vocabulary.
- The right item's internal download icon belongs to `ButtonXsmallSolid` / `Icon` vocabulary and should not be tracked as a `ListSelected` asset.

### SVG Assets

SVG asset: not required for `ListSelected` itself.

Figma contains vector descendants inside nested dependencies: the selected radio dot, selected checkbox check mark, and the `ButtonXsmallSolid` download icon. Implement them by consuming `RadioButton`, `CheckBox`, `ListSelectedRightItem`, `ButtonXsmallSolid`, and `Icon`; do not add new `ListSelected`-owned SVG assets or copy Figma asset URLs.

### Validation

Documentation-only changes do not require app build checks.

When implementation changes are made, validate through the consuming app:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify:

- `type="radio"` and `type="checkbox"` keep the same row width and vertical rhythm.
- `showSubText=true/false` and `showListSelectedRightItem=true/false` do not require screen-local spacing fixes.
- `rightItem` variants still render through `ListSelectedRightItem`.
- Root bridge attributes include `data-figma-component-id="list-selected"`, `data-figma-property-type`, `data-figma-property-show-list-selected-right-item`, and `data-figma-property-show-sub-text`.
