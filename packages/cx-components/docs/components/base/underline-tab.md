# UnderlineTab

## Overview

Purpose: define the implementation-ready contract for the planned two-option underline tab compound, without reusing the existing single-item `TabItem` contract.

Figma SOT: [SKT_SDUI_Test_0512 / UnderlineTab component set](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9596-37541&t=wZRehc2DOVV8corW-1)

Verified component set id: `9596:37541`

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 예정 |
| Implementation Target | cx-components candidate |
| Figma Source | underline-tab |
| Dependencies | Text |
| Internal Parts | Text frames, underline indicator |
| Variants | State: 01/02 |
| Properties | 없음 |

### Implementation Files

Not implemented yet. Expected files if this remains a standalone `@pxds/cx-components` candidate:

- `packages/cx-components/src/components/underline-tab/UnderlineTab.tsx`
- `packages/cx-components/src/components/underline-tab/UnderlineTab.types.ts`
- `packages/cx-components/src/components/underline-tab/underline-tab.variants.ts`
- `packages/cx-components/src/components/underline-tab/underline-tab.css`
- `packages/cx-components/src/components/underline-tab/underline-tab.readme.md`
- `packages/cx-components/src/components/underline-tab/index.ts`

### Styling Contract

- Component CSS must not define component-local `--cx-*` custom properties.
- Consume theme-neutral aliases from `@pxds/cx-tokens/style.css` directly: prefer `--semantic-*` and `--component-*` tokens.
- Tab height, side padding, text treatment, underline color, underline height, and active/inactive colors must be tokenized through existing aliases.
- If an exact Figma value has no token alias, record the token gap instead of adding a private one-off variable.

## Structure

Purpose: define the normalized code shape for a fixed two-option underline tab compound.

### Target Structure

```txt
UnderlineTab
├─ tab button 1
│  └─ Text
├─ tab button 2
│  └─ Text
└─ underline indicator for selected option
```

`UnderlineTab` is a two-option compound. It owns the equal tab regions, selection state mapping, and underline placement for this specific Figma component. It is not the existing `TabItem`, which represents a single tab item used by the separate `Tab` component.

### Component Consumption

| Consumed component | Used for | Expected implementation |
| --- | --- | --- |
| `Text` | Both tab labels | Render labels through existing CX typography/color vocabulary. |

### Figma Source / Normalization

Figma exposes `UnderlineTab` as component set `9596:37541` with one variant axis:

```txt
UnderlineTab
├─ State=01
└─ State=02
```

Each variant component is `393 x 60`. The component contains two equal button/tab regions of `196.5px` each, with top padding `24` and outer side padding `12` on the left and right. Each tab region contains an internal text frame. Normalize `State=01` and `State=02` to the selected option index:

- `state="01"`: first option selected
- `state="02"`: second option selected

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `UnderlineTab` component set | `UnderlineTab` | yes |
| `State=01` | `state="01"` / selected index `0` | variant value |
| `State=02` | `state="02"` / selected index `1` | variant value |
| first tab region | internal button/tab region | no |
| second tab region | internal button/tab region | no |
| internal Text frames | `Text` labels | yes, consumed dependency |
| underline indicator | CSS border, pseudo-element, or private element | no |

## Props

Purpose: define the public API and the Figma bridge contract expected for implementation.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `[UnderlineTabItem, UnderlineTabItem]` | - | Exactly two tab options. |
| `state` | `"01" \| "02"` | `"01"` | Figma variant value. |
| `value` | `string` | first item value | Controlled selected value. |
| `defaultValue` | `string` | first item value | Initial selected value for uncontrolled use. |
| `onValueChange` | `(value: string) => void` | - | Called when a tab option is selected. |
| `ariaLabel` | `string` | - | Accessible label for the tab list. |
| `className` | `string` | - | Additional root class name. |

`UnderlineTabItem` should stay small: `{ value: string; label: ReactNode; disabled?: boolean }`. Do not add icon or badge slots unless Figma defines them.

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| component root | `data-figma-render` | `component` |
| component root | `data-figma-component-id` | `underline-tab` |
| resolved state | `data-figma-property-state` | `01` / `02` |

The inventory currently lists no additional component properties. Keep bridge output limited to component identity and the documented `State` variant axis.

### State Rules

- `state="01"` selects the first tab and places the underline under the first equal-width region.
- `state="02"` selects the second tab and places the underline under the second equal-width region.
- Keep both tab regions equal width within the component, matching the verified `196.5px` / `196.5px` split at the `393px` source width.
- Disabled behavior is not documented in Figma. If item-level `disabled` is supported for accessibility, keep its visual treatment tokenized and do not emit a new Figma variant.
- Keyboard behavior should follow tab-list expectations if the component is interactive: arrow keys move selection between the two options, and each option exposes `role="tab"` with `aria-selected`.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { UnderlineTab } from "@pxds/cx-components";
```

### Examples

```tsx
<UnderlineTab
  items={[
    { value: "benefit", label: "혜택" },
    { value: "history", label: "이용내역" },
  ]}
  state="01"
/>

<UnderlineTab
  ariaLabel="멤버십 보기 방식"
  items={[
    { value: "available", label: "사용 가능" },
    { value: "used", label: "사용 완료" },
  ]}
  value={selectedTab}
  onValueChange={setSelectedTab}
/>
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep one public `UnderlineTab` candidate component with exactly two tab options.
- Treat `State: 01/02` as the selected-option variant axis.
- Consume `Text` for both labels.
- Preserve the `393 x 60` source geometry as the implementation reference, while allowing responsive width only when equal tab distribution and the `60px` row height contract remain intact.
- Use CSS for the underline indicator through a border, pseudo-element, or private element.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="underline-tab"` if bridge metadata is emitted.
- Keep side padding and top padding tokenized through `--semantic-*` / `--component-*` aliases.

### Don't

- Do not implement this as `TabItem`; `UnderlineTab` is a two-option compound, not a single tab item.
- Do not route this through the existing `Tab` API unless that API explicitly grows a matching fixed two-option underline-tab contract.
- Do not add icon, badge, counter, or close affordances.
- Do not add route-local margin, padding, or inline style fixes to force alignment.
- Do not define component-local `--cx-*` custom properties.
- Do not add an SVG, image, or external asset for the underline.

### Normalization Notes

- Inventory places `UnderlineTab` in Phase 3 because it depends only on the existing `Text` foundation.
- The current source is not implemented in `@pxds/cx-components`; this document is the implementation contract.
- The two Figma variants represent which option is active, not two visual component types.
- The verified Figma source uses internal text frames. Code should expose label data and consume `Text`, not mirror those frames as public subcomponents.
- If responsive behavior is needed, preserve equal distribution first; do not hardcode separate screen-route corrections.

### SVG Assets

SVG asset: not required.

The documented dependency is only `Text`. The underline is a simple CSS-rendered indicator and does not need an SVG asset.

### Validation

Documentation-only changes do not require app build checks.

For this document change, run:

- `git diff --check -- packages/cx-components/docs/components/base/underline-tab.md`

When implementation is added, validate through the consuming app checks:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify the root DOM node includes, if bridge metadata is implemented:

- `data-figma-render="component"`
- `data-figma-component-id="underline-tab"`
- `data-figma-property-state="01"` or `data-figma-property-state="02"`
