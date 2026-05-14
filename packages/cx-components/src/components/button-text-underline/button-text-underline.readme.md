# ButtonTextUnderline

작은 보조 텍스트 액션입니다. Figma 원본의 `ButtonTextUnderline` 노드를 독립 컴포넌트로 매핑합니다.

## Import

```tsx
import { ButtonTextUnderline } from "@pxds/cx-components";
```

## Usage

```tsx
<ButtonTextUnderline>Text</ButtonTextUnderline>
<ButtonTextUnderline onClick={handleClick}>자세히 보기</ButtonTextUnderline>
<ButtonTextUnderline disabled>자세히 보기</ButtonTextUnderline>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | - | Visible label. |
| `disabled` | `boolean` | `false` | Disable native button interaction. |
| `asChild` | `boolean` | `false` | Render Radix Slot child instead of `button`. |
| `className` | `string` | - | Additional class name. |
| `onClick` | button handler | - | Native click handler. |

Native `button` attributes are supported except `disabled`, which is controlled by this API.

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="button-text-underline"`

## Normalization Note

The inspected Figma text layer currently has no underline decoration. This component keeps the visual treatment compact and uses the `text-13-reg` token values without adding a separate underline asset.
