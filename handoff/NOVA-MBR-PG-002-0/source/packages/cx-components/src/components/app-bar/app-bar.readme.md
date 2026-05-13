# AppBar

Figma `AppBar` variant를 코드로 대응하는 상단 chrome 컴포넌트입니다.

## Import

```tsx
import { AppBar } from "@pxds/cx-components";
```

## Usage

```tsx
<AppBar title="회원 가입" showLeftItem showTitle />
```

```tsx
<AppBar
  title="결제하기"
  showLeftItem
  showRightItem
  showTitle
  rightItems={[<Icon key="shop" type="shop" size={24} />]}
/>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | - | Leading title text. |
| `showTitle` | `boolean` | `Boolean(title)` | Figma `Title` property. |
| `showLeftItem` | `boolean` | `false` | Figma `LeftItem` property. |
| `showRightItem` | `boolean` | `false` | Figma `RightItem` property. |
| `showLogo` | `boolean` | `false` | Figma `Logo` property. |
| `leftIcon` | `ReactNode` | `<Icon type="arrow-left" size={24} />` | Left action icon slot. |
| `logo` | `ReactNode` | - | Logo slot when `showLogo` is true. |
| `rightItems` | `ReactNode[]` | shop icon | Right action icon slots. |
| `leftLabel` | `string` | `"뒤로가기"` | Accessible label for left action. |
| `onLeftClick` | `() => void` | - | Left action handler. |
| `className` | `string` | - | Additional class name. |

## Bridge Attributes

- `data-node-kind="component"`
- `data-component-id="app-bar"`
- `data-figma-component="AppBar"`
- `data-figma-property-left-item`
- `data-figma-property-right-item`
- `data-figma-property-title`
- `data-figma-property-logo`
