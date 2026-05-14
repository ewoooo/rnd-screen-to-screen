# ChipItem

`Chips`에서 사용하는 단일 pill item입니다.

## Import

```tsx
import { ChipItem } from "@pxds/cx-components";
```

## Usage

```tsx
<ChipItem>단말기</ChipItem>
<ChipItem selected>단말기</ChipItem>
<ChipItem selected={activeFilter === "device"} onClick={() => setActiveFilter("device")}>
	단말기
</ChipItem>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | - | Chip label content. |
| `selected` | `boolean` | `false` | Selected visual state. |
| `onClick` | `() => void` | - | Optional press handler. |
| `className` | `string` | - | Additional class name. |

Native `span` attributes are also supported except `children`, `color`, and `onClick`.

## Dependencies

- `Text`

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="chip-item"`
- `data-figma-property-selected="off|on"`
