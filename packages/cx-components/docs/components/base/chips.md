# Chips

## Overview

Purpose: define the implementation-ready contract for the planned horizontal chip group composed from `ChipItem`.

Figma SOT: [SKT_SDUI_Test_0512 / base section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

Component node checked in Figma: [Chips](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9638-78472&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 예정 |
| Implementation Target | cx-components candidate |
| Figma Source | chips |
| Dependencies | ChipItem |
| Variants | 없음 |
| Properties | 없음 |

### Implementation Files

Planned in `@pxds/cx-components`:

- `packages/cx-components/src/components/chips/Chips.tsx`
- `packages/cx-components/src/components/chips/Chips.types.ts`
- `packages/cx-components/src/components/chips/chips.variants.ts`
- `packages/cx-components/src/components/chips/chips.css`
- `packages/cx-components/src/components/chips/chips.readme.md`
- `packages/cx-components/src/components/chips/index.ts`

Current dependency already exists:

- `packages/cx-components/src/components/chip-item/ChipItem.tsx`
- `packages/cx-components/src/components/chip-item/ChipItem.types.ts`
- `packages/cx-components/src/components/chip-item/chip-item.variants.ts`
- `packages/cx-components/src/components/chip-item/chip-item.css`
- `packages/cx-components/src/components/chip-item/index.ts`

### Styling Contract

- Component CSS must not define component-local `--cx-*` custom properties.
- Consume theme-neutral aliases from `@pxds/cx-tokens/style.css` directly: prefer `--semantic-*` and `--component-*` tokens.
- `Chips` owns only group layout: horizontal flow, group padding, gap, overflow behavior, and selected value coordination.
- `ChipItem` owns pill fill, radius, typography, and selected visual treatment.

## Structure

Purpose: preserve the Figma composition while keeping pill styling inside `ChipItem`.

### Target Structure

```txt
Chips
├─ ChipItem(selected)
├─ ChipItem
├─ ChipItem
└─ ...
```

`Chips` is a public compound that composes repeated `ChipItem` instances. It should not introduce a second chip pill vocabulary or restyle `ChipItem` from the parent.

### Component Consumption

| Consumed component | Used for | Requirement |
| --- | --- | --- |
| `ChipItem` | Each option pill | Render every option through `ChipItem`; pass normalized `selected` state and label content. |

### Figma Source / Normalization

Figma models `Chips` as one non-variant component:

```txt
Chips
├─ ChipItem Selected=On  text "전체"
├─ ChipItem Selected=Off text "EAT"
├─ ChipItem Selected=Off text "BUY"
├─ ChipItem Selected=Off text "PLAY"
├─ ChipItem Selected=Off text "선불폰"
├─ ChipItem Selected=Off text "단말기"
├─ ChipItem Selected=Off text "단말기"
├─ ChipItem Selected=Off text "단말기"
└─ ChipItem Selected=Off text "단말기"
```

Figma visual notes from node `9638:78472`:

| Property | Value |
| --- | --- |
| Size | `393 x 65` |
| Layout | horizontal auto layout, no wrap |
| Alignment | start on primary axis, center on counter axis |
| Padding | left `20`, right `0`, top `12`, bottom `12` |
| Gap | `4` |
| Child count | 9 `ChipItem` instances |
| Default selected example | first item, `Selected=On`, label `전체` |

Each child is an instance of the `ChipItem` component set. The checked source has no component-level variants or properties on `Chips`; selection is represented only by the nested `ChipItem.Selected` property.

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `Chips` component | `Chips` | yes |
| Nested `ChipItem` instances | `items.map(...) => <ChipItem />` | `ChipItem` yes |
| `ChipItem / Selected=On` | `selectedValue` or `selectedIndex` resolves one item to `selected=true` | nested variant |
| `ChipItem / Selected=Off` | non-selected items receive `selected=false` | nested variant |
| Text overrides | item label content | data, not a slot component |

## Props

Purpose: define the public API and the Figma bridge contract.

### Props

```ts
type ChipsItem = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `ChipsItem[]` | - | Ordered chip options. Labels should be short. |
| `value` | `string` | - | Controlled selected item value. |
| `defaultValue` | `string` | - | Uncontrolled initial selected value. |
| `onValueChange` | `(value: string) => void` | - | Called when a chip option is selected. |
| `selectionMode` | `"single"` | `"single"` | Current Figma source shows one selected item. Keep the API single-select until multi-select appears in SOT. |
| `ariaLabel` | `string` | - | Accessible label for the chip group when visible context is insufficient. |
| `className` | `string` | - | Additional class name on the root, only for composition needs. |

Native `div` or list attributes may be supported on the root. If the group is interactive, each `ChipItem` should expose button semantics or be wrapped in an accessible option pattern without changing its visual contract.

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| root render marker | `data-figma-render` | `component` |
| resolved component id | `data-figma-component-id` | `chips` |
| selected value | `data-figma-property-selected-value` | selected item value, if needed by export |
| child selected state | `data-figma-property-selected` on `ChipItem` | `on` / `off` |

Figma lists no `Chips` component properties. The bridge should still identify the root as `chips`, while preserving each child `ChipItem` selected marker for nested component matching.

### State/Variant Rules

- `Chips` has no standalone Figma variant axis.
- Exactly one item should be selected for the current contract.
- If `value` and `defaultValue` are both absent, select the first item by default to match the Figma example.
- Do not add disabled, multi-select, close, icon, or overflow variants until they appear in the component inventory or Figma SOT.
- Selection state must be normalized before rendering children so only `ChipItem` receives `selected=true`.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { Chips } from "@pxds/cx-components";
```

### Examples

```tsx
<Chips
  ariaLabel="관심사 필터"
  items={[
    { value: "all", label: "전체" },
    { value: "eat", label: "EAT" },
    { value: "buy", label: "BUY" },
    { value: "play", label: "PLAY" },
    { value: "prepaid", label: "선불폰" },
    { value: "device", label: "단말기" },
  ]}
  value={selectedCategory}
  onValueChange={setSelectedCategory}
/>
```

Equivalent manual composition should remain possible when a route needs custom state ownership:

```tsx
<div data-figma-render="component" data-figma-component-id="chips">
  {items.map((item) => (
    <ChipItem
      key={item.value}
      selected={item.value === selectedCategory}
      onClick={() => setSelectedCategory(item.value)}
    >
      {item.label}
    </ChipItem>
  ))}
</div>
```

Prefer the public `Chips` component once it exists so group spacing and Figma bridge metadata stay consistent.

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep styling wired to `--semantic-*` / `--component-*` aliases and do not reintroduce component-local `--cx-*` CSS variables.
- Implement one public `Chips` compound component.
- Compose `ChipItem` for every visible option.
- Keep `Chips` responsible for group spacing, horizontal layout, selected value normalization, and root bridge attributes.
- Keep `ChipItem` responsible for pill visuals and child `data-figma-property-selected`.
- Use tokenized spacing for the 4px item gap and 20px/12px group padding.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="chips"`.
- Support horizontal overflow or scroll behavior at the group boundary instead of compressing chip labels.

### Don't

- Recreate `ChipItem` pill styling inside `Chips`.
- Add a second public `ChipGroupItem` or route-local chip primitive.
- Add icon, badge, close button, or trailing slots to `Chips` from this source alone.
- Add multi-select behavior under the current Figma contract.
- Use route/screen-local margin or padding to correct group alignment.
- Convert the repeated labels into hard-coded options inside the component implementation.

### Normalization Notes

- `../../component-inventory.md` lists `Chips` as Phase 4 because it depends on the Phase 1 `ChipItem`.
- Inventory status remains `제작 예정`; this document is a contract for a planned component, not an implementation change.
- Figma's example labels are content examples, not fixed options.
- Figma sets the first chip to `Selected=On`; code should represent this as selected value/index state on the group and a boolean `selected` prop on exactly one child.
- The Figma source uses a 393px fixed component frame, but implementation should allow the parent layout to define available width and should keep chip labels uncompressed.
- The root has no fill, stroke, radius, or visual decoration. All visible chip styling belongs to `ChipItem`.

### SVG Assets

SVG asset: not required.

The checked `Chips` component contains only `ChipItem` instances and text overrides. No vector, icon, or other SVG-like descendant layers are present in node `9638:78472`.

### Validation

Documentation-only changes do not require app build checks.

When implementation changes are made, validate through the consuming app:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify:

- The root DOM node includes `data-figma-render="component"` and `data-figma-component-id="chips"`.
- Every child is rendered through `ChipItem`.
- Exactly one child has `data-figma-property-selected="on"` for the current single-select contract.
- Item gap and group padding follow tokenized values equivalent to the Figma source.
- Horizontal overflow does not shrink or restyle individual `ChipItem` pills.
