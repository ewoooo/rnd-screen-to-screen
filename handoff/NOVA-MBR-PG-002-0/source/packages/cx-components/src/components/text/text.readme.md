# Text

CX typography token을 사용하는 polymorphic text component입니다.

## Import

```tsx
import { Text } from "@pxds/cx-components";
```

## Usage

```tsx
<Text>본문</Text>
<Text as="h1" variant="displayTitle">타이틀</Text>
<Text variant="caption">캡션</Text>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `TextElement` | `"span"` | Rendered element. |
| `variant` | `TextVariant` | `"body"` | Typography token variant. |
| `className` | `string` | - | Additional class name. |
| `children` | `ReactNode` | - | Text content. |

Native props for the selected element are supported.

## Variants

- `displayTitle`
- `sectionTitle`
- `listTitle`
- `body`
- `bodySubtle`
- `caption`
- `label`
- `helper`
- `error`

## Bridge Attributes

- `data-node-kind="component"`
- `data-component-id="cx-text"`
- `data-figma-component="Text"`
- `data-figma-variant`
