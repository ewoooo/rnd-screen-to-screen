# SectionDivider

Page section 사이의 full-bleed separator입니다. Content inset 안에서 렌더해도 frame edge까지 확장되며, 정책 화면의 반복 section 경계를 명시합니다.

## Import

```tsx
import { SectionDivider } from "@pxds/pxds-layout/components";
```

## Usage

```tsx
<SectionDivider />
<SectionDivider thickness="hairline" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `thickness` | `"section" \| "hairline"` | `"section"` | Section gap divider or 1px hairline divider. |
| `className` | `string` | - | Additional class name. |

Native `div` attributes are supported except `children`.

## DOM Markers

- `data-pxds-pattern="section-divider"`
- `data-pxds-thickness="section|hairline"`
