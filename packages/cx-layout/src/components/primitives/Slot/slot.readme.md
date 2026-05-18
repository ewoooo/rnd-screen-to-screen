# Slot

Figma `data-name="Slot"` 구조를 코드에서 명시적으로 대응하는 layout primitive입니다. Renderless placeholder가 아니라 이름이 붙은 vertical layout wrapper입니다.

`Slot`은 `Component -> Pattern -> Organism -> Screen` 계층에서 pattern 내부의 이름 있는 자리만 표현한다. 기초 component를 route에 직접 흩뿌리는 우회 수단으로 쓰지 않는다.

## Import

```tsx
import { Slot } from "@pxds/cx-layout/primitives";
```

## Usage

```tsx
<Slot name="content">
  {children}
</Slot>
```

```tsx
<Slot name="title" gap="var(--spacing-4)" align="stretch">
  {title}
</Slot>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | - | Slot name. Added to `data-slot`. |
| `children` | `ReactNode` | - | Slot content. |
| `className` | `string` | - | Additional class name. |
| `gap` | `number \| string` | - | Vertical stack gap. Prefer tokenized values from `DESIGN_FOUNDATION.md`; measured exceptions stay documented in `SPACING_PATTERNS.md`. |
| `align` | `"start" \| "center" \| "end" \| "stretch"` | `"stretch"` | Cross-axis alignment. |

## DOM Markers

```html
<div
  data-slot="content"
  data-figma-render="slot"
  data-figma-property-name="content"
  data-figma-layout-kind="primitive"
  data-figma-layout-layer="slot"
  data-figma-layout-slot="content"
>
  ...
</div>
```

## Notes

`Slot` reuses `VStack` internally and does not import `@pxds/cx-components`. It should not know the meaning of its children.
