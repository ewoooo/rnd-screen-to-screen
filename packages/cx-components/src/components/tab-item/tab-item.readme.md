# TabItem

`Tab`에서 사용하는 단일 탭 라벨 아이템입니다. 선택 상태의 라벨 강조와 2px underline만 소유하고, row layout과 selection orchestration은 부모 `Tab`이 소유합니다.

## Import

```tsx
import { TabItem } from "@pxds/cx-components";
```

## Usage

```tsx
<TabItem text="홈" />
<TabItem state="selected">혜택</TabItem>
<TabItem selected text="쇼핑" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `state` | `"default" \| "selected"` | `"default"` | Figma `State` variant를 lowercase로 정규화한 visual state입니다. |
| `selected` | `boolean` | - | Convenience API입니다. 제공되면 `state`보다 우선해 resolved state를 결정합니다. |
| `children` | `ReactNode` | - | Tab label content입니다. |
| `text` | `string` | `"{txt}"` | `children`이 없을 때 사용하는 label fallback입니다. |
| `className` | `string` | - | Root에 추가할 class name입니다. |

Native `div` attributes are supported so parent `Tab` can attach role, aria, and handlers when it owns interaction.

## Dependencies

- `Text`: label rendering

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="tab-item"`
- `data-figma-property-state="default" | "selected"`
