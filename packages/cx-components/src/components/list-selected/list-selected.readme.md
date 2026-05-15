# ListSelected

Selected list row with a leading `RadioButton` or `Checkbox`, primary label,
optional sub text, and optional `ListSelectedRightItem`.

## Import

```tsx
import { ListSelected } from "@pxds/cx-components";
```

## Usage

```tsx
<ListSelected
	type="radio"
	label="텍스트"
	subText="-9,900원"
	rightItem={{ type: "buttonXsmallSolid", label: "받기" }}
/>

<ListSelected
	type="checkbox"
	label="텍스트"
	subText="-9,900원"
	rightItem={{ type: "buttonXsmallSolid", label: "받기" }}
/>

<ListSelected
	type="radio"
	label="혜택 선택"
	showSubText={false}
	showListSelectedRightItem={false}
/>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"radio" \| "checkbox"` | `"radio"` | Figma variant axis. |
| `label` | `ReactNode` | - | Main row label. |
| `subText` | `ReactNode` | - | Optional secondary trailing text. |
| `showSubText` | `boolean` | `Boolean(subText)` | Controls the sub-text slot. |
| `checked` | `boolean` | `true` | Passed to the leading control. |
| `disabled` | `boolean` | `false` | Passed to the control and default right item. |
| `rightItem` | `ListSelectedRightItemProps \| null` | `{ type: "buttonXsmallSolid" }` | Right affordance configuration. |
| `showListSelectedRightItem` | `boolean` | `rightItem !== null` | Controls the right-item slot. |
| `onChange` | `(checked: boolean) => void` | - | Control checked-state callback. |
| `className` | `string` | - | Additional root class name. |

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="list-selected"`
- `data-figma-property-type="radio" | "checkbox"`
- `data-figma-property-show-list-selected-right-item="true" | "false"`
- `data-figma-property-show-sub-text="true" | "false"`

## Styling

The row owns the Figma spacing contract: `8px` vertical padding, `8px`
horizontal row gap, and `8px` inner content gaps. It consumes semantic spacing,
color, and type tokens directly and delegates the control and affordance
rendering to shared component vocabulary.
