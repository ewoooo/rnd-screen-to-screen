# ButtonXsmallSolid

Figma `ButtonXsmallSolid`을 기존 `Button` semantics와 `Icon` asset으로 조립한 compact solid action adapter입니다.

## Import

```tsx
import { ButtonXsmallSolid } from "@pxds/cx-components";
```

## Usage

```tsx
<ButtonXsmallSolid>쿠폰 받기</ButtonXsmallSolid>
<ButtonXsmallSolid state="disabled">보유중</ButtonXsmallSolid>
```

Custom trailing icon content can be passed for the active state. Use `icon={false}` to hide it.

```tsx
<ButtonXsmallSolid icon={false}>쿠폰 받기</ButtonXsmallSolid>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `state` | `"active" \| "disabled"` | `"active"` | Figma `State` axis normalized for code. |
| `disabled` | `boolean` | `false` | Forces native disabled state and resolves `state` to `"disabled"`. |
| `children` | `ReactNode` | required | Button label. |
| `icon` | `ReactNode \| false` | download icon | Optional trailing icon. Hidden when disabled. |
| `className` | `string` | - | Additional class name. |

Native `button` attributes are supported except `disabled`, which is controlled by this API.

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="button-xsmall-solid"`
- `data-figma-property-state`

The adapter passes `data-figma-property-size="xsmall"` to the consumed `Button` bridge while preserving the component identity above.
