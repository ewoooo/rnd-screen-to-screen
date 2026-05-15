# UnderlineTab

Two-option underline tab compound for the CX component vocabulary. It owns equal tab regions, selection state, keyboard interaction, and underline placement.

## Import

```tsx
import { UnderlineTab } from "@pxds/cx-components";
```

## Usage

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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `[UnderlineTabItem, UnderlineTabItem]` | - | Exactly two tab options. |
| `state` | `"01" \| "02"` | `"01"` | Figma `State` variant value and uncontrolled selection seed. |
| `value` | `string` | - | Controlled selected item value. |
| `defaultValue` | `string` | first item matching `state` | Initial selected item value for uncontrolled use. |
| `onValueChange` | `(value: string) => void` | - | Called when selection changes. |
| `ariaLabel` | `string` | - | Accessible label for the tab list. |
| `className` | `string` | - | Root class name. |

`UnderlineTabItem` is `{ value: string; label: ReactNode; disabled?: boolean }`.

## Dependencies

- `Text`: label rendering

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="underline-tab"`
- `data-figma-property-state="01" | "02"`
