# Chips

Horizontal single-select chip group composed from `ChipItem`.

## Import

```tsx
import { Chips } from "@pxds/cx-components";
```

## Usage

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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `ChipsItem[]` | - | Ordered chip options. |
| `value` | `string` | - | Controlled selected item value. |
| `defaultValue` | `string` | first item | Uncontrolled initial selected item value. |
| `onValueChange` | `(value: string) => void` | - | Called when an enabled chip is selected. |
| `selectionMode` | `"single"` | `"single"` | Single-select mode from the current Figma source. |
| `ariaLabel` | `string` | - | Accessible label for the group. |
| `className` | `string` | - | Additional class name on the root. |

Native `div` attributes are also supported except `children`, `defaultValue`, and `onChange`.

## Dependencies

- `ChipItem`

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="chips"`
- `data-figma-property-selected-value`
- Child `ChipItem` nodes provide `data-figma-property-selected="off|on"`.
