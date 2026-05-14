# Footer

Mobile content footer compound for supporting copy with an optional action.

## Import

```tsx
import { Footer } from "@pxds/cx-components";
```

## Usage

```tsx
<Footer text="가입 전 안내사항을 확인해 주세요." />

<Footer buttonLabel="확인" onButtonClick={handleConfirm}>
	신청 내용을 다시 확인해 주세요.
</Footer>

<Footer button={<Button size="medium" variant="secondary">자세히 보기</Button>}>
	추가 안내가 필요하면 상세 내용을 확인할 수 있습니다.
</Footer>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"01" \| "02"` | derived from button presence | Figma type variant. |
| `children` | `ReactNode` | - | Footer copy. |
| `text` | `string` | - | Copy fallback when `children` is absent. |
| `button` | `ReactNode` | - | Optional action slot. |
| `buttonLabel` | `string` | - | Label for a default full-width `Button`. |
| `onButtonClick` | `() => void` | - | Click handler for the default button. |
| `className` | `string` | - | Additional root class name. |

Native `footer` attributes are supported.

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="footer"`
- `data-figma-property-type="01" | "02"`
