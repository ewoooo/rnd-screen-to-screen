# SectionItem

Section content wrapper for arbitrary slotted CX content. It normalizes the Figma `SectionItem_이친구를복붙하세요` copy source to the public `SectionItem` API.

## Import

```tsx
import { SectionItem } from "@pxds/cx-components";
```

## Usage

```tsx
<SectionItem>
	<TitleSection title="섹션 타이틀" />
	<Text>본문 콘텐츠</Text>
</SectionItem>

<SectionItem variant="card">
	<Badge type="blue" text="혜택" />
</SectionItem>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | - | Section content slot. |
| `variant` | `"default" \| "card"` | `"default"` | Wrapper inset behavior. |
| `type` | `"default" \| "card"` | - | Alias for `variant`. |
| `className` | `string` | - | Additional class name. |

Native `div` attributes are also supported except `children`.

## Figma Mapping

| Figma property | React prop |
| --- | --- |
| `Type=Default 20` | `variant="default"` |
| `Type=Card 0` | `variant="card"` |
| `contents_여기에 콘텐츠를 넣으세요` | `children` |

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="section-item"`
- `data-figma-property-type="default-20" | "card-0"`
- `data-figma-property-contents="slot"`
