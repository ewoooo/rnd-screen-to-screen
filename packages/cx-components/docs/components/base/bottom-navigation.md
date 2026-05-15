# BottomNavigation

## Overview

Purpose: define the mobile bottom navigation compound as a reusable CX candidate while keeping app routing, safe-area placement, and shell ownership outside the visual component.

Figma SOT: [SKT_SDUI_Test_0512 / BottomNavigation component node](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=2927-7608&t=wZRehc2DOVV8corW-1)

Figma section reference: [SKT_SDUI_Test_0512 / Component base](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 예정 |
| Implementation Target | cx-components candidate |
| Figma Source | bottom-navigation |
| Dependencies | Icon, Text |
| Internal Parts | navigation items |
| Variants | State: My/Search/Shopping |
| Properties | 없음 |

### Implementation Files

Not implemented yet. Expected files if this remains a standalone `@pxds/cx-components` candidate:

- `packages/cx-components/src/components/bottom-navigation/BottomNavigation.tsx`
- `packages/cx-components/src/components/bottom-navigation/BottomNavigation.types.ts`
- `packages/cx-components/src/components/bottom-navigation/bottom-navigation.variants.ts`
- `packages/cx-components/src/components/bottom-navigation/bottom-navigation.css`
- `packages/cx-components/src/components/bottom-navigation/bottom-navigation.readme.md`
- `packages/cx-components/src/components/bottom-navigation/index.ts`

If app-shell behavior dominates, the visual item renderer may remain in `cx-components` while route binding and fixed placement live in `apps/mobile` or `@pxds/pxds-layout`.

### Styling Contract

- Component CSS must not define component-local `--cx-*` custom properties.
- Consume theme-neutral aliases from `@pxds/cx-tokens/style.css` directly: prefer `--semantic-*` and `--component-*` tokens.
- Selected/unselected colors, label typography, item gaps, divider/surface styling, and safe-area-adjacent spacing must use existing aliases or be recorded as token gaps.

## Structure

Purpose: define the target component structure and separate visual navigation vocabulary from app route mechanics.

### Target Structure

```txt
BottomNavigation
├─ item(state=My?)
│  ├─ Icon
│  └─ Text
├─ item(state=Search?)
│  ├─ Icon
│  └─ Text
└─ item(state=Shopping?)
   ├─ Icon
   └─ Text
```

`BottomNavigation` owns the row visual treatment and selected item presentation. It should not own URL routing, page transitions, safe-area container placement, or screen-level bottom padding.

### Component Consumption

| Consumed component | Used for | Expected implementation |
| --- | --- | --- |
| `Icon` | Navigation item pictograms | Use existing icon registry values for each item. |
| `Text` | Navigation item labels | Render labels through tokenized text styles. |

### Figma Source / Normalization

Figma exposes `BottomNavigation` with `State: My/Search/Shopping`, where the state represents the selected navigation destination.

```txt
BottomNavigation
├─ State=My
├─ State=Search
└─ State=Shopping
```

Normalize the Figma state axis to lowercase code values: `state="my" | "search" | "shopping"`. A more application-friendly API may expose `activeKey`, but it must resolve back to the Figma state for bridge metadata.

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `BottomNavigation` component set | `BottomNavigation` | candidate |
| `State=My` | `activeKey="my"` / `state="my"` | variant value |
| `State=Search` | `activeKey="search"` / `state="search"` | variant value |
| `State=Shopping` | `activeKey="shopping"` / `state="shopping"` | variant value |
| nested icon instances | `Icon` | yes |
| nested label text | `Text` | yes |
| item frames | internal item renderer | no standalone component until repeated elsewhere |

## Props

Purpose: define the public API and Figma bridge contract expected for implementation.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `activeKey` | `"my" \| "search" \| "shopping"` | `"my"` | Selected navigation item. Preferred app-facing prop. |
| `state` | `"my" \| "search" \| "shopping"` | derived from `activeKey` | Figma variant resolver. |
| `items` | `BottomNavigationItem[]` | default item set if approved | Optional item definitions. Use cautiously because Figma currently defines a fixed three-item set. |
| `onItemSelect` | `(key: BottomNavigationKey) => void` | - | Selection callback. Routing remains caller-owned. |
| `className` | `string` | - | Additional class name on root. |

Suggested item shape:

```ts
type BottomNavigationKey = "my" | "search" | "shopping";

type BottomNavigationItem = {
  key: BottomNavigationKey;
  label: string;
  icon: ReactNode;
  href?: string;
  disabled?: boolean;
};
```

If the component remains purely visual, omit `href` handling and let the parent render links/buttons through an item slot. If it becomes interactive, use native anchors or buttons with proper labels and selected state.

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| `data-figma-render` prop default | `data-figma-render` | `component` |
| resolved component id | `data-figma-component-id` | `bottom-navigation` when `data-figma-render="component"` |
| resolved selected state | `data-figma-property-state` | `my` / `search` / `shopping` |

The inventory lists no explicit properties, but `State: My/Search/Shopping` is a Figma variant axis. Emit the resolved state if Figma export needs stable variant matching.

### State Rules

- Exactly one item is selected at a time.
- `activeKey` should resolve `state`; if both are provided, normalize once and keep bridge attributes consistent with the rendered selected item.
- Selected state affects only item visual emphasis and accessibility metadata. Navigation side effects belong to the caller.
- Disabled state, if allowed, belongs to individual items and must not create new Figma state names unless the Figma source adds them.
- The fixed three-item Figma state should remain the default contract until a broader navigation vocabulary is approved.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { BottomNavigation, Icon } from "@pxds/cx-components";
```

### Examples

```tsx
<BottomNavigation activeKey="my" onItemSelect={setActiveKey} />

<BottomNavigation
  activeKey="search"
  items={[
    { key: "my", label: "MY", icon: <Icon type="home" size={24} /> },
    { key: "search", label: "검색", icon: <Icon type="search" size={24} /> },
    { key: "shopping", label: "쇼핑", icon: <Icon type="shop" size={24} /> },
  ]}
  onItemSelect={navigateByKey}
/>
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep styling wired to `--semantic-*` / `--component-*` aliases and do not reintroduce component-local `--cx-*` CSS variables.
- Consume `Icon` and `Text` for item visuals.
- Normalize Figma `State=My/Search/Shopping` to lowercase code values.
- Keep routing and fixed shell placement outside the visual component.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="bottom-navigation"` if the bridge consumes component metadata.
- Use accessible navigation semantics if the component renders interactive anchors/buttons.
- Keep selected item metadata aligned with the rendered state, such as `aria-current="page"` for links or `aria-selected` only if using a tab-like pattern.

### Don't

- Add screen-local bottom navigation markup to patch one route.
- Add route transition logic, router imports, or app-specific URL constants to `cx-components`.
- Create public `BottomNavigationItem` until repeated use proves it needs its own vocabulary entry.
- Add icons outside the registry for the three default destinations.
- Put safe-area or page-bottom padding rules inside the item renderer.
- Invent additional states beyond `my`, `search`, and `shopping` without a Figma/source update.

### Normalization Notes

- Inventory places `BottomNavigation` in Phase 3 because it depends only on existing `Icon` and `Text` foundations.
- The Figma `State` axis names selected destinations, not interaction states like hover, pressed, or disabled.
- This component may be visually CX-owned while app shell composition remains layout/app-owned.
- If the item list becomes configurable, keep the default Figma three-item contract available for export fidelity.

### SVG Assets

SVG asset: not required by the compound itself.

Use existing `Icon` registry entries for the default destinations. The inventory dependency is `Icon`, so any missing destination glyph should be handled as an icon registry gap, not as inline SVG inside `BottomNavigation`.

### Validation

Documentation-only changes do not require app build checks.

When implementation is added, validate through the consuming app checks:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify the root DOM node includes, if bridge metadata is implemented:

- `data-figma-render="component"`
- `data-figma-component-id="bottom-navigation"`
- `data-figma-property-state="my"`, `"search"`, or `"shopping"`

Verify item selection changes do not alter row height or page layout position.
