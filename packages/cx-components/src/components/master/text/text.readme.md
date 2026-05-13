# Text

CX typography foundation component.

## Import

```tsx
import { Text } from "@pxds/cx-components";
```

## API

```tsx
<Text variant="body" as="p" className="custom-class">
  Text content
</Text>
```

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `TextVariant` | `"body"` | CX semantic typography variant. |
| `as` | `TextElement` | `"span"` | Rendered HTML element. Supports `span`, `p`, `label`, `div`, `strong`, `em`, `small`, `h1`-`h6`. |
| `className` | `string` | - | Extra classes merged after the variant class. |
| `children` | `ReactNode` | - | Text content. |

Native props for the selected `as` element are also supported.

## Variants

Text variants map to generated classes from `@pxds/cx-tokens/text-styles.css`.

| Variant | Token class |
| --- | --- |
| `displayTitle` | `text-24-med` |
| `sectionTitle` | `text-20-med` |
| `listTitle` | `text-16-semi` |
| `body` | `text-16-reg` |
| `bodySubtle` | `text-14-reg` |
| `caption` | `text-12-med` |
| `label` | `text-14-semi` |
| `helper` | `text-12-reg` |
| `error` | `text-12-reg` |

## Examples

```tsx
<Text variant="displayTitle" as="h1">
  회원가입
</Text>
```

```tsx
<Text variant="body" as="p">
  본인 인증을 진행해 주세요.
</Text>
```

```tsx
<Text variant="label" as="label" htmlFor="member-id">
  아이디
</Text>
```

```tsx
<Text variant="error" className="custom-error-copy">
  입력값을 확인해 주세요.
</Text>
```
