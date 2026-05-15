# SectionDivider

Page section 사이의 full-bleed separator입니다. Content inset 안에서 렌더해도 frame edge까지 확장되며, 정책 화면의 반복 section 경계를 명시합니다.

Section boundary는 route margin이나 empty spacer가 아니라 이 pattern으로 표현한다. 4px section divider와 1px hairline divider의 사용 기준은 `DESIGN_PATTERNS.md`와 `SPACING_PATTERNS.md`를 따른다.

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

- `data-figma-render="layout"`
- `data-figma-component-id="section-divider"`
- `data-figma-layout-kind="pattern"`
- `data-figma-layout-layer="divider"`
- `data-figma-property-thickness="section|hairline"`
