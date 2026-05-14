# Tab

## Overview

Purpose: define the implementation-ready contract for the planned horizontal tab compound composed from `TabItem`.

Figma SOT: [SKT_SDUI_Test_0512 / Tab component](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9508-56855&t=wZRehc2DOVV8corW-1)

Base section checked in Figma: [SKT_SDUI_Test_0512 / base section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

Verified component node: `9508:56855`

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 예정 |
| Implementation Target | cx-components candidate |
| Figma Source | tab |
| Dependencies | TabItem |
| Internal Parts | top divider, tab row |
| Variants | 없음 |
| Properties | 없음 |

### Implementation Files

Not implemented yet. Expected files if this remains a standalone `@pxds/cx-components` candidate:

- `packages/cx-components/src/components/tab/Tab.tsx`
- `packages/cx-components/src/components/tab/Tab.types.ts`
- `packages/cx-components/src/components/tab/tab.variants.ts`
- `packages/cx-components/src/components/tab/tab.css`
- `packages/cx-components/src/components/tab/tab.readme.md`
- `packages/cx-components/src/components/tab/index.ts`

Existing dependency:

- `packages/cx-components/src/components/tab-item/TabItem.tsx`
- `packages/cx-components/src/components/tab-item/TabItem.types.ts`
- `packages/cx-components/src/components/tab-item/tab-item.variants.ts`
- `packages/cx-components/src/components/tab-item/tab-item.css`
- `packages/cx-components/src/components/tab-item/index.ts`

### Styling Contract

- Component CSS must not define component-local `--cx-*` custom properties.
- Consume theme-neutral aliases from `@pxds/cx-tokens/style.css` directly: prefer `--semantic-*` and `--component-*` tokens.
- The divider color, row height, top padding, left inset, inter-item gap, text state colors, typography, and selected underline must be tokenized through existing aliases.
- If an exact Figma value has no token alias, record the token gap instead of adding a private one-off variable.

## Structure

Purpose: define the normalized compound structure while keeping `TabItem` as the only item vocabulary.

### Target Structure

```txt
Tab
├─ divider
└─ tablist
   ├─ TabItem(state=selected)
   ├─ TabItem(state=default)
   ├─ TabItem(state=default)
   └─ ...
```

`Tab` owns row layout, selected item resolution, accessibility semantics, and value-change orchestration. `TabItem` owns only the label treatment and selected underline for each item.

### Component Consumption

| Consumed component | Used for | Expected implementation |
| --- | --- | --- |
| `TabItem` | Each tab option | Compose existing `TabItem` and pass normalized `state="selected"` or `state="default"`. Do not duplicate TabItem typography or underline styles in `Tab`. |

### Figma Source / Normalization

Figma exposes `Tab` as a single component node `9508:56855`, not a component set:

```txt
Tab
├─ div
└─ btn_tab
   ├─ TabItem / State=Selected
   ├─ TabItem / State=Default
   ├─ TabItem / State=Default
   ├─ TabItem / State=Default
   ├─ TabItem / State=Default
   ├─ TabItem / State=Default
   ├─ TabItem / State=Default
   └─ TabItem / State=Default
```

Figma measurements checked on node `9508:56855`:

| Node | Size | Layout | Gap / padding | Notes |
| --- | --- | --- | --- | --- |
| `Tab` | `393 x 47` | vertical auto layout | gap `12`, padding `0` | Contains a 1px divider and the tab row. |
| `div` | `393 x 1` | fixed rectangle | - | Fill `#EBEEF6`; normalize as an internal divider, not a public subcomponent unless the shared `Divider` contract is explicitly adopted. |
| `btn_tab` | `393 x 47` | horizontal auto layout | gap `32`, padding top `12`, left `32`, right/bottom `0` | Holds the `TabItem` instances. |
| `TabItem` instances | `29 x 35` selected, `27 x 35` default examples | vertical auto layout from `TabItem` | delegated | First item is selected in the source; all remaining source items are default. |

The Figma source uses eight placeholder `TabItem` instances with `{txt}` labels. Code should expose item data and render as many tabs as the consumer provides. Keep the Figma geometry as the reference for baseline spacing, but do not hardcode an eight-item API.

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `Tab` component | `Tab` | yes |
| `div` rectangle | internal divider element or shared divider styling | no |
| `btn_tab` frame | internal tablist row | no |
| first `TabItem / State=Selected` | selected `TabItem` | `TabItem` yes |
| remaining `TabItem / State=Default` | default `TabItem`s | `TabItem` yes |

## Props

Purpose: define the public API and the Figma bridge contract expected for implementation.

### Props

```ts
type TabItemOption = {
	value: string;
	label: ReactNode;
	disabled?: boolean;
};
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `TabItemOption[]` | - | Tab options rendered in order. |
| `value` | `string` | - | Controlled selected tab value. |
| `defaultValue` | `string` | first item value | Initial selected value for uncontrolled usage. |
| `onValueChange` | `(value: string) => void` | - | Called when a tab is selected. |
| `ariaLabel` | `string` | - | Accessible label for the tab list when no visible group label exists. |
| `className` | `string` | - | Additional class name on the root, only for composition needs. |

Native `div` attributes may be supported on the root. Item interaction should be rendered with tab-list semantics: root `role="tablist"` or a contained tablist row, item nodes with `role="tab"`, and selected items with `aria-selected`.

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| component root | `data-figma-render` | `component` |
| component root | `data-figma-component-id` | `tab` |
| child selected item | `TabItem` `data-figma-property-state` | `selected` |
| child default items | `TabItem` `data-figma-property-state` | `default` |

The inventory lists no component-level Figma properties for `Tab`. Do not invent root variant attributes for selected index or item count unless the Figma source grows a matching property axis. Selection state should be reflected through each child `TabItem`.

### State Rules

- `Tab` has no Figma variant axis.
- Exactly one enabled item should resolve to `state="selected"` during normal use.
- All non-selected items resolve to `state="default"`.
- Disabled item behavior is not defined in the Figma source. If supported for accessibility, keep its treatment tokenized and do not emit a new Figma variant.
- The row may contain more items than fit in the `393px` source width. Preserve item intrinsic width and the `32px` source gap; use horizontal overflow behavior rather than shrinking `TabItem` labels.
- Keyboard behavior should follow tab-list expectations: arrow keys move focus between tabs, and activation updates the selected value.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { Tab } from "@pxds/cx-components";
```

### Examples

```tsx
<Tab
	items={[
		{ value: "home", label: "홈" },
		{ value: "benefit", label: "혜택" },
		{ value: "shopping", label: "쇼핑" },
	]}
	defaultValue="home"
/>
```

```tsx
<Tab
	ariaLabel="멤버십 메뉴"
	items={menuItems}
	value={selectedMenu}
	onValueChange={setSelectedMenu}
/>
```

Consumers should pass item data to `Tab`. They should not assemble route-local rows of `TabItem` unless they are intentionally bypassing the compound component.

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep one public `Tab` candidate component.
- Compose existing `TabItem` for every option.
- Normalize selection to `TabItem` states: `selected` and `default`.
- Keep the top divider and `btn_tab` row as internal structure.
- Use token-backed CSS for divider color, row padding, gap, and overflow behavior.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="tab"` if bridge metadata is emitted.
- Preserve each child `TabItem` bridge state so Figma export can match selected/default item identity.
- Keep keyboard and ARIA behavior at the `Tab` compound level.

### Don't

- Do not create separate public components for selected/default tab rows.
- Do not duplicate `TabItem` label typography or underline styling inside `Tab`.
- Do not add icon, badge, counter, close, or dropdown slots to this base component.
- Do not add route/screen-local margin, padding, or font-size overrides to force alignment.
- Do not define component-local `--cx-*` custom properties.
- Do not add a root Figma variant prop for selected index while the Figma source has `Variants: 없음`.

### Normalization Notes

- Inventory places `Tab` in Phase 4 because it depends on the already implemented `TabItem`.
- Figma `Tab` is a single component, while `TabItem` is the component set that owns the `State=Default/Selected` variant axis.
- The source shows eight placeholder items. Implementation should support consumer-provided item arrays rather than an eight-slot fixed API.
- The source divider is a simple rectangle. Treat it as internal CSS or a shared divider only if that shared vocabulary already matches the contract.
- The source row starts with `32px` left inset and uses `32px` item gap. Keep these as tokenization targets; do not compensate per route.

### SVG Assets

SVG asset: not required.

The Figma source contains only a divider rectangle and `TabItem` instances. `TabItem` renders its selected underline through CSS/internal geometry, so `Tab` does not require an SVG, icon, image, or exported vector asset.

### Validation

Documentation-only changes do not require app build checks.

For this document change, run:

- `git diff --check -- packages/cx-components/docs/components/base/tab.md`

When implementation is added, validate through the consuming app checks:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify the root DOM node includes, if bridge metadata is implemented:

- `data-figma-render="component"`
- `data-figma-component-id="tab"`

Verify each rendered item includes the expected `TabItem` state marker:

- selected item: `data-figma-property-state="selected"`
- default items: `data-figma-property-state="default"`
