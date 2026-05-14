# TabItem

## Overview

Purpose: define the single tab label item used by `Tab`, based on the Figma source before implementation exists.

Figma SOT: [SKT_SDUI_Test_0512 / Component node](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9508-56762&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 완료 |
| Implementation Target | cx-components candidate |
| Figma Source | tab-item |
| Dependencies | Text |
| Internal Parts | underline indicator |
| Variants | State: Default/Selected |
| Properties | 없음 in inventory; implementation should map `state` for Figma variant identity |

### Implementation Files

Implemented in `@pxds/cx-components`:

- `packages/cx-components/src/components/tab-item/TabItem.tsx`
- `packages/cx-components/src/components/tab-item/TabItem.types.ts`
- `packages/cx-components/src/components/tab-item/tab-item.variants.ts`
- `packages/cx-components/src/components/tab-item/tab-item.css`
- `packages/cx-components/src/components/tab-item/tab-item.readme.md`
- `packages/cx-components/src/components/tab-item/index.ts`

### Styling Contract

- Component CSS must not define component-local `--cx-*` custom properties.
- Consume theme-neutral aliases from `@pxds/cx-tokens/style.css` directly: prefer `--semantic-*` and `--component-*` tokens.

## Structure

Purpose: define the target component structure and how Figma-only nodes normalize into code.

### Target Structure

```txt
TabItem
├─ Text(label)
└─ underline indicator? (state=selected)
```

`TabItem` owns only the label state treatment and the selected underline. Row layout, equal distribution, selected index management, and keyboard navigation belong to the parent `Tab`.

### Component Consumption

| Consumed component | Used for | Expected implementation |
| --- | --- | --- |
| `Text` | Tab label | Render the label through `Text`, with state-specific typography/color tokens. |

### Figma Source Difference

Figma models `TabItem` as a component set with two `State` variants:

```txt
TabItem
├─ State=Selected
│  ├─ {txt}
│  └─ selected underline
└─ State=Default
   └─ {txt}
```

Figma visual notes from node `9508:56762`:

- Selected item: 29 x 35, text `{txt}`, brand text color, bold 15 typography, 2px brand underline.
- Default item: 27 x 35, text `{txt}`, primary text color, medium 15 typography, no underline.
- Selected text and underline are stacked vertically; the selected underline spans the item width.

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `TabItem` component set | `TabItem` | yes |
| `State=Selected` | `state="selected"` | variant value |
| `State=Default` | `state="default"` | variant value |
| `{txt}` text layer | `Text` content | yes, consumed dependency |
| selected underline rectangle | CSS border/pseudo-element or internal element | no |

## Props

Purpose: define the public API and the bridge contract expected for implementation.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `state` | `"default" \| "selected"` | `"default"` | Visual state mapped from Figma `State`. |
| `selected` | `boolean` | - | Optional convenience API. If provided, resolves `state`. |
| `children` | `ReactNode` | - | Tab label content. |
| `text` | `string` | `"{txt}"` | Text fallback when `children` is absent. |
| `className` | `string` | - | Additional class name on root. |

Native button or tab attributes should be supported when `TabItem` is interactive. If interaction is centralized in `Tab`, keep `TabItem` presentational and let `Tab` own `role="tab"`, `aria-selected`, and click/key handlers.

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| `data-figma-render` prop default | `data-figma-render` | `component` |
| resolved component id | `data-figma-component-id` | `tab-item` when `data-figma-render="component"` |
| resolved `state` | `data-figma-property-state` | `default` / `selected` |

The inventory currently lists no explicit properties, but `State=Default/Selected` is a Figma variant axis. The implementation should expose the resolved state in bridge metadata if component export needs stable variant matching.

### State Rules

- `state="selected"` renders bold brand text and the 2px brand underline.
- `state="default"` renders medium primary text and hides the underline.
- `selected` should be treated as a convenience input only; normalize it to `state` before styling and bridge attributes.
- Text content should not change spacing. The parent `Tab` should decide item width and row alignment.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { TabItem } from "@pxds/cx-components";
```

### Examples

```tsx
<TabItem text="홈" />
<TabItem state="selected">혜택</TabItem>
<TabItem selected text="쇼핑" />
```

Parent `Tab` usage should derive one selected item and pass normalized state:

```tsx
<TabItem state={activeId === item.id ? "selected" : "default"}>
  {item.label}
</TabItem>
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep styling wired to `--semantic-*` / `--component-*` aliases and do not reintroduce component-local `--cx-*` CSS variables.
- Keep one public `TabItem` component.
- Use `Text` for the label.
- Keep the underline as an internal CSS border, pseudo-element, or private element.
- Use token-backed CSS for typography, color, gap, and underline height.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="tab-item"`.
- Preserve `data-figma-property-state` if the Figma bridge consumes variant metadata.
- Let `Tab` compose multiple `TabItem`s and own selection behavior.

### Don't

- Create separate public `SelectedTabItem` or `DefaultTabItem` components.
- Promote the underline to a standalone component vocabulary item.
- Add route/screen-local margin or padding to force TabItem alignment.
- Add icon or SVG dependencies; the Figma source is text plus a rectangle underline.
- Let `TabItem` own tab-list layout rules that belong to `Tab`.

### Normalization Notes

- Figma uses `State=Selected` and `State=Default`; code should normalize these to lowercase `selected` and `default`.
- The selected underline is a simple 2px brand-colored rectangle and should be implemented with CSS, not an asset.
- The default state still has a 35px source height. Preserve stable vertical rhythm so switching selected state does not move surrounding layout.
- `TabItem` is Phase 1 in `docs/component-inventory.md` because it depends only on the existing `Text` foundation and blocks the compound `Tab`.

### Validation

After implementation, validate through the consuming app checks:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify the root DOM node includes:

- `data-figma-render="component"`
- `data-figma-component-id="tab-item"`
- `data-figma-property-state="default"` or `data-figma-property-state="selected"` if bridge metadata is implemented

Verify selected/default switching keeps the same tab row height and changes only text emphasis plus underline visibility.
