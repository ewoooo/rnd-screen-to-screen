# Slot

Figma `data-name="Slot"` 구조를 코드에서 명시적으로 대응하는 layout primitive입니다. Renderless placeholder가 아니라 이름이 붙은 vertical layout wrapper입니다.

## Import

```tsx
import { Slot } from "@pxds/pxds-layout/primitives";
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
| `gap` | `number \| string` | - | Vertical stack gap. |
| `align` | `"start" \| "center" \| "end" \| "stretch"` | `"stretch"` | Cross-axis alignment. |

## DOM Markers

```html
<div
  data-slot="content"
  data-layout-slot="true"
  data-figma-render="slot"
  data-figma-property-name="content"
>
  ...
</div>
```

## Notes

`Slot` reuses `VStack` internally and does not import `@pxds/cx-components`. It should not know the meaning of its children.
