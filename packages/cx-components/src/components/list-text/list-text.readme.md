# ListText

Tokenized list text row for normal rows with an optional trailing
`ListTextRightItem` or table-style two-column rows.

## Import

```tsx
import { ListText } from "@pxds/cx-components/components/list-text";
```

## Usage

```tsx
<ListText text="본문" />

<ListText
	text="상세 내역"
	rightItem={{ type: "icon", ariaLabel: "상세 내역 보기" }}
/>

<ListText text="이용 요금" rightItem={{ type: "text", text: "-3,000원" }} />

<ListText table text="일이삼사오육칠" tableText="본문" />

<ListText text="구분선이 있는 항목" showDivider />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | - | Primary row text. |
| `text` | `ReactNode` | `"본문"` | Primary row text fallback. |
| `table` | `boolean` | `false` | Maps to Figma `Table=off/on`. |
| `tableText` | `ReactNode` | - | Secondary text rendered only in table mode. |
| `rightItem` | `ListTextRightItemPreset \| false` | `{ type: "icon" }` | Optional trailing item for non-table rows. |
| `showRightItem` | `boolean` | resolved | Removes the trailing item when `false`. |
| `showDivider` | `boolean` | `false` | Renders the shared `Divider` below the row. |
| `className` | `string` | - | Additional root class for composition. |

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="list-text"`
- `data-figma-property-table="off" | "on"`
- `data-figma-property-right-item="true" | "false"`

The nested right item keeps its own `data-figma-property-type` bridge marker.
