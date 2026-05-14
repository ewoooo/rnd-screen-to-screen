# Handle

Bottomsheet 상단의 드래그 핸들 시각 primitive입니다. 제스처나 sheet 상태는 소유하지 않습니다.

## Import

```tsx
import { Handle } from "@pxds/cx-components";
```

## Usage

```tsx
<Handle />
<Handle showHandle={false} />
<Handle state="off" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `showHandle` | `boolean` | `true` | Visual bar 표시 여부. Figma `show-handle` property로 매핑됩니다. |
| `state` | `"default" \| "off"` | derived | Figma variant parity가 필요할 때 쓰는 명시 상태입니다. |
| `className` | `string` | - | Root element 추가 class name. |

Native `div` attributes are supported. `children` is not supported.

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="handle"`
- `data-figma-property-show-handle`
- `data-figma-property-state`

## State Rules

- `showHandle=true` resolves to `state="default"` and Figma `state=Default`.
- `showHandle=false` resolves to `state="off"` and Figma `state=off`.
- `state="off"` and `showHandle=false` produce the same DOM state.
