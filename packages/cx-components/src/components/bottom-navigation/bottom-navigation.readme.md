# BottomNavigation

Three-item mobile bottom navigation mapped to the Figma `State` variants.

## Import

```tsx
import { BottomNavigation } from "@pxds/cx-components";
```

## Usage

```tsx
<BottomNavigation state="My" onStateChange={setNavigationState} />
```

```tsx
<BottomNavigation
	state="Search"
	items={[
		{ state: "My", label: "MY", icon: "home", iconSize: 24 },
		{ state: "Search", label: "검색", icon: "search", iconSize: 20 },
		{ state: "Shopping", label: "쇼핑", icon: "shop", iconSize: 24 },
	]}
/>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `state` | `"My" \| "Search" \| "Shopping"` | `"My"` | Active Figma state. |
| `items` | `readonly BottomNavigationItem[]` | default three items | Navigation items keyed by state. |
| `onStateChange` | `(state: BottomNavigationState) => void` | - | Called after an enabled item is selected. |
| `className` | `string` | - | Additional root class name. |

Native `nav` attributes are supported.

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="bottom-navigation"`
- `data-figma-property-state="My" | "Search" | "Shopping"`
