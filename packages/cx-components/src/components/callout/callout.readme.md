# Callout

Non-interactive informational callout compound입니다.

## Import

```tsx
import { Callout } from "@pxds/cx-components";
```

## Usage

```tsx
<Callout>가입 전 꼭 확인해 주세요.</Callout>

<Callout title="안내">
	선택한 조건에 따라 제공 가능한 혜택이 달라질 수 있습니다.
</Callout>

<Callout icon="info" title="안내">
	가입 조건을 확인해 주세요.
</Callout>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` | - | Optional title region. |
| `children` | `ReactNode` | - | Main body content. |
| `icon` | `IconType \| ReactNode` | - | Optional leading icon. |
| `className` | `string` | - | Additional root class. |

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="callout"`
- `data-figma-property-title`
